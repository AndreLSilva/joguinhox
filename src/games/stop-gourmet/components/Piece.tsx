import { rad2deg } from "@/common/utils/number.utils";
import { useGameController } from "../GameControllerProvider";

interface PieceProps {
  posX: number;
  posY: number;
  rotation: number; // In radians.
  letter: string;
}

export function Piece({ posX, posY, rotation, letter }: PieceProps) {
  const {
    gameRunning,
    activeLetter,
    usedLetters,
    onSelectLetter: selectLetter,
  } = useGameController();

  const disabled =
    !gameRunning || // Disable if the game is not running.
    usedLetters.includes(letter) || // Disable if the letter was already used.
    activeLetter === letter; // Disable if the current letter is being selected.

  return (
    <div
      className="absolute flex h-24 w-20 origin-top-left -translate-x-1/2 -translate-y-1/2"
      style={{
        left: posX,
        top: posY,
        rotate: `${rad2deg(rotation) - 90}deg`, // 90 is deduced to position the pieces facing outwards.
      }}
    >
      <button
        className={`w-full rounded-lg bg-white text-[3rem] font-extrabold text-blue-500 shadow-[inset_0_-0.5rem_0_#00000022] ${
          disabled ? "mt-2 bg-white/60 shadow-none" : ""
        }`}
        disabled={disabled}
        onClick={() => selectLetter(letter)}
      >
        {letter}
      </button>
    </div>
  );
}
