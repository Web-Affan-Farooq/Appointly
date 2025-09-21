"use client";
import { useDashboard } from "@/stores/dashboard";
// ___ Hooks ...
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
};

const AppointmentDetailsCard = () => {
  const { selectedService } = useDashboard();
  const { id } = useParams();
  const requiredAppointment = useMemo(() => {
    return selectedService?.appointments.find((app) => app.id === id);
  }, [selectedService, id]);

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  if (requiredAppointment) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg mx-auto my-8 p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {requiredAppointment?.customer_name}
          </h2>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full uppercase ${statusColors[status as keyof typeof statusColors]}`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {requiredAppointment.customer_email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Starts On:</span>{" "}
              {formatDate(requiredAppointment.started_on)}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Ends On:</span>{" "}
              {formatDate(requiredAppointment.ended_on)}
            </p>
          </div>

          <div className="pt-4 border-t text-sm text-gray-500">
            <p>
              <span className="font-semibold">Created:</span>{" "}
              {formatDate(requiredAppointment.created_at)}
            </p>
            <p>
              <span className="font-semibold">Last Updated:</span>{" "}
              {formatDate(requiredAppointment.updated_at)}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition-colors">
            Change Status
          </button>
          <button className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gray-300 transition-colors">
            Contact Customer
          </button>
        </div>
      </div>
    );
  }
};

export default AppointmentDetailsCard;
