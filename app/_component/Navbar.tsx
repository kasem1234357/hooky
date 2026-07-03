
import { 
  Package, 
  
} from 'lucide-react';
import Link from 'next/link';

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
      <path d="M12 18h.01"></path>
    </svg>
  );
}
function Navbar() {
    
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-6 py-3 flex items-center justify-between w-[90%] max-w-3xl transition-all duration-300 hover:bg-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Package size={16} className="text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">Hooky.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link   href="/docs" className="text-slate-300 hover:text-white transition-colors">Documentation</Link>
          {/* <a href="#" className="text-slate-300 hover:text-white transition-colors">Registry</a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">Showcase</a> */}
        </div>

        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-all">
          <GithubIcon /> 
          <span className="hidden sm:inline">Star on GitHub</span>
        </button>
      </nav>
  )
}

export default Navbar