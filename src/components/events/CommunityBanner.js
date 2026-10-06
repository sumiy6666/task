import { Reveal } from '@/components/ui/Reveal';
import Link from 'next/link';
import styles from './Events.module.css';

// Gradient call-to-action bar: a title, optional line of text and a white pill
// link. Defaults are the Events page's; About reuses it with its own copy.
export default function CommunityBanner({
  title = 'STAY ENGAGED WITH THE COMMUNITY',
  text = 'Navigating market volatility: Strategies for family portfolios',
  linkLabel = 'EXPLORE DISCUSSIONS',
  href = '/discussions'
}) {
  return (
    <Reveal stagger={150} className={`flex items-center justify-between ${styles.banner}`}>
      <div>
        <h3 className={`text-white uppercase ${styles.bannerTitle}`} style={text ? undefined : { marginBottom: 0 }}>
          {title}
        </h3>
        {text && <p className={`text-white/90 ${styles.bannerText}`}>{text}</p>}
      </div>
      <Link
        href={href}
        className={`inline-flex items-center text-[#11A0DB] bg-white hover:bg-gray-50 transition-colors ${styles.bannerLink}`}
      >
        {linkLabel}
      </Link>
    </Reveal>
  );
}
