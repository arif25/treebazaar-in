'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section className="bg-[#F3FAF4] py-14 sm:py-18 text-[#244C38] relative overflow-hidden border-b border-[#E5EEE5]">
      {/* Botanical ambient rings */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#80C995]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/60 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#278653] uppercase tracking-widest bg-white border border-[#80C995]/40 px-3.5 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4CAF72]" /> TreeBazaar Green Club
            </span>
            <span className="text-[11px] font-extrabold bg-[#FCEEEE] text-[#E85D5D] px-2.5 py-0.5 rounded-full border border-[#E85D5D]/20 uppercase">
              10% Off
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#244C38]">
            Join 50,000+ Plant Lovers & Get Weekly Care Tips
          </h2>

          <p className="text-xs sm:text-base text-[#718078] max-w-xl mx-auto leading-relaxed font-normal">
            Subscribe for seasonal watering schedules, organic potting tips, and member-only flash sale alerts delivered every Sunday morning. No spam, ever.
          </p>

          <form onSubmit={handleSubmit} className="pt-3 max-w-md mx-auto">
            {isSubmitted ? (
              <div className="p-4 rounded-2xl bg-white border border-[#4CAF72] text-[#244C38] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold animate-in fade-in shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#4CAF72]" />
                <span>Welcome to TreeBazaar Green Club! Check your inbox for care guides.</span>
              </div>
            ) : (
              <div className="relative flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-xs sm:text-sm text-[#244C38] placeholder-[#718078] border border-[#E5EEE5] focus:border-[#4CAF72] focus:ring-2 focus:ring-[#4CAF72]/20 focus:outline-hidden shadow-2xs"
                  />
                  <Mail className="w-5 h-5 text-[#4CAF72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#4CAF72] hover:bg-[#278653] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer border border-[#4CAF72]"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>

          <p className="text-[11px] text-[#718078]">
            🔒 We respect your privacy. Unsubscribe anytime with 1-click.
          </p>
        </div>
      </div>
    </section>
  );
}
