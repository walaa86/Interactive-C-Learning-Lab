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

    const headerIncludes = Array.from(headers).map(h => `#include <${h}>`).join('\n');
    const functionDefinitions = problem.functions.map(f => f.code).join('\n\n');

    let mainBody = '';
    const readStringFn = problem.functions.find(f => f.name === 'ReadString');
    const readCharFn = problem.functions.find(f => f.name === 'ReadChar');

    switch(problem.id) {
        case 1:
            mainBody = `
    cout << "Enter a string: " << endl;
    string s = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    cout << "\\nFirst letters: ";
    PrintFirstLetterOfEachWord(s);
    cout << endl;
            `;
            break;
        case 2:
        case 3:
            mainBody = `
    cout << "Enter a string: " << endl;
    string s = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    string result = ${problem.functions.find(f => f.name.includes('FirstLetter'))?.name}(s);
    cout << "\\nResult: " << result << endl;
            `;
            break;
        case 4:
            mainBody = `
    cout << "Enter a string: " << endl;
    string s = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    string upper_s = UpperAllString(s);
    cout << "\\nUppercase version: " << upper_s << endl;
    string lower_s = LowerAllString(s);
    cout << "\\nLowercase version: " << lower_s << endl;
            `;
            break;
        case 5:
            mainBody = `
    char c = ${readCharFn ? readCharFn.name + "();" : "/* Read char logic here */"}
    char inverted_c = InvertLetterCase(c);
    cout << "\\nInverted case: " << inverted_c << endl;
            `;
            break;
        case 6:
            mainBody = `
    string s = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    cout << "\\nCapital Letters Count = " << CountCapitalLetters(s) << endl;
    cout << "Small Letters Count = " << CountSmallLetters(s) << endl;
            `;
            break;
        case 7:
            mainBody = `
    string s = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    char c = ${readCharFn ? readCharFn.name + "();" : "/* Read char logic here */"}
    cout << "\\nLetter '" << c << "' Count = " << CountLetter(s, c) << endl;
            `;
            break;
        case 8:
            mainBody = `
    string s = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    char c = ${readCharFn ? readCharFn.name + "();" : "/* Read char logic here */"}
    
    cout << "\\nLetter '" << c << "' Count = " << CountLetter(s, c);
    
    cout << "\\nLetter '" << c << "' or '" << InvertLetterCase(c) << "' Count = " << CountLetter(s, c, false) << endl;
            `;
            break;
        case 9:
            mainBody = `
    char c = ${readCharFn ? readCharFn.name + "();" : "/* Read char logic here */"}
    
    if (IsVowel(c))
        cout << "\\nYES Letter '" << c << "' is vowel";
    else
        cout << "\\nNO Letter '" << c << "' is NOT vowel";
    
    cout << endl;
            `;
            break;
        case 10:
            mainBody = `
    string S1 = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    cout << "\\nNumber of vowels is: " << CountVowels(S1) << endl;
            `;
            break;
        case 11:
            mainBody = `
    string S1 = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    PrintVowels(S1);
    cout << endl;
            `;
            break;
        case 12:
            mainBody = `
    PrintEachWordInString(${readStringFn ? readStringFn.name + "()" : "/* Read string logic here */"});
            `;
            break;
        case 13:
            mainBody = `
    string S1 = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    cout << "\\nThe number of words in your string is: " << CountWords(S1) << endl;
            `;
            break;
        case 14:
            mainBody = `
    vector<string> vString;
    vString = SplitString(${readStringFn ? readStringFn.name + "()" : "/* Read string logic here */"}, " ");
    
    cout << "\\nTokens = " << vString.size() << endl;
    
    for (string& s : vString)
    {
        cout << s << endl;
    }
            `;
            break;
        case 15:
            mainBody = `
    string S1 = "${problem.example}";
    
    cout << "\\nString     = " << S1;
    cout << "\\n\\nTrim Left  = " << TrimLeft(S1);
    cout << "\\nTrim Right = " << TrimRight(S1);
    cout << "\\nTrim       = " << Trim(S1) << endl;
            `;
            break;
        case 16:
            mainBody = `
    vector<string> vString = { "Mohammed", "Faid", "Ali", "Maher" };
    
    cout << "\\nVector after join with delimiter \\"${problem.example}\\":\\n";
    cout << JoinString(vString, "${problem.example}") << endl;
            `;
            break;
        case 17:
            mainBody = `
    vector<string> vString = { "Mohammed", "Faid", "Ali", "Maher" };
    string arrString[] = { "Mohammed", "Faid", "Ali", "Maher" };
    
    cout << "\\nVector after join: \\n";
    cout << JoinString(vString, "${problem.example}");
    
    cout << "\\n\\nArray after join: \\n";
    cout << JoinString(arrString, 4, "${problem.example}") << endl;
            `;
            break;
        case 18:
            mainBody = `
    string S1 = ${readStringFn ? readStringFn.name + "();" : "/* Read string logic here */"}
    cout << "\\nString after reversing words:";
    cout << "\\n" << ReverseWordsInString(S1) << endl;
            `;
            break;
        case 19:
            const [s1, sToReplace, sReplaceTo] = problem.example.split('|');
            mainBody = `
    string S1 = "${s1}";
    string StringToReplace = "${sToReplace}";
    string ReplaceTo = "${sReplaceTo}";
    
    cout << "\\nOrigial String\\n" << S1;
    cout << "\\n\\nString After Replace: ";
    cout << "\\n" << ReplaceWordInStringUsingBuiltInFunction(S1, StringToReplace, ReplaceTo) << endl;
            `;
            break;
        default:
            mainBody = `    // TODO: Implement main execution logic for this problem.`;
    }

    return `// Problem ${problem.id}: ${problem.title.split('—')[1].trim()}
// Description: ${problem.description}
// Generated by the Interactive C++ Learning Lab

${headerIncludes}
#include <cctype> // for isupper, toupper, tolower

using namespace std;

// Function Definitions
${functionDefinitions}

int main()
{
${mainBody}
    return 0;
}
`;
  };

  const handleDownload = () => {
    const code = generateCppCode();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `problem_${problem.id}_${problem.title.split('—')[1].trim().replace(/\s+/g, '_')}.cpp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const goNext = () => {
    if (pos < steps.length - 1) {
      const newPos = pos + 1;
      setPos(newPos);
      const nextStep = steps[newPos];
      if (paper && nextStep?.mem.length) {
        setNotes(n => [...n, ...nextStep.mem.map(m => `[step ${newPos + 1}] ${m}`)]);
      }
      if (nextStep) {
        if (nextStep.modified) setMemory(m => [...m, { t: Date.now(), note: `Var="${nextStep.modified}"` }]);
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
  const isIndexedLoopProblem = [1, 2, 3, 4, 6, 7, 8, 10, 11].includes(problem.id);
  const isCounterProblem = problem.id === 6;
  const isSpecificCounterProblem = problem.id === 7;
  const isCaseInsensitiveCounterProblem = problem.id === 8;
  const isVowelCounterProblem = problem.id === 10;
  const isWordCounterProblem = problem.id === 13;
  const isVectorProblem = problem.id === 14;
  const isTrimProblem = problem.id === 15;
  const isJoinProblem = problem.id === 16;
  const isJoinOverloadProblem = problem.id === 17;
  const isReverseWordsProblem = problem.id === 18;
  const isReplaceWordProblem = problem.id === 19;


  return (
    <div className="card">
      <h2 className="text-xl font-bold">{problem.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{problem.description}</p>

      <div className="mt-4 card">
        <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold flex items-center gap-2"><Icon name="brain-circuit" /> Live Trace Execution</div>
            <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-1.5 text-xs bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold">
                <Icon name="download" size={14} />
                Download .cpp
            </button>
        </div>
        <div className="mb-3">
          <label className="text-xs font-medium">{[16, 17].includes(problem.id) ? 'Delimiter Input:' : isReplaceWordProblem ? 'Input (String|Find|Replace):' : 'Input:'}</label>
          <input value={input} onChange={e => setInput((problem.id === 5 || problem.id === 9) ? e.target.value.slice(0, 1) : e.target.value)} className="w-full mt-2 p-3 rounded text-lg mono bg-sky-50 border-2 border-cyan-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-colors duration-200 ease-in-out" />
          <div className="text-xs text-gray-500 mt-2">{[16, 17].includes(problem.id) ? `Try: "--" or ", "` : `Try: ${problem.example}`}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="pill">Step {pos + 1} of {steps.length}</div>
          <div className="flex gap-2">
            <button onClick={goPrev} disabled={pos === 0} className="px-3 py-2 bg-slate-200 rounded flex items-center gap-2 disabled:opacity-50 hover:bg-slate-300 transition-colors"><Icon name="skip-back" /> Prev</button>
            <button onClick={goNext} disabled={pos === steps.length - 1} className="px-3 py-2 bg-teal-500 text-white rounded flex items-center gap-2 disabled:opacity-50 hover:bg-teal-600 transition-colors"><Icon name="play" /> Next</button>
            <button onClick={doReset} className="px-3 py-2 bg-orange-500 text-white rounded flex items-center gap-2 hover:bg-orange-600 transition-colors"><Icon name="refresh-ccw" /> Reset</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">{isJoinProblem || isJoinOverloadProblem ? 'Input Collections (Fixed)' : 'Original Input (Read-Only)'}</div>
               {isIndexedLoopProblem ? (
                  <div className="p-3 border rounded bg-white overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="index-cell">Index</th>
                          {charList.map((_, i) => (<th key={i} className={`index-cell cursor-pointer ${i === current.i ? 'yellow' : ''}`} onClick={() => jumpToIndex(i)}>{i}</th>))}
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
                ) : isJoinProblem ? (
                  <div className="p-3 border rounded bg-white flex flex-wrap items-center justify-center gap-2 min-h-[96px]">
                    <span className="mono text-xl">{'{'}</span>
                    {["Mohammed", "Faid", "Ali", "Maher"].map((item, idx) => (
                      <React.Fragment key={idx}>
                        <span className="p-2 bg-sky-100 rounded text-lg mono">"{item}"</span>
                        {idx < 3 && <span className="text-gray-400">,</span>}
                      </React.Fragment>
                    ))}
                    <span className="mono text-xl">{'}'}</span>
                  </div>
                ) : isJoinOverloadProblem ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <div className="p-3 border rounded bg-white">
                       <div className="text-xs font-semibold text-center mb-2">std::vector&lt;string&gt;</div>
                       <div className="flex flex-wrap items-center justify-center gap-1">
                          <span className="mono text-lg">{'{'}</span>
                          {["Mohammed", "Faid", "Ali", "Maher"].map((item, idx) => (
                            <React.Fragment key={idx}>
                              <span className="p-1 bg-sky-100 rounded text-base mono">"{item}"</span>
                              {idx < 3 && <span className="text-gray-400">,</span>}
                            </React.Fragment>
                          ))}
                          <span className="mono text-lg">{'}'}</span>
                       </div>
                     </div>
                      <div className="p-3 border rounded bg-white">
                       <div className="text-xs font-semibold text-center mb-2">string[]</div>
                       <div className="flex flex-wrap items-center justify-center gap-1">
                          <span className="mono text-lg">{'{'}</span>
                          {["Mohammed", "Faid", "Ali", "Maher"].map((item, idx) => (
                            <React.Fragment key={idx}>
                              <span className="p-1 bg-sky-100 rounded text-base mono">"{item}"</span>
                              {idx < 3 && <span className="text-gray-400">,</span>}
                            </React.Fragment>
                          ))}
                          <span className="mono text-lg">{'}'}</span>
                       </div>
                     </div>
                   </div>
                ) : (
                  <div className="p-3 border rounded bg-white flex items-center justify-center min-h-[96px]">
                    <div className="text-2xl font-bold mono p-4">{[12, 13, 14, 15, 18, 19].includes(problem.id) ? (problem.id === 19 ? input.split('|')[0] : input) : (charList[0] || '')}</div>
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
                  <div className="p-3 bg-slate-100 rounded mono min-h-[44px]">{current.output ? (current.output.length ? current.output.join(', ') : '<empty>') : '<none>'}</div>
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
                <div className="text-xs text-gray-500 mb-2">{isIndexedLoopProblem ? 'Loop Variable: i' : 'Execution Step'}</div>
                <div className="p-4 bg-sky-100 rounded text-center mono font-bold text-xl">{current.i === undefined || current.i < 0 ? 'START' : current.i}</div>
              </div>

              {(isTrimProblem || isJoinOverloadProblem || isReverseWordsProblem) && (() => {
                  const phaseMap: {[key: string]: string} = {
                      left: 'Trim Left',
                      right: 'Trim Right',
                      all: 'Trim All',
                      vector: 'Vector Join',
                      array: 'Array Join',
                      split: 'Splitting String',
                      reverse: 'Reversing Words'
                  };
                  const currentPhase = current.phase || (isTrimProblem ? 'left' : (isJoinOverloadProblem ? 'vector' : 'split'));
                  return (
                      <div className="card">
                          <div className="text-sm font-semibold mb-2">Current Operation</div>
                          <div className="p-3 bg-indigo-100 rounded text-center font-bold text-lg">
                              {phaseMap[currentPhase]}
                          </div>
                      </div>
                  );
              })()}

              {isFirstLetterFlag && (
                <div className="card">
                  <div className="text-xs text-gray-500 mb-2">Flag: isFirstLetter</div>
                  <div className="p-4 bg-emerald-100 rounded text-center font-bold text-xl">{isFirstLetterFlag.includes('true') ? 'True ✓' : 'False ✗'}</div>
                  <div className="text-xs text-gray-500 mt-2">True when the next char could be the start of a word.</div>
                </div>
              )}

              {isCounterProblem && (() => {
                  let capitalCount = '0', smallCount = '0';
                  if(current.mem) {
                    const memString = current.mem.join('|');
                    const capMatch = memString.match(/capitalCount=(\d+)/g);
                    const smlMatch = memString.match(/smallCount=(\d+)/g);
                    if (capMatch) capitalCount = capMatch[capMatch.length - 1].split('=')[1];
                    if (smlMatch) smallCount = smlMatch[smlMatch.length - 1].split('=')[1];
                  }
                  return (
                      <div className="card">
                          <div className="text-sm font-semibold mb-2">Live Counters</div>
                          <div className="grid grid-cols-2 gap-2 text-center">
                              <div>
                                  <div className="text-xs text-gray-500">Capital</div>
                                  <div className="p-2 bg-blue-100 rounded mt-1 font-bold text-lg">{capitalCount}</div>
                              </div>
                              <div>
                                  <div className="text-xs text-gray-500">Small</div>
                                  <div className="p-2 bg-green-100 rounded mt-1 font-bold text-lg">{smallCount}</div>
                              </div>
                          </div>
                      </div>
                  )
              })()}

              {isSpecificCounterProblem && (() => {
                  let targetChar = '?';
                  let count = '0';
                  if (current.mem) {
                      const memString = current.mem.join('|');
                      const targetMatch = memString.match(/target='(.*?)'/);
                      const countMatch = memString.match(/count=(\d+)/g);
                      if (targetMatch) targetChar = targetMatch[1];
                      if (countMatch) count = countMatch[countMatch.length - 1].split('=')[1];
                  }
                  return (
                      <div className="card">
                          <div className="text-sm font-semibold mb-2">Live Trace</div>
                          <div className="grid grid-cols-2 gap-2 text-center">
                              <div>
                                  <div className="text-xs text-gray-500">Target Char</div>
                                  <div className="p-2 bg-purple-100 rounded mt-1 font-bold text-lg">{targetChar}</div>
                              </div>
                              <div>
                                  <div className="text-xs text-gray-500">Count</div>
                                  <div className="p-2 bg-green-100 rounded mt-1 font-bold text-lg">{count}</div>
                              </div>
                          </div>
                      </div>
                  )
              })()}

              {isCaseInsensitiveCounterProblem && (() => {
                  const targetChar = (input.split('|')[1] || '?')[0];
                  
                  const finalSensitiveStep = steps.find(s => s.phase === 'sensitive' && s.i === (input.split('|')[0] || '').length);
                  const finalSensitiveMem = finalSensitiveStep?.mem.join('|') || '';
                  const finalSensitiveMatch = finalSensitiveMem.match(/count=(\d+)/);
                  const finalSensitiveCount = finalSensitiveMatch ? finalSensitiveMatch[1] : '0';

                  let sensitiveCount = '0';
                  let insensitiveCount = '0';

                  if (current.phase === 'sensitive') {
                      const memString = current.mem.join('|');
                      const countMatch = memString.match(/count=(\d+)/);
                      sensitiveCount = countMatch ? countMatch[1] : '0';
                  } else { // 'insensitive' or end phase
                      sensitiveCount = finalSensitiveCount;
                      const memString = current.mem.join('|');
                      const countMatch = memString.match(/count=(\d+)/);
                      insensitiveCount = countMatch ? countMatch[1] : '0';
                  }

                  return (
                      <div className="card">
                          <div className="text-sm font-semibold mb-2">Live Counters</div>
                          <div className="text-center mb-2">
                              <div className="text-xs text-gray-500">Target Char</div>
                              <div className="p-2 bg-purple-100 rounded mt-1 font-bold text-lg">{targetChar}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-center">
                              <div>
                                  <div className="text-xs text-gray-500">Case-Sensitive</div>
                                  <div className="p-2 bg-blue-100 rounded mt-1 font-bold text-lg">{sensitiveCount}</div>
                              </div>
                              <div>
                                  <div className="text-xs text-gray-500">Case-Insensitive</div>
                                  <div className="p-2 bg-green-100 rounded mt-1 font-bold text-lg">{insensitiveCount}</div>
                              </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2 text-center p-2 bg-sky-50 rounded">
                              Currently in: <span className="font-semibold">{current.phase === 'sensitive' ? 'Case-Sensitive' : 'Case-Insensitive'} Phase</span>
                          </div>
                      </div>
                  );
              })()}

              {isVowelCounterProblem && (() => {
                  let count = '0';
                  if (current.mem) {
                      const memString = current.mem.join('|');
                      const countMatch = memString.match(/count=(\d+)/g);
                      if (countMatch) count = countMatch[countMatch.length - 1].split('=')[1];
                  }
                  return (
                      <div className="card">
                          <div className="text-sm font-semibold mb-2">Live Vowel Counter</div>
                          <div className="grid grid-cols-1 gap-2 text-center">
                              <div>
                                  <div className="text-xs text-gray-500">Vowels Found</div>
                                  <div className="p-2 bg-rose-100 rounded mt-1 font-bold text-lg">{count}</div>
                              </div>
                          </div>
                      </div>
                  )
              })()}

              {isWordCounterProblem && (() => {
                  let count = '0';
                  if (current.mem) {
                      const memString = current.mem.join('|');
                      const countMatch = memString.match(/Counter=(\d+)/g);
                      if (countMatch) count = countMatch[countMatch.length - 1].split('=')[1];
                  }
                  return (
                      <div className="card">
                          <div className="text-sm font-semibold mb-2">Live Word Counter</div>
                          <div className="grid grid-cols-1 gap-2 text-center">
                              <div>
                                  <div className="text-xs text-gray-500">Words Found</div>
                                  <div className="p-2 bg-fuchsia-100 rounded mt-1 font-bold text-lg">{count}</div>
                              </div>
                          </div>
                      </div>
                  )
              })()}
              
              {isReplaceWordProblem && (() => {
                  let find = '?', replace = '?', pos = '?';
                  const parts = input.split('|');
                  find = parts[1] || '?';
                  replace = parts[2] || '?';
                  if (current.mem) {
                      const memString = current.mem.join('|');
                      const posMatch = memString.match(/pos\s*=\s*(-?\d+)/);
                      if (posMatch) pos = posMatch[1];
                  }
                  return (
                      <div className="card">
                          <div className="text-sm font-semibold mb-2">Live Trace</div>
                          <div className="space-y-2">
                              <div>
                                  <div className="text-xs text-gray-500">Find Word</div>
                                  <div className="p-2 bg-purple-100 rounded mt-1 font-bold text-base mono">"{find}"</div>
                              </div>
                              <div>
                                  <div className="text-xs text-gray-500">Replace With</div>
                                  <div className="p-2 bg-emerald-100 rounded mt-1 font-bold text-base mono">"{replace}"</div>
                              </div>
                              <div>
                                  <div className="text-xs text-gray-500">Position (pos)</div>
                                  <div className="p-2 bg-sky-100 rounded mt-1 font-bold text-base mono">{pos}</div>
                              </div>
                          </div>
                      </div>
                  )
              })()}

              {(isVectorProblem || isReverseWordsProblem) && (() => {
                  let vectorItems: string[] = [];
                  if (current.mem) {
                      const memString = current.mem.join('|');
                      const vecMatch = memString.match(/vString=\[(.*?)\]/);
                      if (vecMatch && vecMatch[1]) {
                          vectorItems = vecMatch[1].split(',').filter(Boolean);
                      } else if (vecMatch) {
                          vectorItems = [];
                      }
                  }
                  return (
                      <div className="card">
                          <div className="text-sm font-semibold mb-2">Live Vector</div>
                          <div className="paper text-sm space-y-1 p-2" style={{minHeight: 100, maxHeight: 200, overflowY: 'auto'}}>
                              {vectorItems.length > 0 ? vectorItems.map((item, index) => (
                                  <div key={index} className={`flex items-center gap-2 p-1 rounded transition-colors ${isReverseWordsProblem && current.phase === 'reverse' && current.i === index ? 'bg-yellow-300' : ''}`}>
                                      <span className="text-xs text-gray-500 w-4">{index}:</span>
                                      <span className="p-1 bg-sky-100 rounded text-xs mono w-full">"{item}"</span>
                                  </div>
                              )) : <div className="text-gray-500 italic text-xs">Vector is empty.</div>}
                          </div>
                      </div>
                  )
              })()}
              
              <div className="card">
                  <div className="text-sm font-semibold mb-2">Key Concepts</div>
                  <div className="flex flex-wrap gap-2">
                    {problem.keyConcepts.map((concept, i) => (
                      <span key={i} className="pill bg-amber-200 text-amber-900 text-xs font-semibold">{concept}</span>
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