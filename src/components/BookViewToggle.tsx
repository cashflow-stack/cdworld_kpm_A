import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setIsBookViewOpen } from "@/toolkit/helper/helperSlice";
import { LayoutList, BookOpen } from "lucide-react";
import { useId, useState } from "react";

export default function BookViewToggle() {
  const {isBookViewOpen} = useAppSelector((state) => state.dataHelper);
  const id = useId();
  const [checked, setChecked] = useState(isBookViewOpen);
  const dispatch = useAppDispatch();
  const handelChange = (checked: boolean) => {
    setChecked(checked);
    dispatch(setIsBookViewOpen(checked));
  };

  return (
    <div className="hidden sm:inline-flex sm:items-center">
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium rounded-md overflow-hidden">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={handelChange}
          className="peer data-[state=checked]:bg-input/40 data-[state=unchecked]:bg-input/40 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-500 [&_span]:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="peer-data-[state=checked]:text-muted-foreground/60 pointer-events-none relative ms-0.5 flex min-w-10 items-center justify-center text-center transition-colors duration-200">
          <LayoutList size={18} aria-hidden="true" />
        </span>
        <span className="peer-data-[state=unchecked]:text-muted-foreground/60 pointer-events-none relative me-0.5 flex min-w-10 items-center justify-center text-center transition-colors duration-200">
          <BookOpen size={18} aria-hidden="true" />
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Toggle Book View
      </Label>
    </div>
  );
}