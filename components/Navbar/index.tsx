"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import styles from "./styles.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../RoundedButton";

interface NavbarProps {
  scrollToAbout: () => void;
  scrollToGallery: () => void;
  scrollToEvents: () => void;
  scrollToBrands: () => void;
  scrollToInfo: () => void;
}

const Navbar = ({
  scrollToAbout,
  scrollToEvents,
  scrollToGallery,
  scrollToBrands,
  scrollToInfo,
}: NavbarProps) => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const header = useRef<HTMLElement>(null);
  const button = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.set(button.current, { scale: 1 });
    
    gsap.to(header.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          header.current?.classList.add(styles.scrolled);
        },
        onEnterBack: () => {
          header.current?.classList.remove(styles.scrolled);
        },
      },
    });
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  const handleNavClick = (scrollFn: () => void) => {
    setIsActive(false);
    if (pathname === "/teams") {
      router.push("/");
      setTimeout(scrollFn, 500);
    } else {
      scrollFn();
    }
  };

  const navItems = [
    { title: "Home", onClick: () => { setIsActive(false); router.push("/"); } },
    { title: "About", onClick: () => handleNavClick(scrollToAbout) },
    { title: "Events", onClick: () => handleNavClick(scrollToEvents) },
    { title: "Gallery", onClick: () => handleNavClick(scrollToGallery) },
    { title: "Teams", onClick: () => { setIsActive(false); router.push("/teams"); } },
    { title: "Sponsors", onClick: () => handleNavClick(scrollToBrands) },
    { title: "FAQs", onClick: () => handleNavClick(scrollToInfo) },
  ];

  return (
    <div className="relative z-50">
      <header ref={header} className={`${styles.header}`}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/logo/logo.png"
            alt="KeyGEnCoders"
            width={50}
            height={50}
            priority
            className={styles.logoImage}
          />
        </Link>
      </header>

      {isActive && (
        <div className={styles.navButton}>
          <Rounded
            onClick={() => setIsActive(!isActive)}
            className={styles.button}
          >
            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
          </Rounded>
        </div>
      )}
      
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => setIsActive(!isActive)}
          className={styles.button}
        >
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
        </Rounded>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <Nav
            key="nav-overlay"
            items={navItems}
            onClose={() => setIsActive(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
