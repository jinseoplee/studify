import { useState, useEffect } from "react";

const AuthTimer = () => {
  const [time, setTime] = useState(300);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime((prevTime) => prevTime - 1); // <-- Change this line!
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);
  return <div>Seconds: {time}</div>;
};
export default AuthTimer;
