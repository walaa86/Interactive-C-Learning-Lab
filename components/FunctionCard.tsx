import React, { useState } from 'react';
import type { FunctionDef } from '../types';
import Icon from './Icon';

interface FunctionCardProps {
  f: FunctionDef;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ f }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="card bg-white dark:bg-slate-800 mb-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{f.name}</div>
          <div className="text-xs mono text-slate-500 dark:text-slate-400">{f.signature}</div>
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300 transition-colors">
          <Icon name={open ? 'minus' : 'plus'} />
        </button>
      </div>
      {open && (
        <div className="mt-3">
          <div className="paper bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-slate-800 dark:text-amber-100 rounded-lg p-3 mb-3 text-sm">{f.explanation}</div>
          <pre className="codebox bg-slate-800 dark:bg-slate-900 text-cyan-300 dark:text-cyan-300 rounded-lg p-3 text-sm mono"><code>{f.code}</code></pre>
        </div>
      )}
    </div>
  );
};

export default FunctionCard;
