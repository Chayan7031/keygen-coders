"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const logos = [
  {
    sponsor: "Coding Ninjas",
    image:
      "https://res.cloudinary.com/db9l85phg/image/upload/v1757922257/images__1_-removebg-preview_gqd1my.png",
  },
  {
    sponsor: "Career Launcher",
    image:
      "https://res.cloudinary.com/db9l85phg/image/upload/v1758211561/4d5bd669826c15d6acfa0c0817511db4_icon-removebg-preview_yry3ps.png",
  },
  {
    sponsor: "HackerRank",
    image:
      "https://res.cloudinary.com/db9l85phg/image/upload/v1758210800/HackerRank_Icon-1000px-removebg-preview_as4cwu.png",
  },
  {
    sponsor: "Unstop",
    image:
      "https://res.cloudinary.com/db9l85phg/image/upload/v1758210905/630248973183b_unstop_logo-removebg-preview_rz7txt.png",
  },
  {
    sponsor: "Tech Partner",
    image:
      "https://res.cloudinary.com/db9l85phg/image/upload/v1758211121/ueScU0LV_400x400-removebg-preview_yyqdce.png",
  },
  {
    sponsor: "Community Partner",
    image:
      "https://res.cloudinary.com/db9l85phg/image/upload/v1758211636/images_imavpp.png",
  },
];

const DUPLICATED_LOGOS = [...logos, ...logos, ...logos];

const Brands = () => {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="sponsors"
      className="relative z-10 py-24 lg:py-36 overflow-hidden transparent"
    >
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-${logos.length} * (240px + 24px)));
          }
        }
        @keyframes scroll-left-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-${logos.length} * (180px + 16px)));
          }
        }
        .carousel-track {
          animation: scroll-left-mobile 25s linear infinite;
          width: max-content;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        @media (min-width: 768px) {
          .carousel-track {
            animation: scroll-left 30s linear infinite;
          }
          .carousel-track:hover {
            animation-play-state: paused;
          }
        }
      `}</style>

      <motion.div
        className="container mx-auto px-6 lg:px-24 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <div className="flex flex-col items-center">
          <motion.p
            className="text-lg md:text-xl text-[#22C55E] tracking-wide mb-3 font-medium uppercase text-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            Our Partners
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl text-[#22C55E] mb-6 leading-[1.1] font-bold text-center flex flex-wrap justify-center overflow-hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.04 },
              },
            }}
          >
            {"Proudly ".split("").map((char, i) => (
              <motion.span
                key={`proudly-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.33, 1, 0.68, 1],
                    },
                  },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <span className="text-[#ffffff] flex">
              {"Supported By".split("").map((char, i) => (
                <motion.span
                  key={`supported-${i}`}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.33, 1, 0.68, 1],
                      },
                    },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </motion.h2>
        </div>
      </motion.div>

      <motion.div
        className="mt-16 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
        />

        <div className="overflow-hidden py-4">
          <div className="carousel-track flex gap-4 md:gap-6">
            {DUPLICATED_LOGOS.map((sponsor, index) => (
              <SponsorCard key={`${sponsor.sponsor}-${index}`} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

function SponsorCard({
  sponsor,
}: {
  sponsor: { sponsor: string; image: string };
}) {
  return (
    <div className="flex-shrink-0 w-[180px] h-[180px] md:w-[240px] md:h-[200px] group/card relative p-6 border border-[#4A3428]/5 rounded-2xl shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-[#B7410E]/20 hover:-translate-y-2 cursor-pointer">
      <div className="w-full h-full flex flex-col justify-between items-center text-center">
        <div className="flex-[3] flex items-center justify-center max-h-[70%] w-full relative">
          <Image
            src={sponsor.image}
            alt={sponsor.sponsor}
            fill
            className="object-contain grayscale opacity-70 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500"
            sizes="240px"
          />
        </div>
        <div className="flex-1 flex items-center justify-center w-full pt-4">
          <p className="text-[15px] font-bold text-white uppercase tracking-wider line-clamp-2 leading-tight transition-all group-hover/card:text-[#22C55E]">
            {sponsor.sponsor}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Brands;
