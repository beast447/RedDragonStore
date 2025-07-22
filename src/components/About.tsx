import React from 'react';
import useInView from '../hooks/useInView';

function About(): React.ReactElement {
  const { ref, isIntersecting } = useInView({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 bg-white text-gray-800 overflow-hidden">
      <div
        className={`max-w-4xl mx-auto px-6 transform transition duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className="text-3xl md:text-4xl text-red-600 font-extrabold text-center mb-8 uppercase tracking-wider text-shadow-lg">
          About The Red Dragons
        </h2>
        <img src="/src/assets/116th-logo.png" alt="116th Infantry Regiment Logo" className="w-1/2 mx-auto mb-8" />
        <p className="leading-relaxed mb-4 text-justify">
          1st Battalion of the <span className="font-semibold">116th Infantry Regiment</span>, the oldest continuous service regiment in the Virginia National Guard and seventh oldest in the U.S. Army, traces its roots back to 1741. Over nearly three centuries, the regiment has fought in almost every major American conflict from the French and Indian War to today.
        </p>
        <p className="leading-relaxed mb-4 text-justify">
          Its storied lineage includes valorous service in the Revolutionary War at Cowpens, Guilford Court House, and Yorktown. During the Civil War, the unit formed part of the famed <span className="font-semibold">Stonewall Brigade</span>, engaging in nearly every major battle of the Army of Northern Virginia.
        </p>
        <p className="leading-relaxed mb-4 text-justify">
          In World War&nbsp;I, the 116th earned the French <em>Croix de Guerre</em> and produced its first Medal of Honor recipient, Sgt.&nbsp;Earle Gregory. World War&nbsp;II cemented the regiment’s legacy when its soldiers landed on Omaha Beach during D-Day, suffering heavy casualties yet pressing forward to secure the beachhead. Tech.&nbsp;Sgt.&nbsp;Frank Peregory received a posthumous Medal of Honor for his actions, and Maj.&nbsp;Tom Howie became the legendary “Major of St. Lo.”
        </p>
        <p className="leading-relaxed text-justify">
          In the modern era, the 116th has deployed worldwide on peacekeeping and combat missions, including Iraq and Afghanistan. Since 9/11, more than 15,000 Virginia Guard members have served overseas, and the regiment honors the sacrifice of the ten Red Dragons lost in the Global War on Terror.
        </p>
      </div>
    </section>
  );
}

export default About; 