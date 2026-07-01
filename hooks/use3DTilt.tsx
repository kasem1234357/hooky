"use client"
import { useCallback, useEffect, useState } from "react";

function use3DTilt(ref:any, options = { max: 15, perspective: 1000, scale: 1.05 }) {
  const [style, setStyle] = useState({});

  const onMouseMove = useCallback((e:any) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const rotateX = (options.max / 2 - y * options.max).toFixed(2);
    const rotateY = (x * options.max - options.max / 2).toFixed(2);

    setStyle({
      transform: `perspective(${options.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${options.scale}, ${options.scale}, ${options.scale})`,
      transition: 'transform 0.1s ease-out'
    });
  }, [ref, options]);

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${options.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  }, [options]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseleave', onMouseLeave);
      return () => {
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [ref, onMouseMove, onMouseLeave]);

  return style;
}
export default use3DTilt;