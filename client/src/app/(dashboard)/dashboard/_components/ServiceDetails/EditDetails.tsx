"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { IconEdit, IconX } from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Input, Label } from "@/components/common";
import { days } from "@/shared/constants";
import { useServiceDetails } from "./use-service-details";

/* =========================
   Compound Context
========================= */

type Ctx = ReturnType<typeof useServiceDetails>;
const EditCtx = createContext<Ctx | null>(null);

const useEdit = () => {
  const ctx = useContext(EditCtx);
  if (!ctx) throw new Error("Edit components must be used inside <Edit>");
  return ctx;
};

/* =========================
   Root
========================= */

const Edit = ({ children }: PropsWithChildren) => {
  const service = useServiceDetails();
  return <EditCtx.Provider value={service}>{children}</EditCtx.Provider>;
};

/* =========================
   Primitives
========================= */

Edit.Label = ({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <Label className="text-sm text-gray-500" {...props}>
    {children}
  </Label>
);

Edit.Text = ({
  name,
  defaultValue,
  type = "text",
}: {
  name: string;
  // biome-ignore lint/suspicious/noExplicitAny:type not determined
  defaultValue: any;
  type?: string;
}) => {
  const {
    updatesHandler: { updatedData, setUpdatedData },
  } = useEdit();

  return (
    <Input
      type={type}
      defaultValue={defaultValue}
      onChange={(e) =>
        setUpdatedData({
          ...updatedData,
          [name]: type === "number" ? Number(e.target.value) : e.target.value,
        })
      }
    />
  );
};

/* =========================
   Complex Fields
========================= */

Edit.Details = ({ initial }: { initial: string[] }) => {
  const {
    updatesHandler: { updatedData, setUpdatedData },
  } = useEdit();

  const [value, setValue] = useState("");
  const [items, setItems] = useState(initial);

  const sync = (next: string[]) => {
    setItems(next);
    setUpdatedData({ ...updatedData, details: next });
  };

  return (
    <>
      <Edit.Label>Service details</Edit.Label>
      <div className="flex gap-2">
        <Input
          value={value}
          placeholder="Add detail"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) {
              sync([...items, value]);
              setValue("");
            }
          }}
        />
        <button
          type="button"
          onClick={() =>
            // biome-ignore   lint/complexity/noCommaOperator:must be applied
            value.trim() && (sync([...items, value]), setValue(""))
          }
          className="bg-black text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-1">
        {items.map((d, i) => (
          <li
            key={d.slice(0, 6)}
            className="flex justify-between items-center bg-pink px-2 py-1 rounded text-sm"
          >
            {d}
            <IconX
              size={12}
              className="cursor-pointer"
              onClick={() => sync(items.filter((_, idx) => idx !== i))}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

Edit.WorkingDays = ({ initial }: { initial: string[] }) => {
  const {
    updatesHandler: { updatedData, setUpdatedData },
  } = useEdit();

  const [selected, setSelected] = useState(initial);

  const toggle = (day: string) => {
    const next = selected.includes(day)
      ? selected.filter((d) => d !== day)
      : [...selected, day];

    setSelected(next);
    setUpdatedData({ ...updatedData, working_days: next });
  };

  return (
    <Edit.Label>
      Days of availability
      {days.map((d) => (
        <div key={d} className="flex gap-2">
          <input
            type="checkbox"
            checked={selected.includes(d)}
            onChange={() => toggle(d)}
          />
          <span className="text-sm text-gray-400">{d.toLowerCase()}</span>
        </div>
      ))}
    </Edit.Label>
  );
};

Edit.Status = ({ initial }: { initial: boolean }) => {
  const {
    updatesHandler: { updatedData, setUpdatedData },
  } = useEdit();

  const [active, setActive] = useState(initial);

  return (
    <Edit.Label className="flex gap-2 items-center">
      {active ? "Active" : "Not active"}
      <Switch
        onClick={() => {
          setActive(!active);
          setUpdatedData({ ...updatedData, is_active: !active });
        }}
      />
    </Edit.Label>
  );
};

/* =========================
   Sheet Wrapper
========================= */

export const EditDetails = () => {
  return (
    <Edit>
      <SheetWrapper />
    </Edit>
  );
};

const SheetWrapper = () => {
  const {
    selectedService,
    openHandler: { open, setOpen },
    saveHandler: { saved, setSaved },
    loadingHandler: { loading },
    handleSave,
  } = useEdit();

  return (
    <Sheet
      open={open}
      // biome-ignore lint/suspicious/noExplicitAny:type not determined
      onOpenChange={(o: any) => (!o && !saved ? null : setOpen(o))}
    >
      <SheetTrigger className="absolute top-3 right-3">
        <IconEdit
          size={16}
          onClick={() => {
            setOpen(true);
            setSaved(false);
          }}
        />
      </SheetTrigger>

      <SheetContent className="h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit service</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-3 px-2">
          <Edit.Label>Service name</Edit.Label>
          <Edit.Text name="name" defaultValue={selectedService.name} />

          <Edit.Label>Category</Edit.Label>
          <Edit.Text name="category" defaultValue={selectedService.category} />

          <Edit.Label>Provider</Edit.Label>
          <Edit.Text
            name="provider_name"
            defaultValue={selectedService.provider_name}
          />

          <Edit.Label>Currency</Edit.Label>
          <Edit.Text name="currency" defaultValue={selectedService.currency} />

          <Edit.Label>Price</Edit.Label>
          <Edit.Text
            name="price"
            type="number"
            defaultValue={selectedService.price}
          />

          <Edit.Label>Duration</Edit.Label>
          <Edit.Text
            name="duration"
            type="number"
            defaultValue={selectedService.duration}
          />

          <Edit.Details initial={selectedService.details} />
          <Edit.WorkingDays initial={selectedService.working_days} />

          <Edit.Label>Start time</Edit.Label>
          <Edit.Text
            name="start_time"
            type="time"
            defaultValue={selectedService.start_time}
          />

          <Edit.Label>End time</Edit.Label>
          <Edit.Text
            name="end_time"
            type="time"
            defaultValue={selectedService.end_time}
          />

          <Edit.Label>Max appointments</Edit.Label>
          <Edit.Text
            name="max_appointments_per_day"
            type="number"
            defaultValue={selectedService.max_appointments_per_day}
          />

          <Edit.Status initial={selectedService.is_active} />

          <button
            type="button"
            disabled={loading}
            onClick={handleSave}
            className={`mt-4 px-4 py-2 rounded text-white ${
              loading ? "bg-pink/50" : "bg-pink"
            }`}
          >
            {loading ? "Saving" : "Save changes"}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
