import EventsPageView from '@/components/events/EventsPageView';
import { loadEvents } from '@/lib/discourse/lists';

export const metadata = { title: 'Events | AV Community' };

// Forum events (Discourse Calendar and Event plugin), upcoming first; the
// sample events when the forum has none.
export default async function EventsPage() {
  const live = await loadEvents();
  if (!live) return <EventsPageView />;
  const heroSlides = live.slice(0, 3).map((e) => ({
    label: e.upcoming ? 'UPCOMING EVENT' : 'PAST EVENT',
    title: e.title,
    date: e.fullDate,
    time: e.time,
    location: e.location,
    image: e.image,
  }));
  return <EventsPageView events={live} heroSlides={heroSlides} />;
}
