export interface IInputProps extends IClassName {
  label: string;
  value?: string;
  onChange?: (e: string) => void;
  inputMode?: "text" | "numeric";
}
