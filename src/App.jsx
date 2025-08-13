import "./App.css";
import Timers from "./components/Timers/Timers.jsx";

export default function App() {
  function convertTimeToNeedForm(strTime) {
    const twoPartsTime = strTime.split(",");
    const day = twoPartsTime[0].split(".")[0];
    const fullTime = `${day}:${twoPartsTime[1]}`;
    return fullTime;
  }

  let startTime = new Date().toLocaleString();
  if (localStorage.getItem("startTime")) {
    startTime = localStorage.getItem("startTime");
  } else {
    localStorage.setItem("startTime", startTime);
  }

  return (
    <>
      <div>Точка отсчёта: {new Date().toLocaleString()}</div>
      <Timers
        timerTime={"365:00:00:00"}
        startTime={convertTimeToNeedForm(new Date().toLocaleString())}
      />

      <div>Точка отсчёта: {startTime}</div>
      <Timers
        timerTime={"365:00:00:00"}
        startTime={convertTimeToNeedForm(startTime)}
      />
    </>
  );
}
