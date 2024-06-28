import { ControlledSliderSelector } from "@/common/controlled-inputs/ControlledSliderSelector";
import { Button } from "@/common/design-system/atoms/Button";
import { DialogBase } from "@/common/design-system/molecules/DialogBase";
import { SliderSelectorOption } from "@/common/design-system/molecules/Inputs/SliderSelector";
import { TextField } from "@/common/design-system/molecules/Inputs/TextField";
import { useLocalStorageEntry } from "@/common/utils/local-storage/useLocalStorageEntry";
import { DialogTitle } from "@headlessui/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LettersSet, StopGourmetSettings } from "../stop-gourmet.types";
import { stopGourmetDefaultSettings } from "../stop-gourmet.utils";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  lettersSet: LettersSet;
  timerSpeed: number;
}

const lettersSetOptions: SliderSelectorOption[] = [
  { label: "Basic letters set", value: "basic" },
  { label: "Include KWY set", value: "medium" },
  { label: "Full alphabet set", value: "full" },
];

export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { control, register, handleSubmit, reset } = useForm<FormValues>();
  const [settings, updateSettings] = useLocalStorageEntry<StopGourmetSettings>(
    "stop-gourmet-settings",
    stopGourmetDefaultSettings
  );

  const handleApplySettings: SubmitHandler<FormValues> = (values) => {
    updateSettings({
      lettersSet: values.lettersSet,
      timerSpeed: values.timerSpeed * 1000, // Converts from seconds to millis.
    });
    onClose();
  };

  useEffect(() => {
    reset({
      lettersSet: settings.lettersSet,
      timerSpeed: settings.timerSpeed / 1000, // Converts from millis to seconds.
    });
  }, [reset, settings]);

  return (
    <DialogBase open={open} onClose={onClose}>
      <DialogTitle className="text-title-md text-blue-500">Settings</DialogTitle>

      <form className="my-12 space-y-8" onSubmit={handleSubmit(handleApplySettings)}>
        <ControlledSliderSelector
          name="lettersSet"
          control={control}
          label="Letters set"
          options={lettersSetOptions}
        />

        <TextField
          label="Timer Speed (seconds)"
          type="number"
          defaultValue={3}
          min={3}
          {...register("timerSpeed", {
            required: "This field is required",
            min: { value: 3, message: "Min value is 3" },
            valueAsNumber: true,
          })}
        />
      </form>

      <div className="flex gap-4">
        <Button className="w-full" color="green" onClick={handleSubmit(handleApplySettings)}>
          Apply Settings
        </Button>
      </div>
    </DialogBase>
  );
}
