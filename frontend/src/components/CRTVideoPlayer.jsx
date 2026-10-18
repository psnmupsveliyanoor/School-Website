import React from 'react';
import videoFile from '../assets/drone_shot.mp4'; 

const CRTVideoPlayer = () => {
  return (
    // Added 'max-w-xs sm:max-w-md md:max-w-xl' to handle scaling at different breakpoints
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto mt-8 p-4 bg-[#4a3525] rounded-lg shadow-2xl border-[3px] border-[#302217] flex items-stretch">
      
      {/* Screen Area */}
      <div className="flex-grow p-2 sm:p-4 bg-gray-300 border-r-4 border-[#302217]">
        <div className="relative overflow-hidden rounded-sm bg-black border-2 border-gray-600 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
          <video
            src={videoFile}
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-auto brightness-110 contrast-125"
          />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
        </div>
      </div>

      {/* Control Panel (Hidden or simplified on very small screens) */}
      <div className="w-12 sm:w-24 bg-[#2d1f14] flex flex-col items-center justify-start p-2 gap-2 sm:gap-4">
        {/* Knobs - hidden on tiny screens to save space */}
        <div className="hidden sm:flex w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-400 border-2 border-gray-600 items-center justify-center">
            <div className="w-1 h-6 bg-gray-800 rounded-full"></div>
        </div>
        
        {/* Speaker Grille - responsive sizing */}
        <div className="w-full h-12 sm:h-20 bg-[#1a120b] border border-black rounded-sm mt-auto" 
             style={{ backgroundImage: 'radial-gradient(#4a3525 1px, transparent 1px)', backgroundSize: '4px 4px' }}>
        </div>
      </div>
    </div>
  );
};

export default CRTVideoPlayer;