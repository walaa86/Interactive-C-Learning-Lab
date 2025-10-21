import type { Problem, Step } from '../types';

function genPrintFirstLettersSteps(str: string): Step[] {
  const steps: Step[] = [];
  let output: string[] = [];
  let isFirst = true;
  steps.push({ i: -1, code: 'bool isFirstLetter = true;', explanation: 'Init: isFirstLetter = true', input: str, output: [...output], modified: str, mem: [`isFirst=true`] });
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    steps.push({ i, code: `if (S1[${i}] != ' ' && isFirstLetter)`, explanation: `Check char '${ch === ' ' ? 'space' : ch}'`, input: str, output: [...output], modified: str, mem: [] });
    if (ch !== ' ' && isFirst) {
      output.push(ch);
      steps.push({ i, code: `cout << S1[${i}]`, explanation: `Printed '${ch}'`, input: str, output: [...output], modified: str, mem: [`Printed '${ch}'`] });
    }
    const newIsFirst = (ch === ' ');
    steps.push({ i, code: `isFirstLetter = (S1[${i}] == ' ' ? true : false);`, explanation: `Set isFirstLetter = ${newIsFirst}`, input: str, output: [...output], mem: [`isFirst -> ${newIsFirst}`] });
    isFirst = newIsFirst;
  }
  steps.push({ i: str.length, code: 'end', explanation: 'Done', input: str, output: [...output], modified: str, mem: [`Final output = ${output.join('')}`] });
  return steps;
}

function genUpperFirstSteps(str: string): Step[] {
  const steps: Step[] = [];
  let arr = str.split('');
  let isFirst = true;
  steps.push({ i: -1, code: 'bool isFirstLetter = true;', explanation: 'Init', input: str, modified: arr.join(''), mem: [`isFirst=true`] });
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    steps.push({ i, code: `if (S1[${i}] != ' ' && isFirstLetter)`, explanation: `Check '${ch === ' ' ? 'space' : ch}'`, input: str, modified: arr.join(''), mem: [] });
    if (ch !== ' ' && isFirst) {
      const before = arr[i]; arr[i] = arr[i].toUpperCase();
      steps.push({ i, code: `S1[${i}] = toupper(S1[${i}]);`, explanation: `Changed '${before}' -> '${arr[i]}'`, input: str, modified: arr.join(''), mem: [`S1[${i}] -> ${arr[i]}`] });
    }
    const newIsFirst = (ch === ' ');
    steps.push({ i, code: `isFirstLetter = (S1[${i}] == ' ' ? true : false);`, explanation: `isFirst=${newIsFirst}`, input: str, modified: arr.join(''), mem: [`isFirst -> ${newIsFirst}`] });
    isFirst = newIsFirst;
  }
  steps.push({ i: str.length, code: 'end', explanation: 'Done', input: str, modified: arr.join(''), mem: [`Result = ${arr.join('')}`] });
  return steps;
}

function genLowerFirstSteps(str: string): Step[] {
  const steps: Step[] = [];
  let arr = str.split('');
  let isFirst = true;
  steps.push({ i: -1, code: 'bool isFirstLetter = true;', explanation: 'Init', input: str, modified: arr.join(''), mem: [`isFirst=true`] });
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    steps.push({ i, code: `if (S1[${i}] != ' ' && isFirstLetter)`, explanation: `Check '${ch === ' ' ? 'space' : ch}'`, input: str, modified: arr.join(''), mem: [] });
    if (ch !== ' ' && isFirst) {
      const before = arr[i]; arr[i] = arr[i].toLowerCase();
      steps.push({ i, code: `S1[${i}] = tolower(S1[${i}]);`, explanation: `Changed '${before}' -> '${arr[i]}'`, input: str, modified: arr.join(''), mem: [`S1[${i}] -> ${arr[i]}`] });
    }
    const newIsFirst = (ch === ' ');
    steps.push({ i, code: `isFirstLetter = (S1[${i}] == ' ' ? true : false);`, explanation: `isFirst=${newIsFirst}`, input: str, modified: arr.join(''), mem: [`isFirst -> ${newIsFirst}`] });
    isFirst = newIsFirst;
  }
  steps.push({ i: str.length, code: 'end', explanation: 'Done', input: str, modified: arr.join(''), mem: [`Result = ${arr.join('')}`] });
  return steps;
}

function genUpperThenLowerSteps(str: string): Step[] {
  const steps: Step[] = [];
  let arr = str.split('');
  steps.push({ i: -1, phase: 'upper', code: 'ReadString()', explanation: 'Read input', input: str, modified: arr.join(''), mem: [`S1 read: "${str}"`] });
  for (let i = 0; i < arr.length; i++) {
    const before = arr[i];
    arr[i] = arr[i].toUpperCase();
    steps.push({ i, phase: 'upper', code: `S1[${i}] = toupper(S1[${i}])`, explanation: `Upper '${before}' -> '${arr[i]}'`, input: str, modified: arr.join(''), mem: [`Upper S1[${i}] -> ${arr[i]}`] });
  }
  steps.push({ i: arr.length, phase: 'upper', code: 'Print S1 (Upper)', explanation: 'Print uppercased string', input: str, modified: arr.join(''), mem: [`Printed upper: ${arr.join('')}`] });
  for (let i = 0; i < arr.length; i++) {
    const before = arr[i];
    arr[i] = arr[i].toLowerCase();
    steps.push({ i, phase: 'lower', code: `S1[${i}] = tolower(S1[${i}])`, explanation: `Lower '${before}' -> '${arr[i]}'`, input: str, modified: arr.join(''), mem: [`Lower S1[${i}] -> ${arr[i]}`] });
  }
  steps.push({ i: arr.length, phase: 'lower', code: 'Print S1 (Lower)', explanation: 'Print lowercased string', input: str, modified: arr.join(''), mem: [`Printed lower: ${arr.join('')}`] });
  return steps;
}

function genInvertCaseSteps(str: string): Step[] {
  const steps: Step[] = [];
  const char = str ? str[0] : '';
  if (!char) {
    steps.push({ code: 'end', explanation: 'No input character provided.', input: '', mem: ['Program finished.'], i: -1 });
    return steps;
  }

  const isUpper = char >= 'A' && char <= 'Z';
  const isLower = char >= 'a' && char <= 'z';
  const canInvert = isUpper || isLower;
  const invertedChar = canInvert ? (isUpper ? char.toLowerCase() : char.toUpperCase()) : char;

  steps.push({
    i: -1,
    phase: 'read',
    code: 'char Ch1 = ReadChar();',
    explanation: `Reads the character '${char}' from the user.`,
    input: str,
    modified: char,
    mem: [`Variable Ch1 = '${char}'`],
  });

  steps.push({
    i: 0,
    phase: 'invert',
    code: 'isupper(Ch1) ? tolower(Ch1) : toupper(Ch1);',
    explanation: canInvert ? `Checking case of '${char}'. It is ${isUpper ? 'uppercase' : 'lowercase'}.` : `Character '${char}' has no case to invert.`,
    input: str,
    modified: char,
    mem: canInvert ? [`isUpper('${char}') -> ${isUpper}`] : [`'${char}' is not a letter`],
  });

  steps.push({
    i: 1,
    phase: 'invert',
    code: `Ch1 = InvertLetterCase(Ch1);`,
    explanation: canInvert ? `Inverting the case. '${char}' becomes '${invertedChar}'.` : `Character remains unchanged.`,
    input: str,
    modified: invertedChar,
    mem: [`Ch1 = '${invertedChar}'`],
  });

  steps.push({
    i: 2,
    phase: 'print',
    code: 'cout << Ch1 << endl;',
    explanation: `Printing the final character.`,
    input: str,
    modified: invertedChar,
    output: [invertedChar],
    mem: [`Printed: '${invertedChar}'`],
  });
    
  steps.push({
    i: 3,
    code: 'return 0;',
    explanation: 'Program finished successfully.',
    input: str,
    modified: invertedChar,
    output: [invertedChar],
    mem: ['Done'],
  });

  return steps;
}

function genCountCaseSteps(str: string): Step[] {
  const steps: Step[] = [];
  let capitalCount = 0;
  let smallCount = 0;

  steps.push({
    i: -1,
    code: 'short capitalCount = 0;\nshort smallCount = 0;',
    explanation: 'Initialize counters for capital and small letters.',
    input: str,
    modified: str,
    mem: [`capitalCount=${capitalCount}`, `smallCount=${smallCount}`]
  });

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const isCapital = ch >= 'A' && ch <= 'Z';
    const isSmall = ch >= 'a' && ch <= 'z';
    let explanation = `Processing character '${ch}': `;
    const currentMem: string[] = [];
    
    if (isCapital) {
      capitalCount++;
      explanation += `It's a capital letter. Incrementing capital count.`;
    } else if (isSmall) {
      smallCount++;
      explanation += `It's a small letter. Incrementing small count.`;
    } else {
      explanation += `Not an alphabet character. No change in counts.`;
    }
    
    currentMem.push(`capitalCount=${capitalCount}`, `smallCount=${smallCount}`);

    steps.push({
      i,
      code: `// Check S1[${i}] which is '${ch}'`,
      explanation: explanation,
      input: str,
      modified: str,
      mem: currentMem
    });
  }

  steps.push({
    i: str.length,
    code: 'return;',
    explanation: 'Finished counting all characters in the string.',
    input: str,
    modified: str,
    mem: [`Final capitalCount=${capitalCount}`, `Final smallCount=${smallCount}`],
    output: [`Caps: ${capitalCount}, Smalls: ${smallCount}`]
  });
  return steps;
}

function genCountLetterSteps(combinedStr: string): Step[] {
  const [str, letterToCount] = combinedStr.includes('|') ? combinedStr.split('|') : [combinedStr, ''];
  if (!letterToCount) {
    return [{ i: -1, code: 'Error', explanation: 'Please provide a string and a character to count, separated by a pipe (|). E.g., "hello|l"', input: combinedStr, mem: [] }];
  }
  
  const steps: Step[] = [];
  let counter = 0;

  steps.push({
    i: -1,
    code: 'short Counter = 0;',
    explanation: `Initialize Counter to 0. Target character is '${letterToCount}'.`,
    input: combinedStr,
    modified: str,
    mem: [`target='${letterToCount}'`, `count=${counter}`]
  });

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const match = ch === letterToCount;
    
    steps.push({
      i,
      code: `if (S1[${i}] == Letter)`,
      explanation: `Checking if character '${ch}' at index ${i} matches target '${letterToCount}'. Match: ${match ? 'Yes' : 'No'}.`,
      input: combinedStr,
      modified: str,
      mem: [`target='${letterToCount}'`, `count=${counter}`]
    });
    
    if (match) {
      counter++;
      steps.push({
        i,
        code: `Counter++;`,
        explanation: `Match found! Incrementing counter.`,
        input: combinedStr,
        modified: str,
        mem: [`target='${letterToCount}'`, `count=${counter}`]
      });
    }
  }

  steps.push({
    i: str.length,
    code: 'return Counter;',
    explanation: `Finished loop. The character '${letterToCount}' appeared ${counter} time(s).`,
    input: combinedStr,
    modified: str,
    mem: [`target='${letterToCount}'`, `count=${counter}`],
    output: [`Count for '${letterToCount}': ${counter}`]
  });
  return steps;
}

function genCountLetterCaseInsensitiveSteps(combinedStr: string): Step[] {
  const [str, letterToCount] = combinedStr.includes('|') ? combinedStr.split('|') : [combinedStr, ''];
  if (!letterToCount) {
    return [{ i: -1, code: 'Error', explanation: 'Please provide a string and a character to count, separated by a pipe (|). E.g., "hello|l"', input: combinedStr, mem: [] }];
  }
  
  const steps: Step[] = [];
  let sensitiveCounter = 0;
  let insensitiveCounter = 0;
  const invertedLetter = letterToCount.toLowerCase() === letterToCount ? letterToCount.toUpperCase() : letterToCount.toLowerCase();

  // Phase 1: Case-Sensitive
  steps.push({
    i: -1,
    phase: 'sensitive',
    code: 'CountLetter(S1, Ch1, true); // Case-Sensitive',
    explanation: `Start case-sensitive count for target character '${letterToCount}'.`,
    input: combinedStr,
    modified: str,
    mem: [`target='${letterToCount}'`, `count=${sensitiveCounter}`]
  });

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const match = ch === letterToCount;
    
    steps.push({
      i,
      phase: 'sensitive',
      code: `if (S1[${i}] == Letter)`,
      explanation: `Checking if '${ch}' matches '${letterToCount}'. Match: ${match ? 'Yes' : 'No'}.`,
      input: combinedStr,
      modified: str,
      mem: [`target='${letterToCount}'`, `count=${sensitiveCounter}`]
    });
    
    if (match) {
      sensitiveCounter++;
      steps.push({
        i,
        phase: 'sensitive',
        code: `Counter++;`,
        explanation: `Match found! Incrementing counter.`,
        input: combinedStr,
        modified: str,
        mem: [`target='${letterToCount}'`, `count=${sensitiveCounter}`]
      });
    }
  }

  steps.push({
    i: str.length,
    phase: 'sensitive',
    code: '// End of case-sensitive count',
    explanation: `Finished first loop. Case-sensitive count for '${letterToCount}' is ${sensitiveCounter}.`,
    input: combinedStr,
    modified: str,
    mem: [`count=${sensitiveCounter}`],
    output: [`Sensitive Count: ${sensitiveCounter}`]
  });

  // Phase 2: Case-Insensitive
  steps.push({
    i: -1,
    phase: 'insensitive',
    code: 'CountLetter(S1, Ch1, false); // Case-Insensitive',
    explanation: `Start case-insensitive count for target '${letterToCount}' or '${invertedLetter}'.`,
    input: combinedStr,
    modified: str,
    mem: [`target='${letterToCount}' (case-insensitive)`, `count=${insensitiveCounter}`]
  });
  
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const match = ch.toLowerCase() === letterToCount.toLowerCase();
    
    steps.push({
      i,
      phase: 'insensitive',
      code: `if (tolower(S1[${i}]) == tolower(Letter))`,
      explanation: `Checking if '${ch}' (as '${ch.toLowerCase()}') matches '${letterToCount}' (as '${letterToCount.toLowerCase()}'). Match: ${match ? 'Yes' : 'No'}.`,
      input: combinedStr,
      modified: str,
      mem: [`target='${letterToCount}' (case-insensitive)`, `count=${insensitiveCounter}`]
    });
    
    if (match) {
      insensitiveCounter++;
      steps.push({
        i,
        phase: 'insensitive',
        code: `Counter++;`,
        explanation: `Match found! Incrementing counter.`,
        input: combinedStr,
        modified: str,
        mem: [`target='${letterToCount}' (case-insensitive)`, `count=${insensitiveCounter}`]
      });
    }
  }

  steps.push({
    i: str.length,
    phase: 'insensitive',
    code: 'return;',
    explanation: `Finished second loop. Case-insensitive count is ${insensitiveCounter}.`,
    input: combinedStr,
    modified: str,
    mem: [`count=${insensitiveCounter}`],
    output: [`Sensitive: ${sensitiveCounter}`, `Insensitive: ${insensitiveCounter}`]
  });

  return steps;
}

function genIsVowelSteps(str: string): Step[] {
  const steps: Step[] = [];
  const char = str ? str[0] : '';
  if (!char) {
    steps.push({ code: 'end', explanation: 'No input character provided.', input: '', mem: ['Program finished.'], i: -1 });
    return steps;
  }
  const charLower = char.toLowerCase();
  const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(charLower);

  steps.push({
    i: 0,
    phase: 'read',
    code: 'char Ch1 = ReadChar();',
    explanation: `Read the character '${char}'.`,
    input: str,
    modified: char,
    mem: [`Ch1 = '${char}'`],
  });
  
  steps.push({
    i: 1,
    phase: 'convert',
    code: 'Ch1 = tolower(Ch1);',
    explanation: `Convert '${char}' to lowercase for case-insensitive check. Result: '${charLower}'.`,
    input: str,
    modified: charLower,
    mem: [`Ch1 becomes '${charLower}'`],
  });

  steps.push({
    i: 2,
    phase: 'check',
    code: `return ((Ch1 == 'a') || (Ch1 == 'e') || ...);`,
    explanation: `Checking if '${charLower}' is one of 'a', 'e', 'i', 'o', 'u'. Result is ${isVowel}.`,
    input: str,
    modified: charLower,
    mem: [`IsVowel('${charLower}') -> ${isVowel}`],
  });
  
  steps.push({
    i: 3,
    phase: 'result',
    code: `if (IsVowel(Ch1)) { ... } else { ... }`,
    explanation: `The check returned ${isVowel}, so the ${isVowel ? 'if' : 'else'} block is executed.`,
    input: str,
    modified: charLower,
    output: [isVowel ? `YES Letter '${char}' is vowel` : `NO Letter '${char}' is NOT vowel`],
    mem: [`Printed final result.`],
  });

  steps.push({
    i: 4,
    code: 'return 0;',
    explanation: 'Program finished.',
    input: str,
    modified: charLower,
    mem: ['Done'],
  });

  return steps;
}

function genCountVowelsSteps(str: string): Step[] {
  const steps: Step[] = [];
  let counter = 0;

  steps.push({
    i: -1,
    code: 'short Counter = 0;',
    explanation: 'Initialize vowel counter to 0.',
    input: str,
    modified: str,
    mem: [`count=${counter}`]
  });

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const chLower = ch.toLowerCase();
    const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(chLower);

    steps.push({
      i,
      code: `if (IsVowel(S1[${i}]))`,
      explanation: `Checking character '${ch}'. IsVowel converts it to '${chLower}' and checks. Result: ${isVowel}.`,
      input: str,
      modified: str,
      mem: [`count=${counter}`]
    });

    if (isVowel) {
      counter++;
      steps.push({
        i,
        code: `Counter++;`,
        explanation: `It's a vowel! Incrementing counter.`,
        input: str,
        modified: str,
        mem: [`count=${counter}`]
      });
    }
  }

  steps.push({
    i: str.length,
    code: 'return Counter;',
    explanation: `Finished loop. The string has ${counter} vowel(s).`,
    input: str,
    modified: str,
    mem: [`count=${counter}`],
    output: [`Number of vowels is: ${counter}`]
  });
  return steps;
}

