export interface FunctionDef {
  name: string;
  signature: string;
  explanation: string;
  code: string;
}

export interface Step {
  i: number;
  code: string;
  explanation: string;
  input: string;
  output?: string[];
  modified?: string;
  mem: string[];
  // FIX: Added 'left', 'right', and 'all' to the allowed phase types to support the Trim problem visualization.
  phase?: 'upper' | 'lower' | 'read' | 'invert' | 'print' | 'sensitive' | 'insensitive' | 'convert' | 'check' | 'result' | 'left' | 'right' | 'all';
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  example: string;
  generator: (str: string) => Step[];
  functions: FunctionDef[];
  keyConcepts: string[];
}
