import { useWindowSize } from "@/common/hooks/useWindowSize";
import { Vector2 } from "@/common/utils/vector";
import { useEffect, useState } from "react";
import { useGameController } from "../GameControllerProvider";
import { Piece } from "./Piece";
import { TimerButton } from "./TimerButton";

export function Board() {
  const [piecesPositions, setPiecesPositions] = useState<[number, number, number][]>([]);

  const { lettersSet } = useGameController();
  const windowSize = useWindowSize();

  // Calculates every piece position and rotation and return them in a tuple.
  useEffect(() => {
    const result: [number, number, number][] = [];

    const center = Vector2.multiply(windowSize, 0.5); // Get's the position of the center of the circle. In this case, the center of the screen.
    const radius = Math.min(windowSize.x, windowSize.y) * 0.4; // The radius is 80% of the shortest screen side.
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
  }, [lettersSet.length, windowSize]);

  return (
    <div className="size-full">
      {piecesPositions.map(([x, y, rotation], i) => (
        <Piece key={i} posX={x} posY={y} rotation={rotation} letter={lettersSet[i]} />
      ))}

      <TimerButton />
    </div>
  );
}
