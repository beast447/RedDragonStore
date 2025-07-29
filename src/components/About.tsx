import React from 'react';
import useInView from '../hooks/useInView';
import type { TimelineEvent } from './TimelineItem';
// Import timeline background images
import formationImg from '../assets/formation.jpg';
import revolutionImg from '../assets/revolution.jpg';
import civilImg from '../assets/civil.jpg';
import wwiImg from '../assets/wwi.jpg';
import ddayImg from '../assets/dday.jpg';
import gwotImg from '../assets/gwot.jpg';

function About(): React.ReactElement {
  const { ref, isIntersecting } = useInView({ threshold: 0.2 });

  const events: TimelineEvent[] = [
    {
      id: '1741',
      year: '1741',
      title: 'Formation of the Regiment',
      description:
        'The 1st Battalion of the 116th Infantry Regiment traces its lineage back to 1741, making it one of the oldest units in the United States Army.',
      bgClass: 'bg-black',
      bgImage: formationImg,
    },
    {
      id: '1776',
      year: '1776-1781',
      title: 'Revolutionary War Service',
      description:
        'Elements of the regiment fought at Cowpens, Guilford Court House, and Yorktown, earning an early reputation for bravery and discipline.',
      bgClass: 'bg-indigo-50',
      bgImage: revolutionImg,
    },
    {
      id: '1861',
      year: '1861-1865',
      title: 'Civil War & Stonewall Brigade',
      description:
        'The unit served in nearly every major engagement of the Army of Northern Virginia as part of the storied Stonewall Brigade.',
      bgClass: 'bg-gray-100',
      bgImage: civilImg,
    },
    {
      id: '1917',
      year: '1917-1918',
      title: 'World War I',
      description:
        'Awarded the French Croix de Guerre and home to Medal of Honor recipient Sgt. Earle Gregory for heroism on the Western Front.',
      bgClass: 'bg-yellow-50',
      bgImage: wwiImg,
    },
    {
      id: '1944',
      year: '1944',
      title: 'D-Day Landing',
      description:
        'On June 6, 1944, soldiers of the 116th stormed Omaha Beach, sustaining heavy losses but securing a crucial foothold in Normandy.',
      bgClass: 'bg-red-50',
      bgImage: ddayImg,
    },
    {
      id: '2001',
      year: '2001-Present',
      title: 'Global War on Terror',
      description:
        'The regiment has deployed multiple times to Iraq and Afghanistan, honoring the sacrifice of ten Red Dragons lost in action.',
      bgClass: 'bg-green-50',
      bgImage: gwotImg,
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const activeEvent = events[currentIndex];

  const sectionBgStyle: React.CSSProperties | undefined = activeEvent?.bgImage
    ? {
        backgroundImage: `url(${activeEvent.bgImage})`,
      }
    : undefined;

  return (
    <section
      id="about"
      ref={ref}
      className={`relative py-20 bg-cover bg-center text-gray-200 overflow-hidden transition-colors duration-500`}
      style={sectionBgStyle}
    >
      {/* Dark overlay improves text readability when background image present */}
      {activeEvent?.bgImage && (
        <div
          className="absolute inset-0 bg-black/60 mix-blend-multiply"
          aria-hidden="true"
        />
      )}

      <div
        className={`relative z-10 max-w-4xl mx-auto px-6 transform transition duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className="text-3xl md:text-4xl text-red-600 font-extrabold text-center mb-8 uppercase tracking-wider text-shadow-lg">
          Red Dragons Timeline
        </h2>
        <img src="/src/assets/116th-logo.png" alt="116th Infantry Regiment Logo" className="w-1/3 md:w-1/4 mx-auto mb-12" />

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 transform -translate-y-1/2" />

          {/* Timeline points */}
          <div
            className="flex items-center relative overflow-x-auto space-x-6 md:space-x-12 lg:space-x-24 px-4 md:px-0 scroll-smooth snap-x snap-mandatory"
          >
            {events.map((ev, idx) => (
              <div
                key={ev.id}
                className="flex flex-col items-center gap-2 snap-start flex-shrink-0 min-w-[72px] md:min-w-0"
              >
                {/* Dot with animated pulse when active */}
                <span className="relative flex items-center justify-center">
                  {/* Pulse ring */}
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full transition-opacity duration-500 ${
                      currentIndex === idx ? 'animate-ping bg-red-500/70' : 'opacity-0'
                    }`}
                  />
                  {/* Core dot */}
                  <span
                    className={`relative inline-flex rounded-full border-2 border-white transition-colors duration-300 transform hover:scale-110 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                      currentIndex === idx ? 'bg-red-600' : 'bg-gray-400'
                    }`}
                  />
                </span>
                <span
                  className={`whitespace-nowrap text-xs sm:text-sm font-medium ${
                    currentIndex === idx ? 'text-red-500' : 'text-gray-300'
                  }`}
                >
                  {ev.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active event content with navigation arrows */}
        {activeEvent && (
          <div className="mt-12 max-w-3xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
            {/* Prev arrow */}
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? events.length - 1 : prev - 1,
                )
              }
              aria-label="Previous event"
              className="p-3 rounded-full bg-white/40 hover:bg-white/60 transition-colors backdrop-blur focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div
              key={activeEvent.id}
              className="flex-1 bg-white/80 backdrop-blur-lg shadow-lg rounded-lg p-6 md:p-8 animate-fade"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 text-center">
                {activeEvent.title}
              </h3>
              <p className="text-gray-800 leading-relaxed text-center">
                {activeEvent.description}
              </p>
            </div>

            {/* Next arrow */}
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === events.length - 1 ? 0 : prev + 1,
                )
              }
              aria-label="Next event"
              className="p-3 rounded-full bg-white/40 hover:bg-white/60 transition-colors backdrop-blur focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default About; 