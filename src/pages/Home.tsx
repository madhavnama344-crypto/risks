
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Fish, Users, Dna, Bot, ArrowDown, Globe, BarChart2 } from 'lucide-react';

// Custom Hook to detect when an element is visible on screen
const useIntersectionObserver = (options) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);