function genPrintVowelsSteps(str: string): Step[] {
  const steps: Step[] = [];
  let output: string[] = [];

  steps.push({
    i: -1,
    code: 'cout << "Vowels in string are: ";',
    explanation: 'Begin iterating through the string to find and print vowels.',
    input: str,
    modified: str,
    output: [],
    mem: ['Start loop']
  });

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const chLower = ch.toLowerCase();
    const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(chLower);

    steps.push({
      i,
      code: `if (IsVowel(S1[${i}]))`,
      explanation: `Checking character '${ch}'. IsVowel converts it to '${chLower}' and checks. Result: ${isVowel}.`,
      input: str,
      modified: str,
      output: [...output],
      mem: []
    });

    if (isVowel) {
      output.push(ch);
      steps.push({
        i,
        code: `cout << S1[i] << "   ";`,
        explanation: `It's a vowel! Printing character '${ch}'.`,
        input: str,
        modified: str,
        output: [...output],
        mem: [`Printed '${ch}'`]
      });
    }
  }

  steps.push({
    i: str.length,
    code: 'cout << endl;',
    explanation: `Finished loop. All vowels have been printed.`,
    input: str,
    modified: str,
    output: [...output],
    mem: [`Final vowels: ${output.join(', ')}`]
  });
  return steps;
}

function genPrintWordsSteps(str: string): Step[] {
  const steps: Step[] = [];
  let s1 = str;
  let output: string[] = [];
  const delim = " ";
  let stepCounter = 0;

  steps.push({
    i: stepCounter++,
    code: `string S1 = "${str}";`,
    explanation: 'Start with the initial string.',
    input: str,
    modified: s1,
    output: [...output],
    mem: [`S1 = "${s1}"`]
  });

  while (true) {
    const pos = s1.indexOf(delim);

    steps.push({
      i: stepCounter++,
      code: `pos = S1.find("${delim}")`,
      explanation: `Search for delimiter " ". Found at index: ${pos}. (npos is -1)`,
      input: str,
      modified: s1,
      output: [...output],
      mem: [`pos = ${pos}`]
    });
    
    steps.push({
      i: stepCounter++,
      code: `while (pos != std::string::npos)`,
      explanation: `Check loop condition: ${pos} != -1. Condition is ${pos !== -1 ? 'true, enter loop' : 'false, exit loop'}.`,
      input: str,
      modified: s1,
      output: [...output],
      mem: [`Continue loop? ${pos !== -1}`]
    });
    
    if (pos === -1) {
      break; 
    }

    const sWord = s1.substring(0, pos);
    steps.push({
      i: stepCounter++,
      code: `sWord = S1.substr(0, ${pos});`,
      explanation: `Extract word from index 0 up to delimiter. Word is "${sWord}".`,
      input: str,
      modified: s1,
      output: [...output],
      mem: [`sWord = "${sWord}"`]
    });

    if (sWord !== "") {
        output.push(sWord);
        steps.push({
          i: stepCounter++,
          code: `cout << sWord << endl;`,
          explanation: `Print the extracted word: "${sWord}".`,
          input: str,
          modified: s1,
          output: [...output],
          mem: [`Printed: "${sWord}"`]
        });
    }

    const s1BeforeErase = s1;
    s1 = s1.substring(pos + delim.length);
    steps.push({
      i: stepCounter++,
      code: `S1.erase(0, ${pos} + ${delim.length});`,
      explanation: `Erase processed part from S1. The string is now shorter.`,
      input: str,
      modified: s1,
      output: [...output],
      mem: [`S1 was: "${s1BeforeErase}"`, `S1 is now: "${s1}"`]
    });
  }

  // After loop
  if (s1 !== "") {
    output.push(s1);
    steps.push({
      i: stepCounter++,
      code: `cout << S1 << endl;`,
      explanation: `Loop finished. Print the last remaining word: "${s1}".`,
      input: str,
      modified: s1,
      output: [...output],
      mem: [`Printed last word: "${s1}"`]
    });
  } else {
    steps.push({
      i: stepCounter++,
      code: `// After loop`,
      explanation: `Loop finished. No remaining characters to print.`,
      input: str,
      modified: s1,
      output: [...output],
      mem: [`S1 is empty.`]
    });
  }

  steps.push({
    i: stepCounter++,
    code: 'return 0;',
    explanation: 'Program finished.',
    input: str,
    modified: s1,
    output: [...output],
    mem: [`Final output complete.`]
  });

  return steps;
}

function genCountWordsSteps(str: string): Step[] {
  const steps: Step[] = [];
  let s1 = str;
  let counter = 0;
  const delim = " ";
  let stepCounter = 0;

  steps.push({
    i: stepCounter++,
    code: `string S1 = "${str}";\nshort Counter = 0;`,
    explanation: 'Start with the initial string and initialize Counter to 0.',
    input: str,
    modified: s1,
    mem: [`S1 = "${s1}"`, `Counter=${counter}`]
  });

  while (true) {
    const pos = s1.indexOf(delim);

    steps.push({
      i: stepCounter++,
      code: `pos = S1.find("${delim}")`,
      explanation: `Search for delimiter " ". Found at index: ${pos}. (npos is -1)`,
      input: str,
      modified: s1,
      mem: [`pos = ${pos}`, `Counter=${counter}`]
    });
    
    steps.push({
      i: stepCounter++,
      code: `while (pos != std::string::npos)`,
      explanation: `Check loop condition: ${pos} != -1. Condition is ${pos !== -1 ? 'true, enter loop' : 'false, exit loop'}.`,
      input: str,
      modified: s1,
      mem: [`Continue loop? ${pos !== -1}`, `Counter=${counter}`]
    });
    
    if (pos === -1) {
      break; 
    }

    const sWord = s1.substring(0, pos);
    steps.push({
      i: stepCounter++,
      code: `sWord = S1.substr(0, ${pos});`,
      explanation: `Extract word from index 0 up to delimiter. Word is "${sWord}".`,
      input: str,
      modified: s1,
      mem: [`sWord = "${sWord}"`, `Counter=${counter}`]
    });

    if (sWord !== "") {
        counter++;
        steps.push({
          i: stepCounter++,
          code: `if (sWord != "") { Counter++; }`,
          explanation: `Word "${sWord}" is not empty. Incrementing counter.`,
          input: str,
          modified: s1,
          mem: [`Counter=${counter}`]
        });
    }

    const s1BeforeErase = s1;
    s1 = s1.substring(pos + delim.length);
    steps.push({
      i: stepCounter++,
      code: `S1.erase(0, ${pos} + ${delim.length});`,
      explanation: `Erase processed part from S1. The string is now shorter.`,
      input: str,
      modified: s1,
      mem: [`S1 was: "${s1BeforeErase}"`, `S1 is now: "${s1}"`, `Counter=${counter}`]
    });
  }

  // After loop
  if (s1 !== "") {
    counter++;
    steps.push({
      i: stepCounter++,
      code: `if (S1 != "") { Counter++; }`,
      explanation: `Loop finished. Count the last remaining word: "${s1}".`,
      input: str,
      modified: s1,
      mem: [`Counter=${counter}`]
    });
  } else {
    steps.push({
      i: stepCounter++,
      code: `// After loop`,
      explanation: `Loop finished. No remaining characters to count.`,
      input: str,
      modified: s1,
      mem: [`S1 is empty.`, `Counter=${counter}`]
    });
  }

  steps.push({
    i: stepCounter++,
    code: 'return Counter;',
    explanation: `Program finished. Total word count is ${counter}.`,
    input: str,
    modified: s1,
    output: [`The number of words is: ${counter}`],
    mem: [`Final Count = ${counter}`]
  });

  return steps;
}

function genSplitStringSteps(str: string): Step[] {
  const steps: Step[] = [];
  let s1 = str;
  let vString: string[] = [];
  const delim = " ";
  let stepCounter = 0;

  steps.push({
    i: stepCounter++,
    code: `vector<string> vString;`,
    explanation: 'Initialize an empty vector to store the words.',
    input: str,
    modified: s1,
    mem: [`vString=[]`]
  });

  while (true) {
    const pos = s1.indexOf(delim);

    steps.push({
      i: stepCounter++,
      code: `pos = S1.find("${delim}")`,
      explanation: `Search for delimiter " ". Found at index: ${pos}. (npos is -1)`,
      input: str,
      modified: s1,
      mem: [`pos = ${pos}`, `vString=[${vString.join(',')}]`]
    });
    
    steps.push({
      i: stepCounter++,
      code: `while (pos != std::string::npos)`,
      explanation: `Check loop condition: ${pos} != -1. Condition is ${pos !== -1 ? 'true, enter loop' : 'false, exit loop'}.`,
      input: str,
      modified: s1,
      mem: [`Continue loop? ${pos !== -1}`, `vString=[${vString.join(',')}]`]
    });
    
    if (pos === -1) {
      break; 
    }

    const sWord = s1.substring(0, pos);
    steps.push({
      i: stepCounter++,
      code: `sWord = S1.substr(0, ${pos});`,
      explanation: `Extract word from index 0 up to delimiter. Word is "${sWord}".`,
      input: str,
      modified: s1,
      mem: [`sWord = "${sWord}"`, `vString=[${vString.join(',')}]`]
    });

    if (sWord !== "") {
        vString.push(sWord);
        steps.push({
          i: stepCounter++,
          code: `vString.push_back(sWord);`,
          explanation: `Word "${sWord}" is not empty. Adding it to the vector.`,
          input: str,
          modified: s1,
          mem: [`vString=[${vString.join(',')}]`]
        });
    }

    const s1BeforeErase = s1;
    s1 = s1.substring(pos + delim.length);
    steps.push({
      i: stepCounter++,
      code: `S1.erase(0, ${pos} + ${delim.length});`,
      explanation: `Erase processed part from S1. The string is now shorter.`,
      input: str,
      modified: s1,
      mem: [`S1 was: "${s1BeforeErase}"`, `S1 is now: "${s1}"`, `vString=[${vString.join(',')}]`]
    });
  }

  // After loop
  if (s1 !== "") {
    vString.push(s1);
    steps.push({
      i: stepCounter++,
      code: `vString.push_back(S1);`,
      explanation: `Loop finished. Add the last remaining word "${s1}" to the vector.`,
      input: str,
      modified: s1,
      mem: [`vString=[${vString.join(',')}]`]
    });
  } else {
    steps.push({
      i: stepCounter++,
      code: `// After loop`,
      explanation: `Loop finished. No remaining characters to add.`,
      input: str,
      modified: s1,
      mem: [`S1 is empty.`, `vString=[${vString.join(',')}]`]
    });
  }

  steps.push({
    i: stepCounter++,
    code: 'return vString;',
    explanation: `Function finished. The vector now contains ${vString.length} words and is returned.`,
    input: str,
    modified: s1,
    output: vString,
    mem: [`vString=[${vString.join(',')}]`, `size=${vString.length}`]
  });

  return steps;
}

function genTrimSteps(str: string): Step[] {
  const steps: Step[] = [];
  let output: string[] = [];

  // --- Phase: TrimLeft ---
  steps.push({
    i: -1,
    phase: 'left',
    code: 'cout << TrimLeft(S1);',
    explanation: 'Start TrimLeft: Find the first non-space character from the beginning.',
    input: str,
    modified: str,
    mem: ['Executing TrimLeft...']
  });

  let firstNonSpaceLeft = -1;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    steps.push({
      i,
      phase: 'left',
      code: `if (S1[${i}] != ' ')`,
      explanation: `Checking character at index ${i}. Is '${ch === ' ' ? 'space' : ch}' not a space? ${ch !== ' '}`,
      input: str,
      modified: str,
      mem: [`Checking S1[${i}]`]
    });
    if (ch !== ' ') {
      firstNonSpaceLeft = i;
      steps.push({
        i,
        phase: 'left',
        code: `return S1.substr(${i}, ...);`,
        explanation: `Condition met. First non-space is at index ${i}. Loop terminates.`,
        input: str,
        modified: str,
        mem: [`Found first non-space at index ${i}`]
      });
      break;
    }
  }

  const trimmedLeft = (firstNonSpaceLeft !== -1) ? str.substring(firstNonSpaceLeft) : "";
  output.push(`Trim Left = ${trimmedLeft}`);
  steps.push({
    i: firstNonSpaceLeft,
    phase: 'left',
    code: `return S1.substr(${firstNonSpaceLeft}, S1.length() - ${firstNonSpaceLeft});`,
    explanation: firstNonSpaceLeft !== -1 ? `Returning substring from index ${firstNonSpaceLeft} to the end.` : 'No non-space characters found. Returning empty string.',
    input: str,
    modified: trimmedLeft,
    output: [...output],
    mem: [`Result of TrimLeft: "${trimmedLeft}"`]
  });

  // --- Phase: TrimRight ---
  steps.push({
    i: str.length,
    phase: 'right',
    code: 'cout << TrimRight(S1);',
    explanation: 'Start TrimRight: Find the first non-space character from the end.',
    input: str,
    modified: str,
    mem: ['Executing TrimRight...']
  });

  let lastNonSpaceRight = -1;
  for (let i = str.length - 1; i >= 0; i--) {
    const ch = str[i];
    steps.push({
      i,
      phase: 'right',
      code: `if (S1[${i}] != ' ')`,
      explanation: `Checking character at index ${i} (from right). Is '${ch === ' ' ? 'space' : ch}' not a space? ${ch !== ' '}`,
      input: str,
      modified: str,
      mem: [`Checking S1[${i}]`]
    });
    if (ch !== ' ') {
      lastNonSpaceRight = i;
      steps.push({
        i,
        phase: 'right',
        code: `return S1.substr(0, ${i + 1});`,
        explanation: `Condition met. Last non-space is at index ${i}. Loop terminates.`,
        input: str,
        modified: str,
        mem: [`Found last non-space at index ${i}`]
      });
      break;
    }
  }

  const trimmedRight = (lastNonSpaceRight !== -1) ? str.substring(0, lastNonSpaceRight + 1) : "";
  output.push(`Trim Right = ${trimmedRight}`);
  steps.push({
    i: lastNonSpaceRight,
    phase: 'right',
    code: `return S1.substr(0, ${lastNonSpaceRight + 1});`,
    explanation: lastNonSpaceRight !== -1 ? `Returning substring from index 0 to ${lastNonSpaceRight}.` : 'No non-space characters found. Returning empty string.',
    input: str,
    modified: trimmedRight,
    output: [...output],
    mem: [`Result of TrimRight: "${trimmedRight}"`]
  });

  // --- Phase: Trim (All) ---
  steps.push({
    i: -1,
    phase: 'all',
    code: 'cout << Trim(S1);',
    explanation: 'Start Trim: This function composes TrimLeft and TrimRight.',
    input: str,
    modified: str,
    mem: ['Executing Trim(S1)...']
  });
  
  steps.push({
    i: -1,
    phase: 'all',
    code: 'TrimRight(S1)',
    explanation: `First, Trim calls TrimRight on the original string. The result is "${trimmedRight}".`,
    input: str,
    modified: trimmedRight,
    mem: [`Intermediate result: "${trimmedRight}"`]
  });

  const finalTrimmed = trimmedRight.trimStart();
  output.push(`Trim = ${finalTrimmed}`);
  steps.push({
    i: -1,
    phase: 'all',
    code: 'TrimLeft(...)',
    explanation: `Then, TrimLeft is called on that intermediate result ("${trimmedRight}").`,
    input: str,
    modified: finalTrimmed,
    output: [...output],
    mem: [`Final Result: "${finalTrimmed}"`]
  });

  steps.push({
    i: str.length,
    code: 'return 0;',
    explanation: 'Program finished.',
    input: str,
    modified: finalTrimmed,
    output: [...output],
    mem: ['Done']
  });

  return steps;
}

function genJoinStringSteps(str: string): Step[] {
  // For this problem, the input `str` will be the delimiter.
  const delim = str || " ";
  const vString = ["Mohammed", "Faid", "Ali", "Maher"];
  const steps: Step[] = [];
  let S1 = "";
  let stepCounter = 0;

  steps.push({
    i: stepCounter++,
    code: `string S1 = "";`,
    explanation: 'Initialize an empty string `S1` which will hold the result.',
    input: str,
    modified: S1,
    mem: [`S1 = ""`, `vString = {${vString.join(', ')}}`]
  });

  for (let i = 0; i < vString.length; i++) {
    const s = vString[i];
    const s1Before = S1;
    S1 = S1 + s + delim;
    
    steps.push({
      i: stepCounter++,
      code: `S1 = S1 + s + "${delim}";`,
      explanation: `Concatenate current string with vector element "${s}" and the delimiter.`,
      input: str,
      modified: S1,
      mem: [`s = "${s}"`, `S1 was: "${s1Before}"`, `S1 is now: "${S1}"`]
    });
  }

  steps.push({
    i: stepCounter++,
    code: `// Loop finished`,
    explanation: 'The loop has finished. The string now has an extra delimiter at the end.',
    input: str,
    modified: S1,
    mem: [`Final looped string: "${S1}"`]
  });

  const finalString = S1.substring(0, S1.length - delim.length);
  steps.push({
    i: stepCounter++,
    code: `return S1.substr(0, S1.length() - ${delim.length});`,
    explanation: `Remove the trailing delimiter using substr. The final length is original length - delimiter length.`,
    input: str,
    modified: finalString,
    output: [finalString],
    mem: [`Final result: "${finalString}"`]
  });
  
  steps.push({
    i: stepCounter++,
    code: 'return 0;',
    explanation: 'Program finished.',
    input: str,
    modified: finalString,
    output: [finalString],
    mem: ['Done']
  });

  return steps;
}

