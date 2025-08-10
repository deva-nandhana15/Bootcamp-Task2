import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const datePart = time.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const dayPart = time.toLocaleDateString("en-GB", { weekday: "long" });

  const timePart = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // shows 24hr numeric like 14:29:55 (you asked earlier for 24-hr center)
  });

  return (
    <div className="flex flex-col items-center mt-6">
      {/* Date (first line) and Day (second line) */}
      <div className="text-[#FAE3C7] text-lg font-semibold tracking-wide mb-4 text-center">
        <div>{datePart}</div>
        <div>{dayPart}</div>
      </div>

      <div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: 220,
          height: 220,
          border: "6px solid #C97B43",
          boxShadow: "0 0 20px rgba(201,123,67,0.8), inset 0 0 15px rgba(201,123,67,0.5)",
          backgroundColor: "transparent",
        }}
      >
        {/* 12-hour decorative numbers */}
        {[...Array(12)].map((_, i) => {
          const number = i + 1;
          const angle = (number / 12) * 360;
          const radius = 90;
          const x = radius * Math.sin((angle * Math.PI) / 180);
          const y = -radius * Math.cos((angle * Math.PI) / 180);

          // rotate numbers slightly to face outward (optional)
          const rotate = angle;
          return (
            <div
              key={number}
              style={{
                position: "absolute",
                transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                color: "#FAE3C7",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <span style={{ transform: `rotate(${-rotate}deg)`, display: "inline-block" }}>
                {number}
              </span>
            </div>
          );
        })}

        {/* center digital time */}
        <div className="text-[#FAE3C7] font-bold" style={{ fontSize: 20 }}>
          {timePart}
        </div>
      </div>
    </div>
  );
}
