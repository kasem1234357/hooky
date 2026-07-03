
"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 

  Terminal, 
  BookOpen, 
  Cpu, 
  MousePointer2, 
 
  Activity,
  Layers
} from 'lucide-react';
import Link from 'next/link';

// --- THE HOOK WE ARE SHOWCASING --- //
// A real physics-based 3D tilt hook that makes elements react to mouse movement
function use3DTilt(ref: React.RefObject<HTMLElement>, options = { max: 15, perspective: 1000, scale: 1.05 }) {
  const [style, setStyle] = useState({});

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
      // @ts-expect-error: We know this returns null during initial render, but we handle it later.
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseleave', onMouseLeave);
      return () => {
        // @ts-expect-error: We know this returns null during initial render, but we handle it later.
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [ref, onMouseMove, onMouseLeave]);

  return style;
}

// --- MAIN COMPONENT --- //
export default function HomePage() {
  const tiltRef = useRef(null);
  const tiltStyle = use3DTilt(tiltRef);

  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-200 font-sans overflow-x-hidden selection:bg-fuchsia-500/30">
      
      {/* ADVANCED BACKGROUND EFFECTS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        .text-gradient {
          background: linear-gradient(to right, #a855f7, #ec4899, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />

      {/* NOISE OVERLAY FOR TEXTURE */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* ANIMATED GLOWING BLOBS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-fuchsia-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[45rem] h-[45rem] bg-rose-600/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* --- FLOATING PILL NAVBAR --- */}
      {/* <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-6 py-3 flex items-center justify-between w-[90%] max-w-3xl transition-all duration-300 hover:bg-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Package size={16} className="text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">Hooky.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-slate-300 hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">Registry</a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">Showcase</a>
        </div>

        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-all">
          <GithubIcon /> 
          <span className="hidden sm:inline">Star on GitHub</span>
        </button>
      </nav> */}

      {/* --- ASYMMETRIC HERO SECTION --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24 grid lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
        
        {/* Left: Typography & CTA */}
        <div className="flex flex-col items-start text-left">
          
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-white mb-6">
            Hooks that <br />
            <span className="text-gradient">feel magic.</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-md leading-relaxed mb-10">
            A curated registry of copy-and-paste React hooks. Bring complex physics, animations, and state management to your apps in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/docs" className="h-12 px-8 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <BookOpen size={18} /> Browse Hooks
            </Link>
            <div className="h-12 px-6 rounded-xl glass-panel flex items-center justify-between gap-4 w-full sm:w-auto cursor-copy group hover:border-fuchsia-500/50 transition-colors">
              <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
                <Terminal size={14} className="text-fuchsia-400" />
                npm i hooky
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive 3D Showcase */}
        <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center perspective-1000">
          {/* Decorative rings */}
          <div className="absolute w-[120%] h-[120%] border border-white/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"></div>
          <div className="absolute w-[80%] h-[80%] border border-white/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted animate-[spin_60s_linear_infinite]"></div>

          {/* The Tilt Card */}
          <div 
            ref={tiltRef}
            style={tiltStyle}
            className="w-full max-w-md z-10 glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative group cursor-crosshair"
          >
            {/* Card Header */}
            <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-2">
                <MousePointer2 size={14} className="text-fuchsia-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">Hover over me! (use3DTilt.jsx)</span>
              </div>
            </div>

            {/* Card Code Content */}
            <div className="p-6 bg-[#030014]/60 backdrop-blur-xl">
              <pre className="font-mono text-sm leading-loose text-left overflow-hidden">
                <span className="text-fuchsia-400">const</span> tiltRef <span className="text-fuchsia-400">=</span> <span className="text-violet-300">useRef</span>(<span className="text-fuchsia-400">null</span>);
                <br />
                <span className="text-fuchsia-400">const</span> style <span className="text-fuchsia-400">=</span> <span className="text-emerald-300">use3DTilt</span>(tiltRef, {'{'}
                <br />
                {'  '}max: <span className="text-amber-300">15</span>,
                <br />
                {'  '}scale: <span className="text-amber-300">1.05</span>
                <br />
                {'}'});
                <br /><br />
                <span className="text-fuchsia-400">return</span> (
                <br />
                {'  '}<span className="text-slate-400">&lt;</span><span className="text-violet-400">div</span> <span className="text-slate-300">ref=</span><span className="text-emerald-200">{`{tiltRef}`}</span> <span className="text-slate-300">style=</span><span className="text-emerald-200">{`{style}`}</span><span className="text-slate-400">&gt;</span>
                <br />
                {'    '}<span className="text-slate-300">I react to your mouse movements!</span>
                <br />
                {'  '}<span className="text-slate-400">&lt;/</span><span className="text-violet-400">div</span><span className="text-slate-400">&gt;</span>
                <br />
                );
              </pre>
            </div>
            
            {/* Glare effect inside card on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </div>
      </main>

      {/* --- BENTO BOX FEATURES GRID --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Unfair advantages, <br/>built right in.</h2>
          <p className="text-slate-400 text-lg max-w-xl">We handled the edge cases, memory leaks, and performance optimization so you don&apos;t have to.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Bento Item 1: Large Span */}
          <div className="glass-panel rounded-3xl p-8 md:col-span-2 md:row-span-2 relative overflow-hidden group hover:bg-white/[0.05] transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] group-hover:bg-fuchsia-500/20 transition-colors"></div>
            <Layers className="text-fuchsia-400 w-10 h-10 mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Framework Agnostic*</h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Works seamlessly with Next.js App Router, Vite, Create React App, and Remix. Fully SSR compatible with no hydration mismatches out of the box.
            </p>
            {/* Abstract UI graphic */}
            <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 opacity-20 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="80" rx="20" stroke="url(#paint0_linear)" strokeWidth="2"/>
                <circle cx="50" cy="50" r="20" stroke="url(#paint1_linear)" strokeWidth="2"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a855f7" />
                    <stop offset="1" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f0ff" />
                    <stop offset="1" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:bg-white/[0.05] transition-colors flex flex-col justify-between">
            <Activity className="text-violet-400 w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Zero Dependencies</h3>
              <p className="text-slate-400 text-sm">Lightweight footprint. Just copy what you need into your `hooks` folder.</p>
            </div>
          </div>

          {/* Bento Item 3 */}
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:bg-white/[0.05] transition-colors flex flex-col justify-between bg-gradient-to-br from-white/[0.02] to-fuchsia-500/[0.05]">
            <Cpu className="text-rose-400 w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">TypeScript First</h3>
              <p className="text-slate-400 text-sm">Strictly typed for immaculate editor intellisense and error catching.</p>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Hooky UI. Built for developers.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

