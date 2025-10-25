import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Problem, Step } from '../types';
import FunctionCard from './FunctionCard';
import Icon from './Icon';

interface VisualizerProps {
  problem: Problem;
  setPage: (pageId: number) => void;
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
  const [steps, setSteps] = useState<Step[]>([]);
  const [pos, setPos] = useState(0);
  const [paper, setPaper] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const runSimulation = useCallback((currentInput: string) => {
    try {
      const newSteps = problem.generator(currentInput);
      if (!newSteps || newSteps.length === 0) {
        console.error("Generator returned empty steps for input:", currentInput);
        setSteps([{ i: -1, code: 'Generation Error', explanation: 'Could not generate visualization for this input. Please check the format.', input: currentInput, mem: [] }]);
      } else {
        setSteps(newSteps);
      }
    } catch (e) {
      console.error("Error in step generator:", e);
      const message = e instanceof Error ? e.message : String(e);
      setSteps([{ i: -1, code: 'Generation Error', explanation: `An error occurred while processing input: ${message}`, input: currentInput, mem: [] }]);
    }
    setPos(0);
    setRevealedHints([]);
  }, [problem]);

  // This effect handles both the initial run and any subsequent changes to the input.
  useEffect(() => {
    runSimulation(input);
  }, [input, runSimulation]);

  // DERIVED STATE for Simulated Memory
  const memory = useMemo(() => {
    if (steps.length === 0) {
      return [];
    }
    
    return steps
      .slice(0, pos + 1)
      .flatMap((step, stepIndex) => {
        const notes: { key: string, note: string }[] = [];
        let noteSubIndex = 0;
        
        if (step.modified !== undefined) {
          notes.push({ 
            key: `s${stepIndex}-mod`, 
            note: `Var="${step.modified}"`
          });
        }
        
        if (step.mem) {
          step.mem.forEach(m => {
            notes.push({ 
              key: `s${stepIndex}-mem${noteSubIndex++}`, 
              note: m 
            });
          });
        }
        
        return notes;
      });
  }, [pos, steps]);
  
  // DERIVED STATE for Paper & Pen notes.
  const notes = useMemo(() => {
    if (!paper || steps.length === 0) {
      return [];
    }
    
    return steps
      .slice(0, pos + 1)
      .flatMap((step, stepIndex) => 
        step.mem?.map((m, memIndex) => ({
          key: `s${stepIndex}-p${memIndex}`,
          note: `[step ${stepIndex + 1}] ${m}`
        })) ?? []
      );
  }, [pos, steps, paper]);

  const current = steps[pos] || steps[0];

  if (!current) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold">Loading...</h2>
        <p>Preparing visualization steps.</p>
      </div>
    );
  }
  
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
              className="flex-grow input bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500 rounded-md shadow-sm"
              placeholder="Enter input string here..."
              aria-label="Input for the problem"
            />
            <button onClick={() => runSimulation(input)} className="btn bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center justify-center gap-2 px-4 py-2 rounded-md">
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
                  {memory.map((item) => <div key={item.key}>{item.note}</div>)}
                </div>
              </div>
            )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setPos(p => Math.max(0, p - 1))} disabled={pos === 0} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600" aria-label="Previous step">
            <Icon name="chevron-left" />
          </button>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 mono">Step {pos + 1} / {steps.length}</span>
          <button onClick={() => setPos(p => Math.min(steps.length - 1, p + 1))} disabled={pos >= steps.length - 1} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600" aria-label="Next step">
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

        <div className="card bg-white dark:bg-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300">Paper & Pen Trace</h3>
            <div className="relative flex items-center">
              <button
                onClick={() => setPaper(!paper)}
                role="switch"
                aria-checked={paper}
                className={`${
                  paper ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    paper ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </div>
          {paper && (
            <div className="paper bg-slate-100 dark:bg-slate-700 p-2 rounded mono text-sm h-48 overflow-y-auto mt-2">
              {notes.length > 0 ? (
                notes.map((item) => <div key={item.key} className="item-enter">{item.note}</div>)
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-xs p-2">Begin stepping through the code to see the trace...</p>
              )}
            </div>
          )}
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
                            <button onClick={() => setRevealedHints(prev => [...prev, i])} className="btn text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center gap-2 px-3 py-1 rounded-md">
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
            <button onClick={() => setPage(nextProblemMap[problem.id])} className="btn bg-teal-500 hover:bg-teal-600 text-white font-semibold w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md">
              <span>Continue to Problem #{nextProblemMap[problem.id]}</span>
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Visualizer;