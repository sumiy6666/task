'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Compose.module.css';
import { GradientBadge } from './GradientBadge';
import { EmojiButton, insertAtCursor } from './EmojiButton';
import { PollOptionsEditor } from './PollOptionsEditor';
import { ArticleIcon, ChevronDownIcon, ChevronLeftIcon, CloseIcon, ImageIcon, InsightIcon, LinkIcon, PaperPlaneIcon, PollIcon } from './icons';

const KINDS = [
  { id: 'article', label: 'ARTICLE', Icon: ArticleIcon },
  { id: 'poll', label: 'POLL', Icon: PollIcon },
  { id: 'insight', label: 'INSIGHT', Icon: InsightIcon },
];

// The chosen type with a GO BACK link on the right.
function KindHeader({ kind, onBack, backLabel = 'GO BACK' }) {
  const { label, Icon } = KINDS.find((k) => k.id === kind);
  return (
    <div className={styles.kindHeader}>
      <span className={styles.kindTitle}><Icon className={styles.kindIcon} aria-hidden="true" />{label}</span>
      <button type="button" className={styles.goBack} onClick={onBack}>
        <ChevronLeftIcon aria-hidden="true" />{backLabel}
      </button>
    </div>
  );
}
import { redirectIfSignedOut } from '@/lib/auth-client';

let nextOptionId = 1;
const newOption = (text = '') => ({ id: nextOptionId++, text });
const initialOptions = () => [newOption(), newOption(), newOption(), newOption()];

function formatClose(date, time) {
  if (!date) return null;
  const at = new Date(`${date}T${time || '23:59'}`);
  if (Number.isNaN(at.getTime())) return null;
  const day = at.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const clock = at.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return { iso: at.toISOString(), label: `${day}, ${clock}`, isPast: at.getTime() <= Date.now() };
}

async function postJson(url, body) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (redirectIfSignedOut(res)) return new Promise(() => {});
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

function Author({ user }) {
  return (
    <div className={styles.author}>
      <div className={styles.avatarRing}>
        <img src={user.avatar} alt="" />
      </div>
      <span className={styles.authorName}>{user.name}</span>
    </div>
  );
}

