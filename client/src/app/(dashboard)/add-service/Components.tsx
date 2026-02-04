// ______ Libraries ...
import type React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { z } from "zod";

// ______ Components ...
import { Label } from "@/components/common";
import { Input, Button, Checkbox } from "@/components/common";
import { IconX, IconPlus } from "@tabler/icons-react";

// ______ Hooks ...
import { useState, useCallback } from "react";

// ______ Constants and utils...
import { days } from "@/shared/constants/data";
import { cn } from "@/lib/utils";

// ______ Types and schemas...
import type { AddServiceAPISchema } from "./_validations/add-service-api-schema";

type FormFields = z.infer<typeof AddServiceAPISchema>;
type RegisterName = keyof FormFields;
type Props = {
  label: string;
  name: RegisterName;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputWithLabel = (props: Props) => {
  // ____ getting methods from react hook form ...
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Label htmlFor={props.label} className="mb-1" id={props.id}>
        {props.label}
      </Label>

      <Input
        {...props}
        {...register(
          props.name,
          props.type === "number" ? { valueAsNumber: true } : {},
        )}
      />

      {errors.root?.message && (
        <p className="text-sm text-red-500">{errors.root.message as string}</p>
      )}
    </div>
  );
};

export const HighlightsInput = () => {
  // _____ For controlling input  ...
  const [detailValue, setDetailValue] = useState("");

  // _____ Form methods from react hook form ...
  const { setValue, getValues } = useFormContext();

  // _____ get details array from global form state ...
  const details = useWatch({ name: "details" });

  // ______ Add the highlight to the details array ...
  const addHighlight = useCallback(() => {
    if (detailValue.trim()) {
      setValue("details", [...getValues().details, detailValue]);
      setDetailValue("");
    }
  }, [detailValue, setValue, getValues]);

  // ______ for removing highlights from details array ...
  const removeHighlight = useCallback(
    (index: number) => {
      setValue(
        "details",
        getValues().details.filter((_: string, i: number) => i !== index),
      );
    },
    [setValue, getValues],
  );

  return (
    <div>
      <Label className="mb-1">Highlights</Label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            id="highlights-input"
            placeholder="Ex: Free consultation"
            value={detailValue}
            onKeyDown={(e) => {
              if (
                e.key.toLowerCase() === "enter" &&
                detailValue.trim() !== ""
              ) {
                addHighlight();
                document.getElementById("highlights-input")?.focus();
              }
            }}
            aria-label="service-highlights"
            onChange={(e) => setDetailValue(e.target.value)}
          />
          <Button type="button" className="px-3" onClick={addHighlight}>
            <IconPlus size={18} id="add-highlight-button" />
          </Button>
        </div>
        {/* ______ Render the list .... */}
        <div className="flex flex-wrap gap-2">
          {details.map((value: string, idx: number) => (
            <span
              key={value.slice(0, 6)}
              className="flex items-center gap-1 bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full"
            >
              {value}
              <IconX
                size={14}
                className="cursor-pointer"
                onClick={() => removeHighlight(idx)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ______ Component for selection of week days of service availability ...
export const DaySelect = () => {
  // _____ Get methods from react hook form ...
  const { control } = useFormContext();
  return (
    <div className="md:col-span-2">
      <Label className="mb-1">Working Days</Label>
      <Controller
        name="working_days"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {days.map((day) => (
              <label
                htmlFor={day}
                key={day}
                className={cn(
                  "flex items-center gap-2 border rounded-lg p-2 cursor-pointer transition",
                  field.value.includes(day)
                    ? "bg-indigo-100 border-indigo-500"
                    : "hover:bg-gray-50",
                )}
              >
                <Checkbox
                  id={day}
                  checked={field.value.includes(day)}
                  onCheckedChange={(
                    checked: React.ChangeEvent<HTMLInputElement>,
                  ) =>
                    field.onChange(
                      checked
                        ? [...field.value, day]
                        : field.value.filter((d: string) => d !== day),
                    )
                  }
                />
                {day}
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
};
