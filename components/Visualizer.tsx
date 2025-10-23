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
  const prevStep = pos > 0 ? steps[pos - 1] : null;
  const stringPart = (problem.id === 7 || problem.id === 8 || problem.id === 19) && input.includes('|') ? input.split('|')[0] : input;
  const charList = (stringPart || '').split('');


  const generateCppCode = (): string => {
    const headers = new Set<string>(['iostream']);
    if (problem.functions.some(f => f.signature.includes('string'))) {
      headers.add('string');
    }
    if (problem.functions.some(f => f.signature.includes('vector'))) {
      headers.add('vector');
    }
     if (problem.functions.some(f => f.signature.includes('fstream') || f.code.includes('fstream'))) {
      headers.add('fstream');
    }
    if (problem.functions.some(f => f.code.includes('setw'))) {
      headers.add('iomanip');
    }
    if (problem.functions.some(f => f.code.includes('toupper') || f.code.includes('tolower') || f.code.includes('isupper') || f.code.includes('islower') || f.code.includes('ispunct'))) {
      headers.add('cctype');
    }


    const headerIncludes = Array.from(headers).map(h => `#include <${h}>`).join('\n');
    const functionDefinitions = problem.functions.map(f => f.code).join('\n\n');

    let mainBody = '';
    const readStringFn = problem.functions.find(f => f.name === 'ReadString()');
    const readCharFn = problem.functions.find(f => f.name === 'ReadChar()');

    switch(problem.id) {
        case 1: mainBody = `    string s = "${input}";\n    PrintFirstLetterOfEachWord(s);\n    cout << endl;`; break;
        case 2: mainBody = `    string s = "${input}";\n    cout << UpperFirstLetterOfEachWord(s) << endl;`; break;
        case 3: mainBody = `    string s = "${input}";\n    cout << LowerFirstLetterOfEachWord(s) << endl;`; break;
        case 4: mainBody = `    string s = "${input}";\n    cout << "Upper: " << UpperAllString(s) << endl;\n    cout << "Lower: " << LowerAllString(s) << endl;`; break;
        case 5: mainBody = `    char ch = '${input[0]}';\n    cout << InvertLetterCase(ch) << endl;`; break;
        case 6: mainBody = `    string s = "${input}";\n    cout << "Capitals: " << CountCapitalLetters(s) << endl;\n    cout << "Smalls: " << CountSmallLetters(s) << endl;`; break;
        case 7: { const [s, l] = input.split('|'); mainBody = `    cout << CountLetter("${s}", '${l}') << endl;`; break; }
        case 8: { const [s, l] = input.split('|'); mainBody = `    cout << "Sensitive: " << CountLetter("${s}", '${l}', true) << endl;\n    cout << "Insensitive: " << CountLetter("${s}", '${l}', false) << endl;`; break; }
        case 9: mainBody = `    cout << (IsVowel('${input[0]}') ? "Is Vowel" : "Not a Vowel") << endl;`; break;
        case 10: mainBody = `    cout << "Vowels: " << CountVowels("${input}") << endl;`; break;
        case 11: mainBody = `    PrintVowels("${input}");`; break;
        case 12: mainBody = `    PrintEachWordInString("${input}");`; break;
        case 13: mainBody = `    cout << "Words: " << CountWords("${input}") << endl;`; break;
        case 14: mainBody = `    vector<string> v = SplitString("${input}", " ");\n    cout << "Vector size: " << v.size() << endl;`; break;
        case 15: mainBody = `    string s = "${input}";\n    cout << "TrimLeft: '" << TrimLeft(s) << "'" << endl;\n    cout << "TrimRight: '" << TrimRight(s) << "'" << endl;\n    cout << "Trim: '" << Trim(s) << "'" << endl;`; break;
        case 16: mainBody = `    vector<string> v = {"Mohammed", "Faid", "Ali"};\n    cout << JoinString(v, "${input || ' '}") << endl;`; break;
        case 17: mainBody = `    vector<string> v = {"Mohammed", "Faid", "Ali"};\n    string arr[] = {"Mohammed", "Faid", "Ali"};\n    cout << "From Vector: " << JoinString(v, "${input || ' '}") << endl;\n    cout << "From Array: " << JoinString(arr, 3, "${input || ' '}") << endl;`; break;
        case 18: mainBody = `    cout << ReverseWordsInString("${input}") << endl;`; break;
        case 19: { const [s, f, r] = input.split('|'); mainBody = `    cout << ReplaceWordInStringUsingBuiltInFunction("${s}", "${f}", "${r}") << endl;`; break; }
        case 20: mainBody = `    cout << RemovePunctuationsFromString("${input}") << endl;`; break;
        case 21: mainBody = `    sClient Client = {"A123", "1234", "John Doe", "555-1234", 5000.0};\n    cout << ConvertRecordToLine(Client, "${input || '#//# '}") << endl;`; break;
        case 22: mainBody = `    sClient Client = ConvertLinetoRecord("${input}", "#//#");\n    PrintClientRecord(Client);`; break;
        case 23: mainBody = `    cout << "Simulating adding clients to file..." << endl;\n    AddClients();`; break;
        case 24: mainBody = `    vector<sClient> v = LoadCleintsDataFromFile("Clients.txt");\n    PrintAllClientsData(v);`; break;
        case 25: mainBody = `    sClient Client;\n    if (FindClientByAccountNumber("${input}", Client)) {\n        PrintClientCard(Client);\n    } else {\n        cout << "Client not found." << endl;\n    }`; break;
        case 26: mainBody = `    vector<sClient> v = LoadCleintsDataFromFile("Clients.txt");\n    DeleteClientByAccountNumber("${input}", v);`; break;
        case 27: mainBody = `    vector<sClient> v = LoadCleintsDataFromFile("Clients.txt");\n    UpdateClientByAccountNumber("${input}", v);`; break;
        default: mainBody = `    // Main function body for problem ${problem.id}\n    cout << "Executing problem ${problem.id}..." << endl;`; break;
    }

    return `${headerIncludes}\n\nusing namespace std;\n\n${functionDefinitions}\n\nint main() {\n${mainBody}\n    return 0;\n}`;
  };

  const isStringModificationProblem = [2, 3, 4, 5, 15, 18, 19, 20, 21].includes(problem.id);
  const isVowelProblem = [9, 10, 11].includes(problem.id);
  const isCaseCountProblem = [6].includes(problem.id);
  const isLetterCountProblem = [7, 8].includes(problem.id);
  const isWordProblem = [12, 13].includes(problem.id);
  const isVectorProblem = [14, 18, 22, 24, 25, 26, 27].includes(problem.id);
  const isJoinProblem = [16, 17].includes(problem.id);
  const isStructLineProblem = [21, 22].includes(problem.id);
  const isFileProblem = [23, 24, 26, 27].includes(problem.id);
  const isClientSearchProblem = [25].includes(problem.id);
  const isClientDeleteProblem = [26].includes(problem.id);
  const isClientUpdateProblem = [27].includes(problem.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-4">
        <div className="card bg-white dark:bg-slate-800">
          <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{problem.title}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{problem.description}</p>
          <div className="flex flex-wrap gap-2">
            {problem.keyConcepts.map(c => <span key={c} className="pill text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full font-medium">{c}</span>)}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 text-slate-600 dark:text-slate-300">Functions Involved</h3>
          {problem.functions.map(f => <FunctionCard key={f.name} f={f} />)}
        </div>
        {problem.hints && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-slate-600 dark:text-slate-300">Hints</h3>
            <div className="space-y-2">
              {problem.hints.map((hint, i) => (
                <div key={i} className="card bg-white dark:bg-slate-800 p-3">
                  {revealedHints.includes(i) ? (
                    <p className="text-sm text-slate-700 dark:text-slate-300">{hint}</p>
                  ) : (
                    <button onClick={() => setRevealedHints(prev => [...prev, i])} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                      <Icon name="lightbulb" size={16} />
                      <span>Reveal Hint {i + 1}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="lg:col-span-3 space-y-4">
        <div className="card bg-white dark:bg-slate-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-grow p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 transition" />
            <button onClick={doReset} className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300 transition flex items-center justify-center gap-2">
              <Icon name="refresh-cw" size={16} />
              <span>Visualize</span>
            </button>
          </div>
        </div>

        <div className="card bg-white dark:bg-slate-800 flex items-center justify-between">
          <button onClick={() => setPos(p => Math.max(0, p - 1))} disabled={pos === 0} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg disabled:opacity-50 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            <Icon name="arrow-left" size={16} /> Prev
          </button>
          <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Step {pos + 1} of {steps.length}</span>
          <button onClick={() => setPos(p => Math.min(steps.length - 1, p + 1))} disabled={pos >= steps.length - 1} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg disabled:opacity-50 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            Next <Icon name="arrow-right" size={16} />
          </button>
        </div>

        {/* --- VISUALIZATION AREA --- */}
        <div className="card bg-white dark:bg-slate-800">
            {/* String Visualizer */}
            <div className="mb-4">
                <h3 className="font-bold text-slate-600 dark:text-slate-300 mb-2">{isStringModificationProblem ? 'Modified String' : 'Input String'}</h3>
                <div className="flex flex-wrap bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg">
                    {charList.map((c, idx) => {
                        const isModified = current.i === idx && (isStringModificationProblem || isVowelProblem);
                        const isCurrent = current.i === idx;
                        return (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="index-cell text-xs text-slate-500 dark:text-slate-400">{idx}</div>
                                <div className={`char-cell mono ${isCurrent ? 'bg-amber-300 dark:bg-amber-500 text-slate-900' : ''}`}>
                                    <span className={isModified && current.modified && prevStep?.modified && current.modified[idx] !== prevStep.modified[idx] ? 'char-changed' : ''}>
                                        {isStringModificationProblem ? (current.modified ? current.modified[idx] : c) : c}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Vector Visualizer */}
            {isVectorProblem && current.vectorContents && (
                <div className="mb-4">
                    <h3 className="font-bold text-slate-600 dark:text-slate-300 mb-2">Vector Contents</h3>
                    <div className="flex flex-wrap gap-2">
                        {current.vectorContents.map((item, idx) => {
                            const isCurrent = (current.phase === 'reverse' || current.phase === 'search_vector' || current.phase === 'find_client' || current.phase === 'mark_for_delete' || current.phase === 'update_vector') && current.i === idx;
                            const isNewlyAdded = prevStep?.vectorContents && current.vectorContents && current.vectorContents.length > prevStep.vectorContents.length && idx === current.vectorContents.length - 1;
                            return (
                                <div key={idx} className={`p-2 rounded-lg border ${isCurrent ? 'bg-amber-300 dark:bg-amber-500 border-amber-400 dark:border-amber-600 text-slate-900' : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600'} ${isNewlyAdded ? 'item-enter' : ''}`}>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">{idx}</span>
                                    <span className="mono font-semibold">{typeof item === 'object' ? item.Name : item}</span>
                                </div>
                            );
                        })}
                        {current.vectorContents.length === 0 && <div className="text-sm text-slate-500 dark:text-slate-400 italic">Vector is empty.</div>}
                    </div>
                </div>
            )}

            {/* File Visualizer */}
            {isFileProblem && current.fileContents && (
                <div className="mb-4">
                    <h3 className="font-bold text-slate-600 dark:text-slate-300 mb-2">Simulated File: Clients.txt</h3>
                    <pre className="codebox bg-slate-800 dark:bg-slate-900 text-cyan-300 dark:text-cyan-300 text-xs p-3 h-32 overflow-y-auto rounded-lg">
                        {current.fileContents.map((line, idx) => (
                            <div key={idx} className={`transition-colors rounded px-1 ${current.loop?.currentLine === idx ? 'bg-teal-600/50' : ''}`}>{line}</div>
                        ))}
                    </pre>
                </div>
            )}

            {/* Client Struct Visualizer */}
            {(isStructLineProblem || isClientSearchProblem || isClientDeleteProblem || isClientUpdateProblem) && (
                <div className="mb-4">
                    <h3 className="font-bold text-slate-600 dark:text-slate-300 mb-2">Client Struct</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm mono p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        {Object.entries({AccountNumber: '', PinCode: '', Name: '', Phone: '', AccountBalance: ''}).map(([key]) => {
                            const client = current.search?.resultClient || current.delete?.client || current.update?.clientBefore || (current.phase === 'assign' ? current.vectorContents?.[current.i] : null);
                            let value = '...';
                            if (current.phase === 'assign' && current.field === key) value = current.modified ?? '...';
                            if (client) value = client[key];
                             if (current.update?.clientAfter && current.update.clientAfter[key] !== current.update.clientBefore?.[key]) {
                                value = current.update.clientAfter[key];
                            }
                            const isHighlighted = current.field === key || (current.update?.clientAfter && current.field === key);

                            return (
                                <React.Fragment key={key}>
                                    <div className={`font-semibold p-1 rounded transition-colors ${isHighlighted ? 'bg-amber-300 dark:bg-amber-500 text-slate-900' : ''}`}>{key}:</div>
                                    <div className={`p-1 rounded transition-colors ${isHighlighted ? 'bg-amber-300 dark:bg-amber-500 text-slate-900 value-update' : ''}`}>{value}</div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Output Area */}
            {current.output && current.output.length > 0 && (
                <div>
                    <h3 className="font-bold text-slate-600 dark:text-slate-300 mb-2">Output</h3>
                    <pre className="codebox bg-slate-800 dark:bg-slate-900 text-cyan-300 dark:text-cyan-300 text-sm p-3 rounded-lg">
                        {current.output.join('\n')}
                    </pre>
                </div>
            )}
        </div>
        
        {/* Explanation and Memory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-white dark:bg-slate-800">
            <h3 className="font-bold text-slate-600 dark:text-slate-300 mb-2">Explanation</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">{current.explanation}</p>
            <pre className="codebox bg-slate-800 dark:bg-slate-900 text-cyan-300 dark:text-cyan-300 text-sm p-2 mt-3 rounded-lg">{current.code}</pre>
          </div>
          <div className="card bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-600 dark:text-slate-300">Simulated Memory</h3>
              <button onClick={() => setPaper(p => !p)} className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 transition-colors ${paper ? 'bg-amber-400 text-amber-900' : 'bg-gray-200 dark:bg-slate-700 dark:text-slate-200'}`}>
                <Icon name="edit-3" size={12}/> Paper & Pen {paper ? 'ON' : 'OFF'}
              </button>
            </div>
            {paper ? (
              <pre className="paper bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-slate-800 dark:text-amber-100 text-xs h-32 overflow-y-auto rounded-lg p-2">{notes.join('\n')}</pre>
            ) : (
              <ul className="text-sm mono space-y-1 h-32 overflow-y-auto">
                {memory.slice().reverse().map(item => (
                  <li key={item.t} className="bg-slate-100 dark:bg-slate-700 p-1 rounded text-xs value-update">{item.note}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card bg-white dark:bg-slate-800">
          <h3 className="font-bold text-slate-600 dark:text-slate-300 mb-2">Example C++ Code</h3>
          <pre className="codebox bg-slate-800 dark:bg-slate-900 text-cyan-300 dark:text-cyan-300 text-xs p-3 h-48 overflow-y-auto rounded-lg"><code>{generateCppCode()}</code></pre>
        </div>

      </div>
    </div>
  );
};

export default Visualizer;
