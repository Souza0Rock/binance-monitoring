import { ChangeEventHandler } from "react";

export interface IInputProps extends IClassName {
  name: string;
  label: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  inputMode?: "text" | "numeric";
}
