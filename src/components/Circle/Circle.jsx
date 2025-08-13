import "./Circle.scss";

export default function Circle({ valueTime, nameTime, maxValueTime }) {
  const objCssStyle = {};
  objCssStyle[`--value-${nameTime}`] = `${(valueTime * 100) / maxValueTime}%`;

  return (
    <article className="circle">
      <div style={objCssStyle} className="circle__inner" id={nameTime}>
        <div className="circle__center">
          <span className="circle__time-value">{valueTime}</span>
          <span className="circle__time-name">{nameTime}</span>
        </div>
      </div>
    </article>
  );
}