function genJoinStringOverloadSteps(str: string): Step[] {
    const delim = str || " ";
    const vString = ["Mohammed", "Faid", "Ali", "Maher"];
    const arrString = ["Mohammed", "Faid", "Ali", "Maher"];
    const steps: Step[] = [];
    let S1 = "";
    let stepCounter = 0;
    let finalVectorString = "";
    let finalArrayString = "";

    // --- Phase: Vector ---
    steps.push({
        i: stepCounter++,
        phase: 'vector',
        code: 'cout << JoinString(vString, " ");',
        explanation: 'Calling the overloaded JoinString function that accepts a std::vector.',
        input: str,
        modified: S1,
        mem: ['Calling vector version', `vString = {${vString.join(', ')}}`]
    });

    for (let i = 0; i < vString.length; i++) {
        const s = vString[i];
        const s1Before = S1;
        S1 = S1 + s + delim;
        steps.push({
            i: stepCounter++,
            phase: 'vector',
            code: `S1 = S1 + s + "${delim}";`,
            explanation: `Vector loop (i=${i}): Concatenate with element "${s}" and the delimiter.`,
            input: str,
            modified: S1,
            mem: [`s = "${s}"`, `S1 was: "${s1Before}"`, `S1 is now: "${S1}"`]
        });
    }

    steps.push({
        i: stepCounter++,
        phase: 'vector',
        code: `// Vector loop finished`,
        explanation: 'The vector loop has finished. String has a trailing delimiter.',
        input: str,
        modified: S1,
        mem: [`Looped string: "${S1}"`]
    });

    finalVectorString = S1.substring(0, S1.length - delim.length);
    steps.push({
        i: stepCounter++,
        phase: 'vector',
        code: `return S1.substr(0, S1.length() - ${delim.length});`,
        explanation: `Remove the trailing delimiter.`,
        input: str,
        modified: finalVectorString,
        output: [finalVectorString],
        mem: [`Result from vector: "${finalVectorString}"`]
    });

    // --- Phase: Array ---
    S1 = ""; // Reset for the next part
    steps.push({
        i: stepCounter++,
        phase: 'array',
        code: 'cout << JoinString(arrString, 4, " ");',
        explanation: 'Calling the overloaded JoinString function that accepts a C-style array and its length.',
        input: str,
        modified: S1,
        mem: ['Calling array version', `arrString = {${arrString.join(', ')}}`, `S1 = ""`]
    });

    for (let i = 0; i < arrString.length; i++) {
        const s = arrString[i];
        const s1Before = S1;
        S1 = S1 + s + delim;
        steps.push({
            i: stepCounter++,
            phase: 'array',
            code: `S1 = S1 + arrString[${i}] + "${delim}";`,
            explanation: `Array loop (i=${i}): Concatenate with element "${s}" and the delimiter.`,
            input: str,
            modified: S1,
            output: [finalVectorString],
            mem: [`arrString[${i}] = "${s}"`, `S1 was: "${s1Before}"`, `S1 is now: "${S1}"`]
        });
    }
    
    steps.push({
        i: stepCounter++,
        phase: 'array',
        code: `// Array loop finished`,
        explanation: 'The array loop has finished. String has a trailing delimiter.',
        input: str,
        modified: S1,
        output: [finalVectorString],
        mem: [`Looped string: "${S1}"`]
    });

    finalArrayString = S1.substring(0, S1.length - delim.length);
    steps.push({
        i: stepCounter++,
        phase: 'array',
        code: `return S1.substr(0, S1.length() - ${delim.length});`,
        explanation: `Remove the trailing delimiter.`,
        input: str,
        modified: finalArrayString,
        output: [finalVectorString, finalArrayString],
        mem: [`Result from array: "${finalArrayString}"`]
    });

    steps.push({
        i: stepCounter++,
        code: 'return 0;',
        explanation: 'Program finished.',
        input: str,
        modified: finalArrayString,
        output: [finalVectorString, finalArrayString],
        mem: ['Done']
    });

    return steps;
}

function genReverseWordsSteps(str: string): Step[] {
  const steps: Step[] = [];
  let s1 = str;
  let vString: string[] = [];
  const delim = " ";
  let stepCounter = 0;

  // --- Phase 1: Split ---
  steps.push({
    i: stepCounter++,
    phase: 'split',
    code: `vString = SplitString(S1, " ");`,
    explanation: 'Start by splitting the input string into words and storing them in a vector.',
    input: str,
    modified: s1,
    mem: [`vString=[]`]
  });

  const words = str.split(delim).filter(Boolean);
  for (const word of words) {
    vString.push(word);
    steps.push({
      i: stepCounter++,
      phase: 'split',
      code: `vString.push_back("${word}");`,
      explanation: `Extracted word "${word}" and added it to the vector.`,
      input: str,
      modified: s1,
      mem: [`vString=[${vString.join(',')}]`]
    });
  }

  steps.push({
    i: stepCounter++,
    phase: 'split',
    code: `// Splitting complete`,
    explanation: `The string has been split into ${vString.length} words.`,
    input: str,
    modified: s1,
    mem: [`vString=[${vString.join(',')}]`]
  });

  // --- Phase 2: Reverse ---
  let S2 = "";
  steps.push({
    i: -1,
    phase: 'reverse',
    code: `vector<string>::iterator iter = vString.end();`,
    explanation: 'Initialize an empty result string `S2` and an iterator pointing to the end of the vector.',
    input: str,
    modified: S2,
    mem: [`S2 = ""`, `iterator at end`, `vString=[${vString.join(',')}]`]
  });

  for (let i = vString.length - 1; i >= 0; i--) {
    const word = vString[i];
    steps.push({
      i: i, // Use vector index for highlighting
      phase: 'reverse',
      code: `--iter;`,
      explanation: `Decrement iterator. It now points to the word "${word}".`,
      input: str,
      modified: S2,
      mem: [`iterator at index ${i}`, `vString=[${vString.join(',')}]`]
    });

    const s2Before = S2;
    S2 += word + " ";
    steps.push({
      i: i,
      phase: 'reverse',
      code: `S2 += *iter + " ";`,
      explanation: `Append the word "${word}" and a space to the result string S2.`,
      input: str,
      modified: S2,
      mem: [`S2 was: "${s2Before}"`, `S2 is now: "${S2}"`, `vString=[${vString.join(',')}]`]
    });
  }
  
  steps.push({
      i: -1,
      phase: 'reverse',
      code: `// Loop finished`,
      explanation: 'The reverse loop has finished. The string now has an extra space at the end.',
      input: str,
      modified: S2,
      mem: [`Final looped string: "${S2}"`, `vString=[${vString.join(',')}]`]
  });

  const finalString = S2.trim();
  steps.push({
      i: -1,
      phase: 'reverse',
      code: `S2 = S2.substr(0, S2.length() - 1);`,
      explanation: `Remove the trailing space from the result string.`,
      input: str,
      modified: finalString,
      output: [finalString],
      mem: [`Final result: "${finalString}"`, `vString=[${vString.join(',')}]`]
  });

  steps.push({
    i: -1,
    code: 'return S2;',
    explanation: 'Program finished. Returning the reversed string.',
    input: str,
    modified: finalString,
    output: [finalString],
    mem: ['Done']
  });

  return steps;
}

function genReplaceWordSteps(combinedStr: string): Step[] {
  const parts = combinedStr.split('|');
  const S1 = parts[0];
  const StringToReplace = parts[1];
  const sRepalceTo = parts[2];

  if (!S1 || !StringToReplace || sRepalceTo === undefined) {
    return [{ i: -1, code: 'Error', explanation: 'Input must be in the format "Original String|Word to Replace|Replacement Word"', input: combinedStr, mem: [] }];
  }

  const steps: Step[] = [];
  let currentS1 = S1;
  let stepCounter = 0;

  steps.push({
    i: stepCounter++,
    code: `// Initial values`,
    explanation: `Start with the original string. We need to replace all occurrences of "${StringToReplace}" with "${sRepalceTo}".`,
    input: combinedStr,
    modified: currentS1,
    mem: [`S1 = "${currentS1}"`, `find="${StringToReplace}"`, `replace="${sRepalceTo}"`]
  });

  while (true) {
    const pos = currentS1.indexOf(StringToReplace);
    
    steps.push({
      i: stepCounter++,
      code: `short pos = S1.find("${StringToReplace}");`,
      explanation: `Search for "${StringToReplace}". Found at index: ${pos}. (npos is -1)`,
      input: combinedStr,
      modified: currentS1,
      mem: [`pos = ${pos}`]
    });

    steps.push({
      i: stepCounter++,
      code: `while (pos != std::string::npos)`,
      explanation: `Check loop condition: ${pos} != -1. Condition is ${pos !== -1 ? 'true, enter loop' : 'false, exit loop'}.`,
      input: combinedStr,
      modified: currentS1,
      mem: [`Continue loop? ${pos !== -1}`]
    });

    if (pos === -1) {
      break;
    }

    const s1BeforeReplace = currentS1;
    currentS1 = currentS1.substring(0, pos) + sRepalceTo + currentS1.substring(pos + StringToReplace.length);
    
    steps.push({
      i: stepCounter++,
      code: `S1 = S1.replace(${pos}, ${StringToReplace.length}, "${sRepalceTo}");`,
      explanation: `Replacing substring at index ${pos}.`,
      input: combinedStr,
      modified: currentS1,
      mem: [`S1 was: "${s1BeforeReplace}"`, `S1 is now: "${currentS1}"`]
    });
  }

  steps.push({
    i: stepCounter++,
    code: `return S1;`,
    explanation: `Loop finished because no more occurrences of "${StringToReplace}" were found. Returning the final string.`,
    input: combinedStr,
    modified: currentS1,
    output: [currentS1],
    mem: [`Final result: "${currentS1}"`]
  });
  
  steps.push({
    i: stepCounter++,
    code: 'return 0;',
    explanation: 'Program finished.',
    input: combinedStr,
    modified: currentS1,
    output: [currentS1],
    mem: ['Done']
  });

  return steps;
}

function genRemovePunctuationsSteps(str: string): Step[] {
  const steps: Step[] = [];
  let S2 = "";
  const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

  steps.push({
    i: -1,
    code: `string S2 = "";`,
    explanation: 'Initialize an empty string `S2` to store the result without punctuations.',
    input: str,
    modified: S2,
    mem: [`S2 = ""`],
  });

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const isPunctuation = punctuation.includes(ch);

    steps.push({
      i,
      code: `if (!ispunct(S1[${i}]))`,
      explanation: `Checking character '${ch}' at index ${i}. Is it punctuation? ${isPunctuation ? 'Yes' : 'No'}.`,
      input: str,
      modified: S2,
      mem: [`ispunct('${ch}') -> ${isPunctuation}`]
    });

    if (!isPunctuation) {
      const s2Before = S2;
      S2 += ch;
      steps.push({
        i,
        code: `S2 += S1[${i}];`,
        explanation: `Character '${ch}' is not punctuation. Appending it to S2.`,
        input: str,
        modified: S2,
        mem: [`S2 was: "${s2Before}"`, `S2 is now: "${S2}"`]
      });
    }
  }

  steps.push({
    i: str.length,
    code: `return S2;`,
    explanation: 'Finished loop. Returning the string with punctuations removed.',
    input: str,
    modified: S2,
    output: [S2],
    mem: [`Final result: "${S2}"`]
  });

  steps.push({
    i: str.length + 1,
    code: 'return 0;',
    explanation: 'Program finished.',
    input: str,
    modified: S2,
    output: [S2],
    mem: ['Done']
  });

  return steps;
}

function genStructToLineSteps(separator: string): Step[] {
  const Client = {
    AccountNumber: "A1234",
    PinCode: "5678",
    Name: "Mohammed Abu-Hadhoud",
    Phone: "079000000",
    AccountBalance: 5124.88
  };
  
  const steps: Step[] = [];
  let stClientRecord = "";

  steps.push({
    i: 0,
    code: `string stClientRecord = "";`,
    explanation: "Start with a fixed client data record and initialize an empty string to build the record line.",
    input: separator,
    modified: "",
    mem: [`stClientRecord = ""`]
  });

  stClientRecord += Client.AccountNumber + separator;
  steps.push({
    i: 1,
    field: 'AccountNumber',
    code: `stClientRecord += Client.AccountNumber + Seperator;`,
    explanation: `Append Account Number ("${Client.AccountNumber}") and the separator.`,
    input: separator,
    modified: stClientRecord,
    mem: [`stClientRecord is now "${stClientRecord}"`]
  });

  stClientRecord += Client.PinCode + separator;
  steps.push({
    i: 2,
    field: 'PinCode',
    code: `stClientRecord += Client.PinCode + Seperator;`,
    explanation: `Append Pin Code ("${Client.PinCode}") and the separator.`,
    input: separator,
    modified: stClientRecord,
    mem: [`stClientRecord is now "${stClientRecord}"`]
  });

  stClientRecord += Client.Name + separator;
  steps.push({
    i: 3,
    field: 'Name',
    code: `stClientRecord += Client.Name + Seperator;`,
    explanation: `Append Name ("${Client.Name}") and the separator.`,
    input: separator,
    modified: stClientRecord,
    mem: [`stClientRecord is now "${stClientRecord}"`]
  });

  stClientRecord += Client.Phone + separator;
  steps.push({
    i: 4,
    field: 'Phone',
    code: `stClientRecord += Client.Phone + Seperator;`,
    explanation: `Append Phone ("${Client.Phone}") and the separator.`,
    input: separator,
    modified: stClientRecord,
    mem: [`stClientRecord is now "${stClientRecord}"`]
  });

  stClientRecord += Client.AccountBalance.toString();
  steps.push({
    i: 5,
    field: 'AccountBalance',
    code: `stClientRecord += to_string(Client.AccountBalance);`,
    explanation: `Convert Account Balance (${Client.AccountBalance}) to string and append it. This is the last field, so no separator is added.`,
    input: separator,
    modified: stClientRecord,
    mem: [`stClientRecord is now "${stClientRecord}"`]
  });

  steps.push({
    i: 6,
    code: `return stClientRecord;`,
    explanation: "The function returns the final, complete client record as a single line.",
    input: separator,
    modified: stClientRecord,
    output: [stClientRecord],
    mem: [`Final record: "${stClientRecord}"`]
  });

  return steps;
}

function genLineToStructSteps(line: string): Step[] {
    const steps: Step[] = [];
    const separator = "#//#";
    let s1 = line;
    let vString: string[] = [];
    let stepCounter = 0;

    // --- Phase 1: Split String into Vector ---
    steps.push({
        i: stepCounter++,
        phase: 'split',
        code: `vClientData = SplitString(Line, "${separator}");`,
        explanation: 'Start by splitting the input line into tokens using the SplitString function.',
        input: line,
        modified: s1,
        mem: [`vString=[]`]
    });

    while (s1.includes(separator)) {
        const pos = s1.indexOf(separator);
        const sWord = s1.substring(0, pos);
        if (sWord) vString.push(sWord);
        steps.push({
            i: stepCounter++,
            phase: 'split',
            code: `// Inside SplitString loop...`,
            explanation: `Found token "${sWord}" and added it to the vector.`,
            input: line,
            modified: s1.substring(pos + separator.length),
            mem: [`vString=[${vString.join(',')}]`]
        });
        s1 = s1.substring(pos + separator.length);
    }
    if (s1) vString.push(s1);

    steps.push({
        i: stepCounter++,
        phase: 'split',
        code: `// Splitting complete`,
        explanation: `The line has been split into ${vString.length} tokens.`,
        input: line,
        modified: '',
        mem: [`vString=[${vString.join(',')}]`]
    });

    // --- Phase 2: Assign Vector elements to Struct fields ---
    const Client: any = { AccountNumber: "", PinCode: "", Name: "", Phone: "", AccountBalance: 0.0 };
    const fields: ('AccountNumber' | 'PinCode' | 'Name' | 'Phone' | 'AccountBalance')[] = ['AccountNumber', 'PinCode', 'Name', 'Phone', 'AccountBalance'];
    
    steps.push({
        i: stepCounter++,
        phase: 'assign',
        code: `sClient Client;`,
        explanation: 'An empty sClient struct is created in memory.',
        input: line,
        modified: '',
        mem: [`Client struct is empty`, `vString=[${vString.join(',')}]`]
    });

    for (let i = 0; i < fields.length; i++) {
        const fieldName = fields[i];
        const value = vString[i] || "";
        let explanation;
        if (fieldName === 'AccountBalance') {
            Client[fieldName] = parseFloat(value) || 0.0;
            explanation = `Convert string "${value}" to double using stod() and assign to Client.${fieldName}.`;
        } else {
            Client[fieldName] = value;
            explanation = `Assign vector element ${i} ("${value}") to Client.${fieldName}.`;
        }
        steps.push({
            i: i,
            phase: 'assign',
            field: fieldName,
            code: `Client.${fieldName} = vClientData[${i}];${fieldName === 'AccountBalance' ? ' // using stod()' : ''}`,
            explanation: explanation,
            input: line,
            modified: value,
            mem: [`Client.${fieldName} = ${Client[fieldName]}`, `vString=[${vString.join(',')}]`]
        });
    }

    // --- Phase 3: Print the Record ---
    const finalOutput: string[] = [];
    steps.push({
        i: -1,
        phase: 'print',
        code: `PrintClientRecord(Client);`,
        explanation: `Now, print the data from the populated struct.`,
        input: line,
        modified: '',
        output: [],
        mem: [`Client is fully populated.`]
    });
    
    finalOutput.push(`Accout Number: ${Client.AccountNumber}`);
    steps.push({ i: -1, phase: 'print', field: 'AccountNumber', code: `cout << Client.AccountNumber;`, explanation: `Printing AccountNumber.`, input: line, output: [...finalOutput], mem: [] });
    
    finalOutput.push(`Pin Code: ${Client.PinCode}`);
    steps.push({ i: -1, phase: 'print', field: 'PinCode', code: `cout << Client.PinCode;`, explanation: `Printing PinCode.`, input: line, output: [...finalOutput], mem: [] });
    
    finalOutput.push(`Name: ${Client.Name}`);
    steps.push({ i: -1, phase: 'print', field: 'Name', code: `cout << Client.Name;`, explanation: `Printing Name.`, input: line, output: [...finalOutput], mem: [] });

    finalOutput.push(`Phone: ${Client.Phone}`);
    steps.push({ i: -1, phase: 'print', field: 'Phone', code: `cout << Client.Phone;`, explanation: `Printing Phone.`, input: line, output: [...finalOutput], mem: [] });

    finalOutput.push(`Account Balance: ${Client.AccountBalance}`);
    steps.push({ i: -1, phase: 'print', field: 'AccountBalance', code: `cout << Client.AccountBalance;`, explanation: `Printing AccountBalance.`, input: line, output: [...finalOutput], mem: [] });

    steps.push({
        i: -1,
        code: 'return 0;',
        explanation: 'Program finished.',
        input: line,
        output: [...finalOutput],
        mem: ['Done']
      });

    return steps;
}

