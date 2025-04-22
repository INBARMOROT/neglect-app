
import React, { useState, useRef, useEffect } from "react";
import TargetElement from "./TargetElement";

const LEFT_COLOR = "#ea384c";
const RIGHT_COLOR = "#48bb78";
const ELEMENT_COLORS = ["#2196f3", "#f59e42", "#9b59b6", "#2ecc71", "#e67e22"];

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// קווי גבול: 10% מצד ימין/שמאל יהיו האזורים החוקיים לכל אלמנט.
const LEFT_ZONE = [2, 40]; // אחוזים יחסיים
const RIGHT_ZONE = [60, 98];

const MIN_TOP = 10; // מרווח מהקצה העליון
const MAX_TOP = 85; // מרווח מהקצה התחתון

const NeglectTraining = () => {
  // נשתמש ב־state עבור המיקומים
  const [elements, setElements] = useState([
    { id: 1, left: 10, top: 20, side: "left" as "left" | "right", visible: true },
    { id: 2, left: 80, top: 60, side: "right" as "left" | "right", visible: true },
  ]);
  const [lastClicked, setLastClicked] = useState<null | number>(null);

  // סדר הופעה משתנה כל קליק
  function generatePositions() {
    const left = getRandom(LEFT_ZONE[0], LEFT_ZONE[1]);
    const right = getRandom(RIGHT_ZONE[0], RIGHT_ZONE[1]);
    const colorIdx1 = Math.floor(getRandom(0, ELEMENT_COLORS.length));
    let colorIdx2 = Math.floor(getRandom(0, ELEMENT_COLORS.length));
    if (colorIdx1 === colorIdx2) colorIdx2 = (colorIdx2 + 1) % ELEMENT_COLORS.length;
    return [
      {
        id: Date.now(),
        left,
        top: getRandom(MIN_TOP, MAX_TOP),
        side: "left" as const,
        visible: true,
        color: ELEMENT_COLORS[colorIdx1],
      },
      {
        id: Date.now() + 1,
        left: right,
        top: getRandom(MIN_TOP, MAX_TOP),
        side: "right" as const,
        visible: true,
        color: ELEMENT_COLORS[colorIdx2],
      },
    ];
  }

  // בצע איפוס לשני האלמנטים
  const resetElements = () => {
    setElements(generatePositions());
    setLastClicked(null);
  };

  useEffect(() => {
    // התחלה אוטומטית
    resetElements();
    // eslint-disable-next-line
  }, []);

  const handleClick = (idx: number) => {
    // הסתר את האלמנט שנלחץ
    setElements((prev) =>
      prev.map((el, i) => (i === idx ? { ...el, visible: false } : el))
    );
    setLastClicked(idx);
    // אם השני כבר נלחץ, איפוס מהיר
    setTimeout(() => {
      setElements((els) => {
        if (els.every((e) => !e.visible)) {
          resetElements();
        }
        return els;
      });
    }, 350);
  };

  // התייחסות לאוריינטציה אופקית
  useEffect(() => {
    // אוטומטית לא מנטרלים את אוריינטציית המסך, לכן נמליץ למשתמש
    // אין תמיכה ב-fullscreen JS פה כי שדות מאובטחים, לכן - נשתמש בהתאמה ע"י tailwind
  }, []);

  return (
    <div className="relative w-full h-screen max-h-[100dvh] max-w-[100vw] bg-gray-50 overflow-hidden flex items-center justify-center">
      {/* קו אדום בצד שמאל */}
      <div className="absolute left-0 top-0 h-full w-[7px] bg-[#ea384c] z-10 rounded-r-lg shadow-lg" />
      {/* קו ירוק בצד ימין */}
      <div className="absolute right-0 top-0 h-full w-[7px] bg-[#48bb78] z-10 rounded-l-lg shadow-lg" />

      {/* תיאור למטפל/משתמש */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 animate-fade-in bg-white/90 rounded-xl px-4 py-2 shadow text-md font-medium text-gray-800">
        יש ללחוץ על כל עיגול כאשר הוא מופיע. <br /> כל עיגול מופיע באזור אחר בחלק הימני והשמאלי.
      </div>

      {/* שני האלמנטים */}
      {elements.map(
        (el, idx) =>
          <TargetElement
            key={el.id}
            left={el.left}
            top={el.top}
            color={el.side === "left" ? LEFT_COLOR : RIGHT_COLOR}
            onClick={() => handleClick(idx)}
            visible={el.visible}
          />
      )}

      {/* המלצה למצב לרוחב */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 text-gray-600 bg-white/80 rounded-xl px-4 py-1 shadow text-sm">
        מומלץ להחזיק את המכשיר באוריינטציה לרוחב (landscape)
      </div>
    </div>
  );
};

export default NeglectTraining;
