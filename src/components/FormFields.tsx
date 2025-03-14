import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import {
  FormatCurrency,
  unformatCurrencyToNumber,
} from "@/toolkit/helper/helperFunctions";
import { CalendarIcon } from "lucide-react";

type FormInputProps = {
  control: Control<any>;
  label: string;
  name: string;
  placeholder: string;
  options?: string[];
  keyPair?: { key: string; value: string }[];
  isAmount?: boolean;
  fromDate?: string;
  formDescription?: string;
};

/**
 * Renders a form input field.
 *
 * @param {FormInputProps} props - The props for the form input.
 * @returns {JSX.Element} The rendered form input field.
 */
const FormInput = ({
  control,
  label,
  name,
  placeholder,
  isAmount,
}: FormInputProps) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {isAmount ? (
                <Input
                  placeholder="UniqueID(AadharCard)"
                  value={FormatCurrency(`${value}`)}
                  onChange={(e) =>
                    onChange(unformatCurrencyToNumber(e.target.value))
                  }
                  autoComplete="off"
                  
                />
              ) : (
                <Input
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormInput;

/**
 * Renders a form select input field.
 *
 * @param control - The form control object.
 * @param name - The name of the input field.
 * @param label - The label for the input field.
 * @param placeholder - The placeholder text for the input field.
 * @param options - The array of options for the select input.
 * @returns The rendered form select input field.
 */
export const FormSelect = ({
  control,
  name,
  label,
  placeholder,
  options,
  keyPair,
}: FormInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {keyPair?.map((pair) => (
                <SelectItem key={pair.key} value={pair.value}>
                  {pair.key}
                </SelectItem>
              ))}
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

/**
 * Renders a date input field with a calendar popover.
 *
 * @param control - The form control object from react-hook-form.
 * @param label - The label for the input field.
 * @param name - The name of the input field.
 * @param placeholder - The placeholder text for the input field.
 * @returns The JSX element representing the date input field.
 */
export function DateInput({
  fromDate,
  control,
  label,
  name,
  placeholder,
  formDescription,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto opacity-60" size={18} />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() ||
                  date <
                    (fromDate
                      ? new Date(fromDate.split("T")[0])
                      : new Date("2011-01-01"))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/**
 * Renders a radio selection form input.
 *
 * @param control - The form control object.
 * @param name - The name of the input field.
 * @param label - The label for the input field.
 * @param options - The array of options for the radio selection.
 * @returns The rendered radio selection form input.
 */
export function RadioSelection({
  control,
  name,
  label,
  options,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-10"
            >
              {options?.map((option) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={option} />
                  </FormControl>
                  <FormLabel className="font-normal">{option}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
