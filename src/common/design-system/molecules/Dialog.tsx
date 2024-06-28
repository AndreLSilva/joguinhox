import { Description, DialogTitle } from "@headlessui/react";
import { Button } from "../atoms/Button/Button";
import { DialogBase } from "./DialogBase";

interface DialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  open: boolean;

  onConfirm?: () => void;
  onClose?: () => void;
}

export function Dialog({
  title,
  message,
  confirmLabel = "Confirm",
  open,
  onConfirm = undefined,
  onClose = () => undefined,
}: DialogProps) {
  return (
    <DialogBase open={open} onClose={onClose}>
      <DialogTitle className="text-title text-blue-500">{title}</DialogTitle>
      <Description className="mt-4 text-subtitle">{message}</Description>

      <div className="mt-8 flex flex-col gap-4">
        {onConfirm && (
          <Button className="w-full" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        )}
      </div>
    </DialogBase>
  );
}