export function CategoryField({ categories, value, onChange, readOnly = false, className = '' }) {
  const current = categories.find((c) => String(c.id ?? c.name) === value);
  return (
    <div className={`${styles.category} ${readOnly ? styles.categoryStatic : ''} ${className}`}>
      <span className={styles.categoryLabel} id="category-label">Categories</span>
      <span className={styles.categoryValue}>{current?.name || 'Select'}</span>
      <ChevronDownIcon className={styles.categoryChevron} />
      {!readOnly && (
        <select
          className={styles.categorySelect}
          aria-labelledby="category-label"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id ?? c.name} value={String(c.id ?? c.name)}>
              {c.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

// `initialTitle` and `initialCategory` (a category name) prefill the form,
// e.g. from the composer on the discussions page.
export function ComposeFlow({ user, categories, initialType = 'discussion', initialTitle = '', initialCategory }) {
  const router = useRouter();
  const keyOf = (c) => String(c.id ?? c.name);
  const defaultKey = (type) => keyOf(categories.find((c) => (type === 'poll' ? c.isPoll : !c.isPoll)) || categories[0]);

  const [step, setStep] = useState('edit');
  // What is being posted: 'article' | 'poll' | 'insight'; null shows the type cards.
  const [kind, setKind] = useState(initialType === 'poll' ? 'poll' : null);
  const [categoryKey, setCategoryKey] = useState(() => {
    const named = initialCategory && categories.find((c) => c.name === initialCategory);
    return named ? keyOf(named) : defaultKey(initialType);
  });
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState('');
  const [options, setOptions] = useState(initialOptions);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [anonymous, setAnonymous] = useState(true);
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [draftSequence, setDraftSequence] = useState(0);
  const [created, setCreated] = useState(null);

  const bodyRef = useRef(null);
  const fileRef = useRef(null);

  // Each step replaces the card, so bring its top back into view.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const category = categories.find((c) => keyOf(c) === categoryKey);
  const isPoll = kind === 'poll';

  // Picking a type moves to its usual category: polls to the Polls category
  // (so they appear on the Poll page), insights to Articles/Insights.
  const chooseKind = (next) => {
    setKind(next);
    setError('');
    const find = (test) => categories.find(test);
    const target =
      next === 'poll' ? find((c) => c.isPoll)
      : next === 'insight' ? find((c) => /insight|article/i.test(c.name))
      : category?.isPoll ? find((c) => !c.isPoll)
      : null;
    if (target) setCategoryKey(keyOf(target));
  };
  const filledOptions = options.map((o) => o.text.trim()).filter(Boolean);
  const close = useMemo(() => formatClose(endDate, endTime), [endDate, endTime]);
  const today = new Date().toISOString().slice(0, 10);

  const reset = () => {
    setStep('edit');
    setKind(null);
    setTitle('');
    setBody('');
    setOptions(initialOptions());
    setAllowMultiple(false);
    setAnonymous(true);
    setEndDate('');
    setEndTime('');
    setError('');
    setNotice('');
    setDraftSequence(0);
    setCreated(null);
  };

  const validate = () => {
    if (!kind) return 'Choose Article, Poll or Insight.';
    if (!title.trim()) return isPoll ? 'Please write your question.' : 'Please add what this conversation is about.';
    if (isPoll) {
      if (filledOptions.length < 2) return 'Add at least two options.';
      if (new Set(filledOptions.map((o) => o.toLowerCase())).size !== filledOptions.length) return 'Each option must be different.';
      if (endDate && !close) return 'Please enter a valid end date and time.';
      if (close?.isPast) return 'The end date and time must be in the future.';
    } else if (!body.trim()) {
      return 'Please write something before posting.';
    }
    return '';
  };

  const submit = async () => {
    const problem = validate();
    if (problem) return setError(problem);
    setBusy(true);
    setError('');
    try {
      const payload = isPoll
        ? {
            type: 'poll',
            title: title.trim(),
            categoryId: category?.id ?? null,
            poll: { options: filledOptions, allowMultiple, anonymous, closesAt: close?.iso || null },
          }
        : { type: 'discussion', title: title.trim(), body, categoryId: category?.id ?? null };
      const { topicId, pending } = await postJson('/api/topics', payload);
      setCreated({ topicId, isPoll, pending: Boolean(pending) });
      setStep('success');
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const goToReview = () => {
    const problem = validate();
    if (problem) return setError(problem);
    setError('');
    setNotice('');
    setStep('review');
  };

  const saveDraft = async () => {
    setBusy(true);
    setError('');
    try {
      const data = {
        title,
        reply: body,
        categoryId: category?.id ?? null,
        archetypeId: 'regular',
        poll: isPoll ? { options: filledOptions, allowMultiple, anonymous, endDate, endTime } : undefined,
      };
      const { sequence } = await postJson('/api/drafts', { data, sequence: draftSequence });
      setDraftSequence(sequence);
      setNotice('Draft saved');
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const discard = () => {
    const dirty = title || body || options.some((o) => o.text);
    if (dirty && !window.confirm('Discard this conversation?')) return;
    reset();
  };

  const attachImage = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/uploads', { method: 'POST', body: form });
      if (redirectIfSignedOut(res)) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Upload failed.');
      setBody((b) => insertAtCursor(bodyRef.current, b, `\n${data.markdown}\n`));
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const insertLink = () => {
    const url = window.prompt('Link URL', 'https://');
    if (!url || url === 'https://') return;
    const el = bodyRef.current;
    const selected = el ? body.slice(el.selectionStart, el.selectionEnd) : '';
    setBody((b) => insertAtCursor(el, b, `[${selected || url}](${url})`));
  };

  const closeButton = (
    <button type="button" className={styles.closeButton} aria-label="Close" onClick={() => router.push('/discussions')}>
      <CloseIcon />
    </button>
  );

  const status = error ? (
    <span className={styles.error} role="alert">{error}</span>
  ) : notice ? (
    <span className={styles.notice} role="status">{notice}</span>
  ) : null;

  if (step === 'success') {
    return (
      <section className={styles.card}>
        <div className={styles.success}>
          <GradientBadge>
            <PaperPlaneIcon />
          </GradientBadge>
          {created.pending ? (
            <>
              <h1 className={styles.successTitle}>Your post is awaiting approval</h1>
              <p className={styles.successText}>A moderator reviews posts from new members. It will appear in the community once approved.</p>
            </>
          ) : (
            <>
              <h1 className={styles.successTitle}>Your post is now live!</h1>
              <p className={styles.successText}>Your post has been published and is visible to the community!</p>
            </>
          )}
          <div className={styles.successActions}>
            {!created.pending && (
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => router.push(`/conversations/${created.topicId}`)}>
                {created.isPoll ? 'View poll' : 'View post'}
              </button>
            )}
            <button type="button" className={`${styles.btn} ${styles.btnGrey}`} onClick={reset}>
              Create another post
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (step === 'review') {
    return (
      <section className={styles.card}>
        {closeButton}
        <h1 className={styles.srOnly}>Review and Publish</h1>
        <div className={styles.reviewTop}>
          <Author user={user} />
          <CategoryField categories={categories} value={categoryKey} readOnly />
        </div>
        <KindHeader kind="poll" onBack={() => setStep('edit')} backLabel="EDIT" />
        <h2 className={styles.reviewQuestion}>{title.trim()}</h2>
        <ul className={styles.reviewOptions}>
          {filledOptions.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
        <p className={styles.reviewMeta}>
          {close ? `Poll closes on ${close.label}` : 'Poll stays open until closed manually'}
        </p>
        <div className={styles.footer}>
          <span />
          <div className={styles.actions} style={{ alignItems: 'center' }}>
            {status}
            <button type="button" className={`${styles.btn} ${styles.btnGrey} ${styles.btnDraft}`} onClick={saveDraft} disabled={busy}>
              Save draft
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnWide}`} onClick={submit} disabled={busy}>
              {busy ? 'Posting…' : 'Post'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      {closeButton}
      <Author user={user} />

      <div className={styles.titleRow}>
        <label className={styles.srOnly} htmlFor="compose-title">
          Question
        </label>
        <input
          id="compose-title"
          className={styles.titleInput}
          placeholder="Write question here"
          value={title}
          maxLength={255}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CategoryField
          categories={categories}
          value={categoryKey}
          onChange={(key) => {
            setCategoryKey(key);
            setError('');
          }}
        />
      </div>

      {!kind ? (
        <div className={styles.kinds} role="group" aria-label="What would you like to post?">
          {KINDS.map(({ id, label, Icon }) => (
            <button key={id} type="button" className={styles.kindCard} onClick={() => chooseKind(id)}>
              <Icon className={styles.kindCardIcon} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      ) : isPoll ? (
        <>
        <KindHeader kind="poll" onBack={() => setKind(null)} />
        <div className={`${styles.pollGrid} ${styles.pollBox}`}>
          <div>
            <h2 className={styles.sectionTitle}>Options</h2>
            <PollOptionsEditor options={options} onChange={setOptions} createOption={newOption} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Poll Setting</h2>
            <div className={styles.settingsList}>
              <div className={styles.setting}>
                <span className={styles.settingLabel} id="multi-label">Allow multiple selections</span>
                <button type="button" role="switch" aria-checked={allowMultiple} aria-labelledby="multi-label" className={styles.toggle} onClick={() => setAllowMultiple((v) => !v)} />
              </div>
              <div className={styles.setting}>
                <span className={styles.settingLabel} id="anon-label">
                  Make Anonymous
                  <span className={styles.settingHint}>Voter identity will not be visible to others</span>
                </span>
                <button type="button" role="switch" aria-checked={anonymous} aria-labelledby="anon-label" className={styles.toggle} onClick={() => setAnonymous((v) => !v)} />
              </div>
            </div>
            <div className={styles.endDate}>
              <span className={styles.settingLabel}>Set end date and time (optional)</span>
              <div className={styles.dateRow}>
                <input type="date" aria-label="End date" className={styles.dateInput} min={today} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <input type="time" aria-label="End time" className={styles.dateInput} value={endTime} disabled={!endDate} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        </>
      ) : (
        <>
          <KindHeader kind={kind} onBack={() => setKind(null)} />
          <label className={styles.srOnly} htmlFor="compose-body">Message</label>
          <textarea id="compose-body" ref={bodyRef} className={styles.bodyInput} value={body} onChange={(e) => setBody(e.target.value)} />
        </>
      )}

      <div className={styles.footer}>
        {isPoll ? (
          <span />
        ) : (
          <div className={styles.tools}>
            <EmojiButton onPick={(emoji) => setBody((b) => insertAtCursor(bodyRef.current, b, emoji))} />
            <button type="button" className={styles.toolButton} aria-label="Attach image" disabled={uploading} onClick={() => fileRef.current?.click()}>
              <ImageIcon />
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => attachImage(e.target.files?.[0])} />
            <button type="button" className={styles.toolButton} aria-label="Insert link" onClick={insertLink}>
              <LinkIcon />
            </button>
          </div>
        )}
        <div className={styles.actions} style={{ alignItems: 'center' }}>
          {status}
          {isPoll ? (
            <>
              <button type="button" className={`${styles.btn} ${styles.btnGrey} ${styles.btnDraft}`} onClick={saveDraft} disabled={busy}>
                Save draft
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnWide}`} onClick={goToReview} disabled={busy}>
                Next
              </button>
            </>
          ) : (
            <>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={submit} disabled={busy || uploading}>
                {busy ? 'Posting…' : 'Post'}
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnGrey} ${styles.btnWide}`} onClick={discard} disabled={busy}>
                Discard
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
