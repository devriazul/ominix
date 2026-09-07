"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "zoom-in";
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.12,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If browser does not support IntersectionObserver, reveal immediately
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;

    if (isVisible) {
      return {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
        transition: baseTransition,
        transitionDelay: `${delay}ms`,
      };
    }

    switch (animation) {
      case "fade-up":
        return {
          opacity: 0,
          transform: "translate3d(0, 36px, 0)",
          transition: baseTransition,
          transitionDelay: `${delay}ms`,
        };
      case "fade-left":
        return {
          opacity: 0,
          transform: "translate3d(-36px, 0, 0)",
          transition: baseTransition,
          transitionDelay: `${delay}ms`,
        };
      case "fade-right":
        return {
          opacity: 0,
          transform: "translate3d(36px, 0, 0)",
          transition: baseTransition,
          transitionDelay: `${delay}ms`,
        };
      case "zoom-in":
        return {
          opacity: 0,
          transform: "translate3d(0, 20px, 0) scale(0.95)",
          transition: baseTransition,
          transitionDelay: `${delay}ms`,
        };
      case "fade-in":
      default:
        return {
          opacity: 0,
          transform: "translate3d(0, 0, 0)",
          transition: baseTransition,
          transitionDelay: `${delay}ms`,
        };
    }
  };

  return (
    <div
      ref={ref}
      style={getAnimationStyles()}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