function genAddClientsToFileSteps(str: string): Step[] {
  const steps: Step[] = [];
  let stepCounter = 0;
  
  const predefinedClients = [
    { AccountNumber: "A101", PinCode: "1111", Name: "John Smith", Phone: "555-0101", AccountBalance: 4500.50 },
    { AccountNumber: "A102", PinCode: "2222", Name: "Jane Doe", Phone: "555-0102", AccountBalance: 8250.00 }
  ];
  const separator = "#//#";
  let fileContents: string[] = [];
  
  steps.push({
    i: stepCounter++,
    code: `do { ... } while (toupper(AddMore) == 'Y');`,
    explanation: 'Begin do-while loop to add new clients.',
    input: str,
    mem: ['Starting main loop'],
    fileContents: [...fileContents]
  });

  predefinedClients.forEach((clientData, index) => {
    const isLastIteration = index === predefinedClients.length - 1;
    const client: any = { AccountNumber: "", PinCode: "", Name: "", Phone: "", AccountBalance: 0.0 };

    // --- Phase: Read Client Data ---
    steps.push({
      i: stepCounter++,
      phase: 'read_client',
      loop: { iteration: index + 1, continue: true },
      code: `Client = ReadNewClient();`,
      explanation: `Simulating reading data for client ${index + 1}.`,
      input: str,
      mem: [`Reading client ${index + 1}`],
      fileContents: [...fileContents]
    });
    
    Object.entries(clientData).forEach(([key, value]) => {
      const field = key as 'AccountNumber' | 'PinCode' | 'Name' | 'Phone' | 'AccountBalance';
      client[field] = value;
      steps.push({
        i: stepCounter++,
        phase: 'read_client',
        field: field,
        loop: { iteration: index + 1, continue: true },
        code: `// Reading ${field}...`,
        explanation: `Simulated user input for ${field}: "${value}".`,
        input: str,
        mem: [`Client.${field} = ${value}`],
        fileContents: [...fileContents]
      });
    });

    // --- Phase: Convert Record to Line ---
    let clientLine = "";
    steps.push({
      i: stepCounter++,
      phase: 'convert_client',
      loop: { iteration: index + 1, continue: true },
      code: `ConvertRecordToLine(Client);`,
      explanation: `Converting the client struct to a delimited string.`,
      input: str,
      modified: clientLine,
      mem: [`Separator: "${separator}"`],
      fileContents: [...fileContents]
    });

    clientLine += client.AccountNumber + separator;
    steps.push({i: stepCounter++, phase: 'convert_client', field: 'AccountNumber', loop: { iteration: index + 1, continue: true }, code: `stClientRecord += Client.AccountNumber + ...`, explanation: `Appending AccountNumber.`, input: str, modified: clientLine, mem: [], fileContents: [...fileContents] });
    clientLine += client.PinCode + separator;
    steps.push({i: stepCounter++, phase: 'convert_client', field: 'PinCode', loop: { iteration: index + 1, continue: true }, code: `stClientRecord += Client.PinCode + ...`, explanation: `Appending PinCode.`, input: str, modified: clientLine, mem: [], fileContents: [...fileContents] });
    clientLine += client.Name + separator;
    steps.push({i: stepCounter++, phase: 'convert_client', field: 'Name', loop: { iteration: index + 1, continue: true }, code: `stClientRecord += Client.Name + ...`, explanation: `Appending Name.`, input: str, modified: clientLine, mem: [], fileContents: [...fileContents] });
    clientLine += client.Phone + separator;
    steps.push({i: stepCounter++, phase: 'convert_client', field: 'Phone', loop: { iteration: index + 1, continue: true }, code: `stClientRecord += Client.Phone + ...`, explanation: `Appending Phone.`, input: str, modified: clientLine, mem: [], fileContents: [...fileContents] });
    clientLine += client.AccountBalance.toString();
    steps.push({i: stepCounter++, phase: 'convert_client', field: 'AccountBalance', loop: { iteration: index + 1, continue: true }, code: `stClientRecord += to_string(Client.AccountBalance);`, explanation: `Appending AccountBalance.`, input: str, modified: clientLine, mem: [`Final line: "${clientLine}"`], fileContents: [...fileContents] });


    // --- Phase: Save to File ---
    steps.push({
      i: stepCounter++,
      phase: 'save_client',
      loop: { iteration: index + 1, continue: true },
      code: `AddDataLineToFile(ClientsFileName, "${clientLine.substring(0, 15)}...");`,
      explanation: `Opening "Clients.txt" in append mode to save the record.`,
      input: str,
      modified: clientLine,
      mem: [`Opening file...`],
      fileContents: [...fileContents]
    });
    
    fileContents.push(clientLine);
    steps.push({
      i: stepCounter++,
      phase: 'save_client',
      loop: { iteration: index + 1, continue: true },
      code: `MyFile << stDataLine << endl;`,
      explanation: `Record for "${client.Name}" written to file successfully.`,
      input: str,
      modified: clientLine,
      mem: [`Closing file...`],
      fileContents: [...fileContents]
    });

    // --- Phase: Loop Check ---
    steps.push({
      i: stepCounter++,
      phase: 'loop_check',
      loop: { iteration: index + 1, continue: !isLastIteration },
      code: `cout << "...do you want to add more clients? Y/N? "; cin >> AddMore;`,
      explanation: `Simulating user answering '${isLastIteration ? 'N' : 'Y'}' to continue.`,
      input: str,
      mem: [`AddMore = '${isLastIteration ? 'N' : 'Y'}'`],
      fileContents: [...fileContents]
    });
    
    steps.push({
      i: stepCounter++,
      phase: 'loop_check',
      loop: { iteration: index + 1, continue: !isLastIteration },
      code: `} while (toupper(AddMore) == 'Y');`,
      explanation: `Checking condition: '${isLastIteration ? 'N' : 'Y'}' == 'Y' is ${!isLastIteration}. The loop will ${!isLastIteration ? 'continue' : 'terminate'}.`,
      input: str,
      mem: [`Loop continues: ${!isLastIteration}`],
      fileContents: [...fileContents]
    });
  });

  steps.push({
    i: stepCounter++,
    code: 'return 0;',
    explanation: 'Program finished. All clients have been saved.',
    input: str,
    mem: ['Done'],
    fileContents: [...fileContents]
  });

  return steps;
}

function genLoadClientsFromFileSteps(str: string): Step[] {
    const steps: Step[] = [];
    let stepCounter = 0;
    const fileContents = [
        "A101#//#1111#//#John Smith#//#555-0101#//#4500.5",
        "A102#//#2222#//#Jane Doe#//#555-0102#//#8250",
        "A123#//#5678#//#Mohammed Abu-Hadhoud#//#079000000#//#5124.88"
    ];
    const separator = "#//#";
    let vClients: any[] = [];
    let output: string[] = [];

    // --- Phase 1: Load File ---
    steps.push({
        i: stepCounter++,
        phase: 'load_file',
        code: `vector<sClient> vClients = LoadCleintsDataFromFile(ClientsFileName);`,
        explanation: `Calling function to load all client records from "Clients.txt".`,
        input: str,
        fileContents: [...fileContents],
        vectorContents: [...vClients],
        mem: [`Starting file load process`],
    });

    fileContents.forEach((line, index) => {
        steps.push({
            i: stepCounter++,
            phase: 'load_file',
            loop: { iteration: index + 1, continue: true, currentLine: index },
            code: `while (getline(MyFile, Line))`,
            explanation: `Reading line ${index + 1} from the file.`,
            input: str,
            modified: line,
            fileContents: [...fileContents],
            vectorContents: [...vClients],
            mem: [`Reading line ${index + 1}`],
        });

        // --- Phase 2: Parse Line ---
        const vClientData = line.split(separator);
        const client: any = {
            AccountNumber: vClientData[0],
            PinCode: vClientData[1],
            Name: vClientData[2],
            Phone: vClientData[3],
            AccountBalance: parseFloat(vClientData[4])
        };
        steps.push({
            i: stepCounter++,
            phase: 'parse_line',
            loop: { iteration: index + 1, continue: true, currentLine: index },
            code: `Client = ConvertLinetoRecord(Line);`,
            explanation: `Parsing the line into a temporary sClient struct.`,
            input: str,
            modified: line,
            fileContents: [...fileContents],
            vectorContents: [...vClients],
            mem: ['Parsing current line into struct'],
        });

        // --- Phase 3: Add to Vector ---
        vClients.push(client);
        steps.push({
            i: stepCounter++,
            phase: 'add_to_vector',
            loop: { iteration: index + 1, continue: true, currentLine: index },
            code: `vClients.push_back(Client);`,
            explanation: `Adding the newly parsed client struct for "${client.Name}" to the vector.`,
            input: str,
            fileContents: [...fileContents],
            vectorContents: [...vClients],
            mem: [`vClients vector size: ${vClients.length}`],
        });
    });

    steps.push({
        i: stepCounter++,
        phase: 'load_file',
        code: `MyFile.close();`,
        explanation: 'Finished reading all lines from the file.',
        input: str,
        fileContents: [...fileContents],
        vectorContents: [...vClients],
        mem: ['File closed'],
    });

    // --- Phase 4: Print Table ---
    steps.push({
        i: stepCounter++,
        phase: 'print_table',
        code: `PrintAllClientsData(vClients);`,
        explanation: `Calling function to print the formatted table from the vector of clients.`,
        input: str,
        fileContents: [...fileContents],
        vectorContents: [...vClients],
        output: [...output],
        mem: ['Starting to print table'],
    });
    
    const header1 = `\n\t\t\t\t\tClient List (${vClients.length}) Client(s).`;
    const header2 = "\n\n_________________________________________________________________________________________\n";
    const header3 = "\n| Accout Number  | Pin Code  | Client Name                             | Phone       | Balance     ";
    const header4 = "\n_________________________________________________________________________________________\n";
    output.push(header1, header2, header3, header4);
    
    steps.push({
        i: stepCounter++,
        phase: 'print_table',
        code: `// Printing table header`,
        explanation: `Printing the header for the client list table.`,
        input: str,
        fileContents: [...fileContents],
        vectorContents: [...vClients],
        output: [...output],
        mem: ['Header printed'],
    });

    vClients.forEach((client, index) => {
        const clientRow = `\n| ${client.AccountNumber.padEnd(15)}| ${client.PinCode.padEnd(10)}| ${client.Name.padEnd(40)}| ${client.Phone.padEnd(12)}| ${client.AccountBalance.toString().padEnd(12)}`;
        output.push(clientRow);
        steps.push({
            i: index,
            phase: 'print_table',
            code: `PrintClientRecord(Client); // For ${client.Name}`,
            explanation: `Printing record for client ${index + 1}.`,
            input: str,
            fileContents: [...fileContents],
            vectorContents: [...vClients],
            output: [...output],
            mem: [`Printing row ${index + 1}`],
        });
    });
    
    const footer = "\n\n_________________________________________________________________________________________\n";
    output.push(footer);
    steps.push({
        i: stepCounter++,
        phase: 'print_table',
        code: `// Printing table footer`,
        explanation: `Printing the footer of the client list table.`,
        input: str,
        fileContents: [...fileContents],
        vectorContents: [...vClients],
        output: [...output],
        mem: ['Footer printed'],
    });

    steps.push({
        i: stepCounter++,
        code: 'return 0;',
        explanation: 'Program finished.',
        input: str,
        fileContents: [...fileContents],
        vectorContents: [...vClients],
        output: [...output],
        mem: ['Done'],
    });

    return steps;
}

function genFindClientByAccountNumberSteps(accountNumber: string): Step[] {
    const steps: Step[] = [];
    let stepCounter = 0;
    const fileContents = [
        "A101#//#1111#//#John Smith#//#555-0101#//#4500.5",
        "A102#//#2222#//#Jane Doe#//#555-0102#//#8250",
        "A123#//#5678#//#Mohammed Abu-Hadhoud#//#079000000#//#5124.88"
    ];
    const separator = "#//#";
    const vClients = fileContents.map(line => {
        const vClientData = line.split(separator);
        return {
            AccountNumber: vClientData[0],
            PinCode: vClientData[1],
            Name: vClientData[2],
            Phone: vClientData[3],
            AccountBalance: parseFloat(vClientData[4])
        };
    });

    let found = false;
    let resultClient: any = null;
    let output: string[] = [];

    // --- Phase 1: Read Account Number ---
    steps.push({
        i: stepCounter++,
        phase: 'read_account_number',
        code: `string AccountNumber = ReadClientAccountNumber();`,
        explanation: `Simulating user input. Searching for Account Number: "${accountNumber}".`,
        input: accountNumber,
        mem: [`Target AccountNumber = "${accountNumber}"`],
        search: { target: accountNumber, currentIndex: -1, found: false }
    });

    // --- Phase 2: Load Vector ---
    steps.push({
        i: stepCounter++,
        phase: 'load_vector',
        code: `vector<sClient> vClients = LoadCleintsDataFromFile(ClientsFileName);`,
        explanation: `Loading all client data from "Clients.txt" into a vector in memory.`,
        input: accountNumber,
        mem: [`vClients now has ${vClients.length} records`],
        fileContents: [...fileContents],
        vectorContents: [...vClients],
        search: { target: accountNumber, currentIndex: -1, found: false }
    });

    // --- Phase 3: Search Vector ---
    steps.push({
        i: stepCounter++,
        phase: 'search_vector',
        code: `for (sClient C : vClients)`,
        explanation: `Begin iterating through the vector to find a match.`,
        input: accountNumber,
        mem: [`Starting search loop`],
        vectorContents: [...vClients],
        search: { target: accountNumber, currentIndex: -1, found: false }
    });

    for (let i = 0; i < vClients.length; i++) {
        const C = vClients[i];
        const match = C.AccountNumber === accountNumber;

        steps.push({
            i: i,
            phase: 'search_vector',
            code: `if (C.AccountNumber == "${accountNumber}")`,
            explanation: `Checking client at index ${i}. Is "${C.AccountNumber}" == "${accountNumber}"? Result: ${match ? 'Yes' : 'No'}.`,
            input: accountNumber,
            mem: [`Comparing "${C.AccountNumber}" with "${accountNumber}"`],
            vectorContents: [...vClients],
            search: { target: accountNumber, currentIndex: i, found: false }
        });

        if (match) {
            found = true;
            resultClient = C;
            steps.push({
                i: i,
                phase: 'search_vector',
                code: `Client = C; return true;`,
                explanation: `Match found! Assigning the client data and returning true. The loop terminates.`,
                input: accountNumber,
                mem: [`Found client: "${C.Name}"`, 'Exiting loop'],
                vectorContents: [...vClients],
                search: { target: accountNumber, currentIndex: i, found: true, resultClient: C }
            });
            break; 
        }
    }

    if (!found) {
        steps.push({
            i: vClients.length,
            phase: 'search_vector',
            code: `// End of loop`,
            explanation: `Finished iterating through the entire vector. No match was found. Returning false.`,
            input: accountNumber,
            mem: [`Client not found in vector`],
            vectorContents: [...vClients],
            search: { target: accountNumber, currentIndex: vClients.length - 1, found: false }
        });
    }

    // --- Phase 4: Print Result ---
    steps.push({
        i: stepCounter++,
        phase: 'print_result',
        code: `if (FindClientByAccountNumber(...)) { ... } else { ... }`,
        explanation: `The search function returned ${found}. Executing the ${found ? 'if' : 'else'} block.`,
        input: accountNumber,
        mem: [`Result of find: ${found}`],
        vectorContents: [...vClients],
        search: { target: accountNumber, currentIndex: -1, found, resultClient }
    });

    if (found) {
        output.push(`\nThe following are the client details:`);
        output.push(`\nAccout Number: ${resultClient.AccountNumber}`);
        output.push(`\nPin Code      : ${resultClient.PinCode}`);
        output.push(`\nName          : ${resultClient.Name}`);
        output.push(`\nPhone         : ${resultClient.Phone}`);
        output.push(`\nAccount Balance: ${resultClient.AccountBalance}`);

        steps.push({
            i: stepCounter++,
            phase: 'print_result',
            code: `PrintClientCard(Client);`,
            explanation: `Printing the details for the found client: ${resultClient.Name}.`,
            input: accountNumber,
            output: [...output],
            mem: [`Printing client card`],
            search: { target: accountNumber, currentIndex: -1, found: true, resultClient }
        });
    } else {
        output.push(`\nClient with Account Number (${accountNumber}) is Not Found!`);
        steps.push({
            i: stepCounter++,
            phase: 'print_result',
            code: `cout << "\\nClient with Account Number (${accountNumber}) is Not Found!";`,
            explanation: `Printing the 'not found' message to the user.`,
            input: accountNumber,
            output: [...output],
            mem: [`Printed 'not found' message`],
            search: { target: accountNumber, currentIndex: -1, found: false }
        });
    }

    steps.push({
        i: stepCounter++,
        code: 'return 0;',
        explanation: 'Program finished.',
        input: accountNumber,
        output: [...output],
        mem: ['Done'],
        search: { target: accountNumber, currentIndex: -1, found, resultClient }
    });

    return steps;
}

