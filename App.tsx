/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  LayoutDashboard, 
  Users, 
  Briefcase,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Result {
  id: string;
  name: string;
  score: number;
  role: string;
  location?: string;
  salary?: string;
}

// --- Components ---

const SkillTag = ({ name, matched }: { name: string; matched: boolean }) => (
  <span className={`
    inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
    ${matched 
      ? 'bg-[#0F766E] text-white' 
      : 'border border-[#E5E7EB] text-[#6B7280] bg-white'
    }
  `}>
    {name}
  </span>
);

const ScoreCard = ({ score }: { score: number }) => (
  <div className="mb-10">
    <div className="flex items-baseline justify-between mb-3">
      <span className="text-sm text-[#6B7280] font-medium uppercase tracking-wider">Match Score</span>
      <span className="text-4xl font-bold text-[#0F766E] tabular-nums">{score}%</span>
    </div>
    <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-[#0F766E]"
      />
    </div>
  </div>
);

export default function App() {
  const [mode, setMode] = useState<'recruiter' | 'candidate'>('recruiter');
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);

  const handleAnalyze = () => {
    if (!file || !jobDesc) return;
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults: Result[] = mode === 'recruiter' ? [
        { id: '1', name: 'Alex Chen', score: 92, role: 'Senior Software Engineer', location: 'San Francisco, CA' },
        { id: '2', name: 'Sarah Miller', score: 84, role: 'Product Designer', location: 'New York, NY' },
        { id: '3', name: 'James Wilson', score: 76, role: 'Fullstack Developer', location: 'Remote' },
        { id: '4', name: 'Elena Rodriguez', score: 68, role: 'Backend Engineer', location: 'Austin, TX' },
      ] : [
        { id: '1', name: 'Linear', score: 94, role: 'Frontend Engineer', salary: '$160k - $210k' },
        { id: '2', name: 'Notion', score: 88, role: 'Product Engineer', salary: '$150k - $190k' },
        { id: '3', name: 'Greenhouse', score: 82, role: 'Fullstack Dev', salary: '$140k - $180k' },
        { id: '4', name: 'Vercel', score: 75, role: 'UI Engineer', salary: '$155k - $195k' },
      ];
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FAFAF9]">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-[#E5E7EB] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#0F766E] rounded-lg flex items-center justify-center text-white font-bold">C</div>
            <h1 className="text-lg font-semibold tracking-tight">CareerMatch AI</h1>
          </div>

          <div className="space-y-1">
            <button 
              onClick={() => setMode('recruiter')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'recruiter' ? 'bg-[#F3F4F6] text-[#1F2937]' : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-[#FAFAF9]'}`}
            >
              <Users size={18} />
              Recruiter Mode
            </button>
            <button 
              onClick={() => setMode('candidate')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'candidate' ? 'bg-[#F3F4F6] text-[#1F2937]' : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-[#FAFAF9]'}`}
            >
              <Briefcase size={18} />
              Candidate Mode
            </button>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <section>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Resume Upload</label>
            <div 
              className={`
                border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${file ? 'border-[#0F766E] bg-[#0F766E]/5' : 'border-[#E5E7EB] hover:border-[#6B7280]'}
              `}
              onClick={() => document.getElementById('resume-upload')?.click()}
            >
              <input 
                id="resume-upload" 
                type="file" 
                className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx"
              />
              <Upload size={24} className={`mx-auto mb-3 ${file ? 'text-[#0F766E]' : 'text-[#9CA3AF]'}`} />
              <p className="text-sm font-medium text-[#1F2937]">
                {file ? file.name : 'Choose a file'}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">PDF or DOCX up to 10MB</p>
            </div>
          </section>

          <section>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Job Description</label>
            <textarea 
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste requirements..."
              className="w-full h-40 p-3 bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all resize-none"
            />
          </section>

          <button 
            disabled={!file || !jobDesc || isAnalyzing}
            onClick={handleAnalyze}
            className={`
              w-full py-3 rounded-lg text-sm font-semibold transition-all
              ${!file || !jobDesc || isAnalyzing 
                ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed' 
                : 'bg-[#0F766E] text-white hover:bg-[#0D6B64] shadow-sm hover:shadow-md'
              }
            `}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Analyzing...
              </span>
            ) : 'Run Match Analysis'}
          </button>
        </div>

        <div className="p-6 border-t border-[#E5E7EB]">
          <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
            CareerMatch AI · Built by Engineering Team<br />
            AI Studio University · 2026
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 lg:p-12">
          {!results ? (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center mb-6">
                <FileText size={32} className="text-[#9CA3AF]" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Ready to screen</h2>
              <p className="text-[#6B7280] max-w-sm">
                Upload a candidate resume and job requirements to generate a precision match report.
              </p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight mb-2">Analysis Results</h2>
                  <p className="text-[#6B7280]">Based on skills, experience, and role requirements.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                    High Confidence
                  </span>
                </div>
              </div>

              <ScoreCard score={mode === 'recruiter' ? 84 : 94} />

              <section className="mb-12">
                <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Skills Matrix</h3>
                <div className="flex flex-wrap gap-2">
                  <SkillTag name="Python" matched={true} />
                  <SkillTag name="TypeScript" matched={true} />
                  <SkillTag name="React" matched={true} />
                  <SkillTag name="Machine Learning" matched={true} />
                  <SkillTag name="FastAPI" matched={true} />
                  <SkillTag name="PostgreSQL" matched={true} />
                  <SkillTag name="AWS" matched={false} />
                  <SkillTag name="Docker" matched={false} />
                  <SkillTag name="Kubernetes" matched={false} />
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
                    {mode === 'recruiter' ? 'Top Candidate Matches' : 'Best Career Fits'}
                  </h3>
                  <button className="text-xs font-medium text-[#0F766E] hover:underline flex items-center gap-1">
                    Export results <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAFAF9] border-b border-[#E5E7EB]">
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                          {mode === 'recruiter' ? 'Candidate' : 'Company'}
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider text-right">Score</th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {results.map((result) => (
                        <tr key={result.id} className="group hover:bg-[#FAFAF9] transition-colors cursor-pointer">
                          <td className="px-6 py-4">
                            <div className="font-medium text-[#1F2937]">{result.name}</div>
                            <div className="text-xs text-[#6B7280] mt-0.5">{result.location || result.salary}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#1F2937]">{result.role}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`
                              text-sm font-bold tabular-nums
                              ${result.score >= 90 ? 'text-[#0F766E]' : result.score >= 80 ? 'text-amber-600' : 'text-[#6B7280]'}
                            `}>
                              {result.score}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <ChevronRight size={18} className="text-[#D1D5DB] group-hover:text-[#6B7280] transition-colors inline" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
