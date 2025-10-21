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
    steps.push({ i, code: `isFirstLetter = (S1[${i}] == ' ' ? true : false);`, explanation: `Set isFirstLetter = ${newIsFirst}`, input: str, output: [...output], modified: str, mem: [`isFirst -> ${newIsFirst}`] });
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
    // FIX: Added missing 'input' property to satisfy the 'Step' interface.
    steps.push({ i, phase: 'upper', code: `S1[${i}] = toupper(S1[${i}])`, explanation: `Upper '${before}' -> '${arr[i]}'`, input: str, modified: arr.join(''), mem: [`Upper S1[${i}] -> ${arr[i]}`] });
  }
  // FIX: Added missing 'input' property to satisfy the 'Step' interface.
  steps.push({ i: arr.length, phase: 'upper', code: 'Print S1 (Upper)', explanation: 'Print uppercased string', input: str, modified: arr.join(''), mem: [`Printed upper: ${arr.join('')}`] });
  for (let i = 0; i < arr.length; i++) {
    const before = arr[i];
    arr[i] = arr[i].toLowerCase();
    // FIX: Added missing 'input' property to satisfy the 'Step' interface.
    steps.push({ i, phase: 'lower', code: `S1[${i}] = tolower(S1[${i}])`, explanation: `Lower '${before}' -> '${arr[i]}'`, input: str, modified: arr.join(''), mem: [`Lower S1[${i}] -> ${arr[i]}`] });
  }
  // FIX: Added missing 'input' property to satisfy the 'Step' interface.
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

