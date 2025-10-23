
import React, { useState, useEffect } from 'react';
import { problems } from './lib/problems';
import Visualizer from './components/Visualizer';
import Icon from './components/Icon';

// Tell TypeScript that the 'lucide' global exists.
declare global {
  interface Window {
    lucide?: {
      createIcons: () => void;
    };
  }
}

function App() {
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const activeProblem = problems.find(p => p.id === page);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [theme, page]); // Rerun when theme or page changes

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-200">Interactive C++ Learning Lab</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Visualize code execution, trace with 'Paper & Pen', and inspect memory.</p>
          </div>
          <button onClick={toggleTheme} title="Toggle theme" className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>
        </div>
        <nav className="flex gap-2 flex-wrap">
          {problems.map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} className={'px-4 py-2 rounded-full text-sm font-semibold transition-colors ' + (page === p.id ? 'badge bg-teal-500 dark:bg-teal-400 text-white dark:text-slate-900' : 'bg-white dark:bg-slate-700 hover:bg-sky-100 dark:hover:bg-slate-600')}>
              {p.title.split('—')[0]}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {activeProblem ? <Visualizer key={activeProblem.id} problem={activeProblem} /> : <div>Problem not found</div>}
      </main>

      <footer className="text-center text-xs text-slate-500 dark:text-slate-500 py-6">
        An interactive learning tool. Select a problem to begin.
      </footer>
    </div>
  );
}

export default App;