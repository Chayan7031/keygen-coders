"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./curve.module.scss";

export default function Curve() {
  const [paths, setPaths] = useState({
    initialPath: "",
    targetPath: "",
  });

  useEffect(() => {
    const height = window.innerHeight;
    setPaths({
      initialPath: `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`,
      targetPath: `M100 0 L100 ${height} Q100 ${height / 2} 100 0`,
    });
  }, []);

  const curve = {
    initial: { d: paths.initialPath },
    enter: {
      d: paths.targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: paths.initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className={styles.svgCurve}>
      {paths.initialPath && (
        <motion.path
          variants={curve}
          initial="initial"
          animate="enter"
          exit="exit"
        />
      )}
    </svg>
  );
}
