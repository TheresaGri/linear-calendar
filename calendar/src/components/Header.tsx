import { ChangeEventHandler } from "react";
const months: { month: string; value: number }[] = [
  { month: "January", value: 1 },
  { month: "Feburary", value: 2 },
  { month: "March", value: 3 },
  { month: "April", value: 4 },
  { month: "May", value: 5 },
  { month: "June", value: 6 },
  { month: "July", value: 7 },
  { month: "August", value: 8 },
  { month: "September", value: 9 },
  { month: "October", value: 10 },
  { month: "November", value: 11 },
  { month: "December", value: 12 },
];
type headerProps = {
  handleMonthChange: ChangeEventHandler<HTMLSelectElement>;
};

export default function Header({ handleMonthChange }: headerProps) {
  return (
    <div>
      <select onChange={handleMonthChange}>
        {months.map((month) => (
          <option value={month.month} key={month.value}>
            {month.month}
          </option>
        ))}
      </select>
    </div>
  );
}
