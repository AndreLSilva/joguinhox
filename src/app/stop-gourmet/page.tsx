"use client";

import { Button } from "@/common/design-system/atoms/Button/Button";
import { SettingsIcon } from "@/common/design-system/atoms/icons/settings";
import { GameControllerProvider } from "@/games/stop-gourmet/GameControllerProvider";
import { Board } from "@/games/stop-gourmet/components/Board";
import { SettingsDialog } from "@/games/stop-gourmet/components/SettingsDialog";
import { useState } from "react";

export default function StopGourmetPage() {
  const [gameSettingsDialogOpen, setGameSettingsDialogOpen] = useState<boolean>(false);

  return (
    <div className="size-full bg-slate-400">
      <GameControllerProvider>
        <div className="absolute left-0 top-0 p-4">
          <Button icon={SettingsIcon} onClick={() => setGameSettingsDialogOpen(true)} />
        </div>

        <Board />

        {/* <InstructionsDialog /> */}
        <SettingsDialog
          open={gameSettingsDialogOpen}
          onClose={() => setGameSettingsDialogOpen(false)}
        />
      </GameControllerProvider>
    </div>
  );
}
