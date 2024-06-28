import { Dialog } from "@/common/design-system/molecules/Dialog";
import { useLocalStorageEntry } from "@/common/utils/local-storage/useLocalStorageEntry";
import { ReactNode, createContext, useContext, useMemo, useRef, useState } from "react";
import { StopGourmetSettings } from "./stop-gourmet.types";
import { stopGourmetDefaultSettings } from "./stop-gourmet.utils";

interface GameControllerContextProps {
  lettersSet: string;
  activeLetter: string | undefined;
  usedLetters: string[];
  lastPlay: number;

  selectLetter: (letter: string) => void;
  centerButton: () => void;
}

const GameControllerContext = createContext<GameControllerContextProps | undefined>(undefined);

export function GameControllerProvider({ children }: { children: ReactNode }) {
  const timerTimeout = useRef<NodeJS.Timeout>();

  const [gameOverDialogOpen, setGameOverDialogOpen] = useState<boolean>(false);

  const [lastPlay, setLastPlay] = useState<number>(0);
  const [activeLetter, setActiveLetter] = useState<string>();
  const [usedLetters, setUseLetters] = useState<string[]>([]);

  const [settings] = useLocalStorageEntry<StopGourmetSettings>(
    "stop-gourmet-settings",
    stopGourmetDefaultSettings
  );

  const lettersSet = useMemo(() => {
    switch (settings.lettersSet) {
      case "basic":
        return "ABCDEFGHIJLMNOPRSTUV";
      case "medium":
        return "ABCDEFGHIJLMNOPQRSTUVXZ";
      case "full":
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
  }, [settings.lettersSet]);

  const handleCenterButtonClick = () => {
    if (!activeLetter) return;

    setUseLetters((previous) => {
      if (previous.length >= lettersSet.length - 1) return []; // Resets if all letters where selected.
      return [...previous, activeLetter];
    });
    setActiveLetter(undefined);
    setLastPlay(Date.now());

    resetTimer();
  };

  const handleGameOver = () => {
    setGameOverDialogOpen(true);
  };

  const resetTimer = () => {
    clearTimeout(timerTimeout.current);
    timerTimeout.current = setTimeout(handleGameOver, settings.timerSpeed);
  };

  const resetGame = () => {
    setUseLetters([]);
    resetTimer();
  };

  return (
    <GameControllerContext.Provider
      value={{
        lettersSet,
        activeLetter,
        usedLetters,
        lastPlay,

        centerButton: handleCenterButtonClick,
        selectLetter: setActiveLetter,
      }}
    >
      {children}

      <Dialog
        title="Game Over"
        message="Irure amet deserunt nulla elit."
        open={gameOverDialogOpen}
        onConfirm={() => {
          setGameOverDialogOpen(false);
          resetGame();
        }}
      />
    </GameControllerContext.Provider>
  );
}

export function useGameController() {
  const ctx = useContext(GameControllerContext);
  if (!ctx) throw new Error("Missing GameControllerProvider");
  return ctx;
}
