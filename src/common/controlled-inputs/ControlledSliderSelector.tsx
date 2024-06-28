import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  SliderSelector,
  SliderSelectorProps,
} from "../design-system/molecules/Inputs/SliderSelector";

type ControlledSliderSelectorProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
  Omit<SliderSelectorProps, "value" | "onChange">;

export function ControlledSliderSelector<TFieldValues extends FieldValues>({
  name,
  control,
  ...sliderSelectorProps
}: ControlledSliderSelectorProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <SliderSelector {...sliderSelectorProps} value={value} onChange={onChange} />
      )}
    />
  );
}
