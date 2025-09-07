"use client";
import React, { useState } from "react";
import { IconDotsVertical } from "@tabler/icons-react";

interface Appointments {
  id: number;
  name: string;
  email: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}
/*
"PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", 
*/
const appointments: Appointments[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "CONFIRMED",
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
    status: "CANCELLED",
  },
  {
    id: 4,
    name: "Emily White",
    email: "emily.white@example.com",
    status: "COMPLETED",
  },
];

const Table = () => {
  const [selectedAppointments, setSelectedAppointments] = useState<
    Appointments[]
  >([]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAppointments(appointments);
    } else {
      setSelectedAppointments([]);
    }
  };

  const isAllSelected = selectedAppointments.length === appointments.length;

  const toggleRow = (appointment: Appointments, checked: boolean) => {
    if (checked) {
      setSelectedAppointments([...selectedAppointments, appointment]);
    } else {
      setSelectedAppointments(
        selectedAppointments.filter((app) => app.id !== appointment.id)
      );
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-row flex-nowrap items-center justify-between gap-[20px]">
        {selectedAppointments.length > 0 ? (
          <p className="text-sm font-medium text-gray-700">
            {selectedAppointments.length} row(s) selected
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            Select rows to perform actions ...
          </p>
        )}
        <div className="flex items-center gap-2">
          <IconDotsVertical className="size-[20px] cursor-pointer" />
          {/* Example bulk action buttons */}
          {selectedAppointments.length > 0 && (
            <div className="flex gap-2">
              <button className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                Confirm
              </button>
              <button className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                Pending
              </button>
              <button className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <br />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-pink border-b border-gray-200">
            <tr>
              <th className="px-3 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => toggleSelectAll(e.currentTarget.checked)}
                  className="cursor-pointer"
                />
              </th>
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
            {appointments.map((appointment) => {
              const isSelected = selectedAppointments.some(
                (app) => app.id === appointment.id
              );
              return (
                <tr
                  key={appointment.id}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-pink/50" : "bg-white"
                  }`}
                >
                  <td className="flex items-center justify-center px-1 py-5">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={isSelected}
                      onChange={(e) =>
                        toggleRow(appointment, e.currentTarget.checked)
                      }
                      disabled={appointment.status === "CANCELLED"} // can't select canceled ones
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
                        ${appointment.status === "COMPLETED" ? "bg-green-100 text-green-800" : ""}
                        ${appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${appointment.status === "CANCELLED" ? "bg-red-100 text-red-800" : ""}
                        ${appointment.status === "CONFIRMED" ? "bg-blue-100 text-blue-800" : ""}
                      `}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;

// "use client";
// import React, { useState } from "react";
// import { IconDotsVertical } from "@tabler/icons-react";

// interface Appointments {
//   id: number;
//   name: string;
//   email: string;
//   status: "CANCELED" | "PENDING" | "CONFIRM";
// }

// const appointments: Appointments[] = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     status: "CONFIRM",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     status: "PENDING",
//   },
//   {
//     id: 3,
//     name: "Peter Jones",
//     email: "peter.jones@example.com",
//     status: "CANCELED",
//   },
//   {
//     id: 4,
//     name: "Emily White",
//     email: "emily.white@example.com",
//     status: "CONFIRM",
//   },
// ];

// const Table = () => {
//   const [selectedAppointments, setSelectedAppointments] = useState<
//     Appointments[]
//   >([]);

//   return (
//     <>
//       <div className="flex flex-row flex-nowrap gap-[20px]">
//         {selectedAppointments.length <= 0 ? (
//           <p></p>
//         ) : (
//           <p>{selectedAppointments.length} rows selected</p>
//         )}
//         <div>
//           <IconDotsVertical className="size-[20px]" />
//         </div>
//       </div>
//       <br />
//       <div className="overflow-x-auto rounded-lg shadow-lg">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-pink border-b border-gray-200">
//             <tr>
//               <th></th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-black tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-black tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-black tracking-wider">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {appointments.map((appointment) => (
//               <tr
//                 className={`cursor-pointer ${selectedAppointments.includes(appointment) ? "bg-pink/50" : "bg-white"}`}
//                 key={appointment.id}
//               >
//                 <td
//                   className={`flex items-center justify-center px-1 py-5 whitespace-nowrap text-sm text-gray-900`}
//                 >
//                   <input
//                     type="checkbox"
//                     className="cursor-pointer"
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                       if (e.currentTarget.checked) {
//                         setSelectedAppointments([
//                           ...selectedAppointments,
//                           appointment,
//                         ]);
//                       } else if (!e.currentTarget.checked) {
//                         setSelectedAppointments([
//                           ...selectedAppointments.filter(
//                             (app) => app.id !== appointment.id
//                           ),
//                         ]);
//                       }
//                     }}
//                   />
//                 </td>
//                 <td className="py-4 whitespace-nowrap text-sm text-gray-900">
//                   {appointment.name}
//                 </td>
//                 <td className="py-4 whitespace-nowrap text-sm text-gray-500">
//                   {appointment.email}
//                 </td>
//                 <td className="py-4 whitespace-nowrap">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                     ${appointment.status === "CONFIRM" ? "bg-green-100 text-green-800" : ""}
//                     ${appointment.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : ""}
//                     ${appointment.status === "CANCELED" ? "bg-red-100 text-red-800" : ""}
//                   `}
//                   >
//                     {appointment.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Table;
