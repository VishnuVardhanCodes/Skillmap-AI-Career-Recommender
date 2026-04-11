import React, { useState } from 'react';
import GlassCard from './GlassCard';
import ProgressBar from './ProgressBar';
import { getTechIcon } from '../lib/techIcons';
import { 
  Briefcase, 
  Map, 
  Layers, 
  Layout, 
  Trophy, 
  Clock, 
  ArrowUpRight, 
  ExternalLink,
  ChevronDown,
  Target,
  Wrench,
  TrendingUp,
  Download,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TimelineItem = ({ step, index, isOpen, onToggle }) => {
  return (
    <div className="relative">
      {/* Animated Connector */}
      <div className={`absolute -left-[41px] top-0 w-[2px] h-full bg-gradient-to-b from-indigo-500 to-transparent transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-20'}`} />
      
      <div className={`absolute -left-[45px] top-0 w-6 h-6 rounded-full border border-white/10 z-10 transition-all duration-700 flex items-center justify-center ${isOpen ? 'bg-indigo-600 scale-110 shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-[#030303]'}`}>
         <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-white' : 'bg-white/20'}`} />
      </div>
      
      <div 
        onClick={onToggle}
        className={`group pro-card p-8 cursor-pointer overflow-hidden ${isOpen ? 'border-indigo-500/40 bg-white/[0.04]' : ''}`}
      >
        <div className="flex justify-between items-center gap-6">
          <div className="flex-1">
            <span className="status-badge bg-indigo-500/10 border-indigo-500/20 text-indigo-400 mb-3 inline-block">
              {step.period}
            </span>
            <h3 className="text-2xl font-black mt-1 group-hover:text-premium transition-all">{step.title}</h3>
            <p className="text-white/40 text-base mt-3 leading-relaxed font-medium">{step.description}</p>
          </div>
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isOpen ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' : 'bg-white/5 text-white/20 border border-white/5'}`}
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && step.sub_tasks && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mt-10 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
                {step.sub_tasks.map((task, idx) => (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="flex items-start gap-4 p-5 bg-white/[0.02] rounded-[1.5rem] border border-white/5 group/task hover:bg-white/[0.05] transition-all"
                  >
                    <div className="mt-1">
                      <CheckCircle2 size={18} className="text-indigo-400 opacity-30 group-hover/task:opacity-100 transition-all" />
                    </div>
                    <span className="text-base text-white/60 font-medium group-hover/task:text-white transition-colors">{task}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Dashboard = ({ data, onSave, onExport }) => {
  const [openStep, setOpenStep] = useState(0);

  if (!data) return null;

  const {
    title,
    description,
    skills,
    timeline,
    projects,
    tools,
    difficulty,
    duration,
    salary,
    resources
  } = data;

  const displayResources = resources?.slice(0, 3) || [];

  return (
    <div className="min-h-screen pt-32 pb-32 px-4 md:px-8 max-w-7xl mx-auto space-y-20 relative">
      
      {/* Mesh Background Orbs */}
      <div className="mesh-container">
        <div className="mesh-orb w-[600px] h-[600px] bg-indigo-600 top-[-20%] left-[-10%]" />
        <div className="mesh-orb w-[500px] h-[500px] bg-purple-600 bottom-[-10%] right-[-10%] animation-delay-2000" />
      </div>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="pro-card p-12 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 relative z-20">
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-inner">
                <Command className="text-indigo-400" size={32} />
              </div>
              <h1 className="text-6xl font-black tracking-tight text-premium">{title}</h1>
            </div>
            <p className="text-white/40 text-xl max-w-4xl leading-relaxed font-medium">{description}</p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <span className={`status-badge ${
                difficulty === 'Beginner' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]' :
                difficulty === 'Intermediate' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]' :
                'bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.1)]'
              }`}>
                {difficulty} Specialization
              </span>
              <span className="status-badge bg-white/5 border-white/10 text-white/40">
                {duration} Immersion
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button onClick={onSave} className="pro-button p-5 text-white/30 hover:text-white">
              <Bookmark size={28} />
            </button>
            <button onClick={onExport} className="pro-button bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 border-indigo-400/20 text-xl px-10">
              <Download size={24} />
              Export Dossier
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column (Skills) */}
        <div className="lg:col-span-4 space-y-12">
          <section className="pro-card p-10">
            <div className="flex items-center justify-between mb-10">
               <div className="subheading">Technical Skills Matrix</div>
               <Sparkles className="text-indigo-400/30" size={20} />
            </div>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <ProgressBar 
                  key={index} 
                  label={skill.name} 
                  value={skill.level} 
                  color={index % 2 === 0 ? "bg-indigo-500" : "bg-purple-600"}
                />
              ))}
            </div>
          </section>

          <section className="pro-card p-10">
            <div className="subheading mb-8">Compensation Insight</div>
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] text-center">
                <TrendingUp className="text-emerald-400 mb-4 mx-auto" size={32} />
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Projected Annual Yield</p>
                <p className="text-4xl font-black text-premium">{salary.range}</p>
            </div>
          </section>
        </div>

        {/* Right Column (Timeline & Content) */}
        <div className="lg:col-span-8 space-y-20">
          
          <section>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Map className="text-indigo-400" size={24} />
              </div>
              <h2 className="text-4xl font-black tracking-tight">Structured Path</h2>
            </div>
            
            <div className="relative ml-6 pl-12 border-l border-white/10 space-y-8">
              {timeline.map((step, index) => (
                <TimelineItem 
                  key={index} 
                  step={step} 
                  index={index} 
                  isOpen={openStep === index}
                  onToggle={() => setOpenStep(openStep === index ? -1 : index)}
                />
              ))}
            </div>
          </section>

          <section className="pro-card p-12 bg-indigo-600/[0.01]">
            <div className="subheading mb-10">Technology Stack & Ecosystem</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => {
                const icon = getTechIcon(tool.name);
                return (
                  <div key={index} className="flex flex-col items-center gap-4 p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] hover:border-indigo-500/20 hover:translate-y-[-5px] transition-all group">
                    <div className="w-16 h-16 p-3 bg-white/5 rounded-[1.25rem] border border-white/10 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all flex items-center justify-center">
                       {icon ? (
                         <img src={icon} alt={tool.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 contrast-[110%] transition-all" />
                       ) : (
                         <Wrench className="text-white/20" size={24} />
                       )}
                    </div>
                    <div className="text-center">
                       <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-1">{tool.category}</p>
                       <p className="text-base font-bold text-white/80 group-hover:text-white transition-colors">{tool.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="lg:col-span-2 flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                  <Target className="text-pink-400" size={24} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Practical Mastery</h2>
             </div>
             {projects.map((project, index) => (
                <GlassCard 
                  key={index} 
                  className="pro-card group p-10 hover:border-indigo-500/30"
                  delay={index * 0.1}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                      <Layout className="text-white/10 group-hover:text-indigo-400 transition-colors" size={28} />
                    </div>
                    <span className="status-badge bg-white/5 border-white/10 text-white/30 truncate max-w-[120px]">
                      {project.difficulty}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 group-hover:text-premium transition-all leading-tight">{project.name}</h3>
                  <p className="text-white/40 text-lg leading-relaxed font-medium mb-8">{project.description}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                    <Clock size={16} /> {project.time} BUILD CYCLES
                  </div>
                </GlassCard>
              ))}
          </section>
          <section>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <ExternalLink className="text-sky-400" size={24} />
              </div>
              <h2 className="text-4xl font-black tracking-tight">Curated Learning</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayResources.map((res, index) => (
                <a 
                  key={index} 
                  href={res.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pro-card p-8 flex flex-col hover:border-sky-500/30 group/res"
                >
                  <div className="flex justify-between items-center mb-6">
                     <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] font-black text-sky-400 uppercase tracking-widest">{res.type}</span>
                     <ArrowUpRight size={20} className="text-white/10 group-hover/res:text-white transition-all transform group-hover/res:translate-x-1 group-hover/res:-translate-y-1" />
                  </div>
                  <h4 className="font-bold text-xl mb-2 group-hover/res:text-premium transition-all">{res.name}</h4>
                  <p className="text-xs text-white/20 truncate font-medium">{res.link.replace('https://', '')}</p>
                </a>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
