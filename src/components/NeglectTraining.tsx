
import React, { useState, useEffect } from "react";
import { Image, ImageOff } from "lucide-react";
import TargetElement from "./TargetElement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LEFT_COLOR = "#ea384c";
const RIGHT_COLOR = "#48bb78";
const ELEMENT_COLORS = ["#2196f3", "#f59e42", "#9b59b6", "#2ecc71", "#e67e22"];

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const LEFT_ZONE = [2, 40]; // אחוזים יחסיים
const RIGHT_ZONE = [60, 98];

const MIN_TOP = 10; // מרווח מהקצה העליון
const MAX_TOP = 85; // מרווח מהקצה התחתון

const AMOUNT_OPTIONS = [2, 4, 6, 8, 10];

const NeglectTraining = () => {
  const [elementsAmount, setElementsAmount] = useState(2);
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
  const [allClicked, setAllClicked] = useState(false);
  const [hasStartedClicking, setHasStartedClicking] = useState(false);

  function generatePositions(amount: number) {
    const sideAmountLeft = Math.ceil(amount / 2);
    const sideAmountRight = Math.floor(amount / 2);

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

    const allElements = [...leftElements, ...rightElements];
    return allElements.sort(() => Math.random() - 0.5);
  }

  const resetElements = React.useCallback(() => {
    setElements(generatePositions(elementsAmount));
    setAllClicked(false);
  }, [elementsAmount]);

  const handleAmountChange = (value: string) => {
    setElementsAmount(Number(value));
    // Reset the hasStartedClicking state when changing amount
    setHasStartedClicking(false);
  };

  useEffect(() => {
    resetElements();
    // Reset the clicking state when elements amount changes
    setHasStartedClicking(false);
  }, [elementsAmount, resetElements]);

  useEffect(() => {
    if (allClicked) {
      // Add a small delay before resetting elements
      const timer = setTimeout(() => {
        resetElements();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [allClicked, resetElements]);

  const handleClick = (elementIdx: number) => {
    // Set hasStartedClicking to true on first click
    setHasStartedClicking(true);
    
    setElements((prev) => {
      const newElements = prev.map((el, i) => (i === elementIdx ? { ...el, visible: false } : el));
      
      const allElementsClicked = newElements.every((el) => !el.visible);
      if (allElementsClicked) {
        setAllClicked(true);
      }
      
      return newElements;
    });
  };

  // Force the console log to make sure we can see the state
  console.log('Has started clicking:', hasStartedClicking);

  return (
    <div className="relative w-full h-screen max-h-[100dvh] max-w-[100vw] bg-gray-50 overflow-hidden flex items-center justify-center">
      <div className="absolute left-0 top-0 h-full w-[7px] bg-[#ea384c] z-10 rounded-r-lg shadow-lg" />
      <div className="absolute right-0 top-0 h-full w-[7px] bg-[#48bb78] z-10 rounded-l-lg shadow-lg" />

      <div className="absolute top-2 left-4 flex items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-white border shadow flex items-center justify-center overflow-hidden p-1">
          <img
            src="/lovable-uploads/17729d30-faff-4371-88c6-9088dbfb81cb.png"
            alt="Logo 1"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
              e.currentTarget.onerror = null;
            }}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-12 h-12 rounded-full bg-white border shadow flex items-center justify-center overflow-hidden p-1">
          <img
            src="/lovable-uploads/4e84cb59-0e83-4994-bf3d-c19813e5424a.png"
            alt="Logo 2"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
              e.currentTarget.onerror = null;
            }}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

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

      {!hasStartedClicking && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-white/90 rounded-xl px-4 py-2 shadow text-md font-medium text-gray-800 text-right">
          לחץ על כל העיגולים המופיעים על המסך
        </div>
      )}

      {elements.map((el, idx) => (
        <TargetElement
          key={el.id}
          left={el.left}
          top={el.top}
          color={el.side === "left" ? LEFT_COLOR : RIGHT_COLOR}
          onClick={() => handleClick(idx)}
          visible={el.visible}
        />
      ))}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 text-gray-600 bg-white/80 rounded-xl px-4 py-1 shadow text-sm">
        מומלץ להחזיק את המכשיר באוריינטציה לרוחב (landscape)
      </div>
    </div>
  );
};

export default NeglectTraining;
