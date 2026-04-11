import React from 'react';
import GlassCard from './GlassCard';
import { GitCompare } from 'lucide-react'; 


const ComparisonView = ({ career1, career2 }) => {
  if (!career1 || !career2) return null;

  const features = [
    { label: "Difficulty", path: "difficulty" },
    { label: "Duration", path: "duration" },
    { label: "Avg Salary", path: "salary.range" },
    { label: "No. of Skills", path: "skills.length" }
  ];

  const getVal = (obj, path) => {
    return path.split('.').reduce((o, i) => o[i], obj);
  };

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Career <span className="text-gradient">Comparison</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-4">
        
        {/* Career 1 */}
        <div className="md:col-span-3">
          <GlassCard className="border-indigo-500/30">
            <h3 className="text-2xl font-bold mb-4 text-center text-indigo-400">{career1.title}</h3>
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className="text-white/40">{f.label}</span>
                  <span className="font-semibold">{getVal(career1, f.path)}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* VS Divider */}
        <div className="md:col-span-1 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black text-xl border border-white/20 text-white/40">
            VS
          </div>
        </div>

        {/* Career 2 */}
        <div className="md:col-span-3">
          <GlassCard className="border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4 text-center text-purple-400">{career2.title}</h3>
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className="text-white/40">{f.label}</span>
                  <span className="font-semibold">{getVal(career2, f.path)}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>

      <div className="mt-12 text-center">
        <p className="text-white/40 text-sm">Both careers offer unique opportunities. Study the skills to see which fits your interest better.</p>
      </div>
    </div>
  );
};

export default ComparisonView;
