export interface IButtonProps extends IClassName {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
