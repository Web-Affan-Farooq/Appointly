"use client";
// _____ Hooks ...
import { useState } from "react";
import { useDashboard } from "@/stores/dashboard";

// _____ Components ...
import { IconEdit, IconX } from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/common";

// _____ Types and schemas  ...
import { ServiceData } from "@/@types/types";

// _____ Server actions and constants ...
import UpdateServiceAction from "@/actions/UpdateServiceAction";
import { days } from "@/constants";
import { toast } from "sonner";

export const EditDetails = () => {
  // _____ Select selected service from global state ...
  const { selectedService } = useDashboard();

  // _____ For storing the values that are actually updated ...
  const [updatedData, setUpdatedData] = useState<Partial<ServiceData>>({});

  // _____ For controlling details input ...
  const [newDetails, setnewDetails] = useState("");

  // _____ For controlling loading state...
  const [loading, setLoading] = useState(false);

  // _____ For controlling service status toogle ...
  const [activeStatus, setActiveStatus] = useState(selectedService.is_active);

  // _____ For Toogling visibility of sheet component  ...
  const [open, setOpen] = useState(false);

  // _____ For controlling if sheet can be closed (only after save success) ...
  const [saved, setSaved] = useState(false);

  // _____ For controlling service working days  ...
  const [serviceWorkingDays, setServiceWorkingDays] = useState([
    ...selectedService.working_days,
  ]);

  // _____ For controlling details input ...
  const [renderedDetails, setRenderedDetails] = useState([
    ...selectedService.details,
  ]);

  const handleSave = async () => {
    if (Object.keys(updatedData).length > 0) {
      setLoading(true);
      const { message, success } = await UpdateServiceAction(updatedData);
      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        setSaved(true);
        setOpen(false);
      }
      setLoading(false);
    }
  };
  return (
    <Sheet
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen && !saved) return;
        setOpen(newOpen);
      }}
    >
      <SheetTrigger className="absolute top-3 right-3 cursor-pointer">
        <IconEdit
          size={17}
          onClick={() => {
            setOpen(true);
            setSaved(false);
          }}
        />
      </SheetTrigger>

      <SheetContent className="h-[100vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit service</SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
        </SheetHeader>

        <div className="px-[10px] flex flex-col gap-2">
          <label className="text-sm text-gray-500">Service name</label>
          <Input
            type="text"
            className="w-[80%]"
            defaultValue={selectedService.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />

          <label className="text-sm text-gray-500">Service description</label>
          <textarea
            name="description"
            id="description"
            className="w-[80%] ring-1 ring-gray-400"
            defaultValue={selectedService.description}
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                description: e.target.value,
              })
            }
          ></textarea>

          <label className="text-sm text-gray-500">Service category</label>
          <Input
            type="text"
            defaultValue={selectedService.category}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, category: e.target.value })
            }
          />

          <label className="text-sm text-gray-500">Provider name</label>
          <Input
            type="text"
            defaultValue={selectedService.provider_name}
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                provider_name: e.target.value,
              })
            }
          />
          <label className="text-sm text-gray-500">Currency</label>
          <Input
            type="text"
            defaultValue={selectedService.currency}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, currency: e.target.value })
            }
          />

          <label className="text-sm text-gray-500">Price</label>
          <Input
            type="number"
            defaultValue={selectedService.price}
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                price: Number(e.target.value),
              })
            }
          />

          <label className="text-sm text-gray-500">Duration</label>
          <Input
            type="number"
            defaultValue={selectedService.duration}
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                duration: Number(e.target.value),
              })
            }
          />

          <label className="text-sm text-gray-500">Service details</label>
          <div className="flex flex-row flex-nowrap gap-[10px] justify-start items-center">
            <Input
              type="text"
              className="w-[70%]"
              placeholder="Add detail"
              onChange={(e) => {
                setnewDetails(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  const updatedDetails = [
                    ...renderedDetails,
                    e.currentTarget.value,
                  ];
                  setUpdatedData({
                    ...updatedData,
                    details: updatedDetails,
                  });
                  setRenderedDetails(updatedDetails);
                }
              }}
            />
            <button
              type="button"
              className="cursor-pointer bg-black px-4 py-2 rounded-lg text-white"
              onClick={() => {
                if (newDetails.trim() !== "") {
                  setUpdatedData({
                    ...updatedData,
                    details: [...renderedDetails, newDetails],
                  });
                  setRenderedDetails([...renderedDetails, newDetails]);
                  setnewDetails("");
                }
              }}
            >
              Add
            </button>
          </div>
          <ul className="flex flex-col flex-nowrap gap-[5px]">
            {renderedDetails.map((detail: string, idx: number) => (
              <li
                key={idx}
                className="flex flex-row flex-nowrap items-center gap-[10px] px-2 py-1 text-sm bg-pink rounded-md"
              >
                <span>{detail}</span>
                <span
                  className="p-1 rounded-full bg-black text-white"
                  onClick={() => {
                    const updatedDetails = renderedDetails.filter(
                      (_, i) => i !== idx
                    );
                    setRenderedDetails(updatedDetails);

                    setUpdatedData({
                      ...updatedData,
                      details: updatedDetails,
                    });
                  }}
                >
                  <IconX size={10} />
                </span>
              </li>
            ))}
          </ul>

          <Input
            type="time"
            defaultValue={selectedService.start_time}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, start_time: e.target.value })
            }
          />
          <Input
            type="time"
            defaultValue={selectedService.end_time}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, end_time: e.target.value })
            }
          />
          <label className="text-sm text-gray-500">
            Max appointments per day
          </label>
          <Input
            type="number"
            defaultValue={selectedService.max_appointments_per_day}
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                max_appointments_per_day: Number(e.target.value),
              })
            }
          />
          <label className="text-sm text-gray-500">Days of availability</label>
          {days.map((day, idx) => (
            <div
              className="flex flex-row flex-nowrap justify-start items-center gap-[10px]"
              key={idx}
            >
              <input
                type="checkbox"
                id={day}
                checked={serviceWorkingDays.includes(day)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setServiceWorkingDays([...serviceWorkingDays, day]);
                    setUpdatedData({
                      ...updatedData,
                      working_days: [...serviceWorkingDays, day],
                    });
                  } else if (!e.target.checked) {
                    const filteredDays = serviceWorkingDays.filter(
                      (d) => d.toLowerCase() !== day.toLowerCase()
                    );
                    setServiceWorkingDays(filteredDays);
                    setUpdatedData({
                      ...updatedData,
                      working_days: [...filteredDays],
                    });
                  }
                }}
              />
              <p className="text-gray-400 text-sm">{day.toLowerCase()}</p>
            </div>
          ))}

          <div className="flex flex-row flex-nowrap justify-start items-center gap-[10px]">
            <p>{activeStatus ? "Active" : "Not active"}</p>
            <Switch
              className={"bg-black"}
              onClick={() => {
                setActiveStatus(!activeStatus);
                setUpdatedData({
                  ...updatedData,
                  is_active: activeStatus,
                });
              }}
            />
          </div>
          <button
            disabled={loading}
            type="button"
            onClick={handleSave}
            className={`mt-4 px-4 py-2 ${loading ? "bg-pink/50 cursor-not-allowed" : "bg-pink cursor-pointer"} text-white rounded`}
          >
            {loading ? "Saving" : "Save changes"}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
