import { LettersSet, StopGourmetSettings } from "./stop-gourmet.types";

export const stopGourmetSettingsKey = "stop-gourmet-settings";

export const letterSetsMap: Record<LettersSet, string> = {
  basic: "ABCDEFGHIJLMNOPRSTUV",
  medium: "ABCDEFGHIJLMNOPQRSTUVXZ",
  full: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

export const stopGourmetDefaultSettings: StopGourmetSettings = {
  lettersSet: "basic",
  timerSpeed: 10_000,
};
