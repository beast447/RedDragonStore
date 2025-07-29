import React from 'react';
import useInView from '../hooks/useInView';

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  bgClass?: string; // optional fallback background tailwind class
  bgImage?: string; // background image URL applied when active
}

interface TimelineItemProps {
  event: TimelineEvent;
  isActive: boolean;
  onToggle: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, isActive, onToggle }) => {
  const { ref, isIntersecting } = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`relative pl-8 md:pl-12 my-6 transition-transform duration-700 ease-out transform ${isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
    >
      {/* Vertical line */}
      <span className="absolute left-0 top-0 h-full w-1 bg-gray-300" aria-hidden="true" />

      {/* Bullet */}
      <span className="absolute -left-1.5 md:-left-2.5 top-2 w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded-full border-2 border-white" />

      {/* Header */}
      <div
        role="button"
        onClick={onToggle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
        tabIndex={0}
        className="cursor-pointer flex items-center gap-4"
      >
        <h3 className="text-lg md:text-xl font-semibold">
          {event.year} — {event.title}
        </h3>
      </div>

      {/* Details */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out pl-6 md:pl-8 ${
          isActive ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="mt-2 leading-relaxed text-gray-700">{event.description}</p>
      </div>
    </div>
  );
};

export default TimelineItem; 