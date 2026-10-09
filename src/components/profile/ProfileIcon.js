import {
  BookOpen, CalendarCheck, CircleUserRound, Clock, Eye, FileText, Gem, Glasses, Heart,
  Lightbulb, MessageSquareMore, Pencil, Star, Trophy, UserRound, Users,
} from 'lucide-react';
import styles from './Profile.module.css';

const ICONS = {
  eye: Eye,
  clock: Clock,
  chat: MessageSquareMore,
  heart: Heart,
  users: Users,
  people: Users,
  pencil: Pencil,
  star: Star,
  bulb: Lightbulb,
  user: UserRound,
  calendar: CalendarCheck,
  mentor: CircleUserRound,
  book: BookOpen,
  glasses: Glasses,
  gem: Gem,
  trophy: Trophy,
  file: FileText,
};

// A named line icon in a blue circle (stats, badges).
export function ProfileIcon({ name, className = '' }) {
  const Icon = ICONS[name] || Star;
  return (
    <span className={`${styles.iconCircle} ${className}`} aria-hidden="true">
      <Icon strokeWidth={1.6} />
    </span>
  );
}
