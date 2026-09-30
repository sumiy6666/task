// Discourse User API Keys: the member signs in on the forum, approves this app,
// and Discourse sends back a personal API key encrypted with our public key.
// https://meta.discourse.org/t/user-api-keys-specification/48536
import crypto from 'node:crypto';

export const SCOPES = 'read,write,session_info';

// A fresh key pair per sign-in; the private half waits in a short-lived
// httpOnly cookie until Discourse redirects back.
export function createKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  return {
    publicKeyPem: publicKey.export({ type: 'spki', format: 'pem' }),
    privateKeyDer: privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64url'),
  };
}

const toBigInt = (buf) => BigInt(`0x${buf.toString('hex') || '0'}`);

function modPow(base, exp, mod) {
  let result = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    exp >>= 1n;
    base = (base * base) % mod;
  }
  return result;
}

// Node refuses RSA PKCS#1 v1.5 private decryption, which older Discourse
// versions use for this payload, so it is done by hand here.
function decryptPkcs1v15(privateKey, cipher) {
  const jwk = privateKey.export({ format: 'jwk' });
  const n = toBigInt(Buffer.from(jwk.n, 'base64url'));
  const d = toBigInt(Buffer.from(jwk.d, 'base64url'));
  const size = Buffer.from(jwk.n, 'base64url').length;
  const block = Buffer.from(modPow(toBigInt(cipher), d, n).toString(16).padStart(size * 2, '0'), 'hex');
  if (block[0] !== 0x00 || block[1] !== 0x02) throw new Error('Bad padding');
  const separator = block.indexOf(0x00, 2);
  if (separator < 10) throw new Error('Bad padding');
  return block.subarray(separator + 1);
}

export function decryptPayload(privateKeyDer, payload) {
  const privateKey = crypto.createPrivateKey({ key: Buffer.from(privateKeyDer, 'base64url'), format: 'der', type: 'pkcs8' });
  // Query strings can turn "+" into spaces and Ruby's Base64 adds line breaks.
  const cipher = Buffer.from(payload.replace(/ /g, '+').replace(/\s/g, ''), 'base64');
  let plain;
  try {
    plain = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha1' }, cipher);
  } catch {
    plain = decryptPkcs1v15(privateKey, cipher);
  }
  return JSON.parse(plain.toString('utf8'));
}
