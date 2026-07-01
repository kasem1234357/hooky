"use client";
import useScrollParallax from "@/hooks/useScrollParallax";
import { useEffect, useRef, useState } from "react";


    
const GlobalProgressBar = () => {
  const { smoothScrollYProgress } = useScrollParallax({ easingFunctionName: 'linear', smoothness: 0.1, });
  console.log(smoothScrollYProgress);
  
  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
      <div 
        className="h-full bg-blue-600 origin-left"
        style={{ transform: `scaleX(${Math.max(0, -smoothScrollYProgress)})` }}
      />
    </div>
  );
};

// Interactive Demo Container for Vertical Scrolling
const VerticalDemo = ({ title, description, options, visualColor = "bg-blue-500" }: { title: string, description: string, options: any, visualColor?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use state to force re-render once ref is attached, ensuring the hook grabs it
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);

  const { smoothScrollYProgress } = useScrollParallax({
    ...options,
    containerRef: isReady ? containerRef : undefined
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex gap-4 flex-grow">
        {/* Scrollable Track */}
        <div 
          ref={containerRef} 
          className="w-1/2 bg-gray-50 rounded-lg overflow-y-auto border border-gray-200 relative hide-scrollbar shadow-inner"
          style={{ height: '200px' }}
        >
          {/* Content tall enough to allow 100% viewport scroll (200px viewport + 200px extra = 400px total height) */}
          <div className="h-[400px] w-full flex flex-col justify-between p-2">
             <span className="text-xs text-gray-400 font-medium tracking-widest uppercase text-center block mt-2">Scroll Down &darr;</span>
             <span className="text-xs text-gray-400 font-medium tracking-widest uppercase text-center block mb-2">Bottom</span>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="w-1/2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center relative overflow-hidden py-4">
           {/* The moving element */}
           <div 
             className={`w-12 h-12 rounded-lg shadow-md flex items-center justify-center text-white text-xs font-bold ${visualColor}`}
             style={{ 
                transform: `translateY(${smoothScrollYProgress * 60}px)`, 
                willChange: 'transform' 
             }}
           >
             {Math.abs(smoothScrollYProgress).toFixed(2)}
           </div>
        </div>
      </div>
    </div>
  );
};

// Interactive Demo Container for Horizontal Scrolling
const HorizontalDemo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => setIsReady(true), []);
  
    const { smoothScrollXProgress } = useScrollParallax({
      easingFunctionName: 'elastic',
      direction: 'horizontal',
      //@ts-ignore
      containerRef: isReady ? containerRef : undefined
    });
  
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full mt-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">Horizontal Scroll & Elastic Lerp</h3>
          <p className="text-sm text-gray-500">Tracks X-axis scroll inside a container using the elastic easing.</p>
        </div>
  
        <div className="flex flex-col gap-4">
          {/* Scrollable Track */}
          <div 
            ref={containerRef} 
            className="w-full bg-gray-50 rounded-lg overflow-x-auto border border-gray-200 relative hide-scrollbar shadow-inner"
            style={{ height: '80px' }}
          >
            {/* Content wide enough to allow scrolling */}
            <div className="w-[200%] h-full flex justify-between items-center px-4">
               <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Scroll Right &rarr;</span>
               <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">End</span>
            </div>
          </div>
  
          {/* Visualizer Area */}
          <div className="w-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-start relative overflow-hidden px-4 h-24">
             {/* The moving element */}
             <div 
               className="w-12 h-12 rounded-full bg-pink-500 shadow-md flex items-center justify-center text-white text-xs font-bold"
               style={{ 
                  transform: `translateX(${smoothScrollXProgress * 100}px)`, 
                  willChange: 'transform' 
               }}
             >
               {Math.abs(smoothScrollXProgress).toFixed(2)}
             </div>
          </div>
        </div>
      </div>
    );
  };


// Main App Component
export default function ParallaxExample() {
   
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans pb-24" >
      {/* Top Global Scroll Tracker */}
      <GlobalProgressBar  />

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-12 px-6 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            useScrollParallax Documentation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            The ultimate custom hook for highly performant, spring-physics and easing-based scroll animations in React. Scroll down to see it in action, or interact with the playground containers below!
          </p>
         
        </div>
      </div>

      {/* Demos Layout */}
      <div className="max-w-5xl mx-auto px-6 mt-12 space-y-16">
        
        {/* Section: Core Easing Functions */}
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Easing Functions</h2>
                <p className="text-gray-600 mt-1">Scroll inside the gray boxes on the left to see how the block reacts based on the easing configuration.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VerticalDemo 
                    title="Linear" 
                    description="Standard smoothing. Follows the scroll directly with slight delay." 
                    options={{ easingFunctionName: 'linear', smoothness: 0.1 }} 
                    visualColor="bg-slate-700"
                />
                <VerticalDemo 
                    title="Spring" 
                    description="Physics-based spring logic. Notice the natural overshoot and settlement." 
                    options={{ easingFunctionName: 'spring', stiffness: 0.04, damping: 0.05 }} 
                    visualColor="bg-emerald-500"
                />
                <VerticalDemo 
                    title="Bounce" 
                    description="Bounces when settling into the current scroll position." 
                    options={{ easingFunctionName: 'bounce', smoothness: 0.08 }} 
                    visualColor="bg-amber-500"
                />
                <VerticalDemo 
                    title="Elastic" 
                    description="Wobbly and highly elastic tracking for dramatic movement." 
                    options={{ easingFunctionName: 'elastic', smoothness: 0.08 }} 
                    visualColor="bg-fuchsia-500"
                />
                <VerticalDemo 
                    title="Anticipate" 
                    description="Winds up backwards slightly before catching up to the scroll position." 
                    options={{ easingFunctionName: 'anticipate', smoothness: 0.05 }} 
                    visualColor="bg-violet-500"
                />
                <VerticalDemo 
                    title="EaseInOut" 
                    description="Smooth acceleration and deceleration. Excellent for standard parallax." 
                    options={{ easingFunctionName: 'easeInOut', smoothness: 0.05 }} 
                    visualColor="bg-cyan-500"
                />
            </div>
        </section>

        {/* Section: Customization & Directions */}
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Advanced Customizations</h2>
                <p className="text-gray-600 mt-1">Control direction, inject completely custom curves, or track horizontal containers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VerticalDemo 
                    title="Reverse Direction" 
                    description="Inverts the progress value. Block moves UP when you scroll DOWN." 
                    options={{ easingFunctionName: 'spring', stiffness: 0.05, damping: 0.08, reverseDirection: true }} 
                    visualColor="bg-rose-500"
                />
                <VerticalDemo 
                    title="Custom Easing Function" 
                    description="Inject any math! This uses a custom 'Stairs/Stepped' easing." 
                    options={{ 
                        //@ts-ignore
                        customEasingFunction: (t) => Math.round(t * 5) / 5, // 5 chunky steps
                        smoothness: 0.1 
                    }} 
                    visualColor="bg-teal-500"
                />
            </div>

            {/* Horizontal Demo */}
            <HorizontalDemo />
        </section>

      </div>
      
     
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}