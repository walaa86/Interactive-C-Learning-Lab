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
    mem: [],
    vectorContents: [...vString],
  });

  while (true) {
    const pos = s1.indexOf(delim);

    steps.push({
      i: stepCounter++,
      code: `pos = S1.find("${delim}")`,
      explanation: `Search for delimiter " ". Found at index: ${pos}. (npos is -1)`,
      input: str,
      modified: s1,
      mem: [`pos = ${pos}`],
      vectorContents: [...vString],
    });
    
    steps.push({
      i: stepCounter++,
      code: `while (pos != std::string::npos)`,
      explanation: `Check loop condition: ${pos} != -1. Condition is ${pos !== -1 ? 'true, enter loop' : 'false, exit loop'}.`,
      input: str,
      modified: s1,
      mem: [`Continue loop? ${pos !== -1}`],
      vectorContents: [...vString],
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
      mem: [`sWord = "${sWord}"`],
      vectorContents: [...vString],
    });

    if (sWord !== "") {
        vString.push(sWord);
        steps.push({
          i: stepCounter++,
          code: `vString.push_back(sWord);`,
          explanation: `Word "${sWord}" is not empty. Adding it to the vector.`,
          input: str,
          modified: s1,
          mem: [],
          vectorContents: [...vString],
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
      mem: [`S1 was: "${s1BeforeErase}"`, `S1 is now: "${s1}"`],
      vectorContents: [...vString],
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
      mem: [],
      vectorContents: [...vString],
    });
  } else {
    steps.push({
      i: stepCounter++,
      code: `// After loop`,
      explanation: `Loop finished. No remaining characters to add.`,
      input: str,
      modified: s1,
      mem: [`S1 is empty.`],
      vectorContents: [...vString],
    });
  }

  steps.push({
    i: stepCounter++,
    code: 'return vString;',
    explanation: `Function finished. The vector now contains ${vString.length} words and is returned.`,
    input: str,
    modified: s1,
    output: vString,
    mem: [`size=${vString.length}`],
    vectorContents: [...vString],
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
    mem: [],
    vectorContents: [...vString],
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
      mem: [],
      vectorContents: [...vString],
    });
  }

  steps.push({
    i: stepCounter++,
    phase: 'split',
    code: `// Splitting complete`,
    explanation: `The string has been split into ${vString.length} words.`,
    input: str,
    modified: s1,
    mem: [],
    vectorContents: [...vString],
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
    mem: [`S2 = ""`, `iterator at end`],
    vectorContents: [...vString],
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
      mem: [`iterator at index ${i}`],
      vectorContents: [...vString],
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
      mem: [`S2 was: "${s2Before}"`, `S2 is now: "${S2}"`],
      vectorContents: [...vString],
    });
  }
  
  steps.push({
      i: -1,
      phase: 'reverse',
      code: `// Loop finished`,
      explanation: 'The reverse loop has finished. The string now has an extra space at the end.',
      input: str,
      modified: S2,
      mem: [`Final looped string: "${S2}"`],
      vectorContents: [...vString],
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
      mem: [`Final result: "${finalString}"`],
      vectorContents: [...vString],
  });

  steps.push({
    i: -1,
    code: 'return S2;',
    explanation: 'Program finished. Returning the reversed string.',
    input: str,
    modified: finalString,
    output: [finalString],
    mem: ['Done'],
    vectorContents: [...vString],
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
    let vString: string[] = [];
    let stepCounter = 0;
    const emptyClient = { AccountNumber: "", PinCode: "", Name: "", Phone: "", AccountBalance: null };
    const defaultSearch = { target: '', currentIndex: -1, found: false, resultClient: emptyClient };

    // --- Phase 1: Split String into Vector ---
    steps.push({
        i: stepCounter++,
        phase: 'split',
        code: `vClientData = SplitString(Line, "${separator}");`,
        explanation: 'Start by splitting the input line into tokens using the SplitString function.',
        input: line,
        mem: [],
        vectorContents: [...vString],
        search: defaultSearch,
    });

    const parts = line.split(separator);
    for (const part of parts) {
        vString.push(part);
        steps.push({
            i: stepCounter++,
            phase: 'split',
            code: `// Inside SplitString loop...`,
            explanation: `Found token "${part}" and added it to the vector.`,
            input: line,
            mem: [],
            vectorContents: [...vString],
            search: defaultSearch,
        });
    }

    steps.push({
        i: stepCounter++,
        phase: 'split',
        code: `// Splitting complete`,
        explanation: `The line has been split into ${vString.length} tokens. The vector is now ready.`,
        input: line,
        mem: [],
        vectorContents: [...vString],
        search: defaultSearch,
    });
    
    // --- Phase 2: Assign Vector elements to Struct fields ---
    let Client: any = { AccountNumber: "", PinCode: "", Name: "", Phone: "", AccountBalance: null };
    const fields: ('AccountNumber' | 'PinCode' | 'Name' | 'Phone' | 'AccountBalance')[] = ['AccountNumber', 'PinCode', 'Name', 'Phone', 'AccountBalance'];
    
    steps.push({
        i: stepCounter++,
        phase: 'assign',
        code: `sClient Client;`,
        explanation: 'An empty sClient struct is created in memory.',
        input: line,
        mem: [`Client struct is empty`],
        vectorContents: [...vString],
        search: { target: '', currentIndex: -1, found: false, resultClient: { ...Client } }
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
            mem: [`Client.${fieldName} = ${Client[fieldName]}`],
            vectorContents: [...vString],
            search: { target: '', currentIndex: -1, found: false, resultClient: { ...Client } }
        });
    }

    // --- Phase 3: Print the Record ---
    const finalOutput: string[] = [];
    steps.push({
        i: -1,
        phase: 'print',
        code: `PrintClientRecord(Client);`,
        explanation: `The struct is now fully populated. The program will print its contents.`,
        input: line,
        output: [],
        mem: [`Client is fully populated.`],
        vectorContents: [...vString],
        search: { target: '', currentIndex: -1, found: false, resultClient: { ...Client } }
    });
    
    for (const fieldName of fields) {
        const readableFieldName = fieldName.replace(/([A-Z])/g, ' $1').trim();
        finalOutput.push(`${readableFieldName.padEnd(15)}: ${Client[fieldName]}`);
        steps.push({ 
            i: -1, 
            phase: 'print', 
            field: fieldName, 
            code: `cout << Client.${fieldName};`, 
            explanation: `Printing ${fieldName}.`, 
            input: line, 
            output: [...finalOutput], 
            mem: [], 
            vectorContents: [...vString],
            search: { target: '', currentIndex: -1, found: false, resultClient: { ...Client } } 
        });
    }

    steps.push({
        i: -1,
        code: 'return 0;',
        explanation: 'Program finished.',
        input: line,
        output: [...finalOutput],
        mem: ['Done'],
        vectorContents: [...vString],
        search: { target: '', currentIndex: -1, found: false, resultClient: { ...Client } }
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
            update: { target: accountNumber, found: false, confirmed: null, clientBefore: C }
        });
        if (match) {
            foundClient = { ...C }; // Clone it
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
        steps.push({
            i: foundIndex,
            phase: 'find_client',
            code: `// Client Found`,
            explanation: `Match found for "${accountNumber}" at index ${foundIndex}.`,
            input: accountNumber,
            mem: [`Found client: "${foundClient.Name}"`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: null, clientBefore: foundClient }
        });

        // --- Confirm Update ---
        output.push(`\nThe following are the client details:`, `\nAccout Number: ${foundClient.AccountNumber}`, `\nPin Code      : ${foundClient.PinCode}`, `\nName          : ${foundClient.Name}`, `\nPhone         : ${foundClient.Phone}`, `\nAccount Balance: ${foundClient.AccountBalance}`);
        steps.push({
            i: stepCounter++,
            phase: 'confirm_update',
            code: `PrintClientCard(Client);`,
            explanation: `Displaying client's current details before asking for confirmation.`,
            input: accountNumber,
            output: [...output],
            mem: [`Printing client card`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: null, clientBefore: foundClient }
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
            update: { target: accountNumber, found: true, confirmed: true, clientBefore: foundClient }
        });
        
        // --- Read New Data & Update Vector ---
        let clientAfter = { ...foundClient };
        steps.push({
            i: stepCounter++,
            phase: 'read_new_data',
            code: `ReadNewClient(vClients[${foundIndex}]);`,
            explanation: `Simulating reading new client information. Account number cannot be changed.`,
            input: accountNumber,
            mem: [`Reading new data`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore: foundClient }
        });

        Object.entries(newData).forEach(([key, value]) => {
            const field = key as keyof typeof newData;
            (clientAfter as any)[field] = value;
            steps.push({
                i: foundIndex,
                phase: 'update_vector',
                field: field,
                code: `// Reading ${field}...`,
                explanation: `Simulated new input for ${field}: "${value}". Updating struct in vector.`,
                input: accountNumber,
                mem: [`vClients[${foundIndex}].${field} = ${value}`],
                vectorContents: [...vClients.slice(0, foundIndex), clientAfter, ...vClients.slice(foundIndex+1)],
                fileContents: [...fileContents],
                update: { target: accountNumber, found: true, confirmed: true, clientBefore: foundClient, clientAfter: clientAfter }
            });
        });
        
        vClients[foundIndex] = clientAfter;
        
        // --- Save to File ---
        steps.push({
            i: stepCounter++,
            phase: 'save_to_file',
            code: `SaveCleintsDataToFile(ClientsFileName, vClients);`,
            explanation: `Opening "Clients.txt" in write mode (ios::out) to overwrite with updated data.`,
            input: accountNumber,
            mem: [`Opening file for overwrite`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore: foundClient, clientAfter: clientAfter }
        });
        
        fileContents = vClients.map(C => `${C.AccountNumber}${separator}${C.PinCode}${separator}${C.Name}${separator}${C.Phone}${separator}${C.AccountBalance}`);
        
        steps.push({
            i: stepCounter++,
            phase: 'save_to_file',
            code: `// Writing all records to file`,
            explanation: `Writing all ${vClients.length} records back to the file, including the updated one.`,
            input: accountNumber,
            mem: [`Writing to file...`],
            vectorContents: [...vClients],
            fileContents: [...fileContents],
            update: { target: accountNumber, found: true, confirmed: true, clientBefore: foundClient, clientAfter: clientAfter }
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

function genSplitStringCustomDelimSteps(str: string): Step[] {
  const steps: Step[] = [];
  let s1 = str;
  let vString: string[] = [];
  const delim = "#//#";
  let stepCounter = 0;

  steps.push({
    i: stepCounter++,
    code: `vector<string> vString;`,
    explanation: `Initialize an empty vector. The delimiter is "${delim}".`,
    input: str,
    modified: s1,
    mem: [`Delimiter = "${delim}"`],
    vectorContents: [...vString],
  });

  while (true) {
    const pos = s1.indexOf(delim);

    steps.push({
      i: stepCounter++,
      code: `pos = S1.find("${delim}")`,
      explanation: `Search for delimiter "${delim}". Found at index: ${pos}. (string::npos is -1)`,
      input: str,
      modified: s1,
      mem: [`pos = ${pos}`],
      vectorContents: [...vString],
    });
    
    steps.push({
      i: stepCounter++,
      code: `while (pos != std::string::npos)`,
      explanation: `Check loop condition: ${pos} != -1. Condition is ${pos !== -1 ? 'true, continue loop' : 'false, exit loop'}.`,
      input: str,
      modified: s1,
      mem: [`Continue loop? ${pos !== -1}`],
      vectorContents: [...vString],
    });
    
    if (pos === -1) {
      break; 
    }

    const sWord = s1.substring(0, pos);
    steps.push({
      i: stepCounter++,
      code: `sWord = S1.substr(0, ${pos});`,
      explanation: `Extract the part before the delimiter using substr. The token is "${sWord}".`,
      input: str,
      modified: s1,
      mem: [`sWord = "${sWord}"`],
      vectorContents: [...vString],
    });

    if (sWord !== "") {
        vString.push(sWord);
        steps.push({
          i: stepCounter++,
          code: `vString.push_back(sWord);`,
          explanation: `The token "${sWord}" is not empty. Add it to the vector.`,
          input: str,
          modified: s1,
          mem: [],
          vectorContents: [...vString],
        });
    }

    const s1BeforeErase = s1;
    s1 = s1.substring(pos + delim.length);
    steps.push({
      i: stepCounter++,
      code: `S1.erase(0, ${pos} + ${delim.length});`,
      explanation: `Erase the processed token and the delimiter from the string.`,
      input: str,
      modified: s1,
      mem: [`S1 was: "${s1BeforeErase}"`, `S1 is now: "${s1}"`],
      vectorContents: [...vString],
    });
  }

  // After loop
  if (s1 !== "") {
    vString.push(s1);
    steps.push({
      i: stepCounter++,
      code: `vString.push_back(S1);`,
      explanation: `Loop finished. Add the last remaining part "${s1}" to the vector.`,
      input: str,
      modified: s1,
      mem: [],
      vectorContents: [...vString],
    });
  } else {
    steps.push({
      i: stepCounter++,
      code: `// After loop`,
      explanation: `Loop finished. No remaining characters to add.`,
      input: str,
      modified: s1,
      mem: [`S1 is empty.`],
      vectorContents: [...vString],
    });
  }

  steps.push({
    i: stepCounter++,
    code: 'return vString;',
    explanation: `Function finished. The vector now contains ${vString.length} tokens and is returned.`,
    input: str,
    modified: s1,
    output: vString,
    mem: [`size=${vString.length}`],
    vectorContents: [...vString],
  });

  return steps;
}

function genFilterWordsByLengthSteps(combinedStr: string): Step[] {
  const parts = combinedStr.split('|');
  if (parts.length !== 2) {
    return [{ i: -1, code: 'Error', explanation: 'Input must be in the format "sentence|max_length", e.g., "this is a test|4"', input: combinedStr, mem: [] }];
  }
  const sentence = parts[0];
  const maxLength = parseInt(parts[1], 10);

  if (isNaN(maxLength)) {
    return [{ i: -1, code: 'Error', explanation: `Invalid max length provided: "${parts[1]}". It must be a number.`, input: combinedStr, mem: [] }];
  }

  const steps: Step[] = [];
  let stepCounter = 0;
  const words = sentence.split(' ').filter(Boolean); // Split and remove empty strings
  let output: string[] = [];
  
  steps.push({
    i: stepCounter++,
    code: `string sentence = "${sentence}";\nint maxLength = ${maxLength};`,
    explanation: `Start with the sentence and the maximum word length.`,
    input: combinedStr,
    modified: sentence,
    mem: [`maxLength = ${maxLength}`]
  });
  
  steps.push({
    i: stepCounter++,
    phase: 'split',
    code: `vector<string> words = SplitString(sentence, " ");`,
    explanation: `Split the sentence into a vector of words.`,
    input: combinedStr,
    mem: [],
    vectorContents: words
  });
  
  steps.push({
    i: stepCounter++,
    code: `for (const string& word : words)`,
    explanation: 'Begin iterating through the vector of words.',
    input: combinedStr,
    mem: ['Starting loop'],
    vectorContents: words
  });
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isShortEnough = word.length <= maxLength;

    steps.push({
      i: i,
      phase: 'check',
      code: `if (word.length() <= ${maxLength})`,
      explanation: `Checking word "${word}". Is its length (${word.length}) less than or equal to ${maxLength}? ${isShortEnough ? 'Yes' : 'No'}.`,
      input: combinedStr,
      mem: [`Checking "${word}" (length ${word.length})`],
      vectorContents: words
    });
    
    if (isShortEnough) {
      output.push(word);
      steps.push({
        i: i,
        phase: 'print',
        code: `cout << word << endl;`,
        explanation: `Yes, the condition is met. Printing the word "${word}".`,
        input: combinedStr,
        output: [...output],
        mem: [`Printed "${word}"`],
        vectorContents: words
      });
    }
  }

  steps.push({
    i: stepCounter++,
    code: 'return 0;',
    explanation: 'Finished iterating through all words.',
    input: combinedStr,
    output: [...output],
    mem: ['Done'],
    vectorContents: words
  });

  return steps;
}

export const problems: Problem[] = [
  { id: 1, title: 'Problem 1 — Print First Letters', description: 'Write a function to print the first letter of each word in a string.', example: 'Mohammed Abu-Hadhoud', generator: genPrintFirstLettersSteps, functions: [{ name: 'PrintFirstLetterOfEachWord', signature: 'void PrintFirstLetterOfEachWord(string S1)', explanation: 'Iterates through a string, printing the first character after a space or at the beginning.', code: 'void PrintFirstLetterOfEachWord(string S1) {\n bool isFirstLetter = true;\n for (short i = 0; i < S1.length(); i++) {\n  if (S1[i] != \' \' && isFirstLetter) {\n   cout << S1[i];\n  }\n  isFirstLetter = (S1[i] == \' \' ? true : false);\n }\n}' }], keyConcepts: ['string iteration', 'boolean flag', 'conditional logic'] },
  { id: 2, title: 'Problem 2 — Uppercase First Letters', description: 'Write a function to convert the first letter of each word in a string to uppercase.', example: 'mohammed abu-hadhoud', generator: genUpperFirstSteps, functions: [{ name: 'UpperFirstLetterOfEachWord', signature: 'string UpperFirstLetterOfEachWord(string S1)', explanation: 'Iterates through a string, converting the first character of each word to uppercase.', code: 'string UpperFirstLetterOfEachWord(string S1) {\n bool isFirstLetter = true;\n for (short i = 0; i < S1.length(); i++) {\n  if (S1[i] != \' \' && isFirstLetter) {\n   S1[i] = toupper(S1[i]);\n  }\n  isFirstLetter = (S1[i] == \' \' ? true : false);\n }\n return S1;\n}' }], keyConcepts: ['string modification', 'toupper()', 'boolean flag'] },
  { id: 3, title: 'Problem 3 — Lowercase First Letters', description: 'Write a function to convert the first letter of each word in a string to lowercase.', example: 'Mohammed Abu-Hadhoud', generator: genLowerFirstSteps, functions: [{ name: 'LowerFirstLetterOfEachWord', signature: 'string LowerFirstLetterOfEachWord(string S1)', explanation: 'Iterates through a string, converting the first character of each word to lowercase.', code: 'string LowerFirstLetterOfEachWord(string S1) {\n bool isFirstLetter = true;\n for (short i = 0; i < S1.length(); i++) {\n  if (S1[i] != \' \' && isFirstLetter) {\n   S1[i] = tolower(S1[i]);\n  }\n  isFirstLetter = (S1[i] == \' \' ? true : false);\n }\n return S1;\n}' }], keyConcepts: ['string modification', 'tolower()', 'boolean flag'] },
  { id: 4, title: 'Problem 4 — Uppercase & Lowercase All', description: 'Write functions to convert a whole string to uppercase and lowercase.', example: 'MixedCase String', generator: genUpperThenLowerSteps, functions: [{ name: 'UpperAllString', signature: 'string UpperAllString(string S1)', explanation: 'Converts all characters in a string to uppercase.', code: 'string UpperAllString(string S1) {\n for (short i = 0; i < S1.length(); i++) {\n  S1[i] = toupper(S1[i]);\n }\n return S1;\n}' }, { name: 'LowerAllString', signature: 'string LowerAllString(string S1)', explanation: 'Converts all characters in a string to lowercase.', code: 'string LowerAllString(string S1) {\n for (short i = 0; i < S1.length(); i++) {\n  S1[i] = tolower(S1[i]);\n }\n return S1;\n}' }], keyConcepts: ['string modification', 'toupper()', 'tolower()', 'looping'] },
  { id: 5, title: 'Problem 5 — Invert Letter Case', description: 'Write a function to invert the case of a single character (a -> A, B -> b).', example: 'a', generator: genInvertCaseSteps, functions: [{ name: 'InvertLetterCase', signature: 'char InvertLetterCase(char char1)', explanation: 'Checks if a character is uppercase or lowercase and inverts it.', code: 'char InvertLetterCase(char char1) {\n return isupper(char1) ? tolower(char1) : toupper(char1);\n}' }], keyConcepts: ['char manipulation', 'isupper()', 'ternary operator'] },
  { id: 6, title: 'Problem 6 — Count Letter Case', description: 'Write a function to count capital and small letters in a string.', example: 'Mohammed Abu-Hadhoud', generator: genCountCaseSteps, functions: [{ name: 'CountCapitalLetters', signature: 'short CountCapitalLetters(string S1)', explanation: 'Counts characters from A-Z.', code: 'short CountCapitalLetters(string S1) {\n short Counter = 0;\n for (short i = 0; i < S1.length(); i++) {\n  if (isupper(S1[i]))\n   Counter++;\n }\n return Counter;\n}' }, { name: 'CountSmallLetters', signature: 'short CountSmallLetters(string S1)', explanation: 'Counts characters from a-z.', code: 'short CountSmallLetters(string S1) {\n short Counter = 0;\n for (short i = 0; i < S1.length(); i++) {\n  if (islower(S1[i]))\n   Counter++;\n }\n return Counter;\n}' }], keyConcepts: ['counting', 'isupper()', 'islower()', 'looping'] },
  { id: 7, title: 'Problem 7 — Count a Specific Letter', description: 'Write a function to count occurrences of a specific letter in a string.', example: 'hello world|l', generator: genCountLetterSteps, functions: [{ name: 'CountLetter', signature: 'short CountLetter(string S1, char Letter)', explanation: 'Counts how many times a specific character appears in a string (case-sensitive).', code: 'short CountLetter(string S1, char Letter) {\n short Counter = 0;\n for (short i = 0; i < S1.length(); i++) {\n  if (S1[i] == Letter)\n   Counter++;\n }\n return Counter;\n}' }], keyConcepts: ['counting', 'looping', 'comparison'] },
  { id: 8, title: 'Problem 8 — Count Letter (Case-Insensitive)', description: 'Overload the previous function to be case-sensitive or insensitive.', example: 'Hello World|L', generator: genCountLetterCaseInsensitiveSteps, functions: [{ name: 'CountLetter (Overloaded)', signature: 'short CountLetter(string S1, char Letter, bool MatchCase = true)', explanation: 'Overloaded function to count a letter. If MatchCase is false, it converts both characters to lowercase before comparing.', code: 'short CountLetter(string S1, char Letter, bool MatchCase = true) {\n short Counter = 0;\n for (short i = 0; i < S1.length(); i++) {\n  if (MatchCase) {\n   if (S1[i] == Letter)\n    Counter++;\n  } else {\n   if (tolower(S1[i]) == tolower(Letter))\n    Counter++;\n  }\n }\n return Counter;\n}' }], keyConcepts: ['function overloading', 'boolean parameter', 'case-insensitivity'] },
  { id: 9, title: 'Problem 9 — Check if Vowel', description: 'Write a function to check if a character is a vowel (a, e, i, o, u).', example: 'A', generator: genIsVowelSteps, functions: [{ name: 'IsVowel', signature: 'bool IsVowel(char Ch1)', explanation: 'Checks if a character is a vowel, ignoring case.', code: 'bool IsVowel(char Ch1) {\n Ch1 = tolower(Ch1);\n return ((Ch1 == \'a\') || (Ch1 == \'e\') || (Ch1 == \'i\') || (Ch1 == \'o\') || (Ch1 == \'u\'));\n}' }], keyConcepts: ['boolean logic', '|| operator', 'char comparison', 'tolower()'] },
  { id: 10, title: 'Problem 10 — Count Vowels', description: 'Write a function that uses the `IsVowel` function to count all vowels in a string.', example: 'Programming is fun', generator: genCountVowelsSteps, functions: [{ name: 'CountVowels', signature: 'short CountVowels(string S1)', explanation: 'Iterates through a string and uses the IsVowel function to count vowels.', code: 'short CountVowels(string S1) {\n short Counter = 0;\n for (short i = 0; i < S1.length(); i++) {\n  if (IsVowel(S1[i]))\n   Counter++;\n }\n return Counter;\n}' }, { name: 'IsVowel', signature: 'bool IsVowel(char Ch1)', explanation: 'Helper function to check if a character is a vowel.', code: 'bool IsVowel(char Ch1) {\n Ch1 = tolower(Ch1);\n return ((Ch1 == \'a\') || (Ch1 == \'e\') || (Ch1 == \'i\') || (Ch1 == \'o\') || (Ch1 == \'u\'));\n}' }], keyConcepts: ['function composition', 'reusability', 'counting', 'looping'] },
  { id: 11, title: 'Problem 11 — Print Vowels', description: 'Write a function to print all vowels in a string.', example: 'This is a test', generator: genPrintVowelsSteps, functions: [{ name: 'PrintVowels', signature: 'void PrintVowels(string S1)', explanation: 'Iterates through a string and prints only the characters that are vowels.', code: 'void PrintVowels(string S1) {\n cout << "Vowels in string are: ";\n for (short i = 0; i < S1.length(); i++) {\n  if (IsVowel(S1[i]))\n   cout << S1[i] << "   ";\n }\n cout << endl;\n}' }, { name: 'IsVowel', signature: 'bool IsVowel(char Ch1)', explanation: 'Helper function to check if a character is a vowel.', code: 'bool IsVowel(char Ch1) {\n Ch1 = tolower(Ch1);\n return ((Ch1 == \'a\') || (Ch1 == \'e\') || (Ch1 == \'i\') || (Ch1 == \'o\') || (Ch1 == \'u\'));\n}' }], keyConcepts: ['function composition', 'printing', 'looping'] },
  { id: 12, title: 'Problem 12 — Print Each Word', description: 'Write a function to print each word from a string on a new line.', example: 'one two three', generator: genPrintWordsSteps, functions: [{ name: 'PrintEachWordInString', signature: 'void PrintEachWordInString(string S1)', explanation: 'Uses a loop with string::find and string::substr to extract and print words separated by spaces.', code: 'void PrintEachWordInString(string S1) {\n string delim = " ";\n short pos = 0;\n string sWord;\n while ((pos = S1.find(delim)) != std::string::npos) {\n  sWord = S1.substr(0, pos);\n  if (sWord != "") {\n   cout << sWord << endl;\n  }\n  S1.erase(0, pos + delim.length());\n }\n if (S1 != "") {\n  cout << S1 << endl;\n }\n}' }], keyConcepts: ['string::find', 'string::substr', 'string::erase', 'while loop'] },
  { id: 13, title: 'Problem 13 — Count Words', description: 'Write a function to count the number of words in a string.', example: 'this is a sentence', generator: genCountWordsSteps, functions: [{ name: 'CountWords', signature: 'short CountWords(string S1)', explanation: 'A variation of PrintEachWordInString that increments a counter instead of printing.', code: 'short CountWords(string S1) {\n string delim = " ";\n short pos = 0;\n string sWord;\n short Counter = 0;\n while ((pos = S1.find(delim)) != std::string::npos) {\n  sWord = S1.substr(0, pos);\n  if (sWord != "") {\n   Counter++;\n  }\n  S1.erase(0, pos + delim.length());\n }\n if (S1 != "") {\n  Counter++;\n }\n return Counter;\n}' }], keyConcepts: ['string::find', 'string::substr', 'counting', 'while loop'] },
  { id: 14, title: 'Problem 14 — Split String', description: 'Write a function that splits a string by a delimiter (e.g., a space) and returns a vector of strings.', example: 'one two three', generator: genSplitStringSteps, functions: [{ name: 'SplitString', signature: 'vector<string> SplitString(string S1, string Delim)', explanation: 'Uses a loop with find/substr to extract words and adds them to a vector using push_back.', code: 'vector<string> SplitString(string S1, string Delim) {\n vector<string> vString;\n short pos = 0;\n string sWord;\n while ((pos = S1.find(Delim)) != std::string::npos) {\n  sWord = S1.substr(0, pos);\n  if (sWord != "") {\n   vString.push_back(sWord);\n  }\n  S1.erase(0, pos + Delim.length());\n }\n if (S1 != "") {\n  vString.push_back(S1);\n }\n return vString;\n}' }], keyConcepts: ['vector', 'vector::push_back', 'string::find', 'string::substr'] },
  { id: 15, title: 'Problem 15 — Trim Left, Right, All', description: 'Write functions to trim whitespace from the left, right, and both sides of a string.', example: '   hello   ', generator: genTrimSteps, functions: [{ name: 'TrimLeft', signature: 'string TrimLeft(string S1)', explanation: 'Finds the first non-space character and returns the substring from that point.', code: 'string TrimLeft(string S1) {\n for (short i = 0; i < S1.length(); i++) {\n  if (S1[i] != \' \') {\n   return S1.substr(i, S1.length() - i);\n  }\n }\n return "";\n}' }, { name: 'TrimRight', signature: 'string TrimRight(string S1)', explanation: 'Finds the last non-space character and returns the substring up to that point.', code: 'string TrimRight(string S1) {\n for (short i = S1.length() - 1; i >= 0; i--) {\n  if (S1[i] != \' \') {\n   return S1.substr(0, i + 1);\n  }\n }\n return "";\n}' }, { name: 'Trim', signature: 'string Trim(string S1)', explanation: 'Combines TrimLeft and TrimRight for a complete trim.', code: 'string Trim(string S1) {\n return TrimLeft(TrimRight(S1));\n}' }], keyConcepts: ['string::substr', 'whitespace handling', 'looping'] },
  { id: 16, title: 'Problem 16 — Join String', description: 'Write a function that joins a vector of strings into a single string with a delimiter.', example: '-', generator: genJoinStringSteps, functions: [{ name: 'JoinString', signature: 'string JoinString(vector<string> vString, string Delim)', explanation: 'Iterates through a vector, appending each string and a delimiter to a result string, then removes the final delimiter.', code: 'string JoinString(vector<string> vString, string Delim) {\n string S1 = "";\n for (string &s : vString) {\n  S1 = S1 + s + Delim;\n }\n return S1.substr(0, S1.length() - Delim.length());\n}' }], keyConcepts: ['vector iteration', 'range-based for loop', 'string concatenation', 'string::substr'] },
  { id: 17, title: 'Problem 17 — Join String (Overloaded)', description: 'Overload the JoinString function to also accept a C-style array of strings.', example: '--', generator: genJoinStringOverloadSteps, functions: [{ name: 'JoinString (Vector)', signature: 'string JoinString(vector<string> vString, string Delim)', explanation: 'The vector version of the function.', code: 'string JoinString(vector<string> vString, string Delim) { /* ... see problem 16 ... */ }' }, { name: 'JoinString (Array)', signature: 'string JoinString(string arrString[], short Length, string Delim)', explanation: 'The overloaded version that takes a C-style array and its length.', code: 'string JoinString(string arrString[], short Length, string Delim) {\n string S1 = "";\n for (short i = 0; i < Length; i++) {\n  S1 = S1 + arrString[i] + Delim;\n }\n return S1.substr(0, S1.length() - Delim.length());\n}' }], keyConcepts: ['function overloading', 'C-style arrays', 'vector vs array'] },
  { id: 18, title: 'Problem 18 — Reverse Words', description: 'Write a function that reverses the order of words in a string.', example: 'one two three', generator: genReverseWordsSteps, functions: [{ name: 'ReverseWordsInString', signature: 'string ReverseWordsInString(string S1)', explanation: 'First splits the string into a vector, then iterates through the vector backwards to build the new string.', code: 'string ReverseWordsInString(string S1) {\n vector<string> vString = SplitString(S1, " ");\n string S2 = "";\n vector<string>::iterator iter = vString.end();\n while (iter != vString.begin()) {\n  --iter;\n  S2 += *iter + " ";\n }\n S2 = S2.substr(0, S2.length() - 1);\n return S2;\n}' }, { name: 'SplitString', signature: 'vector<string> SplitString(string S1, string Delim)', explanation: 'Helper function to split the string.', code: 'vector<string> SplitString(string S1, string Delim) { /* ... see problem 14 ... */ }' }], keyConcepts: ['vector iterators', 'reverse iteration', 'function composition'] },
  { id: 19, title: 'Problem 19 — Replace Word', description: 'Write a function to replace a word in a string with another word.', example: 'Welcome to Jordan|Jordan|USA', generator: genReplaceWordSteps, functions: [{ name: 'ReplaceWordInString', signature: 'string ReplaceWordInString(string S1, string StringToReplace, string sRepalceTo)', explanation: 'Uses a loop with string::find and string::replace to find all occurrences of a word and replace them.', code: 'string ReplaceWordInString(string S1, string StringToReplace, string sRepalceTo) {\n short pos = S1.find(StringToReplace);\n while (pos != std::string::npos) {\n  S1 = S1.replace(pos, StringToReplace.length(), sRepalceTo);\n  pos = S1.find(StringToReplace);\n }\n return S1;\n}' }], keyConcepts: ['string::find', 'string::replace', 'while loop'] },
  { id: 20, title: 'Problem 20 — Remove Punctuations', description: 'Write a function to remove all punctuation marks from a string.', example: 'Hello, World! This is a test.', generator: genRemovePunctuationsSteps, functions: [{ name: 'RemovePunctuationsFromString', signature: 'string RemovePunctuationsFromString(string S1)', explanation: 'Iterates through the string, building a new string containing only non-punctuation characters.', code: 'string RemovePunctuationsFromString(string S1) {\n string S2 = "";\n for (short i = 0; i < S1.length(); i++) {\n  if (!ispunct(S1[i])) {\n   S2 += S1[i];\n  }\n }\n return S2;\n}' }], keyConcepts: ['ispunct()', 'string building', 'character classification'] },
  { id: 21, title: 'Problem 21 — Struct to Line', description: 'Convert a client record (struct) to a single string line using a separator.', example: '#//#', generator: genStructToLineSteps, functions: [{ name: 'ConvertRecordToLine', signature: 'string ConvertRecordToLine(sClient Client, string Seperator)', explanation: 'Concatenates all fields of a client struct into a single string, separated by a delimiter.', code: 'struct sClient {\n string AccountNumber;\n string PinCode;\n string Name;\n string Phone;\n double AccountBalance;\n};\n\nstring ConvertRecordToLine(sClient Client, string Seperator) {\n string stClientRecord = "";\n stClientRecord += Client.AccountNumber + Seperator;\n stClientRecord += Client.PinCode + Seperator;\n stClientRecord += Client.Name + Seperator;\n stClientRecord += Client.Phone + Seperator;\n stClientRecord += to_string(Client.AccountBalance);\n return stClientRecord;\n}' }], keyConcepts: ['struct', 'string concatenation', 'data serialization', 'to_string()'] },
  { id: 22, title: 'Problem 22 — Line to Struct', description: 'Parse a string line into a client record (struct).', example: 'A150#//#1234#//#Mohammed Abu-Hadhoud#//#079999#//#5270.00', generator: genLineToStructSteps, functions: [{ name: 'ConvertLinetoRecord', signature: 'sClient ConvertLinetoRecord(string Line, string Seperator)', explanation: 'Splits a line by a separator, then assigns each part to the corresponding field in a new client struct.', code: 'sClient ConvertLinetoRecord(string Line, string Seperator = "#//#") {\n sClient Client;\n vector<string> vClientData = SplitString(Line, Seperator);\n Client.AccountNumber = vClientData[0];\n Client.PinCode = vClientData[1];\n Client.Name = vClientData[2];\n Client.Phone = vClientData[3];\n Client.AccountBalance = stod(vClientData[4]); // string to double\n return Client;\n}' }, { name: 'SplitString', signature: 'vector<string> SplitString(string S1, string Delim)', explanation: 'Helper function to split the line.', code: 'vector<string> SplitString(string S1, string Delim) { /* ... see problem 14 ... */ }' }], keyConcepts: ['struct', 'data parsing', 'vector', 'stod()'], summaryFile: 'review_summary_p22.html' },
  { id: 23, title: 'Problem 23 — Add Clients to File', description: 'Write a program to read new client data and save them as delimited lines in a file.', example: '', generator: genAddClientsToFileSteps, functions: [{ name: 'AddDataLineToFile', signature: 'void AddDataLineToFile(string FileName, string stDataLine)', explanation: 'Opens a file in append mode and writes a new line of data to it.', code: 'void AddDataLineToFile(string FileName, string stDataLine) {\n fstream MyFile;\n MyFile.open(FileName, ios::out | ios::app);\n if (MyFile.is_open()) {\n  MyFile << stDataLine << endl;\n  MyFile.close();\n }\n}' }, { name: 'ConvertRecordToLine', signature: 'string ConvertRecordToLine(sClient Client, string Seperator)', explanation: 'Helper function to convert client struct to a line.', code: '/* ... see problem 21 ... */' }], keyConcepts: ['file I/O', 'fstream', 'ios::app', 'data persistence'] },
  { id: 24, title: 'Problem 24 — Load Clients from File', description: 'Load all client records from a file into a vector of structs and print them in a table.', example: '', generator: genLoadClientsFromFileSteps, functions: [{ name: 'LoadCleintsDataFromFile', signature: 'vector<sClient> LoadCleintsDataFromFile(string FileName)', explanation: 'Reads a file line by line, converts each line to a client record, and stores it in a vector.', code: 'vector<sClient> LoadCleintsDataFromFile(string FileName) {\n vector<sClient> vClients;\n fstream MyFile;\n MyFile.open(FileName, ios::in); // read mode\n if (MyFile.is_open()) {\n  string Line;\n  sClient Client;\n  while (getline(MyFile, Line)) {\n   Client = ConvertLinetoRecord(Line);\n   vClients.push_back(Client);\n  }\n  MyFile.close();\n }\n return vClients;\n}' }, { name: 'PrintAllClientsData', signature: 'void PrintAllClientsData(vector<sClient> vClients)', explanation: 'Prints a formatted table header and then iterates through the vector, printing each client\'s data.', code: 'void PrintAllClientsData(vector<sClient> vClients) { /* ... formatting code ... */ }' }], keyConcepts: ['file I/O', 'ios::in', 'getline()', 'vector', 'data loading'] },
  { id: 25, title: 'Problem 25 — Find Client by Account Number', description: 'Search the vector of clients for a specific account number and display the client\'s details if found.', example: 'A102', generator: genFindClientByAccountNumberSteps, functions: [{ name: 'FindClientByAccountNumber', signature: 'bool FindClientByAccountNumber(string AccountNumber, vector<sClient> vClients, sClient &Client)', explanation: 'Iterates through the vector, comparing account numbers. If a match is found, it returns true and passes the client data back by reference.', code: 'bool FindClientByAccountNumber(string AccountNumber, vector<sClient> vClients, sClient &Client) {\n for (sClient C : vClients) {\n  if (C.AccountNumber == AccountNumber) {\n   Client = C;\n   return true;\n  }\n }\n return false;\n}' }], keyConcepts: ['linear search', 'vector search', 'pass-by-reference', 'boolean return'] },
  { id: 26, title: 'Problem 26 — Delete Client', description: 'Find a client by account number, then delete their record from the file.', example: 'A101', generator: genDeleteClientByAccountNumberSteps, functions: [{ name: 'DeleteClientByAccountNumber', signature: 'bool DeleteClientByAccountNumber(string AccountNumber, vector<sClient> &vClients)', explanation: 'Finds the client, asks for confirmation, marks them for deletion, and then saves the vector (without the marked client) back to the file.', code: 'bool DeleteClientByAccountNumber(string AccountNumber, vector<sClient> &vClients) {\n /* ... find client logic ... */ \n char Answer = \'n\';\n cout << "Are you sure? y/n? ";\n cin >> Answer;\n if (Answer == \'y\' || Answer == \'Y\') {\n  /* ... mark for deletion logic ... */ \n  SaveCleintsDataToFile("Clients.txt", vClients);\n  // Refresh vector from file\n  vClients = LoadCleintsDataFromFile("Clients.txt");\n  return true;\n }\n return false;\n}' }, { name: 'SaveCleintsDataToFile', signature: 'void SaveCleintsDataToFile(string FileName, vector<sClient> vClients)', explanation: 'Saves the entire vector to the file, overwriting its contents. It skips any clients marked for deletion.', code: 'void SaveCleintsDataToFile(string FileName, vector<sClient> vClients) {\n fstream MyFile;\n MyFile.open(FileName, ios::out); // Overwrite\n string DataLine;\n if (MyFile.is_open()) {\n  for (sClient C : vClients) {\n   if (C.MarkForDelete == false) {\n    DataLine = ConvertRecordToLine(C);\n    MyFile << DataLine << endl;\n   }\n  }\n  MyFile.close();\n }\n}' }], keyConcepts: ['soft delete', 'file overwrite', 'data persistence', 'vector modification'] },
  { id: 27, title: 'Problem 27 — Update Client', description: 'Find a client by account number, read new information, and update their record in the file.', example: 'A102', generator: genUpdateClientByAccountNumberSteps, functions: [{ name: 'UpdateClientByAccountNumber', signature: 'bool UpdateClientByAccountNumber(string AccountNumber, vector<sClient> &vClients)', explanation: 'Finds the client, displays their info, reads new data, updates the record in the vector, and saves the entire vector back to the file.', code: 'bool UpdateClientByAccountNumber(string AccountNumber, vector<sClient> &vClients) {\n sClient Client;\n char Answer = \'n\';\n if (FindClientByAccountNumber(AccountNumber, vClients, Client)) {\n  PrintClientCard(Client);\n  cout << "\\n\\nUpdate Client? y/n? ";\n  cin >> Answer;\n  if (Answer == \'y\' || Answer == \'Y\') {\n   for (sClient& C : vClients) {\n    if (C.AccountNumber == AccountNumber) {\n     // ReadNewClientData(C);\n     break;\n    }\n   }\n   SaveCleintsDataToFile("Clients.txt", vClients);\n   return true;\n  }\n }\n return false;\n}' }], keyConcepts: ['in-place update', 'file overwrite', 'vector modification', 'pass-by-reference'] },
  {
    id: 28,
    title: 'Problem 28 — Filter Words by Length',
    description: 'Given a sentence and a length, print only the words that are shorter than or equal to that length.',
    example: 'this is a long sentence|4',
    generator: genFilterWordsByLengthSteps,
    functions: [
      {
        name: 'FilterWordsByLength',
        signature: 'void FilterWordsByLength(string sentence, int maxLength)',
        explanation: 'Splits the sentence into words, then iterates through them, printing only the words whose length is less than or equal to maxLength.',
        code: `void FilterWordsByLength(string sentence, int maxLength) {\n  vector<string> words = SplitString(sentence, " ");\n\n  cout << "Filtered words: ";\n  for (const string& word : words) {\n    if (word.length() <= maxLength) {\n      cout << word << " ";\n    }\n  }\n  cout << endl;\n}`
      },
      {
        name: 'SplitString',
        signature: 'vector<string> SplitString(string S1, string Delim)',
        explanation: 'Helper function to split the string into words.',
        code: 'vector<string> SplitString(string S1, string Delim) { /* ... see problem 14 ... */ }'
      }
    ],
    keyConcepts: ['string splitting', 'vector iteration', 'length check', 'conditional logic']
  },
  {
    id: 29,
    title: 'Problem 29 — Split by Custom Delimiter',
    description: 'Split a string into a vector using a custom, multi-character delimiter like "#//#". This is a key step in parsing complex data records.',
    example: 'A150#//#1234#//#Mohammed',
    generator: genSplitStringCustomDelimSteps,
    functions: [
      {
        name: 'SplitString',
        signature: 'vector<string> SplitString(string S1, string Delim)',
        explanation: 'This function repeatedly finds the delimiter, extracts the substring before it (the token), adds the token to a vector, and then erases that token and the delimiter from the original string. The loop continues until no more delimiters are found.',
        code: 'vector<string> SplitString(string S1, string Delim) {\n vector<string> vString;\n short pos = 0;\n string sWord;\n while ((pos = S1.find(Delim)) != std::string::npos) {\n  sWord = S1.substr(0, pos);\n  if (sWord != "") {\n   vString.push_back(sWord);\n  }\n  S1.erase(0, pos + Delim.length());\n }\n if (S1 != "") {\n  vString.push_back(S1);\n }\n return vString;\n}'
      }
    ],
    keyConcepts: ['custom delimiter', 'string::find', 'string::substr', 'string::erase', 'vector', 'data parsing'],
    hints: [
      'The core logic is a `while` loop that continues as long as `S1.find(Delim)` does not return `std::string::npos`.',
      'Inside the loop, `S1.substr(0, pos)` will give you the token you need.',
      'Don\'t forget to erase not just the token, but the delimiter as well. The length to erase is `pos + Delim.length()`.',
      'After the loop finishes, there might be one last token in the string. Handle this case!'
    ]
  },
];