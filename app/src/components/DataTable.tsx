"use client";

import React, { useState } from "react";

interface Appointments {
  id: number;
  name: string;
  email: string;
  status: "CANCEL" | "PENDING" | "CONFIRM";
}

const appointments: Appointments[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "CONFIRM",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "PENDING",
  },
  {
    id: 3,
    name: "Peter Jones",
    email: "peter.jones@example.com",
    status: "CANCEL",
  },
  {
    id: 4,
    name: "Emily White",
    email: "emily.white@example.com",
    status: "CONFIRM",
  },
];

const Table = () => {
  const [selectedAppointments, setSelectedAppointments] = useState<
    Appointments[]
  >([]);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-pink border-b border-gray-200">
          <tr>
            <th></th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-black tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-black tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-black tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="flex items-center justify-center px-1 py-5 whitespace-nowrap text-sm text-gray-900">
                <input
                  type="checkbox"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.checked) {
                      setSelectedAppointments([
                        ...selectedAppointments,
                        appointment,
                      ]);
                    }
                  }}
                />
              </td>
              <td className="py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.name}
              </td>
              <td className="py-4 whitespace-nowrap text-sm text-gray-500">
                {appointment.email}
              </td>
              <td className="py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${appointment.status === "CONFIRM" ? "bg-green-100 text-green-800" : ""}
                    ${appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${appointment.status === "CANCEL" ? "bg-red-100 text-red-800" : ""}
                  `}
                >
                  {appointment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
