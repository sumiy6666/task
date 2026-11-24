// The member emails sent when staff approve or decline a join request.
// HTML from the design team; images live in public/email and must be absolute URLs.
// Generated from welcome-email.html and regret-email.html: keep the markup email-safe (tables, inline styles).

const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function welcomeEmail({ firstName, siteUrl }) {
  const name = esc(firstName || 'member');
  const images = `${siteUrl}/email`;
  const guidelines = `${siteUrl}/guidelines`;
  return {
    subject: 'Welcome to the Asset Vantage Community',
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Welcome to the Asset Vantage Community</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>table,td,div,p,a,span,li{font-family:Arial,Helvetica,sans-serif !important;}</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,600;0,700;1,600&display=swap" rel="stylesheet">
<!--<![endif]-->
<style>
  html,body{margin:0 !important;padding:0 !important;width:100% !important;}
  *{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;display:block;}
  a{text-decoration:none;}
  a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important;}
  u + #body a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}
  #MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}

  @media only screen and (max-width:620px){
    .container{width:100% !important;max-width:100% !important;}
    .px{padding-left:22px !important;padding-right:22px !important;}
    .fluid{width:100% !important;max-width:100% !important;height:auto !important;}
    .stack{display:block !important;width:100% !important;max-width:100% !important;box-sizing:border-box;}
    .begin-title{padding:24px 24px 6px 24px !important;font-size:30px !important;line-height:34px !important;text-align:left !important;}
    .begin-title br{display:none !important;}
    .begin-divider{display:none !important;}
    .begin-list{padding:6px 24px 24px 24px !important;}
    .body-text{font-size:16px !important;line-height:24px !important;}
    .lead{font-size:18px !important;line-height:26px !important;}
  }
</style>
</head>
<body id="body" style="margin:0;padding:0;background-color:#eef3f8;word-spacing:normal;">

<!-- Preheader (inbox preview text) -->
<div style="display:none;font-size:1px;color:#eef3f8;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
  The Asset Vantage Community formally welcomes you. Here is how to get started.&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;
</div>

<div role="article" aria-roledescription="email" aria-label="Welcome to the Asset Vantage Community" lang="en" style="background-color:#eef3f8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef3f8;">
  <tr>
    <td align="center" style="padding:24px 0;">

      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;margin:0 auto;">

        <!-- HERO -->
                <tr>
          <td style="padding:0;font-size:0;line-height:0;">
            <img src="${images}/hero-welcome.jpg" width="600" height="266" alt="Asset Vantage – Welcome to the Asset Vantage Community" class="fluid" style="display:block;width:100%;max-width:600px;height:auto;border:0;background-color:#e3eefb;color:#20273a;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:28px;">
          </td>
        </tr>

        <!-- GREETING -->
        <tr>
          <td class="px body-text" style="padding:16px 33px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            Dear ${name}
          </td>
        </tr>

        <tr>
          <td class="px lead" style="padding:16px 36px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:19px;line-height:27px;font-weight:600;color:#07a1e5;">
            The Asset Vantage Community formally welcomes you!
          </td>
        </tr>

        <tr>
          <td class="px body-text" style="padding:12px 36px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            We are glad to have you with us.
          </td>
        </tr>

        <tr>
          <td class="px body-text" style="padding:20px 36px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            The Community brings together the people who keep family wealth in good order: those who reconcile it, report on it, protect it and advise on it. It is a place to think out loud with peers who face the same questions you do.
          </td>
        </tr>

        <!-- TO BEGIN BOX -->
        <tr>
          <td class="px" style="padding:32px 36px 0 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#dcf4ff;border-radius:10px;">
              <tr>
                <td class="stack begin-title" width="150" valign="middle" style="width:150px;padding:28px 0 28px 26px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:34px;line-height:36px;font-weight:700;color:#035d84;">
                  To <br>begin:
                </td>
                <td class="stack begin-divider" width="1" valign="middle" style="width:1px;padding:22px 0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr><td width="1" height="76" style="width:1px;height:76px;background-color:#8c9295;font-size:0;line-height:0;">&nbsp;</td></tr>
                  </table>
                </td>
                <td class="stack begin-list" valign="middle" style="padding:24px 26px 24px 34px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="24" valign="top" class="body-text" style="width:24px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:24px;color:#20273a;">1.</td>
                      <td valign="top" class="body-text" style="padding-bottom:8px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:24px;color:#20273a;">A mail to set your password should be in your inbox already.</td>
                    </tr>
                    <tr>
                      <td width="24" valign="top" class="body-text" style="width:24px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:24px;color:#20273a;">2.</td>
                      <td valign="top" class="body-text" style="font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:24px;color:#20273a;">Complete your profile so members know you better.</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- GUIDELINES -->
        <tr>
          <td class="px body-text" style="padding:36px 36px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            Please take a moment to read our Community guidelines <a href="${guidelines}" target="_blank" style="color:#0029ff;font-weight:700;text-decoration:none;">here</a>.
          </td>
        </tr>

        <tr>
          <td class="px body-text" style="padding:30px 36px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            If you need anything at all, simply reply to this email and a member of our team will help.
          </td>
        </tr>

        <tr>
          <td class="px lead" style="padding:34px 36px 34px 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:19px;line-height:27px;font-weight:600;font-style:italic;color:#07a1e5;">
            We look forward to the conversations ahead.
          </td>
        </tr>

        <!-- FOOTER (gradient; Outlook desktop gets a VML gradient) -->
        <tr>
          <td bgcolor="#2788e6" style="background-color:#2788e6;background-image:linear-gradient(180deg,#41b9f5 0%,#2788e6 45%,#0343d0 100%);">
            <!--[if gte mso 9]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:110px;">
            <v:fill type="gradient" color="#0343d0" color2="#41b9f5" angle="0" />
            <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text:true">
            <![endif]-->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="px" style="padding:30px 36px 30px 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#ffffff;">
                  With warm regards,<br>
                  <strong style="font-weight:700;color:#ffffff;">The Asset Vantage Community team</strong>
                </td>
              </tr>
            </table>
            <!--[if gte mso 9]>
            </v:textbox>
            </v:rect>
            <![endif]-->
          </td>
        </tr>

      </table>
      <!--[if mso]></td></tr></table><![endif]-->

    </td>
  </tr>
</table>
</div>
</body>
</html>
`,
    text: `Dear ${firstName || 'member'}

The Asset Vantage Community formally welcomes you! We are glad to have you with us.

The Community brings together the people who keep family wealth in good order: those who reconcile it, report on it, protect it and advise on it. It is a place to think out loud with peers who face the same questions you do.

To begin:
1. A mail to set your password should be in your inbox already.
2. Complete your profile so members know you better.

Please take a moment to read our Community guidelines: ${guidelines}

If you need anything at all, simply reply to this email and a member of our team will help.

We look forward to the conversations ahead.

With warm regards,
The Asset Vantage Community team`,
  };
}

export function regretEmail({ firstName, siteUrl }) {
  const name = esc(firstName || 'applicant');
  const images = `${siteUrl}/email`;
  return {
    subject: 'Your Asset Vantage Community application',
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Your Asset Vantage Community application</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>table,td,div,p,a,span,li{font-family:Arial,Helvetica,sans-serif !important;}</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,600;0,700;1,600&display=swap" rel="stylesheet">
<!--<![endif]-->
<style>
  html,body{margin:0 !important;padding:0 !important;width:100% !important;}
  *{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;display:block;}
  a{text-decoration:none;}
  a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important;}
  u + #body a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}
  #MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}

  @media only screen and (max-width:620px){
    .container{width:100% !important;max-width:100% !important;}
    .px{padding-left:22px !important;padding-right:22px !important;}
    .fluid{width:100% !important;max-width:100% !important;height:auto !important;}
    .stack{display:block !important;width:100% !important;max-width:100% !important;box-sizing:border-box;}
    .icon-cell{padding:24px 24px 0 24px !important;text-align:left !important;}
    .touch-text{padding:14px 24px 24px 24px !important;}
    .body-text{font-size:16px !important;line-height:24px !important;}
    .lead{font-size:18px !important;line-height:26px !important;}
  }
</style>
</head>
<body id="body" style="margin:0;padding:0;background-color:#eef3f8;word-spacing:normal;">

<!-- Preheader (inbox preview text) -->
<div style="display:none;font-size:1px;color:#eef3f8;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
  Thank you for your interest in the Asset Vantage Community.&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;
</div>

<div role="article" aria-roledescription="email" aria-label="Your Asset Vantage Community application" lang="en" style="background-color:#eef3f8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef3f8;">
  <tr>
    <td align="center" style="padding:24px 0;">

      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;margin:0 auto;">

        <!-- HERO -->
                <tr>
          <td style="padding:0;font-size:0;line-height:0;">
            <img src="${images}/hero-regret.jpg" width="600" height="267" alt="Asset Vantage – Welcome to the Asset Vantage Community" class="fluid" style="display:block;width:100%;max-width:600px;height:auto;border:0;background-color:#e3eefb;color:#20273a;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:28px;">
          </td>
        </tr>

        <!-- GREETING -->
        <tr>
          <td class="px body-text" style="padding:16px 36px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            Dear ${name}
          </td>
        </tr>

        <tr>
          <td class="px body-text" style="padding:16px 36px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            <span class="lead" style="font-size:19px;line-height:27px;font-weight:600;color:#07a1e5;">Thank you for your interest in the Asset Vantage Community,</span><br>
            and for the time you took to apply.
          </td>
        </tr>

        <tr>
          <td class="px body-text" style="padding:20px 36px 0 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            We have kept the Community deliberately small for now. That focus is what keeps each conversation close to the work of the people in it. For that reason, we are not able to offer you a place at this time.
          </td>
        </tr>

        <!-- STAY IN TOUCH BOX -->
        <tr>
          <td class="px" style="padding:32px 36px 0 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#dcf4ff;border-radius:10px;">
              <tr>
                <td class="stack icon-cell" width="130" valign="middle" align="center" style="width:130px;padding:22px 0 22px 18px;">
                                    <img src="${images}/icon-handshake.png" width="72" height="72" alt="" style="display:block;width:72px;height:72px;border:0;">
                </td>
                <td class="stack touch-text" valign="middle" style="padding:24px 26px 24px 30px;font-family:'Figtree',Arial,Helvetica,sans-serif;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="lead" style="font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:24px;font-weight:700;color:#07a1e5;padding-bottom:10px;">
                        However, we would be glad to stay in touch.
                      </td>
                    </tr>
                    <tr>
                      <td class="body-text" style="font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:24px;color:#20273a;">
                        And if your role or the Community&#39;s scope changes, you are warmly welcome to apply again.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td class="px body-text" style="padding:34px 36px 36px 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#20273a;">
            Thank you, once more, for thinking of us. We wish you every success in the work ahead.
          </td>
        </tr>

        <!-- FOOTER (gradient; Outlook desktop gets a VML gradient) -->
        <tr>
          <td bgcolor="#2788e6" style="background-color:#2788e6;background-image:linear-gradient(180deg,#41b9f5 0%,#2788e6 45%,#0343d0 100%);">
            <!--[if gte mso 9]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:110px;">
            <v:fill type="gradient" color="#0343d0" color2="#41b9f5" angle="0" />
            <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text:true">
            <![endif]-->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="px" style="padding:30px 36px 30px 36px;font-family:'Figtree',Arial,Helvetica,sans-serif;font-size:17px;line-height:26px;color:#ffffff;">
                  With warm regards,<br>
                  <strong style="font-weight:700;color:#ffffff;">The Asset Vantage Community team</strong>
                </td>
              </tr>
            </table>
            <!--[if gte mso 9]>
            </v:textbox>
            </v:rect>
            <![endif]-->
          </td>
        </tr>

      </table>
      <!--[if mso]></td></tr></table><![endif]-->

    </td>
  </tr>
</table>
</div>
</body>
</html>
`,
    text: `Dear ${firstName || 'applicant'}

Thank you for your interest in the Asset Vantage Community, and for the time you took to apply.

We have kept the Community deliberately small for now. That focus is what keeps each conversation close to the work of the people in it. For that reason, we are not able to offer you a place at this time.

However, we would be glad to stay in touch. And if your role or the Community's scope changes, you are warmly welcome to apply again.

Thank you, once more, for thinking of us. We wish you every success in the work ahead.

With warm regards,
The Asset Vantage Community team`,
  };
}
