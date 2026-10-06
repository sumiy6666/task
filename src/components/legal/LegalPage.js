import { Mail } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Legal.module.css';

const paragraphs = (value) => (Array.isArray(value) ? value : [value]).map((p) => <p key={p} className={styles.text}>{p}</p>);

// One column of a section: a paragraph, several paragraphs, or a lead-in
// line with a bulleted list and optional closing text ({ lead, items, after }).
function Column({ content }) {
  if (!content) return <div />;
  if (typeof content === 'string' || Array.isArray(content)) return <div>{paragraphs(content)}</div>;
  return (
    <div>
      {content.lead && paragraphs(content.lead)}
      <ul className={styles.list}>
        {content.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {content.after && <div className={styles.after}>{paragraphs(content.after)}</div>}
    </div>
  );
}

// Layout for legal pages (Terms of Use, Privacy Policy, Community Guidelines):
// title, two-column intro, an image, then sections split by rules, ending
// with an optional contact box.
//
// sections: [{ title, subtitle?, left, right }] for two columns, or
//           [{ title, subtitle?, body }] for one full-width column, where
//           left/right/body are Column content; `extra` (a node) goes after.
// contact:  { text, email, note }
// smallTitle: the page title is styled like a section heading.
export function LegalPage({ title, breadcrumb, intro = [], updated, image, imageAlt = '', sections = [], contact, smallTitle = false }) {
  return (
    <div className={`container min-h-screen ${styles.page}`}>
      <Breadcrumb items={breadcrumb || [{ label: 'Home', href: '/' }, { label: title }]} />

      <article className={styles.card}>
        <Reveal>
          <h1 className={smallTitle ? `${styles.sectionTitle} ${styles.smallTitle}` : styles.title}>{title}</h1>
          <div className={styles.columns}>
            <div>
              {intro[0] && <p className={styles.text}>{intro[0]}</p>}
              {updated && <p className={styles.updated}>Last updated: {updated}</p>}
            </div>
            {intro[1] && <div><p className={styles.text}>{intro[1]}</p></div>}
          </div>
        </Reveal>

        {image && (
          <Reveal>
            <img src={image} alt={imageAlt} className={styles.image} />
          </Reveal>
        )}

        <div>
          {sections.map((section) => (
            <Reveal as="section" key={section.title} className={styles.section}>
              <h2 className={styles.sectionTitle} style={section.subtitle ? { marginBottom: 0 } : undefined}>{section.title}</h2>
              {section.subtitle && <p className={styles.subtitle}>{section.subtitle}</p>}
              {section.body !== undefined ? (
                section.body && <Column content={section.body} />
              ) : (
                <div className={styles.columns}>
                  <Column content={section.left} />
                  <Column content={section.right} />
                </div>
              )}
              {section.extra}
            </Reveal>
          ))}

          {contact && (
            <Reveal as="section" className={styles.section}>
              <h2 className={styles.sectionTitle}>Contact Us</h2>
              <div className={styles.columns}>
                <Column content={contact.text} />
                <div className={styles.contact}>
                  <span className={styles.contactIcon}><Mail strokeWidth={1.5} aria-hidden="true" /></span>
                  <div className="min-w-0">
                    <a href={`mailto:${contact.email}`} className={styles.contactEmail}>{contact.email}</a>
                    {contact.note && <p className={styles.contactNote}>{contact.note}</p>}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </article>
    </div>
  );
}

// A row of photos with a caption under each, for use as a section's `extra`.
// cards: [{ image, alt, text }]; `note` paragraphs follow the row.
export function ImageCards({ cards, note }) {
  return (
    <>
      <div className={styles.gallery}>
        {cards.map((card) => (
          <figure key={card.text}>
            <img src={card.image} alt={card.alt || ''} className={styles.galleryImage} />
            <figcaption className={styles.galleryText}>{card.text}</figcaption>
          </figure>
        ))}
      </div>
      {note && <div className={styles.after}>{paragraphs(note)}</div>}
    </>
  );
}
