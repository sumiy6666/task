'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { SearchSelect } from '@/components/ui/SearchSelect';
import { TopicsInput } from './TopicsInput';
import styles from './Join.module.css';

const TITLES = ['Mr', 'Ms', 'Mrs', 'Dr', 'Prof'];
const EMPTY = {
  title: 'Mr', firstName: '', lastName: '', email: '', phone: '', company: '', designation: '',
  city: '', country: '', profileLink: '', topics: [], website: '',
};

// Every field but the topics is required, marked with a blue asterisk.
// `group` renders a plain box instead of a <label>, for dropdowns: a label
// would pass clicks on the list back to the box and reopen it.
function Field({ label, group, children }) {
  const Tag = group ? 'div' : 'label';
  return (
    <Tag className={styles.field}>
      <span className={styles.label}>{label}<span className={styles.required} aria-hidden="true"> *</span></span>
      {children}
    </Tag>
  );
}

// The photo banner with the request form on its right. The request goes to
// the forum, an admin approves it, and the member then signs in. The JOIN
// button sits on the photo, outside the card, and submits the form by its id.
export function JoinHero({ topics = [], countries = [] }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const latestCountry = useRef('');

  // A new country clears the city and loads that country's cities; an empty
  // phone box gets the country's dialling code to start from.
  const chooseCountry = async (name) => {
    if (name === form.country) return;
    const country = countries.find((c) => c.value === name);
    latestCountry.current = name;
    setForm((f) => ({ ...f, country: name, city: '', phone: f.phone.trim() || !country?.phone ? f.phone : `+${country.phone.replace(/^\+/, '')} ` }));
    setCities([]);
    if (!country) return;
    setCitiesLoading(true);
    try {
      const res = await fetch(`/api/locations/cities?country=${country.code}`);
      const data = await res.json();
      // Ignore an answer for a country that has since been changed again.
      if (latestCountry.current === name) setCities((data.cities || []).map((city) => ({ value: city, label: city })));
    } catch {
      setCities([]);
    } finally {
      if (latestCountry.current === name) setCitiesLoading(false);
    }
  };

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
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

  return (
    <section className={styles.hero}>
      <div className={styles.heroIntro}>
        <h1 className={`rise-in ${styles.heroTitle}`}>
          Join
          <span className={styles.heroAccent}>The AV Community</span>
        </h1>
        <p className={`rise-in ${styles.heroText}`} style={{ '--delay': '0.15s' }}>
          Looking after a family&apos;s wealth is quiet work. The decisions are big, the stakes are personal, and few people
          outside the room understand what the job really takes.
        </p>
      </div>

      <div className={styles.formCard}>
        {status === 'sent' ? (
          <div className={styles.sent} role="status">
            <h2 className={styles.sentTitle}>Thanks, your request is in</h2>
            <p>
              Your request is awaiting approval. Our team will review it and email <strong>{form.email}</strong> once
              you&apos;re approved.
            </p>
            <p>
              That email has a link to set your password. Then choose Sign in and use your email and that password.
            </p>
            <Link href="/" className={styles.sentLink}>Back to home</Link>
          </div>
        ) : (
          <form id="join-form" onSubmit={submit} noValidate className={styles.form}>
            <div className={styles.nameRow}>
              <Field label="Title">
                <select className={styles.input} value={form.title} onChange={set('title')} autoComplete="honorific-prefix" required>
                  {TITLES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="First Name">
                <input className={styles.input} value={form.firstName} onChange={set('firstName')} placeholder="First Name" autoComplete="given-name" required />
              </Field>
              <Field label="Last Name">
                <input className={styles.input} value={form.lastName} onChange={set('lastName')} placeholder="Last Name" autoComplete="family-name" required />
              </Field>
            </div>

            <div className={styles.pairRow}>
              <Field label="Business Email">
                <input className={styles.input} type="email" value={form.email} onChange={set('email')} placeholder="name@company.com" autoComplete="email" required />
              </Field>
              <Field label="Phone Number">
                <input className={styles.input} type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" autoComplete="tel" required />
              </Field>
            </div>

            <div className={styles.pairRow}>
              <Field label="Company">
                <input className={styles.input} value={form.company} onChange={set('company')} placeholder="Company Name" autoComplete="organization" required />
              </Field>
              <Field label="Profile/Designation">
                <input className={styles.input} value={form.designation} onChange={set('designation')} placeholder="Designation" autoComplete="organization-title" required />
              </Field>
            </div>

            <div className={styles.pairRow}>
              <Field label="Country" group>
                <SearchSelect
                  value={form.country}
                  onChange={chooseCountry}
                  options={countries}
                  placeholder="Select country"
                  inputClassName={styles.input}
                  ariaLabel="Country"
                  required
                />
              </Field>
              <Field label="City" group>
                <SearchSelect
                  value={form.city}
                  onChange={(city) => setForm((f) => ({ ...f, city }))}
                  options={cities}
                  placeholder={form.country ? 'Select city' : 'Select country first'}
                  disabled={!form.country}
                  loading={citiesLoading}
                  allowCustom
                  inputClassName={styles.input}
                  ariaLabel="City"
                  required
                />
              </Field>
            </div>

            <Field label="LinkedIn Profile Link">
              <input className={styles.input} type="url" value={form.profileLink} onChange={set('profileLink')} placeholder="linkedin.com/in/your-name" autoComplete="url" required />
            </Field>

            <div className={styles.field}>
              <span className={styles.label}>Topics of Interest</span>
              <TopicsInput value={form.topics} onChange={(t) => setForm((f) => ({ ...f, topics: t }))} suggestions={topics} label="Topics of Interest" />
            </div>

            {/* Left empty by people; bots fill it in. */}
            <input className={styles.trap} tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} name="website" />

            {error && <p role="alert" className={styles.error}>{error}</p>}
          </form>
        )}
      </div>

      {status !== 'sent' && (
        <div className={styles.heroAction}>
          <button type="submit" form="join-form" className={styles.joinButton} disabled={status === 'sending'}>
            {status === 'sending' ? 'SENDING…' : 'JOIN'}
          </button>
        </div>
      )}
    </section>
  );
}
