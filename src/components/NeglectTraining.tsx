
import React, { useState, useEffect } from "react";
import TargetElement from "./TargetElement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const AMOUNT_OPTIONS = [2, 4, 6, 8, 10];

const NeglectTraining = () => {
  // מספר האלמנטים שנבחר
  const [elementsAmount, setElementsAmount] = useState(2);

  // האלמנטים עצמם (מערך)
  const [elements, setElements] = useState<
    {
      id: number;
      left: number;
      top: number;
      side: "left" | "right";
      visible: boolean;
      color: string;
    }[]
  >([]);

  // יצירת המיקומים והצבעים עבור מספר אלמנטים
  function generatePositions(amount: number) {
    const sideAmountLeft = Math.ceil(amount / 2);
    const sideAmountRight = Math.floor(amount / 2);

    // מיקום אלמנטים לצד שמאל
    const leftElements = Array.from({ length: sideAmountLeft }, (_, idx) => {
      const colorIdx = Math.floor(getRandom(0, ELEMENT_COLORS.length));
      return {
        id: Date.now() + idx,
        left: getRandom(LEFT_ZONE[0], LEFT_ZONE[1]),
        top: getRandom(MIN_TOP, MAX_TOP),
        side: "left" as const,
        visible: true,
        color: ELEMENT_COLORS[colorIdx],
      };
    });

    // מיקום אלמנטים לצד ימין
    const rightElements = Array.from({ length: sideAmountRight }, (_, idx) => {
      const colorIdx = Math.floor(getRandom(0, ELEMENT_COLORS.length));
      return {
        id: Date.now() + 100 + idx,
        left: getRandom(RIGHT_ZONE[0], RIGHT_ZONE[1]),
        top: getRandom(MIN_TOP, MAX_TOP),
        side: "right" as const,
        visible: true,
        color: ELEMENT_COLORS[colorIdx],
      };
    });

    // ערבוב יחד – סדר אקראי
    const allElements = [...leftElements, ...rightElements];
    return allElements.sort(() => Math.random() - 0.5);
  }

  // איפוס לפי כמות עדכנית
  const resetElements = React.useCallback(() => {
    setElements(generatePositions(elementsAmount));
  }, [elementsAmount]);

  // שינוי כמות האלמנטים
  const handleAmountChange = (value: string) => {
    setElementsAmount(Number(value));
  };

  // התחלת המשחק או החלפת סבב כשכמות האלמנטים משתנה
  useEffect(() => {
    resetElements();
  }, [elementsAmount, resetElements]);

  // ניהול קליק – הסתרה, בדיקה אם להחזיר את כולם
  const handleClick = (elementIdx: number) => {
    setElements((prev) =>
      prev.map((el, i) => (i === elementIdx ? { ...el, visible: false } : el))
    );

    setTimeout(() => {
      setElements((currEls) => {
        if (currEls.every((el) => !el.visible)) {
          resetElements();
        }
        return currEls;
      });
    }, 350);
  };

  return (
    <div className="relative w-full h-screen max-h-[100dvh] max-w-[100vw] bg-gray-50 overflow-hidden flex items-center justify-center">
      {/* קו אדום בצד שמאל */}
      <div className="absolute left-0 top-0 h-full w-[7px] bg-[#ea384c] z-10 rounded-r-lg shadow-lg" />
      {/* קו ירוק בצד ימין */}
      <div className="absolute right-0 top-0 h-full w-[7px] bg-[#48bb78] z-10 rounded-l-lg shadow-lg" />

      {/* לוגואים */}
      <div className="absolute top-2 left-4 flex items-center gap-2">
        <img
          src="https://think-fast-think-right.lovable.app/logo-fast.svg"
          alt="Think Fast Logo"
          className="w-10 h-10 rounded-full bg-white border shadow"
        />
        <img
          src="https://think-fast-think-right.lovable.app/logo-right.svg"
          alt="Think Right Logo"
          className="w-10 h-10 rounded-full bg-white border shadow"
        />
      </div>
      {/* בחירת כמות האלמנטים */}
      <div className="absolute top-2 right-4 z-30 bg-white/90 rounded-xl shadow px-3 py-2 flex items-center gap-2">
        <label className="text-gray-700 font-semibold" htmlFor="elements-amount">
          מספר נקודות:
        </label>
        <Select value={String(elementsAmount)} onValueChange={handleAmountChange}>
          <SelectTrigger className="w-16" id="elements-amount">
            <SelectValue placeholder="כמות" />
          </SelectTrigger>
          <SelectContent>
            {AMOUNT_OPTIONS.map((amt) => (
              <SelectItem key={amt} value={String(amt)}>
                {amt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* תיאור למטפל/משתמש */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 animate-fade-in bg-white/90 rounded-xl px-4 py-2 shadow text-md font-medium text-gray-800 text-right">
        לחץ על כל העיגולים המופיעים על המסך, אם עוד לא הופיעו עיגולים חדשים סימן שלא סימנת את כולם. <br />
        ניתן לבחור את מספר העיגולים המופיעים בכל פעם.
      </div>

      {/* כל האלמנטים על המסך */}
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

