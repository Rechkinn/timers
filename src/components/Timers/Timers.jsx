import "./Timers.scss";
import Circle from "../Circle/Circle";
import { useEffect, useState } from "react";

export default function Timers({ timerTime, startTime, ...props }) {
  function convertToSeconds(strTime) {
    const arrTime = strTime.split(":");
    let resultSeconds = 0; // all seconds
    for (let i = 0; i < arrTime.length; i++) {
      if (i === 0) {
        resultSeconds += Number(arrTime[i]) * 24 * 60 * 60;
      } else if (i === 1) {
        resultSeconds += Number(arrTime[i]) * 60 * 60;
      } else if (i === 2) {
        resultSeconds += Number(arrTime[i]) * 60;
      } else {
        resultSeconds += Number(arrTime[i]);
      }
    }
    return resultSeconds;
  }
  function getLocaleTime() {
    return convertToSeconds(
      `${
        new Date().toLocaleDateString().split(".")[0]
      }:${new Date().toLocaleTimeString()}`
    );
  }
  function newValueDays(time) {
    return Math.floor(time / 60 / 60 / 24);
  }
  function newValueHours(time) {
    return Math.floor(time / 60 / 60) === -1 ? 23 : Math.floor(time / 60 / 60);
  }
  function newValueMinutes(time) {
    return Math.floor(time / 60) === -1 ? 59 : Math.floor(time / 60);
  }
  // function stopCheckTimer() {
  //   clearInterval(intervalId);
  //   intervalId = null;
  // }
  // clearInterval(checkTimer);

  const [endTime, setEndTime] = useState(
    convertToSeconds(startTime) + convertToSeconds(timerTime)
  );
  const [nowTime, setNowTime] = useState(getLocaleTime());
  const [timer, setTimer] = useState(endTime - nowTime);
  const [valueDays, setValueDays] = useState(
    newValueDays(timer) * 24 * 60 * 60
  );
  const [valueHours, setValueHours] = useState(
    newValueHours(timer - valueDays) * 60 * 60
  );
  const [valueMinutes, setValueMinutes] = useState(
    newValueMinutes(timer - valueDays - valueHours) * 60
  );
  const [valueSeconds, setValueSeconds] = useState(
    timer - valueDays - valueHours - valueMinutes
  );

  useEffect(() => {
    if (valueDays || valueHours || valueMinutes || valueSeconds) {
      setTimer(endTime - nowTime);
      setValueDays(newValueDays(timer) * 24 * 60 * 60);
      setValueHours(newValueHours(timer - valueDays) * 60 * 60);
      setValueMinutes(newValueMinutes(timer - valueDays - valueHours) * 60);

      if (timer - valueDays - valueHours - valueMinutes === -1) {
        setValueSeconds(59);
      } else {
        setValueSeconds(timer - valueDays - valueHours - valueMinutes);
      }
    }
    //  else {
    // stopCheckTimer();
    // }
  }, [nowTime]);

  setInterval(() => {
    if (nowTime !== getLocaleTime() && nowTime < endTime) {
      setNowTime(getLocaleTime());
    }
  }, 1000);

  return (
    <article className="timers">
      <div className="timers__inner">
        <Circle
          valueTime={newValueDays(valueDays)}
          nameTime={"days"}
          maxValueTime={365}
        />
        <Circle
          valueTime={newValueHours(valueHours)}
          nameTime={"hours"}
          maxValueTime={24}
        />
        <Circle
          valueTime={newValueMinutes(valueMinutes)}
          nameTime={"minutes"}
          maxValueTime={60}
        />
        <Circle
          valueTime={valueSeconds}
          nameTime={"seconds"}
          maxValueTime={60}
        />
      </div>
    </article>
  );
}
