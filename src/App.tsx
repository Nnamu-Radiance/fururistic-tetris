/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Github, Twitter, ExternalLink } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[150px] rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-12 flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <h1 className="text-sm font-bold tracking-[0.4em] uppercase text-cyan-400 neon-text-cyan">
            Rhythm & Retro
          </h1>
          <div className="w-10 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        </div>
        <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Digital Playground v1.0</p>
      </motion.header>

      {/* Main Content Grid */}
      <main className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Info/Stats (Hidden on small screens or moved) */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex lg:col-span-3 flex-col gap-8"
        >
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Controls</h4>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex justify-between"><span>Move</span> <span className="text-cyan-400">Arrows</span></li>
              <li className="flex justify-between"><span>Pause</span> <span className="text-cyan-400">P</span></li>
              <li className="flex justify-between"><span>Reset</span> <span className="text-cyan-400">R</span></li>
            </ul>
          </div>
          
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">System Status</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </motion.div>

        {/* Center: Snake Game */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex flex-col items-center"
        >
          <SnakeGame />
        </motion.div>

        {/* Right Side: Music Player */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 flex flex-col items-center"
        >
          <MusicPlayer />
          
          <div className="mt-8 flex gap-4">
            <button className="p-2 rounded-full bg-zinc-900 border border-white/5 text-zinc-500 hover:text-cyan-400 transition-colors">
              <Github className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-zinc-900 border border-white/5 text-zinc-500 hover:text-cyan-400 transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-zinc-900 border border-white/5 text-zinc-500 hover:text-cyan-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 text-[10px] uppercase tracking-[0.3em] text-zinc-600 flex flex-col items-center gap-2">
        <span>Designed for the Future</span>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </footer>
    </div>
  );
}
