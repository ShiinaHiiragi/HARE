import React from "react";
import Timer from "react-compound-timer/build";

export default function ForwardTimer(props) {
  const { initialTime } = props;
  const timer = React.createRef();
  React.useEffect(() => {
    timer.current.setTime(initialTime);
  }, [initialTime]);

  return (
    <Timer
      direction="forward"
      lastUnit="h"
      ref={timer}
      formatValue={(value) => value < 10 ? `0${value}` : value}
    >
      {() => (
        <React.Fragment>
          <Timer.Hours />
          {":"}
          <Timer.Minutes />
          {":"}
          <Timer.Seconds />
        </React.Fragment>
      )}
    </Timer>
  );
}