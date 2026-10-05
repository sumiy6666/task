import { Reveal } from '@/components/ui/Reveal';
import Link from 'next/link';
import styles from './Events.module.css';

export default function CommunityBanner() {
  return (
    <Reveal stagger={150} className={`flex items-center justify-between ${styles.banner}`}>
      <div>
        <h3 className={`text-white font-semibold uppercase ${styles.bannerTitle}`}>
          STAY ENGAGED WITH THE COMMUNITY
        </h3>
        <p className={`text-white/80 ${styles.bannerText}`}>
          Navigating market volatility: Strategies for family portfolios
        </p>
      </div>
      <Link
        href="/discussions"
        className={`inline-flex items-center text-[#00A4E4] bg-white hover:bg-gray-50 transition-colors font-medium ${styles.bannerLink}`}
      >
        Explore Discussions
      </Link>
    </Reveal>
  );
}
