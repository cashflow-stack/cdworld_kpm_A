import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export function SuccessNotification({
  onClose,
  text,
}: {
  onClose?: () => void;
  text?: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 py-10 transition-all duration-200">
        <div className="relative">
          <div className="absolute -inset-1 animate-pulse rounded-full bg-green-500/20" />
          <CircleCheckIcon className="size-14 relative text-green-500 dark:text-green-400 transition-transform hover:scale-105" />
        </div>
        <p className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
          Success
        </p>
        <p className="text-muted-foreground text-center max-w-[280px]">
          {!text ? "The Member and Circle are Linked Successfully" : text}
        </p>
      </div>
      <DialogFooter className="sm:justify-center">
        <DialogClose asChild>
          <Button
            type="button"
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors"
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}

function CircleCheckIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ErrorNotification({
  onClose,
  text,
}: {
  onClose?: () => void;
  text?: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 py-10 transition-all duration-200">
        <div className="relative">
          <div className="absolute -inset-1 animate-pulse rounded-full bg-red-500/20" />
          <CircleXIcon className="size-14 relative text-red-500 dark:text-red-400 transition-transform hover:scale-105" />
        </div>
        <p className="text-xl font-semibold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent">
          Error
        </p>
        <p className="text-muted-foreground text-center max-w-[280px]">
          {!text
            ? "An error occurred while linking the Member and Circle."
            : text}
        </p>
      </div>
      <DialogFooter className="sm:justify-center">
        <DialogClose asChild>
          <Button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-colors"
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}

function CircleXIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 9 15 15" />
      <path d="M15 9 9 15" />
    </svg>
  );
}
