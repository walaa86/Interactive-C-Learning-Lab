
import React, { useState, useEffect } from 'react';
import { problems } from './lib/problems';
import Visualizer from './components/Visualizer';

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
  const activeProblem = problems.find(p => p.id === page);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Interactive C++ Learning Lab</h1>
          <p className="text-sm text-gray-600">Visualize code execution, trace with 'Paper & Pen', and inspect memory.</p>
        </div>
        <nav className="flex gap-2 flex-wrap">
          {problems.map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} className={'px-4 py-2 rounded text-sm ' + (page === p.id ? 'badge' : 'bg-white/60')}>
              {p.title.split('—')[0]}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {activeProblem ? <Visualizer key={activeProblem.id} problem={activeProblem} /> : <div>Problem not found</div>}
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        An interactive learning tool. Select a problem to begin.
      </footer>
    </div>
  );
}

export default App;
