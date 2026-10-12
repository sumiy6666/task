'use client';
import { useState } from 'react';
import Link from 'next/link';
import compose from '../compose/Compose.module.css';
import fields from '../events/RegisterEvent.module.css';
import styles from './SignUp.module.css';

const EMPTY = { name: '', email: '', username: '', password: '', organisation: '', role: '', website: '' };

// A username suggestion from the name: "Priya Mehta" → "priya.mehta".
const suggestUsername = (name) =>
  name.trim().toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s.-]/g, '').replace(/\s+/g, '.').slice(0, 20);

// "Request to join": the request goes to the forum, an admin approves it, and
// the member then signs in with their AV Community account.
export function SignUpForm() {
  const [form, setForm] = useState(EMPTY);
  const [usernameEdited, setUsernameEdited] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value, ...(key === 'name' && !usernameEdited ? { username: suggestUsername(value) } : {}) }));
    if (key === 'username') setUsernameEdited(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your request.');
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  if (status === 'sent') {
    return (
      <section className={compose.card}>
        <div className={compose.success}>
          <h1 className={compose.successTitle}>Thanks, your request is in</h1>
          <p className={compose.successText}>
            We’ve sent a confirmation link to <strong>{form.email}</strong>. Please confirm your email; our team will then review your request.
          </p>
          <p className={compose.successText}>You’ll get an email once you’re approved, and can then sign in with your username and password.</p>
          <div className={compose.successActions}>
            <Link className={`${compose.btn} ${compose.btnPrimary}`} href="/">Back to home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${compose.card} ${styles.card}`}>
      <h1 className={styles.title}>Request to join AV Community</h1>
      <p className={styles.intro}>
        AV Community is for family office professionals. Tell us a little about yourself and our team will review your request.
      </p>

      <form onSubmit={submit} noValidate className={styles.form}>
        <div className={fields.row}>
          <label className={fields.field}>
            <span className={fields.label}>Full name*</span>
            <input className={fields.input} value={form.name} onChange={set('name')} autoComplete="name" required />
          </label>
          <label className={fields.field}>
            <span className={fields.label}>Work email*</span>
            <input className={fields.input} type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
          </label>
        </div>
        <div className={fields.row}>
          <label className={fields.field}>
            <span className={fields.label}>Organisation*</span>
            <input className={fields.input} value={form.organisation} onChange={set('organisation')} autoComplete="organization" required />
          </label>
          <label className={fields.field}>
            <span className={fields.label}>Your role*</span>
            <input className={fields.input} value={form.role} onChange={set('role')} autoComplete="organization-title" required />
          </label>
        </div>
        <div className={fields.row}>
          <label className={fields.field}>
            <span className={fields.label}>Username*</span>
            <input className={fields.input} value={form.username} onChange={set('username')} autoComplete="username" required />
          </label>
          <label className={fields.field}>
            <span className={fields.label}>Password* (at least 10 characters)</span>
            <input className={fields.input} type="password" value={form.password} onChange={set('password')} autoComplete="new-password" required />
          </label>
        </div>
        {/* Left empty by people; bots fill it in. */}
        <input className={styles.trap} tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} name="website" />

        {error && <span role="alert" className={fields.error}>{error}</span>}
        <button type="submit" className={`${fields.confirm} ${styles.submit}`} disabled={status === 'sending'}>
          {status === 'sending' ? 'SENDING…' : 'REQUEST TO JOIN'}
        </button>
        <p className={styles.signIn}>
          Already a member? <a href="/api/auth/login?return=%2F">Sign in</a>
        </p>
      </form>
    </section>
  );
}
