
import React, { useState, useEffect } from 'react';
import type { Problem, Step } from '../types';
import FunctionCard from './FunctionCard';
import Icon from './Icon';

interface VisualizerProps {
  problem: Problem;
}

interface MemoryItem {
  t: number;
  note: string;
}

const Visualizer: React.FC<VisualizerProps> = ({ problem }) => {
  const [input, setInput] = useState(problem.example);
  const [steps, setSteps] = useState<Step[]>(() => problem.generator(problem.example));
  const [pos, setPos] = useState(0);
  const [paper, setPaper] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [memory, setMemory] = useState<MemoryItem[]>([]);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  useEffect(() => {
    doReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, problem]);

  const current = steps[pos] || steps[0];
  const charList = (input || '').split('');

  const goNext = () => {
    if (pos < steps.length - 1) {
      const newPos = pos + 1;
      setPos(newPos);
      const nextStep = steps[newPos];
      if (paper && nextStep?.mem.length) {
        setNotes(n => [...n, ...nextStep.mem.map(m => `[step ${newPos + 1}] ${m}`)]);
      }
      if (nextStep) {
        if (nextStep.modified) setMemory(m => [...m, { t: Date.now(), note: `S1="${nextStep.modified}"` }]);
        if (nextStep.mem.length) setMemory(m => [...m, ...nextStep.mem.map(note => ({ t: Date.now(), note }))]);
      }
    }
  };

  const goPrev = () => setPos(p => Math.max(0, p - 1));

  const doReset = () => {
    const newSteps = problem.generator(input);
    setSteps(newSteps);
    setPos(0);
    setNotes([]);
    setMemory([]);
  };

  const jumpToIndex = (idx: number) => {
    const stepIndex = steps.findIndex(s => s.i === idx && (s.code.toLowerCase().includes('if') || s.code.toLowerCase().includes('check') || s.code.toLowerCase().includes('s1')));
    if (stepIndex !== -1) setPos(stepIndex);
  };

  const isFirstLetterFlag = current.mem?.find(m => m.includes('isFirst'));
  const isLoopProblem = problem.id <= 4;

  return (
    <div className="card">
      <h2 className="text-xl font-bold">{problem.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{problem.description}</p>

      <div className="mt-4 card">
        <div className="text-sm font-semibold mb-2 flex items-center gap-2"><Icon name="brain-circuit" /> Live Trace Execution</div>
        <div className="mb-3">
          <label className="text-xs font-medium">Input:</label>
          <input value={input} onChange={e => setInput(problem.id === 5 ? e.target.value.slice(0, 1) : e.target.value)} className="w-full mt-2 p-3 border rounded text-lg mono" />
          <div className="text-xs text-gray-500 mt-2">Try: {problem.example}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="pill">Step {pos + 1} of {steps.length}</div>
          <div className="flex gap-2">
            <button onClick={goPrev} disabled={pos === 0} className="px-3 py-2 bg-gray-200 rounded flex items-center gap-2 disabled:opacity-50"><Icon name="skip-back" /> Prev</button>
            <button onClick={goNext} disabled={pos === steps.length - 1} className="px-3 py-2 bg-indigo-600 text-white rounded flex items-center gap-2 disabled:opacity-50"><Icon name="play" /> Next</button>
            <button onClick={doReset} className="px-3 py-2 bg-red-500 text-white rounded flex items-center gap-2"><Icon name="refresh-ccw" /> Reset</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">Original Input (Read-Only)</div>
               {isLoopProblem ? (
                  <div className="p-3 border rounded bg-white overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="index-cell">Index</th>
                          {charList.map((_, i) => (<th key={i} className={`index-cell cursor-pointer ${i === current.i ? 'bg-yellow-100' : ''}`} onClick={() => jumpToIndex(i)}>{i}</th>))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="index-cell font-semibold">Char</td>
                          {charList.map((ch, i) => (<td key={i} className={`char-cell ${i === current.i ? 'yellow' : ''} cursor-pointer`} onClick={() => jumpToIndex(i)}>{ch === ' ' ? '␣' : ch}</td>))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-3 border rounded bg-white flex flex-col items-center justify-center h-32">
                    <div className="text-5xl font-bold mono p-4">{charList[0] || ''}</div>
                  </div>
                )}
            </div>

            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">Execution Line</div>
              <div className="codebox mono text-sm p-4">{current.code || '(no code)'}</div>
              <div className="mt-3 text-sm text-gray-700 min-h-[20px]">{current.explanation}</div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">Modified String / Live Output</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Modified</div>
                  <div className="p-3 bg-slate-100 rounded mono min-h-[44px]">{current.modified ?? input}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Output / Collected</div>
                  <div className="p-3 bg-slate-100 rounded mono min-h-[44px]">{current.output ? (current.output.length ? current.output.join('') : '<empty>') : '<none>'}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Functions Used</h3>
              {problem.functions.map((f, idx) => (<FunctionCard key={idx} f={f} />))}
            </div>
          </div>

          <aside>
            <div className="sticky top-6 space-y-4">
              <div className="card">
                <div className="text-xs text-gray-500 mb-2">{isLoopProblem ? 'Loop Variable: i' : 'Execution Step'}</div>
                <div className="p-4 bg-indigo-50 rounded text-center mono font-bold text-xl">{current.i === undefined || current.i < 0 ? 'START' : current.i}</div>
              </div>

              {isFirstLetterFlag && (
                <div className="card">
                  <div className="text-xs text-gray-500 mb-2">Flag: isFirstLetter</div>
                  <div className="p-4 bg-green-50 rounded text-center font-bold text-xl">{isFirstLetterFlag.includes('true') ? 'True ✓' : 'False ✗'}</div>
                  <div className="text-xs text-gray-500 mt-2">True when the next char could be the start of a word.</div>
                </div>
              )}
              
              <div className="card">
                  <div className="text-sm font-semibold mb-2">Key Concepts</div>
                  <div className="flex flex-wrap gap-2">
                    {problem.keyConcepts.map((concept, i) => (
                      <span key={i} className="pill bg-indigo-100 text-indigo-800 text-xs font-semibold">{concept}</span>
                    ))}
                  </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">Paper & Pen</div>
                  <label className="inline-flex items-center text-xs gap-2 cursor-pointer"><input type="checkbox" checked={paper} onChange={() => setPaper(p => !p)} className="form-checkbox" /> Follow</label>
                </div>
                <div className="paper text-sm" style={{ minHeight: 120, maxHeight: 220, overflowY: 'auto' }}>
                  {notes.length === 0 ? <div className="text-gray-500 italic text-xs">No notes yet. Enable 'Follow' and step through to trace execution.</div> : notes.map((n, i) => (<div key={i} className="mb-1">✎ {n}</div>))}
                </div>
              </div>

              <div className="card">
                <div className="text-sm font-semibold mb-2">Simulated Memory</div>
                <div style={{ maxHeight: 220, overflowY: 'auto' }} className="text-xs mono space-y-1">
                  {memory.length === 0 ? <div className="text-gray-500 italic">Memory empty. Step through to populate.</div> : memory.slice(-30).reverse().map((m, i) => (<div key={m.t + i}>• {new Date(m.t).toLocaleTimeString()} — {m.note}</div>))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
