import { DialogBackdrop, DialogPanel, Dialog as HDialog } from "@headlessui/react";
import { ReactNode } from "react";

interface DialogBaseProps {
  open: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

export function DialogBase({
  children = undefined,
  open,
  onClose = () => undefined,
}: DialogBaseProps) {
  return (
    <HDialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-10 flex items-center justify-center p-4"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
      />
      <DialogPanel
        transition
        className="relative max-h-full w-full max-w-lg overflow-auto rounded-2xl bg-white p-8 text-center text-black shadow-lg duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {children}
      </DialogPanel>
    </HDialog>
  );
}
