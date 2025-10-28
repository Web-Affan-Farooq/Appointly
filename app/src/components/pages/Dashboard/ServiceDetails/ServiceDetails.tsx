"use client";

import { useDashboard } from "@/stores/dashboard";
import { EditDetails } from "./EditDetails";

const ServiceDetails = () => {
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
        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Service name</h3>
          <p className="text-sm text-gray-500">{selectedService.name}</p>
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Provider</h3>
          <p className="text-sm text-gray-500">
            {selectedService.provider_name}
          </p>
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Description</h3>
          <p className="text-sm text-gray-500">{selectedService.description}</p>
        </div>

        <div className="border border-gray-400/50 p-4 col-span-2">
          <h3 className="font-bold text-sm">Details</h3>
          {selectedService.details?.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedService.details.map((d: string, i: number) => (
                <li className="text-sm text-gray-500" key={i}>
                  {d}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No details provided.</p>
          )}
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Max Appointments / Day</h3>
          <p className="text-sm text-gray-500">
            {selectedService.max_appointments_per_day}
          </p>
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Duration (minutes)</h3>
          <p className="text-sm text-gray-500">{selectedService.duration}</p>
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Price</h3>
          <p className="text-sm text-gray-500">
            {selectedService.price} {selectedService.currency}
          </p>
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Active</h3>
          <p className="text-sm text-gray-500">
            {selectedService.is_active ? "Yes" : "No"}
          </p>
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Category</h3>
          <p className="text-sm text-gray-500">{selectedService.category}</p>
        </div>
        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">User ID</h3>
          <p className="text-sm text-gray-500">{selectedService.user_id}</p>
        </div>

        <div className="border border-gray-400/50 p-4 col-span-2">
          <h3 className="font-bold text-sm">Ratings</h3>
          {selectedService.ratings?.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedService.ratings.map((r: number, i: number) => (
                <li className="text-sm text-gray-500" key={i}>
                  {r}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No ratings yet.</p>
          )}
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Start Time</h3>
          <p className="text-sm text-gray-500">{selectedService.start_time}</p>
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">End Time</h3>
          <p className="text-sm text-gray-500">{selectedService.end_time}</p>
        </div>

        <div className="border border-gray-400/50 p-4 col-span-2">
          <h3 className="font-bold text-sm">Working Days</h3>
          {selectedService.working_days?.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedService.working_days.map((day: string, i: number) => (
                <li className="text-sm text-gray-500" key={i}>
                  {day}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No working days set.</p>
          )}
        </div>

        <div className="border border-gray-400/50 p-4">
          <h3 className="font-bold text-sm">Created At</h3>
          <p className="text-sm text-gray-500">
            {new Date(selectedService.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
