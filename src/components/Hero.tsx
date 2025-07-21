import React from 'react';
import VideoHero from '../assets/VideoHero.mp4';


function Hero(): React.ReactElement {
    return (
        <section
            className="relative flex items-center justify-center h-screen overflow-hidden"
        >
            <video
                src={VideoHero}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl text-shadow-lg md:text-6xl font-extrabold tracking-wider uppercase">
                    Red Dragon Store
                </h1>
                <p className="mt-4 text-lg md:text-2xl text-red-500 font-bold">
                    First To Fight
                </p>
                <a
                    href="#shop"
                    className="mt-8 inline-block bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-3 px-8 rounded-full"
                >
                    Shop Now
                </a>
            </div>
        </section>
    );
}

export default Hero;