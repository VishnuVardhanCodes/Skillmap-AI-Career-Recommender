import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, TrendingUp, Code, Database, Cloud, Clock, ChevronDown } from 'lucide-react';

const LandingHero = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [duration, setDuration] = useState(12);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    "AI Engineer", "ML Engineer", "Data Scientist", 
    "Frontend Developer", "Backend Developer", "Cloud Engineer"
  ];

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, duration);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-xl">
          <Sparkles size={16} className="text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Advanced Career Recommender</span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
          SkillMap <span className="text-gradient">AI</span>
        </h1>
        
        <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed font-medium">
          Architect your future with data-driven career roadmaps.<br/>
          From confusion to clarity in <span className="text-white">seconds</span>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full max-w-3xl space-y-6"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
          
          <div className="relative flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder='I want to become a...'
                className="w-full h-20 pl-16 pr-8 bg-[#0c0a09]/80 border border-white/10 rounded-2xl md:rounded-l-3xl md:rounded-r-none focus:outline-none text-xl backdrop-blur-3xl transition-all"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors" size={24} />
            </div>

            <div className="w-full md:w-48 relative h-20 bg-[#0c0a09]/80 border border-white/10 border-t-0 md:border-t-1 md:border-l-0 rounded-2xl md:rounded-r-3xl md:rounded-l-none px-6 flex flex-col justify-center backdrop-blur-3xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Duration</span>
                <span className="text-xs font-bold text-indigo-400">{duration} Weeks</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="24" 
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          <div className="relative group/btn mt-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 group-hover/btn:opacity-100 transition duration-1000 group-hover/btn:duration-200 animate-pulse"></div>
            <button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="relative w-full h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="tracking-tight italic">Crafting Your Future...</span>
                </>
              ) : (
                <>
                  <Sparkles size={24} className="animate-pulse" />
                  <span className="uppercase tracking-widest">Generate Smart Roadmap</span>
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSuggestions && !query && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-6 bg-[#0c0a09]/90 border border-white/10 rounded-[2rem] backdrop-blur-3xl z-50 shadow-2xl"
            >
              <div className="subheading px-2">Popular Career Paths</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                        setQuery(s);
                        onSearch(s, duration);
                        setShowSuggestions(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/5 text-sm text-white/60 hover:bg-white/10 hover:text-white hover:border-indigo-500/50 rounded-2xl transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                      <TrendingUp size={14} className="text-indigo-400" />
                    </div>
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trust Badges */}
      <div className="mt-24 flex flex-wrap justify-center gap-12 text-white/20">
        {[
          { icon: Code, label: "Tech Stacks" },
          { icon: Database, label: "Salary Data" },
          { icon: Cloud, label: "Cloud Paths" },
          { icon: Clock, label: "Custom Plans" }
        ].map(({ icon: Icon, label }, i) => (
          <div key={i} className="flex items-center gap-3 hover:text-white/40 transition-colors cursor-default">
            <Icon size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingHero;
