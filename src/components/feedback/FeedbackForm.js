'use client';
import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpFromLine, FileText, Info, Lightbulb, MessageCircleMore } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Feedback.module.css';

const TYPES = [
  { id: 'issue', Icon: Info, title: 'Report an issue', text: 'Something isn’t working as expected' },
  { id: 'feature', Icon: Lightbulb, title: 'Suggest a Feature', text: 'Share an idea for improvement' },
  { id: 'content', Icon: FileText, title: 'Content Feedback', text: 'Feedback on articles, discussions or resources' },
  { id: 'general', Icon: MessageCircleMore, title: 'General Feedback', text: 'Share your thoughts about the platform' }
];

const MAX_DETAILS = 1000;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// Site feedback: pick a type, write a subject and details, optionally attach
// a screenshot. Nothing is sent anywhere yet (there is no feedback endpoint),
// so a valid submission only shows the thank-you state.
export function FeedbackForm() {
  const [type, setType] = useState('issue');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(false);
  const [sent, setSent] = useState(false);
  const fileInput = useRef(null);

  const pickFile = (picked) => {
    if (!picked) return;
    if (!FILE_TYPES.includes(picked.type)) {
      setErrors((e) => ({ ...e, file: 'Please choose a JPG, PNG or PDF file.' }));
    } else if (picked.size > MAX_FILE_BYTES) {
      setErrors((e) => ({ ...e, file: 'That file is larger than 5 MB.' }));
    } else {
      setErrors((e) => ({ ...e, file: undefined }));
      setFile(picked);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!subject.trim()) next.subject = 'Please add a short subject.';
    if (!details.trim()) next.details = 'Please tell us a little more.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const reset = () => {
    setType('issue');
    setSubject('');
    setDetails('');
    setFile(null);
    setErrors({});
    setSent(false);
  };

  if (sent) {
    return (
      <section className={styles.card}>
        <div className={styles.thanks} role="status">
          <h2 className={styles.thanksTitle}>Thank you for your feedback</h2>
          <p className={styles.thanksText}>Our team reviews all submissions.</p>
          <button type="button" className={styles.again} onClick={reset}>Send more feedback</button>
        </div>
      </section>
    );
  }

  return (
    <Reveal as="section" className={styles.card}>
      <h2 className={styles.title}>Submit Feedback</h2>
      <p className={styles.intro}>Please share your feedback, suggestion or issue. Our team reviews all submissions.</p>

      <form onSubmit={submit} noValidate>
        <fieldset className={styles.field}>
          <legend className={styles.label}>What is your feedback about?</legend>
          <div className={styles.types}>
            {TYPES.map(({ id, Icon, title, text }) => (
              <label key={id} className={`${styles.type} ${type === id ? styles.typeActive : ''}`}>
                <input type="radio" name="type" value={id} checked={type === id} onChange={() => setType(id)} />
                <Icon className={styles.typeIcon} strokeWidth={1.2} aria-hidden="true" />
                <span className={styles.typeTitle}>{title}</span>
                <span className={styles.typeText}>{text}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.field}>
          <label htmlFor="feedback-subject" className={styles.label}>Subject</label>
          <input
            id="feedback-subject"
            className={`${styles.input} ${errors.subject ? styles.invalid : ''}`}
            placeholder="Give a short description of your feedback"
            value={subject}
            maxLength={150}
            onChange={(e) => setSubject(e.target.value)}
            aria-invalid={Boolean(errors.subject)}
          />
          {errors.subject && <p className={styles.error}>{errors.subject}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="feedback-details" className={styles.label}>Tell us more</label>
          <textarea
            id="feedback-details"
            className={`${styles.textarea} ${errors.details ? styles.invalid : ''}`}
            placeholder="Provide more details"
            value={details}
            maxLength={MAX_DETAILS}
            onChange={(e) => setDetails(e.target.value)}
            aria-invalid={Boolean(errors.details)}
          />
          {errors.details && <p className={styles.error}>{errors.details}</p>}
          <p className={styles.counter}>{details.length}/{MAX_DETAILS}</p>
        </div>

        <div>
          <span className={styles.label}>Attach a screenshot (optional)</span>
          <div
            role="button"
            tabIndex={0}
            className={`${styles.drop} ${dragging ? styles.dropActive : ''}`}
            onClick={() => fileInput.current?.click()}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), fileInput.current?.click())}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0]); }}
          >
            <ArrowUpFromLine className={styles.dropIcon} strokeWidth={1.2} aria-hidden="true" />
            {file ? (
              <span className={styles.file}>
                {file.name}
                <button type="button" className={styles.fileRemove} onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remove</button>
              </span>
            ) : (
              <div>
                <p className={styles.dropText}>Drag and drop an image here or <span className={styles.dropLink}>click to upload</span></p>
                <p className={styles.dropHint}>Supported formats: JPG, PNG, PDF (5 MB)</p>
              </div>
            )}
          </div>
          <input
            ref={fileInput}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            hidden
            onChange={(e) => { pickFile(e.target.files?.[0]); e.target.value = ''; }}
          />
          {errors.file && <p className={styles.error}>{errors.file}</p>}
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submit}>
            Submit feedback
            <ArrowRight strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </form>
    </Reveal>
  );
}