export const problems: Problem[] = [
  { id: 1, title: 'Problem 1 — Print First Letter of Each Word', description: 'Read a string and print the first letter of every word.', example: 'programming is fun', generator: genPrintFirstLettersSteps, functions: [
    {name: 'ReadString()', signature: 'string ReadString()', explanation: 'Reads a full line including spaces.', code: `string ReadString()\n{\n    string S1;\n    getline(cin, S1);\n    return S1;\n}`},
    {name: 'PrintFirstLetterOfEachWord(string S1)', signature: 'void PrintFirstLetterOfEachWord(string S1)', explanation: 'Uses a boolean flag to detect word starts.', code: `void PrintFirstLetterOfEachWord(string S1)\n{\n    bool isFirstLetter = true;\n    for(short i=0;i<S1.length();i++){\n        if(S1[i] != ' ' && isFirstLetter) cout << S1[i];\n        isFirstLetter = (S1[i] == ' ' ? true : false);\n    }\n}`}
  ], keyConcepts: ['String Iteration', 'Boolean Flags', 'Conditional Logic', 'Character I/O']},
  { id: 2, title: 'Problem 2 — Uppercase First Letter of Each Word', description: 'Uppercase the first character of each word in the input.', example: 'hello world', generator: genUpperFirstSteps, functions: [
    {name: 'UpperFirstLetterOfEachWord', signature: 'string UpperFirstLetterOfEachWord(string S1)', explanation: 'Uses toupper on flagged positions.', code: `string UpperFirstLetterOfEachWord(string S1)\n{\n    bool isFirstLetter = true;\n    for(short i=0;i<S1.length();i++){\n        if(S1[i] != ' ' && isFirstLetter) S1[i] = toupper(S1[i]);\n        isFirstLetter = (S1[i] == ' ' ? true : false);\n    }\n    return S1;\n}`}
  ], keyConcepts: ['String Modification', 'Boolean Flags', 'toupper()', 'By-Value vs By-Reference']},
  { id: 3, title: 'Problem 3 — Lowercase First Letter of Each Word', description: 'Lowercase the first character of each word in the input.', example: 'HELLO WORLD', generator: genLowerFirstSteps, functions: [
    {name: 'LowerFirstLetterOfEachWord', signature: 'string LowerFirstLetterOfEachWord(string S1)', explanation: 'Uses tolower on flagged positions.', code: `string LowerFirstLetterOfEachWord(string S1)\n{\n    bool isFirstLetter = true;\n    for(short i=0;i<S1.length();i++){\n        if(S1[i] != ' ' && isFirstLetter) S1[i] = tolower(S1[i]);\n        isFirstLetter = (S1[i] == ' ' ? true : false);\n    }\n    return S1;\n}`}
  ], keyConcepts: ['String Modification', 'Boolean Flags', 'tolower()', 'Standard Library Functions']},
  { id: 4, title: 'Problem 4 — Upper All then Lower All Letters', description: 'Read a string, print it uppercased, then print it lowercased.', example: 'Hello World', generator: genUpperThenLowerSteps, functions: [
    {name: 'ReadString()', signature: 'string ReadString()', explanation: 'Reads the full line.', code: `string ReadString()\n{\n    string S1;\n    getline(cin, S1);\n    return S1;\n}`},
    {name: 'UpperAllString', signature: 'string UpperAllString(string S1)', explanation: 'Makes every char uppercase using toupper.', code: `string UpperAllString(string S1)\n{\n    for(short i=0;i<S1.length();i++) S1[i] = toupper(S1[i]);\n    return S1;\n}`},
    {name: 'LowerAllString', signature: 'string LowerAllString(string S1)', explanation: 'Makes every char lowercase using tolower.', code: `string LowerAllString(string S1)\n{\n    for(short i=0;i<S1.length();i++) S1[i] = tolower(S1[i]);\n    return S1;\n}`}
  ], keyConcepts: ['Looping', 'Case Conversion', 'Multiple Operations', 'Sequential Execution']},
  { id: 5, title: 'Problem 5 — Invert Letter Case', description: 'Read a single character, invert its case (upper to lower, lower to upper), and print the result.', example: 'a', generator: genInvertCaseSteps, functions: [
    { name: 'ReadChar()', signature: 'char ReadChar()', explanation: 'Reads a single character from the input.', code: `char ReadChar()\n{\n    char Ch1;\n    cout << "Please Enter a Character?\\n";\n    cin >> Ch1;\n    return Ch1;\n}` },
    { name: 'InvertLetterCase(char char1)', signature: 'char InvertLetterCase(char char1)', explanation: 'Checks if a character is uppercase. If so, it converts it to lowercase. Otherwise, it converts it to uppercase.', code: `char InvertLetterCase(char char1)\n{\n    return isupper(char1) ? tolower(char1) : toupper(char1);\n}` }
  ], keyConcepts: ['Character I/O', 'Ternary Operator', 'Case Conversion', 'ASCII Values'] },
  { id: 6, title: 'Problem 6 — Count Small/Capital Letters', description: 'Read a string and count the number of lowercase and uppercase letters.', example: 'Hello World', generator: genCountCaseSteps, functions: [
    { name: 'ReadString()', signature: 'string ReadString()', explanation: 'Reads a full line including spaces.', code: `string ReadString()\n{\n    string S1;\n    cout << "Please Enter Your String?\\n";\n    getline(cin, S1);\n    return S1;\n}` },
    { name: 'CountCapitalLetters(string S1)', signature: 'short CountCapitalLetters(string S1)', explanation: 'Iterates through the string and increments a counter for each uppercase character found.', code: `short CountCapitalLetters(string S1)\n{\n    short Counter = 0;\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (isupper(S1[i]))\n            Counter++;\n    }\n    return Counter;\n}` },
    { name: 'CountSmallLetters(string S1)', signature: 'short CountSmallLetters(string S1)', explanation: 'Iterates through the string and increments a counter for each lowercase character found.', code: `short CountSmallLetters(string S1)\n{\n    short Counter = 0;\n    for (short i = 0; i < S1.length(); i++)\n    {\n        if (islower(S1[i]))\n            Counter++;\n    }\n    return Counter;\n}` }
  ], keyConcepts: ['String Iteration', 'Counters', 'isupper()', 'islower()', 'Conditional Logic'] }
];