function genDeleteClientByAccountNumberSteps(accountNumber: string): Step[] {
    const steps: Step[] = [];
    let stepCounter = 0;
    const initialFileContents = [
        "A101#//#1111#//#John Smith#//#555-0101#//#4500.5",
        "A102#//#2222#//#Jane Doe#//#555-0102#//#8250",
        "A123#//#5678#//#Mohammed Abu-Hadhoud#//#079000000#//#5124.88"
    ];
    let fileContents = [...initialFileContents];
    const separator = "#//#";
    
    let vClients = fileContents.map(line => {
        const vClientData = line.split(separator);
        return {
            AccountNumber: vClientData[0],
            PinCode: vClientData[1],
            Name: vClientData[2],
            Phone: vClientData[3],
            AccountBalance: parseFloat(vClientData[4]),
            MarkForDelete: false
        };
    });

    let output: string[] = [];

    steps.push({
        i: stepCounter++,
        phase: 'read_account_number',
        code: `string AccountNumber = ReadClientAccountNumber();`,
        explanation: `Simulating user input. Target for deletion: "${accountNumber}".`,
        input: accountNumber,
        mem: [`Target AccountNumber = "${accountNumber}"`],
        vectorContents: [...vClients],
        fileContents: [...fileContents],
        delete: { target: accountNumber, found: false, confirmed: null }
    });

    steps.push({
        i: stepCounter++,
        phase: 'load_vector',
        code: `vector<sClient> vClients = LoadCleintsDataFromFile(ClientsFileName);`,
        explanation: `Loading all client data from "Clients.txt" into a vector.`,
        input: accountNumber,
        mem: [`vClients now has ${vClients.length} records`],
        vectorContents: [...vClients],
        fileContents: [...fileContents],
        delete: { target: accountNumber, found: false, confirmed: null }
    });

    // --- Find Client ---
    let foundClient: any = null;
    let foundIndex = -1;
    for (let i = 0; i < vClients.length; i++) {
        const C = vClients[i];
        const match = C.AccountNumber === accountNumber;
        steps.push({
            i: i,
            phase: 'find_client',
            code: `if (C.AccountNumber == "${accountNumber}")`,
            explanation: `Searching... Is "${C.AccountNumber}" == "${accountNumber}"? Result: ${match ? 'Yes' : 'No'}.`,
            input: accountNumber,
            mem: [`Comparing with index ${i}`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: false, confirmed: null }
        });
        if (match) {
            foundClient = C;
            foundIndex = i;
            break;
        }
    }

    if (!foundClient) {
        output.push(`\nClient with Account Number (${accountNumber}) is Not Found!`);
        steps.push({
            i: stepCounter++,
            phase: 'find_client',
            code: `// Client Not Found`,
            explanation: `Finished search. No match found for "${accountNumber}".`,
            input: accountNumber,
            output: [...output],
            mem: [`Client not found`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: false, confirmed: null }
        });
    } else {
        steps.push({
            i: foundIndex,
            phase: 'find_client',
            code: `// Client Found`,
            explanation: `Match found for "${accountNumber}" at index ${foundIndex}.`,
            input: accountNumber,
            mem: [`Found client: "${foundClient.Name}"`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: true, confirmed: null, client: foundClient }
        });

        // --- Confirm Delete ---
        output.push(`\nThe following are the client details:`, `\nAccout Number: ${foundClient.AccountNumber}`, `\nPin Code      : ${foundClient.PinCode}`, `\nName          : ${foundClient.Name}`, `\nPhone         : ${foundClient.Phone}`, `\nAccount Balance: ${foundClient.AccountBalance}`);
        steps.push({
            i: stepCounter++,
            phase: 'confirm_delete',
            code: `PrintClientCard(Client);`,
            explanation: `Displaying client details before asking for confirmation.`,
            input: accountNumber,
            output: [...output],
            mem: [`Printing client card`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: true, confirmed: null, client: foundClient }
        });

        output.push(`\n\nAre you sure you want delete this client? y/n ? `);
        steps.push({
            i: stepCounter++,
            phase: 'confirm_delete',
            code: `cin >> Answer;`,
            explanation: `Simulating user confirming deletion by entering 'y'.`,
            input: accountNumber,
            output: [...output],
            mem: [`Answer = 'y'`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: true, confirmed: true, client: foundClient }
        });

        // --- Mark for Delete ---
        vClients[foundIndex].MarkForDelete = true;
        steps.push({
            i: foundIndex,
            phase: 'mark_for_delete',
            code: `MarkClientForDeleteByAccountNumber(AccountNumber, vClients);`,
            explanation: `Setting MarkForDelete = true on the client struct in the vector. This is a "soft delete".`,
            input: accountNumber,
            mem: [`Marked "${foundClient.Name}" for deletion`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: true, confirmed: true, client: foundClient }
        });

        // --- Save to File ---
        const newFileContents: string[] = [];
        steps.push({
            i: stepCounter++,
            phase: 'save_to_file',
            code: `SaveCleintsDataToFile(ClientsFileName, vClients);`,
            explanation: `Opening "Clients.txt" in write mode (ios::out) to overwrite it.`,
            input: accountNumber,
            mem: [`Opening file for overwrite`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: true, confirmed: true, client: foundClient }
        });
        
        for(let i = 0; i < vClients.length; i++) {
            const C = vClients[i];
            if (!C.MarkForDelete) {
                const line = `${C.AccountNumber}${separator}${C.PinCode}${separator}${C.Name}${separator}${C.Phone}${separator}${C.AccountBalance}`;
                newFileContents.push(line);
                 steps.push({
                    i: i,
                    phase: 'save_to_file',
                    code: `if (C.MarkForDelete == false) { MyFile << DataLine << endl; }`,
                    explanation: `Client "${C.Name}" is NOT marked for delete. Writing its record to the file.`,
                    input: accountNumber,
                    mem: [`Writing line for ${C.AccountNumber}`],
                    vectorContents: [...vClients],
                    fileContents: [...newFileContents],
                    delete: { target: accountNumber, found: true, confirmed: true, client: foundClient }
                });
            } else {
                 steps.push({
                    i: i,
                    phase: 'save_to_file',
                    code: `if (C.MarkForDelete == false) { ... }`,
                    explanation: `Client "${C.Name}" IS marked for delete. Skipping this record.`,
                    input: accountNumber,
                    mem: [`Skipping line for ${C.AccountNumber}`],
                    vectorContents: [...vClients],
                    fileContents: [...newFileContents],
                    delete: { target: accountNumber, found: true, confirmed: true, client: foundClient }
                });
            }
        }
        fileContents = newFileContents;

        steps.push({
            i: stepCounter++,
            phase: 'save_to_file',
            code: `MyFile.close();`,
            explanation: `Finished writing. Closing the file. The client has now been permanently deleted from the file.`,
            input: accountNumber,
            mem: [`File closed`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: true, confirmed: true, client: foundClient }
        });

        // --- Reload Vector ---
        vClients = vClients.filter(c => !c.MarkForDelete);
        steps.push({
            i: stepCounter++,
            phase: 'reload_vector',
            code: `vClients = LoadCleintsDataFromFile(ClientsFileName);`,
            explanation: `Reloading the data from the updated file to refresh the in-memory vector.`,
            input: accountNumber,
            mem: [`Vector is now refreshed. Size: ${vClients.length}`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: true, confirmed: true, client: foundClient }
        });
        
        output.push(`\n\nClient Deleted Successfully.`);
        steps.push({
            i: stepCounter++,
            phase: 'print_result',
            code: `cout << "\\n\\nClient Deleted Successfully.";`,
            explanation: `Printing final success message.`,
            input: accountNumber,
            output: [...output],
            mem: [`Deletion successful`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            delete: { target: accountNumber, found: true, confirmed: true, client: foundClient }
        });
    }

    steps.push({
        i: stepCounter++,
        code: 'return 0;',
        explanation: 'Program finished.',
        input: accountNumber,
        output: [...output],
        mem: ['Done'],
        vectorContents: [...vClients],
        fileContents: [...fileContents],
    });

    return steps;
}

function genUpdateClientByAccountNumberSteps(accountNumber: string): Step[] {
    const steps: Step[] = [];
    let stepCounter = 0;
    const initialFileContents = [
        "A101#//#1111#//#John Smith#//#555-0101#//#4500.5",
        "A102#//#2222#//#Jane Doe#//#555-0102#//#8250",
        "A123#//#5678#//#Mohammed Abu-Hadhoud#//#079000000#//#5124.88"
    ];
    let fileContents = [...initialFileContents];
    const separator = "#//#";
    
    let vClients = initialFileContents.map(line => {
        const vClientData = line.split(separator);
        return {
            AccountNumber: vClientData[0],
            PinCode: vClientData[1],
            Name: vClientData[2],
            Phone: vClientData[3],
            AccountBalance: parseFloat(vClientData[4]),
            MarkForDelete: false
        };
    });

    const newData = {
        PinCode: "9876",
        Name: "Jane D. Smith",
        Phone: "555-0199",
        AccountBalance: 9500.75
    };

    let output: string[] = [];

    steps.push({
        i: stepCounter++,
        phase: 'read_account_number',
        code: `string AccountNumber = ReadClientAccountNumber();`,
        explanation: `Simulating user input. Target for update: "${accountNumber}".`,
        input: accountNumber,
        mem: [`Target AccountNumber = "${accountNumber}"`],
        vectorContents: [...vClients],
        fileContents: [...fileContents],
        update: { target: accountNumber, found: false, confirmed: null }
    });

    steps.push({
        i: stepCounter++,
        phase: 'load_vector',
        code: `vector<sClient> vClients = LoadCleintsDataFromFile(ClientsFileName);`,
        explanation: `Loading all client data from "Clients.txt" into a vector.`,
        input: accountNumber,
        mem: [`vClients now has ${vClients.length} records`],
        vectorContents: [...vClients],
        fileContents: [...fileContents],
        update: { target: accountNumber, found: false, confirmed: null }
    });

    // --- Find Client ---
    let foundClient: any = null;
    let foundIndex = -1;
    for (let i = 0; i < vClients.length; i++) {
        const C = vClients[i];
        const match = C.AccountNumber === accountNumber;
        steps.push({
            i: i,
            phase: 'find_client',
            code: `if (C.AccountNumber == "${accountNumber}")`,
            explanation: `Searching... Is "${C.AccountNumber}" == "${accountNumber}"? Result: ${match ? 'Yes' : 'No'}.`,
            input: accountNumber,
            mem: [`Comparing with index ${i}`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: false, confirmed: null }
        });
        if (match) {
            foundClient = { ...C };
            foundIndex = i;
            break;
        }
    }

    if (!foundClient) {
        output.push(`\nClient with Account Number (${accountNumber}) is Not Found!`);
        steps.push({
            i: stepCounter++,
            phase: 'find_client',
            code: `// Client Not Found`,
            explanation: `Finished search. No match found for "${accountNumber}".`,
            input: accountNumber,
            output: [...output],
            mem: [`Client not found`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: false, confirmed: null }
        });
    } else {
        const clientBefore = { ...foundClient };
        steps.push({
            i: foundIndex,
            phase: 'find_client',
            code: `// Client Found`,
            explanation: `Match found for "${accountNumber}" at index ${foundIndex}.`,
            input: accountNumber,
            mem: [`Found client: "${foundClient.Name}"`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: null, clientBefore }
        });

        // --- Confirm Update ---
        output.push(`\nThe following are the client details:`, `\nAccout Number: ${foundClient.AccountNumber}`, `\nPin Code      : ${foundClient.PinCode}`, `\nName          : ${foundClient.Name}`, `\nPhone         : ${foundClient.Phone}`, `\nAccount Balance: ${foundClient.AccountBalance}`);
        steps.push({
            i: stepCounter++,
            phase: 'confirm_update',
            code: `PrintClientCard(Client);`,
            explanation: `Displaying client details before asking for confirmation.`,
            input: accountNumber,
            output: [...output],
            mem: [`Printing client card`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: null, clientBefore }
        });

        output.push(`\n\nAre you sure you want update this client? y/n ? `);
        steps.push({
            i: stepCounter++,
            phase: 'confirm_update',
            code: `cin >> Answer;`,
            explanation: `Simulating user confirming update by entering 'y'.`,
            input: accountNumber,
            output: [...output],
            mem: [`Answer = 'y'`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore }
        });
        
        // --- Read New Data ---
        let clientAfter = { ...clientBefore };
        steps.push({
            i: stepCounter++,
            phase: 'read_new_data',
            code: `C = ChangeClientRecord(AccountNumber);`,
            explanation: 'Simulating user entering new data for the client.',
            input: accountNumber,
            mem: ['Reading new client info'],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore }
        });

        Object.entries(newData).forEach(([key, value]) => {
            (clientAfter as any)[key] = value;
            steps.push({
                i: stepCounter++,
                phase: 'read_new_data',
                field: key as any,
                code: `// Reading new ${key}...`,
                explanation: `Simulated input for ${key}: "${value}".`,
                input: accountNumber,
                mem: [`New ${key} = ${value}`],
                vectorContents: [...vClients],
                fileContents: [...fileContents],
                update: { target: accountNumber, found: true, confirmed: true, clientBefore, clientAfter: { ...clientAfter } }
            });
        });

        // --- Update Vector ---
        vClients[foundIndex] = clientAfter;
        steps.push({
            i: foundIndex,
            phase: 'update_vector',
            code: `// Update client in vector`,
            explanation: `Updating the client record at index ${foundIndex} in the memory vector.`,
            input: accountNumber,
            mem: [`Updated "${clientAfter.Name}" in vector`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore, clientAfter }
        });
        
        // --- Save to File ---
        const newFileContents: string[] = [];
        steps.push({
            i: stepCounter++,
            phase: 'save_to_file',
            code: `SaveCleintsDataToFile(ClientsFileName, vClients);`,
            explanation: `Opening "Clients.txt" in write mode (ios::out) to overwrite it.`,
            input: accountNumber,
            mem: [`Opening file for overwrite`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore, clientAfter }
        });
        
        for(let i = 0; i < vClients.length; i++) {
            const C = vClients[i];
            const line = `${C.AccountNumber}${separator}${C.PinCode}${separator}${C.Name}${separator}${C.Phone}${separator}${C.AccountBalance}`;
            newFileContents.push(line);
            steps.push({
                i: i,
                phase: 'save_to_file',
                code: `MyFile << DataLine << endl;`,
                explanation: `Writing record for "${C.Name}" to the file.`,
                input: accountNumber,
                mem: [`Writing line for ${C.AccountNumber}`],
                vectorContents: [...vClients],
                fileContents: [...newFileContents],
                update: { target: accountNumber, found: true, confirmed: true, clientBefore, clientAfter }
            });
        }
        fileContents = newFileContents;

        steps.push({
            i: stepCounter++,
            phase: 'save_to_file',
            code: `MyFile.close();`,
            explanation: `Finished writing. Closing the file. The client has now been permanently updated in the file.`,
            input: accountNumber,
            mem: [`File closed`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore, clientAfter }
        });

        output.push(`\n\nClient Updated Successfully.`);
        steps.push({
            i: stepCounter++,
            phase: 'print_result',
            code: `cout << "\\n\\nClient Updated Successfully.";`,
            explanation: `Printing final success message.`,
            input: accountNumber,
            output: [...output],
            mem: [`Update successful`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore, clientAfter }
        });
    }

    steps.push({
        i: stepCounter++,
        code: 'return 0;',
        explanation: 'Program finished.',
        input: accountNumber,
        output: [...output],
        mem: ['Done'],
        vectorContents: [...vClients],
        fileContents: [...fileContents],
    });

    return steps;
}



