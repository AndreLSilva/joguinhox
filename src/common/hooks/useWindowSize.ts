import { useCallback, useEffect, useState } from "react";
import { Vector2 } from "../utils/vector";

/**
 * Provides the window inner width and height. Updates the screen size changes.
 * @returns A tuple of numbers where the first one is the width and the second the height.
 */
export function useWindowSize() {
  const [size, setSize] = useState<Vector2>(Vector2.zero);

  const handleResize = useCallback(() => {
    if (typeof window === "undefined") return;
    setSize(new Vector2(window.innerWidth, window.innerHeight));
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return size;
}
