
import React, { useState, useEffect } from 'react';
import type { FunctionDef } from '../types';
import Icon from './Icon';

interface FunctionCardProps {
  f: FunctionDef;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ f }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [open]);

  return (
    <div className="card mb-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{f.name}</div>
          <div className="text-xs mono text-gray-500">{f.signature}</div>
        </div>
        <button onClick={() => setOpen(o => !o)} className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors">
          <Icon name={open ? 'minus' : 'plus'} />
        </button>
      </div>
      {open && (
        <div className="mt-3">
          <div className="paper mb-3 text-sm">{f.explanation}</div>
          <pre className="codebox text-sm mono"><code>{f.code}</code></pre>
        </div>
      )}
    </div>
  );
};

export default FunctionCard;