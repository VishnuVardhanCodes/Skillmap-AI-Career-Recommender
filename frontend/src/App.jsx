import React, { useState, useEffect } from 'react';
import LandingHero from './components/LandingHero';
import Dashboard from './components/Dashboard';
import ComparisonView from './components/ComparisonView';
import { careerApi } from './api/client';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { History, LayoutDashboard, GitCompare, Sparkles, X } from 'lucide-react';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'dashboard', 'compare', 'saved'
  const [careerData, setCareerData] = useState(null);
  const [compareData, setCompareData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);

  // Load saved plans from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('skillmap_plans');
    if (saved) setSavedPlans(JSON.parse(saved));
  }, []);

  const handleGenerate = async (careerName, duration = 12) => {
    setIsLoading(true);
    try {
      const response = await careerApi.generate(careerName, duration);
      setCareerData(response.data);
      setView('dashboard');
    } catch (error) {
      console.error("Failed to generate career path", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompare = async (c1, c2) => {
    setIsLoading(true);
    try {
      const response = await careerApi.compare(c1, c2);
      setCompareData(response.data);
      setView('compare');
    } catch (error) {
      console.error("Comparison failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePlan = () => {
    if (!careerData) return;
    const newSaved = [careerData, ...savedPlans.filter(p => p.title !== careerData.title)];
    setSavedPlans(newSaved);
    localStorage.setItem('skillmap_plans', JSON.stringify(newSaved));
    alert("Career plan saved to your dashboard!");
  };

  const exportPDF = async () => {
    const element = document.getElementById('dashboard-content');
    if (!element) return;
    
    const canvas = await html2canvas(element, {
      backgroundColor: '#0c0a09',
      scale: 2
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`SkillMap-${careerData.title.replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-16 bg-[#0c0a09]/50 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('landing')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight">SkillMap</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('saved')}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${view === 'saved' ? 'text-indigo-400' : 'text-white/60 hover:text-white'}`}
          >
            <History size={16} /> Saved
          </button>
          
          {view === 'dashboard' && (
             <button 
                onClick={() => setView('compare')}
                className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
             >
               <GitCompare size={16} /> Compare
             </button>
          )}

          {view !== 'landing' && (
            <button 
              onClick={() => setView('landing')}
              className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
            >
              New Search
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {view === 'landing' && (
           <LandingHero onSearch={handleGenerate} isLoading={isLoading} />
        )}

        {view === 'dashboard' && (
          <div id="dashboard-content">
            <Dashboard 
              data={careerData} 
              onSave={savePlan} 
              onExport={exportPDF} 
            />
          </div>
        )}

        {view === 'compare' && (
           <div className="pb-20">
              {compareData ? (
                <ComparisonView career1={compareData.career1} career2={compareData.career2} />
              ) : (
                <div className="pt-32 text-center max-w-md mx-auto">
                   <h2 className="text-2xl font-bold mb-4">Compare Careers</h2>
                   <p className="text-white/60 mb-8">Compare your current path with another career to see the differences in skills and salary.</p>
                   <input 
                      type="text" 
                      placeholder="Enter second career (e.g. Backend Developer)"
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-indigo-500/50"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCompare(careerData.title, e.target.value);
                      }}
                   />
                   <p className="text-xs text-white/40">Press Enter to compare</p>
                </div>
              )}
           </div>
        )}

        {view === 'saved' && (
           <div className="pt-24 px-4 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <History className="text-indigo-400" /> Your Saved Roadmaps
              </h2>
              {savedPlans.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                   <p className="text-white/40">You haven't saved any career plans yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedPlans.map((plan, idx) => (
                    <div 
                      key={idx}
                      className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer relative"
                      onClick={() => {
                        setCareerData(plan);
                        setView('dashboard');
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                          <LayoutDashboard size={20} />
                        </div>
                        <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             const filtered = savedPlans.filter(p => p.title !== plan.title);
                             setSavedPlans(filtered);
                             localStorage.setItem('skillmap_plans', JSON.stringify(filtered));
                           }}
                           className="p-1 text-white/20 hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">{plan.title}</h3>
                      <p className="text-sm text-white/40 mt-1">{plan.duration} Learning Track</p>
                    </div>
                  ))}
                </div>
              )}
           </div>
        )}
      </main>
    </div>
  );
}

export default App;
