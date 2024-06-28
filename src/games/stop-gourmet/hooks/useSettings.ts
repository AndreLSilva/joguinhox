import { useLocalStorageEntry } from "@/common/utils/local-storage/useLocalStorageEntry";
import { LettersSet, StopGourmetSettings } from "../stop-gourmet.types";
import { stopGourmetDefaultSettings, stopGourmetSettingsKey } from "../stop-gourmet.utils";

const letterSets: Record<LettersSet, string> = {
  basic: "ABCDEFGHIJLMNOPRSTUV",
  medium: "ABCDEFGHIJLMNOPQRSTUVXZ",
  full: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

export function useSettings() {
  const [settings] = useLocalStorageEntry<StopGourmetSettings>(
    stopGourmetSettingsKey,
    stopGourmetDefaultSettings
  );

  return {
    lettersSet: letterSets[settings.lettersSet],
    timerSpeed: settings.timerSpeed,
  };
}
