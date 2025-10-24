import React, { useState, useEffect } from 'react';
import type { Problem, Step } from '../types';
import FunctionCard from './FunctionCard';
import Icon from './Icon';

interface VisualizerProps {
  problem: Problem;
  setPage: (pageId: number) => void;
}

interface MemoryItem {
  t: number;
  note: string;
}

// Map of problems to their logical successors to guide the learning path.
const nextProblemMap: Record<number, number> = {
  14: 18, // After splitting a string, a good next step is to reverse the words.
  29: 22, // After splitting by a custom delimiter, use that skill to parse a line into a struct.
  21: 22, // After converting a struct to a line, learn to do the reverse.
  22: 24, // After parsing one line into a struct, load a whole file of them.
};

const Visualizer: React.FC<VisualizerProps> = ({ problem, setPage }) => {
  const [input, setInput] = useState(problem.example);
  
  // Robustly initialize steps, catching any generator errors.
  const [steps, setSteps] = useState<Step[]>(() => {
    try {
      const initialSteps = problem.generator(problem.example);
      if (!initialSteps || initialSteps.length === 0) {
        console.error("Generator returned empty steps for initial example:", problem.example);
        return [{ i: -1, code: 'Initialization Error', explanation: 'Failed to generate visualization steps for the default example.', input: problem.example, mem: [] }];
      }
      return initialSteps;
    } catch (e) {
      console.error("Error during initial step generation:", e);
      const message = e instanceof Error ? e.message : String(e);
      return [{ i: -1, code: 'Initialization Error', explanation: `An error occurred: ${message}`, input: problem.example, mem: [] }];
    }
  });

  const [pos, setPos] = useState(0);
  const [paper, setPaper] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [memory, setMemory] = useState<MemoryItem[]>([]);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // This function resets the simulation to its initial state based on the current input.
  // It now includes error handling for the step generator.
  const doReset = () => {
    try {
      const newSteps = problem.generator(input);
      if (!newSteps || newSteps.length === 0) {
        console.error("Generator returned empty steps for input:", input);
        setSteps([{ i: -1, code: 'Generation Error', explanation: 'Could not generate visualization for this input. Please check the format.', input: input, mem: [] }]);
      } else {
        setSteps(newSteps);
      }
    } catch (e) {
      console.error("Error in step generator:", e);
      const message = e instanceof Error ? e.message : String(e);
      // Set steps to a single error step to prevent crash and inform the user.
      setSteps([{ i: -1, code: 'Generation Error', explanation: `An error occurred while processing input: ${message}`, input: input, mem: [] }]);
    }
    setPos(0);
    setNotes([]);
    setRevealedHints([]);
    setMemory([]); // Explicitly reset memory. The effect will run again but this prevents stale state.
  };

  // When the problem or input changes, reset the simulation.
  useEffect(() => {
    doReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, problem]);

  // DERIVED STATE for Simulated Memory
  // The memory log is always consistent with the execution step.
  useEffect(() => {
    if (steps.length === 0) {
      setMemory([]);
      return;
    }
    const relevantSteps = steps.slice(0, pos + 1);
    let timestamp = Date.now();
    const newMemory = relevantSteps.flatMap(step => {
      const items: MemoryItem[] = [];
      if (step.modified) {
        items.push({ t: timestamp++, note: `Var="${step.modified}"` });
      }
      if (step.mem?.length) {
        items.push(...step.mem.map(note => ({ t: timestamp++, note })));
      }
      return items;
    });
    setMemory(newMemory);
  }, [pos, steps]);
  
  // DERIVED STATE for Paper & Pen notes.
  // This ensures the notes are always in sync with the current step.
  useEffect(() => {
    if (!paper) {
      if (notes.length > 0) setNotes([]); // Clear notes if paper is turned off.
      return;
    }

    const relevantSteps = steps.slice(0, pos + 1);
    const newNotes = relevantSteps.flatMap((step, index) => 
      step.mem?.map(m => `[step ${index + 1}] ${m}`) ?? []
    );
    setNotes(newNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, steps, paper]);

  const current = steps[pos] || steps[0];

  // FIX: Added a return statement with JSX to render the component UI.
  // This fixes the error where the component had a `void` return type.
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Main visualizer column */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="card bg-white dark:bg-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{problem.title}</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{problem.description}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow input bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Enter input string here..."
            />
            <button onClick={doReset} className="btn bg-sky-500 hover:bg-sky-600 text-white font-semibold">
              <Icon name="refresh-cw" size={16} />
              <span>Run / Reset</span>
            </button>
          </div>
        </div>

        {/* Visualizer output */}
        <div className="card bg-white dark:bg-slate-800">
          <h3 className="font-bold mb-2 text-slate-700 dark:text-slate-300">Execution State</h3>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Current Code</h4>
            <pre className="codebox bg-slate-800 dark:bg-slate-900 text-cyan-300 rounded-lg p-3 text-sm mono">
              <code>{current.code}</code>
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.modified !== undefined && (
              <div>
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Modified String/Value</h4>
                <div className="paper bg-slate-100 dark:bg-slate-700 p-2 rounded mono text-sm">{current.modified || '(empty)'}</div>
              </div>
            )}
            {current.output && current.output.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Output</h4>
                <div className="paper bg-slate-100 dark:bg-slate-700 p-2 rounded mono text-sm">{current.output.join('\n') || '(no output yet)'}</div>
              </div>
            )}
            {current.vectorContents && (
              <div className="md:col-span-2">
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Vector Contents</h4>
                <div className="paper bg-slate-100 dark:bg-slate-700 p-2 rounded mono text-sm flex flex-wrap gap-2">
                  {current.vectorContents.map((item, i) => <span key={i} className="bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded">"{String(item)}"</span>)}
                </div>
              </div>
            )}
          </div>

          {memory.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Memory Log</h4>
                <div className="paper bg-slate-100 dark:bg-slate-700 p-2 rounded mono text-sm h-32 overflow-y-auto">
                  {memory.map((item) => <div key={item.t}>{item.note}</div>)}
                </div>
              </div>
            )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setPos(p => Math.max(0, p - 1))} disabled={pos === 0} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600">
            <Icon name="chevron-left" />
          </button>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 mono">Step {pos + 1} / {steps.length}</span>
          <button onClick={() => setPos(p => Math.min(steps.length - 1, p + 1))} disabled={pos >= steps.length - 1} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600">
            <Icon name="chevron-right" />
          </button>
        </div>

      </div>

      {/* Right sidebar */}
      <div className="flex flex-col gap-6">
        <div className="card bg-white dark:bg-slate-800">
            <h3 className="font-bold mb-2 text-slate-700 dark:text-slate-300">Explanation</h3>
            <div className="paper bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-slate-800 dark:text-amber-100 rounded-lg p-3 text-sm">
                <p>{current.explanation}</p>
            </div>
        </div>

        {problem.functions.length > 0 && (
          <div className="card bg-white dark:bg-slate-800">
            <h3 className="font-bold mb-2 text-slate-700 dark:text-slate-300">Functions Used</h3>
            {problem.functions.map(f => <FunctionCard key={f.name} f={f} />)}
          </div>
        )}

        {problem.hints && problem.hints.length > 0 && (
            <div className="card bg-white dark:bg-slate-800">
                <h3 className="font-bold mb-2 text-slate-700 dark:text-slate-300">Hints</h3>
                {problem.hints.map((hint, i) => (
                    <div key={i} className="mb-2">
                        {revealedHints.includes(i) ? (
                            <p className="text-sm text-slate-600 dark:text-slate-400">{hint}</p>
                        ) : (
                            <button onClick={() => setRevealedHints(prev => [...prev, i])} className="btn text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600">
                                <Icon name="lightbulb" size={14}/>
                                <span>Reveal Hint #{i+1}</span>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        )}

        {nextProblemMap[problem.id] && (
          <div className="card bg-white dark:bg-slate-800 text-center">
            <h3 className="font-bold mb-2 text-slate-700 dark:text-slate-300">Ready for the next step?</h3>
            <button onClick={() => setPage(nextProblemMap[problem.id])} className="btn bg-teal-500 hover:bg-teal-600 text-white font-semibold w-full">
              <span>Continue to Problem #{nextProblemMap[problem.id]}</span>
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

// FIX: Added a default export.
// This fixes the error in App.tsx where the module was not found.
export default Visualizer;
