'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import EventsHeroBanner from '@/components/events/EventsHeroBanner';
import UpcomingEventsList from '@/components/events/UpcomingEventsList';
import EventDetail from '@/components/events/EventDetail';
import CommunityBanner from '@/components/events/CommunityBanner';

const eventsData = [
  {
    id: 1,
    title: 'Navigating market volatility: Strategies for family portfolios',
    month: 'June',
    day: '12',
    weekday: 'WED',
    time: '4:00 PM - 5:30 PM IST',
    joining: 245,
    category: 'Webinar',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    fullDate: 'Wednesday, 12 June 2024',
    speaker: 'Rohit Mehra',
    speakerRole: 'Chief Investment Officer, Veritas Capital',
    speakerAvatar: 'https://i.pravatar.cc/100?img=11',
    agenda: 'Market outlook and key themes\nPortfolios positioning strategies\nQ&A with the speaker',
    registration: 'Open until 12 June, 12:00 PM IST',
    description: 'Join industry experts as they discuss practical approaches to manage uncertainty and build resilient portfolios.'
  },
  {
    id: 2,
    title: 'Global Outlook 2024: Private Markets and alternatives',
    month: 'June',
    day: '18',
    weekday: 'WED',
    time: '11:00 AM - 12:30 PM IST',
    joining: 180,
    category: 'Community Sessions',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop',
    fullDate: 'Wednesday, 18 June 2024',
    speaker: 'Anita Verma',
    speakerRole: 'Managing Director, Atlas Partners',
    speakerAvatar: 'https://i.pravatar.cc/100?img=5',
    agenda: 'Private markets overview\nAlternative investment strategies\nPanel discussion',
    registration: 'Open until 18 June, 10:00 AM IST',
    description: 'Explore the global landscape for private markets and alternative investments with leading practitioners.'
  },
  {
    id: 3,
    title: 'AI in family offices: Opportunities and risks',
    month: 'June',
    day: '21',
    weekday: 'WED',
    time: '4:00 PM - 5:30 PM IST',
    joining: 310,
    category: 'Webinar',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop',
    fullDate: 'Wednesday, 21 June 2024',
    speaker: 'Vikram Rao',
    speakerRole: 'CTO, Meridian Family Office',
    speakerAvatar: 'https://i.pravatar.cc/100?img=13',
    agenda: 'AI adoption in family offices\nRisk management frameworks\nLive demo and Q&A',
    registration: 'Open until 21 June, 12:00 PM IST',
    description: 'Understand how artificial intelligence is transforming family office operations and investment decisions.'
  },
  {
    id: 4,
    title: 'Next-gen leadership in family enterprises',
    month: 'June',
    day: '30',
    weekday: 'WED',
    time: '11:00 AM - 12:00 PM IST',
    joining: 120,
    category: 'Round table Discussion',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop',
    detailImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop',
    fullDate: 'Wednesday, 30 June 2024',
    speaker: 'Meera Iyer',
    speakerRole: 'Family Business Advisor, Legacy Corp',
    speakerAvatar: 'https://i.pravatar.cc/100?img=9',
    agenda: 'Leadership transition planning\nGovernance best practices\nOpen roundtable discussion',
    registration: 'Open until 30 June, 10:00 AM IST',
    description: 'An intimate roundtable discussion on preparing the next generation for leadership roles in family enterprises.'
  }
];

export default function EventsPage() {
  const [activeEvent, setActiveEvent] = useState(eventsData[0]);

  return (
    <div className="container min-h-screen" style={{ paddingBottom: '4vw' }}>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Events' }]} />

      <EventsHeroBanner />

      {/* Upcoming Events + Event Detail side-by-side */}
      <div className="flex" style={{ gap: '1.5vw', marginBottom: '2vw' }}>
        <div className="flex-[1_1_50%]" style={{ minWidth: '35vw' }}>
          <UpcomingEventsList
            events={eventsData}
            activeEventId={activeEvent.id}
            onEventSelect={setActiveEvent}
          />
        </div>
        <div className="flex-[1_1_50%]" style={{ minWidth: '35vw' }}>
          <EventDetail event={activeEvent} />
        </div>
      </div>

      <CommunityBanner />
    </div>
  );
}
