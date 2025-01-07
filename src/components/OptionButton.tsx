interface OptionButtonProps {
  checked: boolean;
  onToggle: (value: boolean) => void;
  // add any other props OptionButton uses
}

export default function OptionButton({ checked, onToggle }: OptionButtonProps) {
  return (
    <button onClick={() => onToggle(!checked)}>
      {checked ? "Checked" : "Unchecked"}
    </button>
  );
}
