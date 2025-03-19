import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import circleDays from "@/constants/circleDays";
import { Circle, Weekday } from "@/models/API";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { updateCircleData } from "../state/circlesSlice";
import {
  SuccessNotification,
  ErrorNotification,
} from "@/components/Notification";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  resetCircleOperation,
  updateCircle,
} from "../state/circleOperationSlice";

// Create a schema for the update circle form
const formSchema = z.object({
  circlename: z
    .string()
    .min(2, {
      message: "Circle Name must be at least 3 characters long.",
    })
    .max(30, {
      message: "Circle Name must be at most 30 characters long.",
    })
    .trim(),
  weekday: z.string({
    message: "Please select a weekday.",
  }),
});

type UpdateCircleDialogProps = {
  circle: Circle;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updatedCircle: { circleName: string; day: Weekday }) => void;
};

export function UpdateCircleDialog({
  circle,
  isOpen,
  onOpenChange,
}: UpdateCircleDialogProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { status, circle: updatedCircle } = useAppSelector(
    (state) => state.circleOperations
  );
  const [showNotification, setShowNotification] = useState<
    "none" | "success" | "error"
  >("none");
  // Initialize form with current circle values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      circlename: circle.circleName,
      weekday: circle.day as string,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    // Call the update function passed from parent
    dispatch(
      updateCircle({
        circle: circle,
        updatedName: values.circlename,
        updatedDay: values.weekday as Weekday,
      })
    );
  }

  function handleDialogChange(open: boolean) {
    console.log("Dialog open state:", open);
    if (!open) {
      // If update was successful, dispatch updateCircleData
      if (updatedCircle && status === "updated") {
        dispatch(updateCircleData(updatedCircle));
      }
      // Reset state when dialog closes
      setShowNotification("none");
      dispatch(resetCircleOperation());
    }
    onOpenChange(open);
  }

  // Show notification when update completes
  useEffect(() => {
    if (status === "updated") {
      setShowNotification("success");
    } else if (status === "failed") {
      setShowNotification("error");
    }
  }, [status]);

  // Show appropriate notification content based on state
  const renderContent = () => {
    if (showNotification === "success") {
      return <SuccessNotification text="Circle updated successfully" />;
    } else if (showNotification === "error") {
      return <ErrorNotification text={"Failed to update circle"} />;
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="circlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("createNewCircleForm.circleName")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("createNewCircleForm.circleNamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weekday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("createNewCircleForm.circleDay")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="col-span-3">
                      <SelectValue
                        placeholder={t("createNewCircleForm.selectDay")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Frequency</SelectLabel>
                      {circleDays.map((circleDay) => (
                        <SelectItem key={circleDay.key} value={circleDay.value}>
                          {t(`weekdays.${circleDay.key}`)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="grid grid-flow-col grid-cols-2 items-center">
            {status === "updating" ? (
              <div className="col-start-2 grid justify-items-stretch">
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  {t("wait")}
                </Button>
              </div>
            ) : (
              <div className="col-start-2 grid justify-items-stretch">
                <Button type="submit">{t("update")}</Button>
              </div>
            )}
          </DialogFooter>
        </form>
      </Form>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("updateCircle.title")}</DialogTitle>
          <DialogDescription>{t("updateCircle.description")}</DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
