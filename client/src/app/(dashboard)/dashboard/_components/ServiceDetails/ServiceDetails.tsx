"use client";

import { useDashboard } from "../../_hooks/use-dashboard";
import { EditDetails } from "./EditDetails";

const Block = ({
  identifier,
  value,
}: {
  identifier: string;
  value: Date | string | number | boolean | string[] | number[];
}) => {
  // Handle string or number
  if (typeof value === "string" || typeof value === "number") {
    return (
      <div className="border border-gray-400/50 p-4">
        <h3 className="font-bold text-sm">{identifier}</h3>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    );
  }

  // Handle boolean
  else if (typeof value === "boolean") {
    return (
      <div className="border border-gray-400/50 p-4">
        <h3 className="font-bold text-sm">{identifier}</h3>
        <p className="text-sm text-gray-500">{value ? "Yes" : "No"}</p>
      </div>
    );
  }

  // Handle arrays
  else if (Array.isArray(value)) {
    return (
      <div className="border border-gray-400/50 p-4 col-span-2">
        <h3 className="font-bold text-sm">{identifier}</h3>
        {value.length > 0 ? (
          <ul className="list-disc list-inside">
            {value.map((d) => (
              <li className="text-sm text-gray-500" key={Math.random()}>
                {d}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No {identifier}s yet ...</p>
        )}
      </div>
    );
  }

  // Handle Date
  else if (value instanceof Date) {
    return (
      <div className="border border-gray-400/50 p-4">
        <h3 className="font-bold text-sm">{identifier}</h3>
        <p className="text-sm text-gray-500">{value.toLocaleDateString()}</p>
      </div>
    );
  } else {
    // Default case (for AppointmentDashboard type or others)
    return (
      <div className="border border-gray-400/50 p-4">
        <h3 className="font-bold text-sm">{identifier}</h3>
        <p className="text-sm text-gray-500">{JSON.stringify(value)}</p>
      </div>
    );
  }
};

export const ServiceDetails = () => {
  const { selectedService } = useDashboard();

  if (!selectedService) {
    return (
      <div className="p-6 text-center text-gray-500">No service selected.</div>
    );
  }

  return (
    <>
      <h1 className="mx-7 py-3 text-lg sm:text-xl font-bold flex flex-row flex-nowrap justify-between items-center relative">
        <span>About service</span>
        <EditDetails />
      </h1>

      <div className="grid grid-cols-2">
        {Object.entries(selectedService).map(([key, value]) => {
          return <Block identifier={key} value={value} key={key} />;
        })}
      </div>
    </>
  );
};
