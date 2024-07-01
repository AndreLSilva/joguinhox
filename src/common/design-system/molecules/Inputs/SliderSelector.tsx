import { useEffect, useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { ChevronLeftIcon } from "../../atoms/icons/icons-list/chevron_left";
import { ChevronRightIcon } from "../../atoms/icons/icons-list/chevron_right";

export interface SliderSelectorProps {
  label?: string;
  options: SliderSelectorOption[];

  value?: string;

  onChange?: (value: string) => void;
}

export interface SliderSelectorOption {
  label: string;
  value: string;
}

export function SliderSelector({
  label = undefined,
  options,
  value: externalValue = undefined,
  onChange = undefined,
}: SliderSelectorProps) {
  const [current, setCurrent] = useState<number>(findOptionIndex(options, externalValue));

  const handleLeft = () => {
    setCurrent((previous) => {
      let target: number;

      if (previous - 1 < 0) target = options.length - 1;
      else target = previous - 1;

      onChange?.(options[target].value);
      return target;
    });
  };

  const handleRight = () => {
    setCurrent((previous) => {
      let target: number;

      if (previous + 1 >= options.length) target = 0;
      else target = previous + 1;

      onChange?.(options[target].value);
      return target;
    });
  };

  useEffect(() => {
    setCurrent(findOptionIndex(options, externalValue));
  }, [externalValue, options]);

  return (
    <div>
      {label && <p className="mb-2 block text-subtitle">{label}</p>}
      <div className="flex items-center gap-4">
        <Button icon={ChevronLeftIcon} onClick={handleLeft} />

        <div className="w-full">
          <p className="text-subtitle-large">{options[current].label}</p>
        </div>

        <Button icon={ChevronRightIcon} onClick={handleRight} />
      </div>
    </div>
  );
}

function findOptionIndex(options: SliderSelectorOption[], value?: string) {
  if (!value) return 0;
  return Math.max(
    options.findIndex((c) => c.value === value),
    0,
  );
}
