// types.ts
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
  phase?: 'upper' | 'lower' | 'read' | 'invert' | 'print' | 'sensitive' | 'insensitive' | 'convert' | 'check' | 'result' | 'left' | 'right' | 'all' | 'vector' | 'array' | 'split' | 'reverse' | 'assign' | 'read_client' | 'convert_client' | 'save_client' | 'loop_check' | 'load_file' | 'parse_line' | 'add_to_vector' | 'print_table' | 'read_account_number' | 'load_vector' | 'search_vector' | 'print_result' | 'find_client' | 'confirm_delete' | 'mark_for_delete' | 'save_to_file' | 'reload_vector' | 'confirm_update' | 'read_new_data' | 'update_vector';
  field?: 'AccountNumber' | 'PinCode' | 'Name' | 'Phone' | 'AccountBalance';
  fileContents?: string[];
  loop?: {
    iteration: number;
    continue: boolean;
    currentLine?: number;
  };
  vectorContents?: any[];
  search?: {
    target: string;
    currentIndex: number;
    found: boolean;
    resultClient?: any;
  };
  delete?: {
    target: string;
    found: boolean;
    confirmed: boolean | null;
    client?: any;
  };
  update?: {
    target: string;
    found: boolean;
    confirmed: boolean | null;
    clientBefore?: any;
    clientAfter?: any;
  };
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
