
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>(formatTime(new Date()));

  function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 60000); // Update every minute

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex items-center text-gray-700 dark:text-gray-300">
      <Clock className="h-4 w-4 mr-1.5" />
      <span className="text-sm font-medium">{time}</span>
    </div>
  );
};

export default DigitalClock;
