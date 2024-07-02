import { useWindowSize } from "@/common/hooks/useWindowSize";
import { Vector2 } from "@/common/utils/vector";
import { useEffect, useMemo, useState } from "react";
import { useGameController } from "../GameControllerProvider";
import { useSettings } from "../hooks/useSettings";
import { LettersSet } from "../stop-gourmet.types";
import { Piece } from "./Piece";
import { TimerButton } from "./TimerButton";

const referenceScreenSize = 1080;

export function Board() {
  const [piecesPositions, setPiecesPositions] = useState<[number, number, number][]>([]);

  const { settings } = useSettings();
  const { lettersSet } = useGameController();
  const windowSize = useWindowSize();

  // Calculates the scale of the board based on the reference screen size.
  const scale = useMemo(() => {
    const smallestWindowSize = Math.min(windowSize.x, windowSize.y);
    return smallestWindowSize / referenceScreenSize;
  }, [windowSize.x, windowSize.y]);

  // Calculates every piece position and rotation and return them in a tuple.
  useEffect(() => {
    const result: [number, number, number][] = [];

    const center = Vector2.multiply(windowSize, 0.5); // Get's the position of the center of the circle. In this case, the center of the screen.
    const radius = referenceScreenSize * getRadiusFactor(settings.lettersSet); // Calculates the radio of the board.
    const angleFactor = (2 * Math.PI) / lettersSet.length; // Calculates the angle variant for each letter.

    for (let i = 0, n = lettersSet.length; i < n; i++) {
      const rotation = angleFactor * i;

      result.push([
        radius * Math.cos(rotation) + center.x,
        radius * Math.sin(rotation) + center.y,
        rotation,
      ]);
    }

    setPiecesPositions(result);
  }, [lettersSet.length, settings.lettersSet, windowSize]);

  return (
    <div className="size-full" style={{ transform: `scale(${scale})` }}>
      {piecesPositions.map(([x, y, rotation], i) => (
        <Piece key={i} posX={x} posY={y} rotation={rotation} letter={lettersSet[i]} />
      ))}

      <TimerButton />
    </div>
  );
}

function getRadiusFactor(lettersSet: LettersSet) {
  switch (lettersSet) {
    case "full":
      return 0.42;
    case "medium":
      return 0.38;
    case "basic":
      return 0.34;
  }
}
