import React, { useState } from "react";
import axios from "axios";
import {
  Send,
  Loader2,
  Sparkles,
  User,
  Building2,
  Briefcase,
} from "lucide-react";

function App() {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({ name: "", company: "", jd: "" });
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("resume", file);
    fd.append("jobDescription", info.jd);
    fd.append("candidateName", info.name);
    fd.append("companyName", info.company);

    try {
      const res = await axios.post("https://ai-cover-letter-maker-1.onrender.com/generate", fd);
      setLetter(res.data.coverLetter);
    } catch (err) {
      alert("Backend Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse delay-700"></div>

      <div className="relative z-10 w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl shadow-black/50">
        <header className="mb-8 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 mb-4">
            <Sparkles className="text-blue-400 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            AI Cover Letter <span className="text-blue-400">Maker</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Level up your job application in seconds.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                placeholder="Your Name"
                required
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
              />
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                placeholder="Company Name"
                required
                onChange={(e) => setInfo({ ...info, company: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-slate-900/40 border-2 border-dashed border-slate-700 p-4 rounded-xl hover:border-blue-500/50 transition-colors cursor-pointer text-center">
            <input
              type="file"
              accept=".pdf"
              id="file-upload"
              className="hidden"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <UploadIcon className="w-6 h-6 text-blue-400" />
              <span className="text-slate-300 text-sm font-medium">
                {file ? file.name : "Upload Resume (PDF)"}
              </span>
            </label>
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <textarea
              className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl h-32 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600 resize-none"
              placeholder="Paste the Job Description here..."
              required
              onChange={(e) => setInfo({ ...info, jd: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-xl font-bold transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 shadow-lg shadow-blue-600/20 disabled:bg-slate-700"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Generate My Letter
              </>
            )}
          </button>
        </form>

        {letter && (
          <div className="mt-8 p-6 bg-slate-950/80 border border-blue-500/30 rounded-2xl shadow-inner relative group">
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(letter)}
                className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-xs"
              >
                Copy
              </button>
            </div>
            <h3 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-3">
              Result
            </h3>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar">
              {letter}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 text-slate-600 text-xs">
        Powered by Gemini 3 Flash & React
      </footer>
    </div>
  
  );

}

const UploadIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

export default App;
