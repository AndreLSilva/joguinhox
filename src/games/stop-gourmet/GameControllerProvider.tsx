import { Dialog } from "@/common/design-system/molecules/Dialog";
import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { useSettings } from "./hooks/useSettings";

interface GameControllerContextProps {
  gameRunning: boolean;
  lettersSet: string;
  activeLetter: string | undefined;
  usedLetters: string[];
  lastPlay: number;

  onSelectLetter: (letter: string) => void;
  onTimerButtonClick: () => void;
}

const GameControllerContext = createContext<GameControllerContextProps | undefined>(undefined);

export function GameControllerProvider({ children }: { children: ReactNode }) {
  const timerTimeout = useRef<NodeJS.Timeout>();

  const [gameOverDialogOpen, setGameOverDialogOpen] = useState<boolean>(false);

  const [lastPlay, setLastPlay] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string>();
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  const { lettersSet, timerSpeed } = useSettings();

  const gameRunning = !!lastPlay;

  /**
   * Handles the timer button functionality. The timer button is used to either start the first
   * turn or to mark the end of one, in this case a letter needs to be selected.
   */
  const handleTimerButtonClick = () => {
    // If the game is not running, starts the game.
    if (!gameRunning) {
      setLastPlay(Date.now());
      resetTimer();
      return;
    }

    // If the game is running, selects the letter and restart the timer.
    if (!selectedLetter) return;

    setUsedLetters((previous) => {
      if (previous.length >= lettersSet.length - 1) return []; // Resets if all letters where selected.
      return [...previous, selectedLetter];
    });
    setSelectedLetter(undefined);
    setLastPlay(Date.now());

    resetTimer();
  };

  const handleGameOver = () => {
    setUsedLetters([]);
    setLastPlay(0);

    setGameOverDialogOpen(true);
  };

  const resetTimer = () => {
    clearTimeout(timerTimeout.current);
    timerTimeout.current = setTimeout(handleGameOver, timerSpeed);
  };

  return (
    <GameControllerContext.Provider
      value={{
        gameRunning,
        lettersSet,
        activeLetter: selectedLetter,
        usedLetters,
        lastPlay,

        onTimerButtonClick: handleTimerButtonClick,
        onSelectLetter: setSelectedLetter,
      }}
    >
      {children}

      <Dialog
        title="Game Over"
        message="Irure amet deserunt nulla elit."
        open={gameOverDialogOpen}
        onConfirm={() => setGameOverDialogOpen(false)}
      />
    </GameControllerContext.Provider>
  );
}

export function useGameController() {
  const ctx = useContext(GameControllerContext);
  if (!ctx) throw new Error("Missing GameControllerProvider");
  return ctx;
}
