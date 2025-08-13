import "./App.css";
import Timers from "./components/Timers/Timers.jsx";

export default function App() {
  function localeTime() {
    return `${
      new Date().toLocaleDateString().split(".")[0]
    }:${new Date().toLocaleTimeString()}`;
  }

  let startTime = localeTime();
  console.log(localStorage.getItem("startTime"));
  if (localStorage.getItem("startTime")) {
    startTime = localStorage.getItem("startTime");
  } else {
    localStorage.setItem("startTime", startTime);
  }

  return (
    <>
      <div>Точка отсчёта: {localeTime()}</div>
      <Timers timerTime={"365:00:00:00"} startTime={localeTime()} />

      <div>Точка отсчёта: {startTime}</div>
      <Timers timerTime={"365:00:00:00"} startTime={startTime} />
    </>
  );
}
