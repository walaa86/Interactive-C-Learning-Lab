import React, { useState, useEffect } from 'react';
import { problems } from './lib/problems';
import Visualizer from './components/Visualizer';
import Icon from './components/Icon';

const problemGroups = [
  {
    title: 'Level 1: Character Manipulation',
    problemIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20]
  },
  {
    title: 'Level 2: Word & String Manipulation',
    problemIds: [12, 13, 14, 29, 15, 16, 17, 18, 19, 28]
  },
  {
    title: 'Level 3: Structs & File I/O - Data Persistence',
    problemIds: [21, 22, 23, 24, 25, 26, 27]
  }
];


function App() {
  const [page, setPage] = useState(22);
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
      </header>

      <nav className="card bg-white dark:bg-slate-800 mb-6 flex flex-col gap-6">
        {problemGroups.map(group => (
          <div key={group.title}>
            <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-300">{group.title}</h3>
            <div className="flex gap-2 flex-wrap">
              {problems
                .filter(p => group.problemIds.includes(p.id))
                .map(p => (
                  <button key={p.id} onClick={() => setPage(p.id)} className={'px-4 py-2 rounded-full text-sm font-semibold transition-colors ' + (page === p.id ? 'badge bg-teal-500 dark:bg-teal-400 text-white dark:text-slate-900' : 'bg-white dark:bg-slate-700 hover:bg-sky-100 dark:hover:bg-slate-600')}>
                    {p.title.split('—')[0]}
                  </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <main>
        {activeProblem ? <Visualizer key={activeProblem.id} problem={activeProblem} setPage={setPage} /> : <div>Problem not found</div>}
      </main>

      <footer className="text-center text-xs text-slate-500 dark:text-slate-500 py-6">
        An interactive learning tool. Select a problem to begin.
      </footer>
    </div>
  );
}

export default App;