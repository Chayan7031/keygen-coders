"use client";

import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SliderOne from "@/components/ui/slider";
import { motion } from "framer-motion";

import WebsiteDesign from "./website-design";
import Brands from "./brands";
import Services from "./services";
import FAQS from "./faq";
import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";

const refs = {
  aboutRef: null as HTMLDivElement | null,
  eventsRef: null as HTMLDivElement | null,
  galleryRef: null as HTMLDivElement | null,
  brandsRef: null as HTMLDivElement | null,
  infoRef: null as HTMLDivElement | null,
};

const scrollToElement = (ref: HTMLDivElement | null) => {
  ref?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

export const about = () => scrollToElement(refs.aboutRef);
export const events = () => scrollToElement(refs.eventsRef);
export const gallery = () => scrollToElement(refs.galleryRef);
export const sponsors = () => scrollToElement(refs.brandsRef);
export const faq = () => scrollToElement(refs.infoRef);

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refs.aboutRef = aboutRef.current;
    refs.eventsRef = eventsRef.current;
    refs.galleryRef = galleryRef.current;
    refs.brandsRef = brandsRef.current;
    refs.infoRef = infoRef.current;
  }, []);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    })();
  }, []);

  return (
    <main className="bg-black antialiased relative overflow-hidden">


      <Navbar
        scrollToAbout={about}
        scrollToEvents={events}
        scrollToGallery={gallery}
        scrollToBrands={sponsors}
        scrollToInfo={faq}
      />

      <Hero />

      <div className="p-4 mx-auto relative z-10 w-full px-2">
        <motion.div ref={aboutRef} initial="hidden" animate="visible" className="w-full pt-20">
          <About />
        </motion.div>

        <motion.div ref={eventsRef} initial="hidden" animate="visible" className="w-full pt-10">
          <SliderOne />
        </motion.div>

        <motion.div ref={galleryRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <WebsiteDesign />
        </motion.div>

        <motion.div ref={brandsRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Brands />
        </motion.div>

        <motion.div id="services" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Services />
        </motion.div>

        <motion.div ref={infoRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <FAQS />
        </motion.div>
      </div>
    </main>
  );
}