export const problems: Problem[] = [
  { id: 1, title: 'Problem 1 — Print First Letter of Each Word', description: 'Read a string and print the first letter of every word.', example: 'programming is fun', generator: genPrintFirstLettersSteps, functions: [
    {name: 'ReadString()', signature: 'string ReadString()', explanation: 'Reads a full line including spaces.', code: `string ReadString()\n{\n    string S1;\n    getline(cin, S1);\n    return S1;\n}`},
    {name: 'PrintFirstLetterOfEachWord(string S1)', signature: 'void PrintFirstLetterOfEachWord(string S1)', explanation: 'Uses a boolean flag to detect word starts.', code: `void PrintFirstLetterOfEachWord(string S1)\n{\n    bool isFirstLetter = true;\n    for(short i=0;i<S1.length();i++){\n        if(S1[i] != ' ' && isFirstLetter) cout << S1[i];\n        isFirstLetter = (S1[i] == ' ' ? true : false);\n    }\n}`}
  ], keyConcepts: ['String Iteration', 'Boolean Flags', 'Conditional Logic', 'Character I/O'],
  hints: [
      'You need a way to remember if the previous character was a space.',
      'A boolean flag (e.g., `isFirstLetter`) can track this state.',
      'Inside the loop, check two conditions: is the character not a space, AND is the `isFirstLetter` flag true?',
      'After checking a character, update the flag for the *next* iteration. The flag should be true only if the *current* character is a space.'
  ]},
  { id: 2, title: 'Problem 2 — Uppercase First Letter of Each Word', description: 'Uppercase the first character of each word in the input.', example: 'hello world', generator: genUpperFirstSteps, functions: [
    {name: 'UpperFirstLetterOfEachWord', signature: 'string UpperFirstLetterOfEachWord(string S1)', explanation: 'Uses toupper on flagged positions.', code: `string UpperFirstLetterOfEachWord(string S1)\n{\n    bool isFirstLetter = true;\n    for(short i=0;i<S1.length();i++){\n        if(S1[i] != ' ' && isFirstLetter) S1[i] = toupper(S1[i]);\n        isFirstLetter = (S1[i] == ' ' ? true : false);\n    }\n    return S1;\n}`}
  ], keyConcepts: ['String Modification', 'Boolean Flags', 'toupper()', 'By-Value vs By-Reference'],
  hints: [
      'The logic is nearly identical to the previous problem (printing the first letter).',
      'Instead of printing the character with `cout`, modify it in place.',
      'The `toupper()` function from the `<cctype>` library will convert a character to its uppercase equivalent.',
      'Remember to assign the result back to the string: `S1[i] = toupper(S1[i]);`'
  ]},
  { id: 3, title: 'Problem 3 — Lowercase First Letter of Each Word', description: 'Lowercase the first character of each word in the input.', example: 'HELLO WORLD', generator: genLowerFirstSteps, functions: [
    {name: 'LowerFirstLetterOfEachWord', signature: 'string LowerFirstLetterOfEachWord(string S1)', explanation: 'Uses tolower on flagged positions.', code: `string LowerFirstLetterOfEachWord(string S1)\n{\n    bool isFirstLetter = true;\n    for(short i=0;i<S1.length();i++){\n        if(S1[i] != ' ' && isFirstLetter) S1[i] = tolower(S1[i]);\n        isFirstLetter = (S1[i] == ' ' ? true : false);\n    }\n    return S1;\n}`}
  ], keyConcepts: ['String Modification', 'Boolean Flags', 'tolower()', 'Standard Library Functions'],
   hints: [
      'This problem is a variation of the previous one.',
      'Instead of `toupper()`, use the `tolower()` function to convert characters to lowercase.',
      'The boolean flag logic for detecting the start of a word remains exactly the same.'
  ]},
  { id: 4, title: 'Problem 4 — Upper All then Lower All Letters', description: 'Read a string, print it uppercased, then print it lowercased.', example: 'Hello World', generator: genUpperThenLowerSteps, functions: [
    {name: 'ReadString()', signature: 'string ReadString()', explanation: 'Reads the full line.', code: `string ReadString()\n{\n    string S1;\n    getline(cin, S1);\n    return S1;\n}`},
    {name: 'UpperAllString', signature: 'string UpperAllString(string S1)', explanation: 'Makes every char uppercase using toupper.', code: `string UpperAllString(string S1)\n{\n    for(short i=0;i<S1.length();i++) S1[i] = toupper(S1[i]);\n    return S1;\n}`},
    {name: 'LowerAllString', signature: 'string LowerAllString(string S1)', explanation: 'Makes every char lowercase using tolower.', code: `string LowerAllString(string S1)\n{\n    for(short i=0;i<S1.length();i++) S1[i] = tolower(S1[i]);\n    return S1;\n}`}
  ], keyConcepts: ['Looping', 'Case Conversion', 'Multiple Operations', 'Sequential Execution'],
  hints: [
      'You will need two separate loops for this task.',
      'The first loop should iterate through the string and apply `toupper()` to every character.',
      'The second loop should do the same, but with `tolower()`.',
      'You can create two separate functions to keep the code clean: one for uppercasing and one for lowercasing.'
  ]},
  { id: 5, title: 'Problem 5 — Invert Letter Case', description: 'Read a single character, invert its case (upper to lower, lower to upper), and print the result.', example: 'a', generator: genInvertCaseSteps, functions: [
    { name: 'ReadChar()', signature: 'char ReadChar()', explanation: 'Reads a single character from the input.', code: `char ReadChar()\n{\n    char Ch1;\n    cout << "Please Enter a Character?\\n";\n    cin >> Ch1;\n    return Ch1;\n}` },
    { name: 'InvertLetterCase(char char1)', signature: 'char InvertLetterCase(char char1)', explanation: 'Checks if a character is uppercase. If so, it converts it to lowercase. Otherwise, it converts it to uppercase.', code: `char InvertLetterCase(char char1)\n{\n    return isupper(char1) ? tolower(char1) : toupper(char1);\n}` }
  ], keyConcepts: ['Character I/O', 'Ternary Operator', 'Case Conversion', 'ASCII Values'],
  hints: [
      'First, you need to determine if the character is currently uppercase or lowercase.',
      'The `isupper()` function from `<cctype>` returns true if a character is uppercase.',
      'A simple `if/else` statement or a ternary operator (`condition ? value_if_true : value_if_false`) is perfect for this.',
      'If `isupper()` is true, use `tolower()`. Otherwise, use `toupper()`.'
  ]},
  { id: 6, title: 'Problem 6 — Count Small/Capital Letters', description: 'Read a string and count the number of lowercase and uppercase letters.', example: 'Hello World', generator: genCountCaseSteps, functions: [
    { name: 'ReadString()', signature: 'string ReadString()', explanation: 'Reads a full line including spaces.', code: `string ReadString()\n{\n    string S1;\n    cout << "Please Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}` },
    { name: 'CountCapitalLetters(string S1)', signature: 'short CountCapitalLetters(string S1)', explanation: 'Iterates through the string and increments a counter for each uppercase character found.', code: `short CountCapitalLetters(string S1)\n{\n    short Counter = 0;\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (isupper(S1[i]))\n            Counter++;\n    }\n    return Counter;\n}` },
    { name: 'CountSmallLetters(string S1)', signature: 'short CountSmallLetters(string S1)', explanation: 'Iterates through the string and increments a counter for each lowercase character found.', code: `short CountSmallLetters(string S1)\n{\n    short Counter = 0;\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (islower(S1[i]))\n            Counter++;\n    }\n    return Counter;\n}` }
  ], keyConcepts: ['String Iteration', 'Counters', 'isupper()', 'islower()', 'Conditional Logic'],
  hints: [
    'You will need two counter variables, one for capital letters and one for small letters, both initialized to 0.',
    'Loop through each character of the string.',
    'Inside the loop, use `isupper()` to check for capitals and `islower()` for smalls.',
    'Increment the appropriate counter when a match is found.'
  ]},
  { id: 7, title: 'Problem 7 — Count a Specific Letter', description: 'Read a string and a character, then count how many times that character appears. Separate string and character with a pipe (|).', example: 'programming is fun|g', generator: genCountLetterSteps, functions: [
    { name: 'ReadString()', signature: 'string ReadString()', explanation: 'Reads a full line of text from the user.', code: `string ReadString()\n{\n    string S1;\n    cout << "\\nPlease Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}`},
    { name: 'ReadChar()', signature: 'char ReadChar()', explanation: 'Reads a single character from the user.', code: `char ReadChar()\n{\n    char Ch1;\n    cout << "\\nPlease Enter a Character?\\n";\n    cin >> Ch1;\n    return Ch1;\n}`},
    { name: 'CountLetter(string S1, char Letter)', signature: 'short CountLetter(string S1, char Letter)', explanation: 'Iterates through the string, compares each character with the target letter, and increments a counter on matches.', code: `short CountLetter(string S1, char Letter)\n{\n    short Counter = 0;\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (S1[i] == Letter)\n            Counter++;\n    }\n    return Counter;\n}`}
  ], keyConcepts: ['String Iteration', 'Character Comparison', 'Counters', 'Function Parameters'],
  hints: [
    'Initialize a counter variable to 0.',
    'Loop through each character of the input string.',
    'Inside the loop, use an `if` statement to compare the current character (`S1[i]`) with the target character (`Letter`).',
    'If they are equal, increment the counter.'
  ]},
  { 
    id: 8, 
    title: 'Problem 8 — Count a Specific Letter (Case Insensitive)', 
    description: 'Read a string and a character, then count how many times that character appears, both case-sensitively and case-insensitively. Separate string and character with a pipe (|).', 
    example: 'Programming is Fun|g', 
    generator: genCountLetterCaseInsensitiveSteps, 
    functions: [
      { 
        name: 'ReadString()', 
        signature: 'string ReadString()', 
        explanation: 'Reads a full line of text from the user.', 
        code: `string ReadString()\n{\n    string S1;\n    cout << "\\nPlease Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}`
      },
      { 
        name: 'ReadChar()', 
        signature: 'char ReadChar()', 
        explanation: 'Reads a single character from the user.', 
        code: `char ReadChar()\n{\n    char Ch1;\n    cout << "\\nPlease Enter a Character?\\n";\n    cin >> Ch1;\n    return Ch1;\n}`
      },
      { 
        name: 'InvertLetterCase(char char1)', 
        signature: 'char InvertLetterCase(char char1)', 
        explanation: 'Checks if a character is uppercase. If so, it converts it to lowercase. Otherwise, it converts it to uppercase.', 
        code: `char InvertLetterCase(char char1)\n{\n    return isupper(char1) ? tolower(char1) : toupper(char1);\n}` 
      },
      { 
        name: 'CountLetter(string S1, char Letter, bool MatchCase = true)', 
        signature: 'short CountLetter(string S1, char Letter, bool MatchCase = true)', 
        explanation: 'Iterates through the string, compares each character with the target letter (case-sensitively or not based on MatchCase flag), and increments a counter on matches.', 
        code: `short CountLetter(string S1, char Letter, bool MatchCase = true)\n{\n    short Counter = 0;\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (MatchCase)\n        {\n            if (S1[i] == Letter)\n                Counter++;\n        }\n        else\n        {\n            if (tolower(S1[i]) == tolower(Letter))\n                Counter++;\n        }\n    }\n    return Counter;\n}`
      }
    ], 
    keyConcepts: ['String Iteration', 'Character Comparison', 'Counters', 'Case Insensitivity', 'Optional Parameters'],
    hints: [
      'The case-sensitive part is the same as the previous problem.',
      'For the case-insensitive count, you need to standardize the case before comparing.',
      'A good strategy is to convert both the character from the string (`S1[i]`) and the target character (`Letter`) to the same case (e.g., lowercase) before the `if` check.',
      'Use `tolower()` on both sides of the comparison: `if (tolower(S1[i]) == tolower(Letter))`.',
      'Consider adding an optional boolean parameter to your function to control whether the search is case-sensitive or not.'
    ]
  },
  { 
    id: 9, 
    title: 'Problem 9 — Check if a Character is a Vowel', 
    description: 'Read a character and check if it is a vowel (a, e, i, o, u). The check should be case-insensitive.', 
    example: 'A', 
    generator: genIsVowelSteps, 
    functions: [
      { 
        name: 'ReadChar()', 
        signature: 'char ReadChar()', 
        explanation: 'Reads a single character from the user.', 
        code: `char ReadChar()\n{\n    char Ch1;\n    cout << "\\nPlease Enter a Character?\\n";\n    cin >> Ch1;\n    return Ch1;\n}`
      },
      { 
        name: 'IsVowel(char Ch1)', 
        signature: 'bool IsVowel(char Ch1)', 
        explanation: 'Converts the character to lowercase and checks if it is one of \'a\', \'e\', \'i\', \'o\', or \'u\'.', 
        code: `bool IsVowel(char Ch1)\n{\n    Ch1 = tolower(Ch1);\n    return ((Ch1 == 'a') || (Ch1 == 'e') || (Ch1 == 'i') || (Ch1 == 'o') || (Ch1 == 'u'));\n}`
      }
    ], 
    keyConcepts: ['Character I/O', 'Boolean Logic', 'tolower()', 'Conditional Statements'],
    hints: [
      'To handle case-insensitivity easily, first convert the input character to lowercase using `tolower()`.',
      'After converting, you only need to check against the five lowercase vowels.',
      'Use the logical OR operator (`||`) to check if the character matches any of the vowels: `(ch == \'a\') || (ch == \'e\') || ...`'
    ]
  },
  {
    id: 10,
    title: 'Problem 10 — Count Vowels in a String',
    description: 'Read a string and count the total number of vowels (a, e, i, o, u) in it, case-insensitively.',
    example: 'Programming Is Fun',
    generator: genCountVowelsSteps,
    functions: [
      {
        name: 'ReadString()',
        signature: 'string ReadString()',
        explanation: 'Reads a full line of text from the user.',
        code: `string ReadString()\n{\n    string S1;\n    cout << "\\nPlease Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}`
      },
      {
        name: 'IsVowel(char Ch1)',
        signature: 'bool IsVowel(char Ch1)',
        explanation: 'Converts the character to lowercase and checks if it is one of \'a\', \'e\', \'i\', \'o\', or \'u\'.',
        code: `bool IsVowel(char Ch1)\n{\n    Ch1 = tolower(Ch1);\n    return ((Ch1 == 'a') || (Ch1 == 'e') || (Ch1 == 'i') || (Ch1 == 'o') || (Ch1 == 'u'));\n}`
      },
      {
        name: 'CountVowels(string S1)',
        signature: 'short CountVowels(string S1)',
        explanation: 'Iterates through the string and uses the IsVowel helper function to count all vowels.',
        code: `short CountVowels(string S1)\n{\n    short Counter = 0;\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (IsVowel(S1[i]))\n            Counter++;\n    }\n    return Counter;\n}`
      }
    ],
    keyConcepts: ['String Iteration', 'Helper Functions', 'Boolean Logic', 'Case Insensitivity', 'tolower()'],
    hints: [
      'This problem combines looping with the logic from the previous problem.',
      'It is highly recommended to use the `IsVowel` function you just designed.',
      'Loop through every character of the string. Inside the loop, call `IsVowel` on the current character.',
      'If `IsVowel` returns true, increment a counter.'
    ]
  },
  {
    id: 11,
    title: 'Problem 11 — Print All Vowels in a String',
    description: 'Read a string and print all the vowels (a, e, i, o, u) that appear in it, case-insensitively.',
    example: 'Programming is Fun',
    generator: genPrintVowelsSteps,
    functions: [
      {
        name: 'ReadString()',
        signature: 'string ReadString()',
        explanation: 'Reads a full line of text from the user.',
        code: `string ReadString()\n{\n    string S1;\n    cout << "\\nPlease Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}`
      },
      {
        name: 'IsVowel(char Ch1)',
        signature: 'bool IsVowel(char Ch1)',
        explanation: 'Converts the character to lowercase and checks if it is one of \'a\', \'e\', \'i\', \'o\', or \'u\'.',
        code: `bool IsVowel(char Ch1)\n{\n    Ch1 = tolower(Ch1);\n    return ((Ch1 == 'a') || (Ch1 == 'e') || (Ch1 == 'i') || (Ch1 == 'o') || (Ch1 == 'u'));\n}`
      },
      {
        name: 'PrintVowels(string S1)',
        signature: 'void PrintVowels(string S1)',
        explanation: 'Iterates through the string and uses the IsVowel helper function to print each vowel found.',
        code: `void PrintVowels(string S1)\n{\n    cout << "\\nVowels in string are: ";\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (IsVowel(S1[i]))\n            cout << S1[i] << "   ";\n    }\n}`
      }
    ],
    keyConcepts: ['String Iteration', 'Helper Functions', 'Conditional Logic', 'Character Output', 'void Functions'],
    hints: [
      'The structure is almost identical to counting vowels.',
      'Loop through the string and use the `IsVowel` helper function.',
      'Instead of incrementing a counter when `IsVowel` is true, simply print the character using `cout`.'
    ]
  },
  {
    id: 12,
    title: 'Problem 12 — Print Each Word in a String',
    description: 'Read a string and print each word on a new line.',
    example: 'programming is fun',
    generator: genPrintWordsSteps,
    functions: [
      {
        name: 'ReadString()',
        signature: 'string ReadString()',
        explanation: 'Reads a full line of text from the user.',
        code: `string ReadString()\n{\n    string S1;\n    cout << "Please Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}`
      },
      {
        name: 'PrintEachWordInString(string S1)',
        signature: 'void PrintEachWordInString(string S1)',
        explanation: 'Uses a while loop with find, substr, and erase to extract and print each word.',
        code: `void PrintEachWordInString(string S1)\n{\n    string delim = " ";\n    cout << "\\nYour string words are: \\n\\n";\n    short pos = 0;\n    string sWord;\n    while ((pos = S1.find(delim)) != std::string::npos)\n    {\n        sWord = S1.substr(0, pos);\n        if (sWord != "")\n        {\n            cout << sWord << endl;\n        }\n        S1.erase(0, pos + delim.length());\n    }\n    if (S1 != "")\n    {\n        cout << S1 << endl;\n    }\n}`
      }
    ],
    keyConcepts: ['String Manipulation', 'find()', 'substr()', 'erase()', 'While Loop'],
    hints: [
      'Think about how to identify a "word". A word is a sequence of characters separated by a delimiter (like a space).',
      'The `string::find` method is perfect for locating the position of the next space.',
      'Once you have the position, `string::substr` can extract the word.',
      'After extracting the word, you must shorten the original string using `string::erase` so you can find the *next* word in the next loop iteration.',
      'Don\'t forget to print the very last word after the loop finishes!'
    ]
  },
  {
    id: 13,
    title: 'Problem 13 — Count Each Word in a String',
    description: 'Write a program to read a string then count each word in that string.',
    example: 'Mohammed Abu-Hadhoud @ProgrammingAdvices',
    generator: genCountWordsSteps,
    functions: [
      {
        name: 'ReadString()',
        signature: 'string ReadString()',
        explanation: 'Reads a full line of text from the user.',
        code: `string ReadString()\n{\n    string S1;\n    cout << "Please Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}`
      },
      {
        name: 'CountWords(string S1)',
        signature: 'short CountWords(string S1)',
        explanation: 'Uses a while loop with find, substr, and erase to extract and count each word.',
        code: `short CountWords(string S1)\n{\n    string delim = " ";\n    short Counter = 0;\n    short pos = 0;\n    string sWord;\n    while ((pos = S1.find(delim)) != std::string::npos)\n    {\n        sWord = S1.substr(0, pos);\n        if (sWord != "")\n        {\n            Counter++;\n        }\n        S1.erase(0, pos + delim.length());\n    }\n    if (S1 != "")\n    {\n        Counter++;\n    }\n    return Counter;\n}`
      }
    ],
    keyConcepts: ['String Manipulation', 'find()', 'substr()', 'erase()', 'While Loop', 'Counters'],
    hints: [
      'This problem builds directly on the logic from the previous one (printing words).',
      'Use the same `find`, `substr`, `erase` loop structure.',
      'Instead of printing the extracted word, simply increment a counter.',
      'Remember to handle consecutive spaces by checking if the extracted `sWord` is not empty before counting.',
      'The last word in the string won\'t be followed by a delimiter, so you need to count it after the loop finishes.'
    ]
  },
  {
    id: 14,
    title: 'Problem 14 — Split String into a Vector',
    description: 'Read a string, split it into words by a delimiter, and store those words in a vector.',
    example: 'C++ is a powerful language',
    generator: genSplitStringSteps,
    functions: [
      {
        name: 'ReadString()',
        signature: 'string ReadString()',
        explanation: 'Reads a full line of text from the user.',
        code: `string ReadString()\n{\n    string S1;\n    cout << "Please Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}`
      },
      {
        name: 'SplitString(string S1, string Delim)',
        signature: 'vector<string> SplitString(string S1, string Delim)',
        explanation: 'Uses a while loop with find, substr, and erase to tokenize the string and stores each word in a vector.',
        code: `vector<string> SplitString(string S1, string Delim)\n{\n    vector<string> vString;\n    short pos = 0;\n    string sWord;\n    while ((pos = S1.find(Delim)) != std::string::npos)\n    {\n        sWord = S1.substr(0, pos);\n        if (sWord != "")\n        {\n            vString.push_back(sWord);\n        }\n        S1.erase(0, pos + Delim.length());\n    }\n    if (S1 != "")\n    {\n        vString.push_back(S1);\n    }\n    return vString;\n}`
      }
    ],
    keyConcepts: ['std::vector', 'vector::push_back', 'String Tokenizing', 'find()', 'substr()', 'erase()'],
    hints: [
      'Again, the `find`, `substr`, `erase` loop is the core of the solution.',
      'First, declare an empty `vector<string> vString;`',
      'Inside the loop, when you extract a word, instead of printing or counting it, add it to the vector using `vString.push_back(sWord);`',
      'The function should return the final populated vector.'
    ]
  },
  {
    id: 15,
    title: 'Problem 15 — Trim Left, Right, and All',
    description: 'Read a string and demonstrate trimming leading spaces, trailing spaces, and both.',
    example: '     Mohammed Abu-Hadhoud     ',
    generator: genTrimSteps,
    functions: [
        {
            name: 'TrimLeft(string S1)',
            signature: 'string TrimLeft(string S1)',
            explanation: 'Iterates from the left of the string, finds the first non-space character, and returns the substring from that point to the end.',
            code: `string TrimLeft(string S1)\n{\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (S1[i] != ' ')\n        {\n            return S1.substr(i, S1.length() - i);\n        }\n    }\n    return "";\n}`
        },
        {
            name: 'TrimRight(string S1)',
            signature: 'string TrimRight(string S1)',
            explanation: 'Iterates from the right of the string, finds the first non-space character, and returns the substring from the beginning to that point.',
            code: `string TrimRight(string S1)\n{\n    for (short i = S1.length() - 1; i >= 0; i--)\n    {\n        if (S1[i] != ' ')\n        {\n            return S1.substr(0, i + 1);\n        }\n    }\n    return "";\n}`
        },
        {
            name: 'Trim(string S1)',
            signature: 'string Trim(string S1)',
            explanation: 'A composite function that first calls TrimRight and then calls TrimLeft on the result to remove both leading and trailing spaces.',
            code: `string Trim(string S1)\n{\n    return (TrimLeft(TrimRight(S1)));\n}`
        }
    ],
    keyConcepts: ['String Iteration', 'substr()', 'Function Composition', 'Whitespace Handling'],
    hints: [
      'For `TrimLeft`, use a `for` loop that starts at index 0. The first time `S1[i]` is not a space, you\'ve found your starting point.',
      'For `TrimRight`, use a `for` loop that starts at `S1.length() - 1` and decrements. The first time `S1[i]` is not a space, you\'ve found your ending point.',
      'Use `string::substr` to extract the correct part of the string once you find the non-space character.',
      'For the full `Trim`, you can simply call the other two functions: `TrimLeft(TrimRight(S1))`'
    ]
  },
  {
    id: 16,
    title: 'Problem 16 — Join Vector to String',
    description: 'Join a vector of strings into a single string, separated by a delimiter.',
    example: ' ',
    generator: genJoinStringSteps,
    functions: [
        {
            name: 'JoinString(vector<string> vString, string Delim)',
            signature: 'string JoinString(vector<string> vString, string Delim)',
            explanation: 'Iterates through a vector of strings, concatenating each element and a delimiter to a result string. Finally, it removes the last trailing delimiter.',
            code: `string JoinString(vector<string> vString, string Delim)\n{\n    string S1 = "";\n    \n    for (string& s : vString)\n    {\n        S1 = S1 + s + Delim;\n    }\n    \n    return S1.substr(0, S1.length() - Delim.length());\n}`
        }
    ],
    keyConcepts: ['std::vector', 'String Concatenation', 'Range-based for loop', 'substr()'],
    hints: [
      'Create an empty string to build the result.',
      'Use a range-based for loop (`for (string s : vString)`) to iterate through the vector.',
      'In each iteration, append the current string `s` and the delimiter to your result string.',
      'This will leave an extra delimiter at the end. Use `substr` to return the string minus the last delimiter.'
    ]
  },
  {
    id: 17,
    title: 'Problem 17 — Join String (Vector & Array)',
    description: 'Demonstrates function overloading by joining both a vector and a C-style array of strings into a single string.',
    example: ' ',
    generator: genJoinStringOverloadSteps,
    functions: [
        {
            name: 'JoinString (vector overload)',
            signature: 'string JoinString(vector<string> vString, string Delim)',
            explanation: 'Iterates through a vector of strings, concatenating each element and a delimiter to a result string. Finally, it removes the last trailing delimiter.',
            code: `string JoinString(vector<string> vString, string Delim)\n{\n    string S1 = "";\n    \n    for (string& s : vString)\n    {\n        S1 = S1 + s + Delim;\n    }\n    \n    return S1.substr(0, S1.length() - Delim.length());\n}`
        },
        {
            name: 'JoinString (array overload)',
            signature: 'string JoinString(string arrString[], short Length, string Delim)',
            explanation: 'Iterates through a C-style array of strings, concatenating each element and a delimiter to a result string. Finally, it removes the last trailing delimiter.',
            code: `string JoinString(string arrString[], short Length, string Delim)\n{\n    string S1 = "";\n    \n    for (short i = 0; i < Length; i++)\n    {\n        S1 = S1 + arrString[i] + Delim;\n    }\n    \n    return S1.substr(0, S1.length() - Delim.length());\n}`
        }
    ],
    keyConcepts: ['Function Overloading', 'C-style Arrays', 'std::vector', 'String Concatenation'],
    hints: [
      'The core logic is the same for both functions.',
      'For the vector version, a range-based for loop is cleanest: `for (string s : vString)`',
      'For the C-style array version, you must pass the length as a parameter and use a traditional indexed for loop: `for (short i = 0; i < Length; i++)`',
      'Both functions will need to remove the trailing delimiter at the end.'
    ]
  },
  {
    id: 18,
    title: 'Problem 18 — Reverse Words in a String',
    description: 'Read a string and reverse the order of its words.',
    example: 'Welcome to Jordan',
    generator: genReverseWordsSteps,
    functions: [
      {
        name: 'ReadString()',
        signature: 'string ReadString()',
        explanation: 'Reads a full line of text from the user.',
        code: `string ReadString()\n{\n    string S1;\n    cout << "Please Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}`
      },
      {
        name: 'SplitString(string S1, string Delim)',
        signature: 'vector<string> SplitString(string S1, string Delim)',
        explanation: 'Uses a while loop with find, substr, and erase to tokenize the string and stores each word in a vector. This is a prerequisite for reversing.',
        code: `vector<string> SplitString(string S1, string Delim)\n{\n    vector<string> vString;\n    short pos = 0;\n    string sWord;\n    while ((pos = S1.find(Delim)) != std::string::npos)\n    {\n        sWord = S1.substr(0, pos);\n        if (sWord != "")\n        {\n            vString.push_back(sWord);\n        }\n        S1.erase(0, pos + Delim.length());\n    }\n    if (S1 != "")\n    {\n        vString.push_back(S1);\n    }\n    return vString;\n}`
      },
      {
        name: 'ReverseWordsInString(string S1)',
        signature: 'string ReverseWordsInString(string S1)',
        explanation: 'Splits the string into a vector of words, then iterates through the vector backwards (using an iterator) to build the new reversed string.',
        code: `string ReverseWordsInString(string S1)\n{\n    vector<string> vString;\n    string S2 = "";\n    vString = SplitString(S1, " ");\n    \n    vector<string>::iterator iter = vString.end();\n    \n    while (iter != vString.begin())\n    {\n        --iter;\n        S2 += *iter + " ";\n    }\n    \n    S2 = S2.substr(0, S2.length() - 1); //remove last space.\n    return S2;\n}`
      }
    ],
    keyConcepts: ['std::vector', 'vector::iterator', 'Looping Backwards', 'String Tokenizing', 'Function Composition'],
    hints: [
      'This is a multi-step problem. First, you need to get the words into a data structure.',
      'Use the `SplitString` function from an earlier problem to get a `vector<string>` of the words.',
      'To iterate backwards, you can use a `vector::iterator` starting at `vString.end()` and decrementing it until it reaches `vString.begin()`.',
      'Alternatively, a simpler way is to use a normal `for` loop that counts down: `for (int i = vString.size() - 1; i >= 0; i--)`.'
    ]
  },
  {
    id: 19,
    title: 'Problem 19 — Replace Word in String',
    description: 'Read a string, a word to find, and a replacement word, then replace all occurrences of the word.',
    example: 'Welcome to Jordan , Jordan is a nice country|Jordan|USA',
    generator: genReplaceWordSteps,
    functions: [
        {
            name: 'ReplaceWordInStringUsingBuiltInFunction',
            signature: 'string ReplaceWordInString(string S1, string StringToReplace, string sRepalceTo)',
            explanation: 'Uses a while loop with `string::find` to locate the word to replace. If found, it uses `string::replace` to substitute the new word and then searches again for the next occurrence.',
            code: `string ReplaceWordInStringUsingBuiltInFunction(string S1, string StringToReplace, string sRepalceTo)\n{\n    short pos = S1.find(StringToReplace);\n    \n    while (pos != std::string::npos)\n    {\n        S1 = S1.replace(pos, StringToReplace.length(), sRepalceTo);\n        pos = S1.find(StringToReplace); //find next\n    }\n    \n    return S1;\n}`
        }
    ],
    keyConcepts: ['string::find', 'string::replace', 'While Loop', 'std::string::npos', 'String Manipulation'],
    hints: [
      'You need to find the position of the word to replace. `string::find` is perfect for this.',
      'Since you need to replace *all* occurrences, a `while` loop is necessary. The loop should continue as long as `find` does not return `std::string::npos`.',
      'Inside the loop, use `string::replace(position, length, new_word)` to perform the replacement.',
      'Crucially, after replacing, you must call `find` again to search for the *next* occurrence.'
    ]
  },
  {
    id: 20,
    title: 'Problem 20 — Remove Punctuations',
    description: 'Read a string and remove all punctuation characters from it.',
    example: 'Welcome, to Jordan; Jordan is a nice country.',
    generator: genRemovePunctuationsSteps,
    functions: [
        {
            name: 'RemovePunctuationsFromString',
            signature: 'string RemovePunctuationsFromString(string S1)',
            explanation: 'Iterates through the input string. For each character, it uses `ispunct()` to check if it is a punctuation mark. If not, the character is appended to a new result string.',
            code: `string RemovePunctuationsFromString(string S1)\n{\n    string S2 = "";\n    \n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (!ispunct(S1[i]))\n        {\n            S2 += S1[i];\n        }\n    }\n    \n    return S2;\n}`
        }
    ],
    keyConcepts: ['String Iteration', 'ispunct()', 'String Concatenation', 'cctype library', 'Building Strings'],
    hints: [
      'Create a new, empty string that will hold the result.',
      'Loop through the original string character by character.',
      'The `<cctype>` library has a very useful function: `ispunct(char)`. It returns true if the character is punctuation.',
      'Inside the loop, if `!ispunct(S1[i])` is true, append that character to your new result string.'
    ]
  },
  {
    id: 21,
    title: 'Problem 21 — Convert Struct Record to Line',
    description: 'Visualize the process of converting a struct of client data into a single delimited string for saving.',
    example: '#//#',
    generator: genStructToLineSteps,
    functions: [
        {
            name: 'ConvertRecordToLine',
            signature: 'string ConvertRecordToLine(sClient Client, string Seperator)',
            explanation: 'Takes a client struct and concatenates its fields (AccountNumber, PinCode, Name, Phone, AccountBalance) into a single string, separated by the provided delimiter.',
            code: `struct sClient\n{\n    string AccountNumber;\n    string PinCode;\n    string Name;\n    string Phone;\n    double AccountBalance;\n};\n\nstring ConvertRecordToLine(sClient Client, string Seperator = "#//#")\n{\n    string stClientRecord = "";\n    stClientRecord += Client.AccountNumber + Seperator;\n    stClientRecord += Client.PinCode + Seperator;\n    stClientRecord += Client.Name + Seperator;\n    stClientRecord += Client.Phone + Seperator;\n    stClientRecord += to_string(Client.AccountBalance);\n    return stClientRecord;\n}`
        }
    ],
    keyConcepts: ['struct', 'Data Serialization', 'String Concatenation', 'to_string()', 'Delimiters'],
    hints: [
      'Start with an empty string, e.g., `stClientRecord`.',
      'Append each field from the struct one by one, followed by the separator string.',
      'The `AccountBalance` is a double, so it must be converted to a string using `to_string()` before it can be concatenated.',
      'Do not add a separator after the last field.'
    ]
  },
  {
    id: 22,
    title: 'Problem 22 — Convert Line to Struct Record',
    description: 'Visualize the process of parsing a delimited string and populating a C++ struct with the data.',
    example: 'A150#//#1234#//#Mohammed Abu-Hadhoud#//#079999#//#5270.00',
    generator: genLineToStructSteps,
    functions: [
      {
        name: 'SplitString',
        signature: 'vector<string> SplitString(string S1, string Delim)',
        explanation: 'A helper function that tokenizes a string by a delimiter and returns a vector of the tokens.',
        code: `vector<string> SplitString(string S1, string Delim)\n{\n    vector<string> vString;\n    short pos = 0;\n    string sWord;\n    while ((pos = S1.find(Delim)) != std::string::npos)\n    {\n        sWord = S1.substr(0, pos);\n        if (sWord != "")\n        {\n            vString.push_back(sWord);\n        }\n        S1.erase(0, pos + Delim.length());\n    }\n    if (S1 != "")\n    {\n        vString.push_back(S1);\n    }\n    return vString;\n}`
      },
      {
        name: 'ConvertLinetoRecord',
        signature: 'sClient ConvertLinetoRecord(string Line, string Seperator)',
        explanation: 'Uses SplitString to get a vector of data, then assigns each vector element to the corresponding field in an sClient struct. It uses `stod` to convert the balance.',
        code: `struct sClient\n{\n    string AccountNumber;\n    string PinCode;\n    string Name;\n    string Phone;\n    double AccountBalance;\n};\n\nsClient ConvertLinetoRecord(string Line, string Seperator = "#//#")\n{\n    sClient Client;\n    vector<string> vClientData;\n    vClientData = SplitString(Line, Seperator);\n    \n    Client.AccountNumber = vClientData[0];\n    Client.PinCode = vClientData[1];\n    Client.Name = vClientData[2];\n    Client.Phone = vClientData[3];\n    Client.AccountBalance = stod(vClientData[4]);\n    \n    return Client;\n}`
      },
      {
        name: 'PrintClientRecord',
        signature: 'void PrintClientRecord(sClient Client)',
        explanation: 'A utility function to print the contents of an sClient struct in a readable format.',
        code: `void PrintClientRecord(sClient Client)\n{\n    cout << "\\n\\nThe following is the extracted client record:\\n";\n    cout << "\\nAccout Number: " << Client.AccountNumber;\n    cout << "\\nPin Code      : " << Client.PinCode;\n    cout << "\\nName          : " << Client.Name;\n    cout << "\\nPhone         : " << Client.Phone;\n    cout << "\\nAccount Balance: " << Client.AccountBalance;\n}`
      }
    ],
    keyConcepts: ['Data Deserialization', 'String Parsing', 'std::vector', 'stod()', 'struct'],
    hints: [
      'This is the reverse of the previous problem. First, you need to break the line into pieces.',
      'Use the `SplitString` function (from P14) to get a `vector<string>` of the client data fields.',
      'Create a new, empty `sClient` struct.',
      'Assign each element from the vector to its corresponding field in the struct (e.g., `Client.AccountNumber = vClientData[0];`).',
      'The account balance is a string in the vector. Use `stod()` (string to double) to convert it before assigning it to the struct field.'
    ]
  },
  {
    id: 23,
    title: 'Problem 23 — Add Multiple Clients to a File',
    description: 'Simulate reading multiple client records from a user and saving each one as a single line in a file.',
    example: 'This problem is a simulation and does not take input.',
    generator: genAddClientsToFileSteps,
    functions: [
      {
        name: 'ReadNewClient',
        signature: 'sClient ReadNewClient()',
        explanation: 'Prompts the user to enter all fields for a new client and returns a populated sClient struct. Uses `cin >> ws` to handle whitespace before reading the account number.',
        code: `struct sClient\n{\n    string AccountNumber;\n    string PinCode;\n    string Name;\n    string Phone;\n    double AccountBalance;\n};\n\nsClient ReadNewClient()\n{\n    sClient Client;\n    cout << "Enter Account Number? ";\n    getline(cin >> ws, Client.AccountNumber);\n    cout << "Enter PinCode? ";\n    getline(cin, Client.PinCode);\n    cout << "Enter Name? ";\n    getline(cin, Client.Name);\n    cout << "Enter Phone? ";\n    getline(cin, Client.Phone);\n    cout << "Enter AccountBalance? ";\n    cin >> Client.AccountBalance;\n    return Client;\n}`
      },
      {
        name: 'ConvertRecordToLine',
        signature: 'string ConvertRecordToLine(sClient Client, string Seperator)',
        explanation: 'Takes a client struct and concatenates its fields into a single string, separated by the provided delimiter.',
        code: `string ConvertRecordToLine(sClient Client, string Seperator = "#//#")\n{\n    string stClientRecord = "";\n    stClientRecord += Client.AccountNumber + Seperator;\n    stClientRecord += Client.PinCode + Seperator;\n    stClientRecord += Client.Name + Seperator;\n    stClientRecord += Client.Phone + Seperator;\n    stClientRecord += to_string(Client.AccountBalance);\n    return stClientRecord;\n}`
      },
      {
        name: 'AddDataLineToFile',
        signature: 'void AddDataLineToFile(string FileName, string stDataLine)',
        explanation: 'Opens a file in append mode (`ios::out | ios::app`) and writes a given line of data to it, followed by a newline.',
        code: `void AddDataLineToFile(string FileName, string stDataLine)\n{\n    fstream MyFile;\n    MyFile.open(FileName, ios::out | ios::app);\n    if (MyFile.is_open())\n    {\n        MyFile << stDataLine << endl;\n        MyFile.close();\n    }\n}`
      },
       {
        name: 'AddClients',
        signature: 'void AddClients()',
        explanation: 'Uses a do-while loop to repeatedly ask the user to add new clients until they choose to stop. It calls other functions to handle the details of reading and saving.',
        code: `void AddClients()\n{\n    char AddMore = 'Y';\n    do\n    {\n        cout << "Adding New Client:\\n\\n";\n        AddNewClient();\n        cout << "\\nClient Added Successfully, do you want to add more clients? Y/N? ";\n        cin >> AddMore;\n    } while (toupper(AddMore) == 'Y');\n}`
      }
    ],
    keyConcepts: ['File I/O', 'fstream', 'ios::app', 'do-while loop', 'Function Composition', 'User Input Simulation'],
    hints: [
      'The logic should revolve around a `do-while` loop that continues as long as the user enters \'Y\'.',
      'Inside the loop: 1. Read a new client record into a struct. 2. Convert that struct into a delimited line. 3. Append that line to the file.',
      'To add to a file without erasing its contents, open the `fstream` with the `ios::app` (append) flag.',
      'Always remember to close your file stream when you are done with it.'
    ]
  },
  {
    id: 24,
    title: 'Problem 24 — Load Clients from File to Vector',
    description: 'Visualize reading a file line by line, parsing each line into a struct, storing these structs in a vector, and finally printing a formatted list.',
    example: 'This problem is a simulation and does not take input.',
    generator: genLoadClientsFromFileSteps,
    functions: [
       {
        name: 'SplitString',
        signature: 'vector<string> SplitString(string S1, string Delim)',
        explanation: 'A helper function that tokenizes a string by a delimiter and returns a vector of the tokens.',
        code: `vector<string> SplitString(string S1, string Delim)\n{\n    vector<string> vString;\n    short pos = 0;\n    string sWord;\n    while ((pos = S1.find(Delim)) != std::string::npos)\n    {\n        sWord = S1.substr(0, pos);\n        if (sWord != "")\n        {\n            vString.push_back(sWord);\n        }\n        S1.erase(0, pos + Delim.length());\n    }\n    if (S1 != "")\n    {\n        vString.push_back(S1);\n    }\n    return vString;\n}`
      },
      {
        name: 'ConvertLinetoRecord',
        signature: 'sClient ConvertLinetoRecord(string Line, string Seperator)',
        explanation: 'Uses SplitString to get a vector of data, then assigns each vector element to the corresponding field in an sClient struct. It uses `stod` to convert the balance.',
        code: `struct sClient\n{\n    string AccountNumber;\n    string PinCode;\n    string Name;\n    string Phone;\n    double AccountBalance;\n};\n\nsClient ConvertLinetoRecord(string Line, string Seperator = "#//#")\n{\n    sClient Client;\n    vector<string> vClientData;\n    vClientData = SplitString(Line, Seperator);\n    \n    Client.AccountNumber = vClientData[0];\n    Client.PinCode = vClientData[1];\n    Client.Name = vClientData[2];\n    Client.Phone = vClientData[3];\n    Client.AccountBalance = stod(vClientData[4]);\n    \n    return Client;\n}`
      },
       {
        name: 'LoadCleintsDataFromFile',
        signature: 'vector<sClient> LoadCleintsDataFromFile(string FileName)',
        explanation: 'Opens a file, reads it line by line using `getline`, parses each line into a struct, and adds the struct to a vector which is then returned.',
        code: `vector<sClient> LoadCleintsDataFromFile(string FileName)\n{\n    vector<sClient> vClients;\n    fstream MyFile;\n    MyFile.open(FileName, ios::in);\n    \n    if (MyFile.is_open())\n    {\n        string Line;\n        sClient Client;\n        \n        while (getline(MyFile, Line))\n        {\n            Client = ConvertLinetoRecord(Line);\n            vClients.push_back(Client);\n        }\n        MyFile.close();\n    }\n    return vClients;\n}`
      },
      {
        name: 'PrintAllClientsData',
        signature: 'void PrintAllClientsData(vector<sClient> vClients)',
        explanation: 'Prints a formatted header, then iterates through a vector of clients, printing each one as a formatted row. It uses `setw` from `<iomanip>` for alignment.',
        code: `void PrintClientRecord(sClient Client)\n{\n    cout << "| " << setw(15) << left << Client.AccountNumber;\n    cout << "| " << setw(10) << left << Client.PinCode;\n    cout << "| " << setw(40) << left << Client.Name;\n    cout << "| " << setw(12) << left << Client.Phone;\n    cout << "| " << setw(12) << left << Client.AccountBalance;\n}\n\nvoid PrintAllClientsData(vector<sClient> vClients)\n{\n    cout << "\\n\\t\\t\\t\\t\\tClient List (" << vClients.size() << ") Client(s).";\n    cout << "\\n\\n_______________________________________________________";\n    cout << "_________________________________________\\n" << endl;\n    \n    cout << "| " << left << setw(15) << "Accout Number";\n    cout << "| " << left << setw(10) << "Pin Code";\n    cout << "| " << left << setw(40) << "Client Name";\n    cout << "| " << left << setw(12) << "Phone";\n    cout << "| " << left << setw(12) << "Balance";\n    cout << "\\n_______________________________________________________";\n    cout << "_________________________________________\\n" << endl;\n    \n    for (sClient Client : vClients)\n    {\n        PrintClientRecord(Client);\n        cout << endl;\n    }\n    \n    cout << "\\n_______________________________________________________";\n    cout << "_________________________________________\\n" << endl;\n}`
      },
    ],
    keyConcepts: ['File Reading', 'fstream', 'getline()', 'std::vector<struct>', 'Formatted Output', 'setw()', 'iomanip'],
    hints: [
      'To read a file line by line, the `while (getline(MyFile, Line))` loop is the standard approach.',
      'Inside the loop, you will process one `Line` at a time.',
      'For each line, use the `ConvertLinetoRecord` function from P22 to parse it into a `sClient` struct.',
      'Add the newly created struct to your vector using `vClients.push_back(Client);`.'
    ]
  },
  {
    id: 25,
    title: 'Problem 25 — Find Client by Account Number',
    description: 'Visualize finding a client record by searching for their account number in a vector loaded from a file.',
    example: 'A102',
    generator: genFindClientByAccountNumberSteps,
    functions: [
       {
        name: 'SplitString, ConvertLinetoRecord, LoadCleintsDataFromFile',
        signature: '// Helper functions from previous problems',
        explanation: 'These functions are used to load the client data from "Clients.txt" into a vector of structs, which is a prerequisite for searching.',
        code: `// Functions SplitString, ConvertLinetoRecord, and LoadCleintsDataFromFile are assumed to be defined as in Problem 24.`
      },
      {
        name: 'PrintClientCard',
        signature: 'void PrintClientCard(sClient Client)',
        explanation: 'A utility function to print the details of a single client in a card-like format.',
        code: `void PrintClientCard(sClient Client)\n{\n    cout << "\\nThe following are the client details:\\n";\n    cout << "\\nAccout Number: " << Client.AccountNumber;\n    cout << "\\nPin Code      : " << Client.PinCode;\n    cout << "\\nName          : " << Client.Name;\n    cout << "\\nPhone         : " << Client.Phone;\n    cout << "\\nAccount Balance: " << Client.AccountBalance;\n}`
      },
      {
        name: 'FindClientByAccountNumber',
        signature: 'bool FindClientByAccountNumber(string AccountNumber, sClient& Client)',
        explanation: 'Loads all clients into a vector. It then iterates through the vector, comparing account numbers. If a match is found, it updates the `Client` struct (passed by reference) and returns `true`. Otherwise, it returns `false`.',
        code: `struct sClient\n{\n    string AccountNumber;\n    string PinCode;\n    string Name;\n    string Phone;\n    double AccountBalance;\n};\n\nbool FindClientByAccountNumber(string AccountNumber, sClient& Client)\n{\n    vector<sClient> vClients = LoadCleintsDataFromFile("Clients.txt");\n    \n    for (sClient C : vClients)\n    {\n        if (C.AccountNumber == AccountNumber)\n        {\n            Client = C;\n            return true;\n        }\n    }\n    return false;\n}`
      },
      {
        name: 'ReadClientAccountNumber',
        signature: 'string ReadClientAccountNumber()',
        explanation: 'A simple utility function to prompt the user and read the account number they want to find.',
        code: `string ReadClientAccountNumber()\n{\n    string AccountNumber = "";\n    cout << "\\nPlease enter AccountNumber? ";\n    cin >> AccountNumber;\n    return AccountNumber;\n}`
      }
    ],
    keyConcepts: ['Linear Search', 'Pass by Reference', 'Vector Iteration', 'Boolean Return Value', 'Conditional Logic'],
    hints: [
      'First, load all clients from the file into a vector using the function from P24.',
      'Iterate through the vector of clients using a range-based for loop.',
      'Inside the loop, compare the `AccountNumber` of the current client (`C.AccountNumber`) with the account number you are searching for.',
      'If you find a match, you should return `true` immediately. If the loop finishes without a match, return `false`.'
    ]
  },
  {
    id: 26,
    title: 'Problem 26 — Delete Client by Account Number',
    description: 'Visualize finding a client, marking them for deletion, and then rewriting the file without that client.',
    example: 'A102',
    generator: genDeleteClientByAccountNumberSteps,
    functions: [
      {
        name: 'Helper Functions',
        signature: '// Load, Convert, Split',
        explanation: 'This problem relies on several helper functions from previous problems to load and convert client data from the text file.',
        code: `// Functions SplitString, ConvertLinetoRecord, and LoadCleintsDataFromFile are assumed to be defined as in Problem 24.`
      },
       {
        name: 'FindClientByAccountNumber',
        signature: 'bool FindClientByAccountNumber(string AccountNumber, vector<sClient> vClients, sClient& Client)',
        explanation: 'Iterates through the provided vector to find a client. Note: This version doesn\'t reload from file, it searches the in-memory vector.',
        code: `bool FindClientByAccountNumber(string AccountNumber, vector<sClient> vClients, sClient& Client)\n{\n    for (sClient C : vClients)\n    {\n        if (C.AccountNumber == AccountNumber)\n        {\n            Client = C;\n            return true;\n        }\n    }\n    return false;\n}`
      },
      {
        name: 'MarkClientForDeleteByAccountNumber',
        signature: 'bool MarkClientForDeleteByAccountNumber(string AccountNumber, vector<sClient>& vClients)',
        explanation: 'Finds a client by account number and sets their `MarkForDelete` flag to true. The vector is passed by reference (&) so the change persists.',
        code: `struct sClient\n{\n    string AccountNumber;\n    string PinCode;\n    string Name;\n    string Phone;\n    double AccountBalance;\n    bool MarkForDelete = false;\n};\n\nbool MarkClientForDeleteByAccountNumber(string AccountNumber, vector<sClient>& vClients)\n{\n    for (sClient& C : vClients)\n    {\n        if (C.AccountNumber == AccountNumber)\n        {\n            C.MarkForDelete = true;\n            return true;\n        }\n    }\n    return false;\n}`
      },
      {
        name: 'SaveCleintsDataToFile',
        signature: 'vector<sClient> SaveCleintsDataToFile(string FileName, vector<sClient> vClients)',
        explanation: 'Opens a file in write mode (`ios::out`), which overwrites it. It then iterates through the vector and writes only the records where `MarkForDelete` is false.',
        code: `vector<sClient> SaveCleintsDataToFile(string FileName, vector<sClient> vClients)\n{\n    fstream MyFile;\n    MyFile.open(FileName, ios::out); //overwrite\n    string DataLine;\n    if (MyFile.is_open())\n    {\n        for (sClient C : vClients)\n        {\n            if (C.MarkForDelete == false)\n            {\n                DataLine = ConvertRecordToLine(C);\n                MyFile << DataLine << endl;\n            }\n        }\n        MyFile.close();\n    }\n    return vClients;\n}`
      },
      {
        name: 'DeleteClientByAccountNumber',
        signature: 'bool DeleteClientByAccountNumber(string AccountNumber, vector<sClient>& vClients)',
        explanation: 'The main orchestrator function. It finds the client, asks for confirmation, marks for deletion, saves the updated list to the file, and then reloads the vector to reflect the changes.',
        code: `bool DeleteClientByAccountNumber(string AccountNumber, vector<sClient>& vClients)\n{\n    sClient Client;\n    char Answer = 'n';\n    if (FindClientByAccountNumber(AccountNumber, vClients, Client))\n    {\n        PrintClientCard(Client);\n        cout << "\\n\\nAre you sure you want delete this client? y/n ? ";\n        cin >> Answer;\n        if (Answer == 'y' || Answer == 'Y')\n        {\n            MarkClientForDeleteByAccountNumber(AccountNumber, vClients);\n            SaveCleintsDataToFile(ClientsFileName, vClients);\n            //Refresh Clients\n            vClients = LoadCleintsDataFromFile(ClientsFileName);\n            cout << "\\n\\nClient Deleted Successfully.";\n            return true;\n        }\n    }\n    else\n    {\n        cout << "\\nClient with Account Number (" << AccountNumber << ") is Not Found!";\n        return false;\n    }\n}`
      }
    ],
    keyConcepts: ['Soft Delete', 'File Overwriting (ios::out)', 'Vector Pass-by-Reference', 'Data Persistence', 'State Management'],
    hints: [
      'A safe way to delete is to first load all data into a vector.',
      'Then, find the client to delete in the vector and mark it (e.g., with a boolean `MarkForDelete = true`). This is called a "soft delete".',
      'Next, open the original file in *write* mode (`ios::out`), which erases its contents.',
      'Finally, loop through your vector and write back only the clients that are *not* marked for deletion.'
    ]
  },
  {
    id: 27,
    title: 'Problem 27 — Update Client by Account Number',
    description: 'Visualize finding a client, reading new data, updating the record in memory, and overwriting the file.',
    example: 'A123',
    generator: genUpdateClientByAccountNumberSteps,
    functions: [
        {
            name: 'Helper Functions',
            signature: '// Load, Convert, Find, etc.',
            explanation: 'This problem relies on several helper functions from previous problems to load, convert, find, and save client data.',
            code: `// Functions SplitString, ConvertLinetoRecord, LoadCleintsDataFromFile, FindClientByAccountNumber, and SaveCleintsDataToFile are assumed to be defined.`
        },
        {
            name: 'ChangeClientRecord',
            signature: 'sClient ChangeClientRecord(string AccountNumber)',
            explanation: 'Prompts the user to enter new details for a client, keeping the original AccountNumber. Returns a new, populated sClient struct.',
            code: `sClient ChangeClientRecord(string AccountNumber)\n{\n    sClient Client;\n    Client.AccountNumber = AccountNumber;\n    cout << "\\n\\nEnter PinCode? ";\n    getline(cin >> ws, Client.PinCode);\n    cout << "Enter Name? ";\n    getline(cin, Client.Name);\n    cout << "Enter Phone? ";\n    getline(cin, Client.Phone);\n    cout << "Enter AccountBalance? ";\n    cin >> Client.AccountBalance;\n    return Client;\n}`
        },
        {
            name: 'UpdateClientByAccountNumber',
            signature: 'bool UpdateClientByAccountNumber(string AccountNumber, vector<sClient>& vClients)',
            explanation: 'Finds a client, asks for confirmation, reads new data, updates the client in the vector (by reference), and saves the changes back to the file.',
            code: `struct sClient\n{\n    string AccountNumber;\n    string PinCode;\n    string Name;\n    string Phone;\n    double AccountBalance;\n    bool MarkForDelete = false;\n};\n\nbool UpdateClientByAccountNumber(string AccountNumber, vector<sClient>& vClients)\n{\n    sClient Client;\n    char Answer = 'n';\n    if (FindClientByAccountNumber(AccountNumber, vClients, Client))\n    {\n        PrintClientCard(Client);\n        cout << "\\n\\nAre you sure you want update this client? y/n ? ";\n        cin >> Answer;\n        if (Answer == 'y' || Answer == 'Y')\n        {\n            for (sClient& C : vClients)\n            {\n                if (C.AccountNumber == AccountNumber)\n                {\n                    C = ChangeClientRecord(AccountNumber);\n                    break;\n                }\n            }\n            SaveCleintsDataToFile(ClientsFileName, vClients);\n            cout << "\\n\\nClient Updated Successfully.";\n            return true;\n        }\n    }\n    else\n    {\n        cout << "\\nClient with Account Number (" << AccountNumber << ") is Not Found!";\n        return false;\n    }\n}`
        }
    ],
    keyConcepts: ['Data Update', 'In-place Modification', 'File Overwriting', 'Vector Pass-by-Reference', 'CRUD Operations'],
    hints: [
      'The process is very similar to deleting: load data into a vector first.',
      'Find the client you want to update within the vector.',
      'Once found, prompt the user for the new information and update the fields of that specific client struct *in the vector*.',
      'Finally, save the entire modified vector back to the file, overwriting the old contents.'
    ]
  }
];
