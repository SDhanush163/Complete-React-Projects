import { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(
      () => setRemainingTime((prev) => prev - 10),
      10,
    );
    return () => clearInterval(interval);
  }, []);

  return <progress max={timeout} value={remainingTime} className={mode} />;
};

export default QuestionTimer;
