import { rad2deg } from "@/common/utils/number.utils";
import { useGameController } from "../GameControllerProvider";

interface PieceProps {
  posX: number;
  posY: number;
  rotation: number; // In radians.
  letter: string;
}

export function Piece({ posX, posY, rotation, letter }: PieceProps) {
  const { activeLetter, usedLetters, selectLetter } = useGameController();

  const used = usedLetters.includes(letter);
  const active = activeLetter === letter;

  return (
    <button
      className={`absolute h-24 w-20 origin-top-left -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white text-[3rem] font-extrabold text-blue-500 shadow-[inset_0_-0.5rem_0_#00000022] ${
        active ? "border-4 border-red-500" : ""
      } ${used ? "opacity-30" : ""}`}
      style={{
        left: posX,
        top: posY,
        rotate: `${rad2deg(rotation) - 90}deg`, // 90 is deduced to position the pieces facing outwards.
      }}
      disabled={used || active}
      onClick={() => selectLetter(letter)}
    >
      {letter}
    </button>
  );
}
