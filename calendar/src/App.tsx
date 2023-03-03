import { useState } from "react";
import "./App.css";
import CalendarEntries from "./components/CalendarEntries";
import Header from "./components/Header";
import Button from "./components/Button";

function App() {
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
  const [month, setMonth] = useState<string>("");
  const [monthNumber, setMonthNumber] = useState<number>(0);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    months.map((month) => {
      if (month.month === selectedMonth) {
        setMonthNumber(month.value);
      }
    });
  };

  const addNewEvent = () => {


  }

  return (
    <div className="App">
      <div className = "calendar">
      <Button onPress = {() => addNewEvent()}>Add new event</Button>
      <Header handleMonthChange={handleMonthChange}></Header>
      <CalendarEntries month={monthNumber}></CalendarEntries>
    </div>
    </div>
  );
}

export default App;
