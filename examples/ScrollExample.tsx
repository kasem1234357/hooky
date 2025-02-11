"use client"
import { useScroll } from '@/hooks/useScroll';
import React from 'react';

function ScrollExample() {
  const { scrollY, isAtBottom, scrollingUp } = useScroll({
    onEndReached: () => console.log('Reached bottom!'),
  });

  return (
    <div>
      <p>Current Scroll Y: {scrollY}</p>
      {isAtBottom && <p>You've reached the bottom!</p>}
      {scrollingUp && <p>Scrolling Up!</p>}
    </div>
  );
}
export default ScrollExample