import { Button } from "@/common/design-system/atoms/Button";
import { DialogBase } from "@/common/design-system/molecules/DialogBase";
import { Description, DialogTitle } from "@headlessui/react";

export function InstructionsDialog() {
  return (
    <DialogBase open>
      <DialogTitle className="text-title-md text-blue-500">Stop Gourmet</DialogTitle>
      <Description className="mt-4 text-title-sm">How to play</Description>
      <ul className="mt-4 space-y-2 text-subtitle">
        <li>Pick a category;</li>
        <li>Press the center button to start the match;</li>
        <li>Say your answer so everyone can hear;</li>
        <li>Press the letter to indicate it was already used;</li>
        <li>Press the center button to finish your turn;</li>
        <li>Repeat until only one person is left;</li>
      </ul>

      <div className="mt-8 flex gap-4">
        <Button className="w-full">Start Playing</Button>
      </div>
    </DialogBase>
  );
}
