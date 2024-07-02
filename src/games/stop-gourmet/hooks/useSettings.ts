import { useLocalStorageItem } from "@/common/utils/local-storage/useLocalStorageEntry";
import { useCallback } from "react";
import { StopGourmetSettings } from "../stop-gourmet.types";
import { stopGourmetDefaultSettings, stopGourmetSettingsKey } from "../stop-gourmet.utils";

export function useSettings() {
  const [settings, update] = useLocalStorageItem<StopGourmetSettings>(
    stopGourmetSettingsKey,
    stopGourmetDefaultSettings,
  );

  const updateSettings = useCallback(
    (newSettings: Partial<StopGourmetSettings>) => {
      update((previous) => ({ ...previous, ...newSettings }));
    },
    [update],
  );

  return { settings, updateSettings };
}
