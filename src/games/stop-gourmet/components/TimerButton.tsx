import { Button } from "@/common/design-system/atoms/Button/Button";
import { BackHandIcon } from "@/common/design-system/atoms/icons/icons-list/back_hand";
import { useEffect, useRef } from "react";
import { useGameController } from "../GameControllerProvider";
import { useSettings } from "../hooks/useSettings";

export function TimerButton() {
  const counterOverlayRef = useRef<HTMLDivElement>(null);
  const currentLastPlayRef = useRef<number>(0);

  const { lastPlay, onTimerButtonClick: centerButton } = useGameController();
  const { settings } = useSettings();

  // Handles the Counter indicator animation.
  useEffect(() => {
    currentLastPlayRef.current = lastPlay;

    const animate = () => {
      if (!counterOverlayRef.current) return;
      if (currentLastPlayRef.current !== lastPlay) return;

      // If `lastPlay` is equal to zero, set's the progress to zero; otherwise, calculates the progress based on the elapsed time.
      const progress = lastPlay && Math.min((Date.now() - lastPlay) / settings.timerSpeed, 1);
      const size = `${progress * 100}%`;

      counterOverlayRef.current.style.width = size;
      counterOverlayRef.current.style.height = size;

      if (lastPlay !== 0) window.requestAnimationFrame(animate);
    };
    animate();
  }, [lastPlay, settings.timerSpeed]);

  return (
    <Button
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[200%]"
      color="red"
      size="lg"
      circle
      onClick={centerButton}
    >
      {/* Counter indicator */}
      <div
        ref={counterOverlayRef}
        className="absolute left-1/2 top-1/2 size-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/20"
      />
      <BackHandIcon className="text-black/20" width="3.5rem" height="3.5rem" />
    </Button>
  );
}
