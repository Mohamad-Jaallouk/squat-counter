import React, { useEffect, useState } from "react";

const Countdown = ({ onStepChange }: any) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      onStepChange();
    }
  }, [count, onStepChange]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {count > 0 && <h1 className="text-9xl text-white">{count}</h1>}
    </div>
  );
};

export default Countdown;
