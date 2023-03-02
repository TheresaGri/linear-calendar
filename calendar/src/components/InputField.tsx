type inputProps = {
  inputValue: string;
  changeEvent: React.ChangeEventHandler<HTMLInputElement>;
};

export default function InputField({ inputValue, changeEvent }: inputProps) {
  return <input onChange={changeEvent} value={inputValue} />;
}
