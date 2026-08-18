"use client";

import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";
import { IconCloudDemo } from "../IconCloud";

export default function About() {
  const content = "KeyGEnCoders is the official coding club of the Kalyani Government Engineering college. It is a group of students who are passionate about coding and programming. The club since its establishment has been working to promote coding culture in the college. The club organizes various events, workshops, and competitions to help students learn and grow in the field of coding.";
  
  return (
    <div className="relative w-full flex flex-col justify-center items-center h-fit py-20 md:py-32 overflow-hidden bg-black" id="about">
      <InteractiveGridPattern
        className="absolute inset-0 z-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
        width={70} 
        height={70}
        squares={[30, 30]}
        squaresClassName="hover:fill-green-500/30"
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center px-6 gap-12 lg:gap-20">
        
        <div className="w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-1">
          <IconCloudDemo />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center text-center order-1 lg:order-2">
          <h2 className="animate-[pulse-glow_3s_infinite] text-4xl md:text-6xl font-black text-green-400 mb-8 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
            About
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-lg">
            {content}
          </p>
        </div>

      </div>
    </div>
  );
}