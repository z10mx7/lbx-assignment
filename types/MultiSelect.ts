export type Option = {
  id: string;
  label: string;
  icon: string;
};

export type MultiSelectProps = {
  options: Option[];
  selectedOptions: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  className?: string;
};
