"use client";
import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import styles from "./nav.module.scss";
import Curve from "./Curve";

export const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: {
    x: "0",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

export const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};

interface NavItem {
  title: string;
  onClick: () => void;
}

interface NavProps {
  items: NavItem[];
  onClose: () => void;
}

const Nav = forwardRef<HTMLDivElement, NavProps>(({ items, onClose }, ref) => {
  const [selectedIndicator, setSelectedIndicator] = useState("");

  return (
    <motion.div
      ref={ref}
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator("");
          }}
          className={styles.nav}
        >
          <div className={styles.navHeader}>Navigation</div>
          {items.map((item, index) => {
            const isActive = selectedIndicator === item.title;

            return (
              <motion.div
                key={item.title}
                className={styles.navLink}
                onMouseEnter={() => setSelectedIndicator(item.title)}
                custom={index}
                variants={slide}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <motion.div
                  variants={scale}
                  animate={isActive ? "open" : "closed"}
                  className={styles.indicator}
                />
                <button onClick={item.onClick} className={styles.linkButton}>
                  {item.title}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <span>KeyGEnCoders</span>
          <span>KGEC</span>
        </div>
      </div>
      <Curve />
    </motion.div>
  );
});

Nav.displayName = "Nav";

export default Nav;
