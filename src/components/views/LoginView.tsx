import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, Radio, Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { verifyPasscode, getLockoutRemainingSeconds } from '../../utils/security';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const [currentTime, setCurrentTime] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus passcode input automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Check lockout on mount and tick countdown if active
  useEffect(() => {
    const checkLockout = () => {
      const remaining = getLockoutRemainingSeconds();
      setLockoutSeconds(remaining);
      if (remaining > 0) {
        setErrorMessage(`Security lockout active. Retry in ${remaining}s.`);
      } else if (errorMessage.startsWith('Security lockout')) {
        setErrorMessage('');
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [errorMessage]);

  // Live Cairo operational clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Cairo',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth mouse-tracking parallax for living spatial depth
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  const handleAuthenticate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isVerifying || lockoutSeconds > 0) return;

    if (!passcode.trim()) {
      setErrorMessage('Please enter the sovereign passcode.');
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    try {
      const result = await verifyPasscode(passcode);
      if (result.success) {
        setTimeout(() => {
          onLoginSuccess();
        }, 300);
      } else {
        setErrorMessage(result.error || 'Authentication denied.');
        setIsShake(true);
        setTimeout(() => setIsShake(false), 500);
        setIsVerifying(false);
      }
    } catch {
      setErrorMessage('Verification error. Please retry.');
      setIsVerifying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen bg-[#06050a] text-white overflow-hidden select-none flex flex-col justify-between"
    >
      {/* ========================================================================= */}
      {/* 1. MASTER HERO BACKGROUND — CRYSTAL-CLEAR HIGH-RES WITH LIVING DEPTH       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Layer A: High-Resolution Photographic Asset with Spatial Micro-Parallax */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `scale(1.08) translate3d(${mousePos.x * -0.25}px, ${mousePos.y * -0.25}px, 0)`,
          }}
        >
          <img
            src="/ahmed-hero.png"
            alt="Ahmed — Founder, NYVEQ"
            className="w-full h-full object-cover object-[68%_25%] md:object-[68%_22%] pointer-events-none select-none filter contrast-[1.02] brightness-[1.02]"
          />
        </div>

        {/* Layer B: Ambient Living Studio Aura behind the architectural curve */}
        <div
          className="absolute top-[15%] right-[15%] w-[550px] h-[550px] rounded-full bg-[#7c3aed]/20 animate-portal-bloom pointer-events-none"
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          }}
        />

        {/* Layer C: Subtle Drifting Atmospheric Light Specks */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[25%] right-[30%] w-1.5 h-1.5 rounded-full bg-purple-300/40 blur-[0.5px] animate-float-slow" />
          <div className="absolute top-[50%] right-[20%] w-2 h-2 rounded-full bg-indigo-300/30 blur-[1px] animate-float-delayed" />
          <div className="absolute bottom-[30%] right-[38%] w-1 h-1 rounded-full bg-violet-200/45 blur-[0.5px] animate-float-slow" />
        </div>

        {/* Layer D: Razor-Sharp Left Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06050a] via-[#06050a]/92 via-35% md:via-[#06050a]/80 md:via-45% to-transparent to-70% pointer-events-none" />
        
        {/* Subtle ground vignette */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06050a] to-transparent pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP EXECUTIVE STATUS BAR                                               */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full px-8 md:px-14 pt-8 flex items-center justify-between pointer-events-auto">
        {/* Left: Brand Monogram & Sub-title */}
        <div className="flex items-center gap-3.5">
          <h1 className="text-xl md:text-2xl font-light tracking-[0.38em] text-white drop-shadow-sm font-serif">
            NYVEQ
          </h1>
          <span className="h-3 w-[1px] bg-white/20" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            AGENCY HQ
          </span>
        </div>

        {/* Right: Live Ticking Cairo Beacon */}
        <div className="flex items-center gap-4 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-xs font-mono text-zinc-300 shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400 text-[11px]">CAIRO</span>
            <span className="text-white font-medium">{currentTime || 'LIVE'}</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
            <span className="text-purple-300 font-medium">PROTECTED GATE</span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT & PASSCODE ENFORCEMENT ZONE                              */}
      {/* ========================================================================= */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-8 md:px-14 py-8 flex-1 flex flex-col justify-center">
        <div className="max-w-xl space-y-6">
          
          {/* Sovereign Security Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/50 border border-purple-500/40 text-[10px] font-mono text-purple-300 uppercase tracking-widest backdrop-blur-md">
            <Lock className="w-3 h-3 text-purple-400" />
            <span>FOUNDER ACCESS // SOVEREIGN SECURITY</span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Welcome back,
              <span className="block font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-[#c084fc] to-[#a855f7] drop-shadow-[0_0_35px_rgba(168,85,247,0.55)]">
                Ahmed.
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-zinc-300 font-light tracking-wide pt-1">
              “Build. Operate. Improve.”
            </p>
          </div>

          {/* PASSCODE AUTHENTICATION CARD */}
          <form
            onSubmit={handleAuthenticate}
            className={`pt-2 space-y-3.5 transition-transform duration-200 ${isShake ? 'animate-bounce' : ''}`}
          >
            {/* Input Wrapper */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-4 h-4 text-purple-400" />
              </div>

              <input
                ref={inputRef}
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                disabled={isVerifying || lockoutSeconds > 0}
                placeholder="Enter Sovereign Passcode..."
                autoComplete="current-password"
                className="w-full bg-[#110f1e]/90 backdrop-blur-xl border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 rounded-2xl py-3.5 pl-11 pr-24 text-white placeholder:text-zinc-500 text-sm font-mono tracking-wider transition-all outline-none shadow-2xl disabled:opacity-50"
              />

              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title={showPasscode ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 bg-rose-950/40 border border-rose-500/30 px-3 py-2 rounded-xl max-w-md animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="flex items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={isVerifying || lockoutSeconds > 0}
                className={`group relative px-9 py-4 rounded-2xl text-white font-medium text-base flex items-center justify-center gap-3.5 transition-all duration-300 transform cursor-pointer overflow-hidden border border-purple-400/50 bg-gradient-to-r from-[#7c3aed] via-[#6d28d9] to-[#4f46e5] hover:from-[#8b5cf6] hover:to-[#7c3aed] shadow-2xl ${
                  isVerifying || lockoutSeconds > 0
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:scale-[1.03] active:scale-[0.98]'
                }`}
              >
                {/* Continuous Shimmer Beam */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer pointer-events-none" />

                {/* Tactile Icon */}
                <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-all shadow-inner">
                  {isVerifying ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-300 animate-spin" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </div>

                {/* Button Typography */}
                <span className="font-semibold tracking-wide text-white drop-shadow-sm text-base">
                  {isVerifying ? 'Verifying Key...' : lockoutSeconds > 0 ? `Locked (${lockoutSeconds}s)` : 'Unlock Sovereign HQ'}
                </span>
              </button>
            </div>

            {/* Security Indicator */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 tracking-wider pt-1">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>SHA-256 Cryptographic Hash Gate</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span>Press</span>
                <kbd className="px-2 py-0.5 rounded bg-black/60 border border-white/15 text-purple-300 text-[10px] font-bold shadow-sm">
                  Enter ↵
                </kbd>
              </span>
            </div>
          </form>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. BOTTOM LIVING METADATA BAR                                             */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full px-8 md:px-14 py-6 border-t border-white/10 bg-black/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 tracking-wider pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <span className="text-zinc-300 font-medium">NYVEQ AGENCY HQ</span>
          <span>—</span>
          <span>INTERNAL EXECUTIVE OPERATING SYSTEM</span>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0 text-zinc-400">
          <span>PEOPLE</span>
          <span>×</span>
          <span>SYSTEMS</span>
          <span>×</span>
          <span className="text-purple-300 font-semibold">FREEDOM</span>
        </div>
      </footer>
    </div>
  );
};
