"use client";

import { useState } from "react";
import { useDashboard } from "@/stores/dashboard";
import { IconEdit, IconX } from "@tabler/icons-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "@/components/common";
import { ServiceData } from "@/@types/types";

const ServiceDetails = () => {
  const { selectedService } = useDashboard();
  const [updatedData, setUpdatedData] = useState<Partial<ServiceData>>({});
  const [newDetails, setnewDetails] = useState("");
  const [renderedDetails, setRenderedDetails] = useState([
    ...selectedService.details,
  ]);

  if (!selectedService) {
    return (
      <div className="p-6 text-center text-gray-500">No service selected.</div>
    );
  }

  const handleSave = () => {
    console.log(updatedData);
  };

  return (
    <>
      <h1 className="mx-7 py-3 text-lg sm:text-xl font-bold flex flex-row flex-nowrap justify-between items-center relative">
        <span>About service</span>
        <Sheet>
          <SheetTrigger className="absolute top-3 right-3 cursor-pointer">
            <IconEdit size={17} />
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

              <label className="text-sm text-gray-500">
                Service description
              </label>
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

              <button
                type="button"
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save changes
              </button>
            </div>
          </SheetContent>
        </Sheet>
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

// "use client";

// import { useDashboard } from "@/stores/dashboard";
// import { IconEdit } from "@tabler/icons-react";

// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import { Input } from "@/components/common";

// const ServiceDetails = () => {
//   const { selectedService } = useDashboard();

//   if (!selectedService) {
//     return (
//       <div className="p-6 text-center text-gray-500">No service selected.</div>
//     );
//   }

//   return (
//     <>
//       <h1 className="mx-7 py-3 text-lg sm:text-xl font-bold flex flex-row flex-nowrap justify-between items-center relative">
//         <span>About service</span>
//         <Sheet>
//           <SheetTrigger className="absolute top-3 right-3 cursor-pointer">
//             <IconEdit size={17} />
//           </SheetTrigger>
//           <SheetContent>
//             <SheetHeader>
//               <SheetTitle>Edit service</SheetTitle>
//               <SheetDescription className="hidden"></SheetDescription>
//             </SheetHeader>
//             <div className="px-[10px]">
//               <label
//                 htmlFor="Edit service name"
//                 className="text-sm text-gray-500"
//               >
//                 Service name
//               </label>
//               <Input
//                 type="text"
//                 className="w-[80%]"
//                 value={selectedService.name}
//                 onChange={() => {}}
//               />
//               <label
//                 htmlFor="Edit service name"
//                 className="text-sm text-gray-500"
//               >
//                 Service description
//               </label>
//               <textarea
//                 name="description"
//                 id="description"
//                 className="w-[80%] ring-1 ring-gray-400"
//                 value={selectedService.description}
//                 onChange={() => {}}
//               ></textarea>
//               <label
//                 htmlFor="Edit service name"
//                 className="text-sm text-gray-500"
//               >
//                 Service category
//               </label>
//               <Input
//                 type="text"
//                 className=""
//                 value={selectedService.category}
//                 onChange={() => {}}
//               />
//               <label
//                 htmlFor="Edit service name"
//                 className="text-sm text-gray-500"
//               >
//                 Currency
//               </label>
//               <Input
//                 type="text"
//                 className=""
//                 value={selectedService.currency}
//                 onChange={() => {}}
//               />
//               <label
//                 htmlFor="Edit service name"
//                 className="text-sm text-gray-500"
//               >
//                 Price
//               </label>
//               <Input
//                 type="text"
//                 className=""
//                 value={selectedService.price}
//                 onChange={() => {}}
//               />
//               <label
//                 htmlFor="Edit service name"
//                 className="text-sm text-gray-500"
//               >
//                 Duration
//               </label>
//               <Input
//                 type="number"
//                 className=""
//                 value={selectedService.duration}
//                 onChange={() => {}}
//               />
//               <label
//                 htmlFor="Edit service name"
//                 className="text-sm text-gray-500"
//               >
//                 Service details
//               </label>
//               <div className="flex flex-row flex-nowrap gap-[10px]">
//                 <Input
//                   type="number"
//                   className=""
//                   value={selectedService.duration}
//                   onChange={() => {}}
//                 />
//                 <button type="button">Add</button>
//               </div>
//               <ul>
//                 {selectedService.details.map((detail, idx) => (
//                   <li key={idx} className="text-sm">
//                     {idx + 1}. <span className="text-gray-400">{detail}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Input
//                 type="time"
//                 className=""
//                 value={selectedService.start_time}
//                 onChange={() => {}}
//               />
//               <Input
//                 type="time"
//                 className=""
//                 value={selectedService.end_time}
//                 onChange={() => {}}
//               />
//             </div>
//           </SheetContent>
//         </Sheet>
//       </h1>
//   <div className="grid grid-cols-2">
//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Service name</h3>
//       <p className="text-sm text-gray-500">{selectedService.name}</p>
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Provider</h3>
//       <p className="text-sm text-gray-500">
//         {selectedService.provider_name}
//       </p>
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Description</h3>
//       <p className="text-sm text-gray-500">{selectedService.description}</p>
//     </div>

//     <div className="border border-gray-400/50 p-4 col-span-2">
//       <h3 className="font-bold text-sm">Details</h3>
//       {selectedService.details?.length > 0 ? (
//         <ul className="list-disc list-inside">
//           {selectedService.details.map((d: string, i: number) => (
//             <li className="text-sm text-gray-500" key={i}>
//               {d}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-sm text-gray-500">No details provided.</p>
//       )}
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Max Appointments / Day</h3>
//       <p className="text-sm text-gray-500">
//         {selectedService.max_appointments_per_day}
//       </p>
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Duration (minutes)</h3>
//       <p className="text-sm text-gray-500">{selectedService.duration}</p>
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Price</h3>
//       <p className="text-sm text-gray-500">
//         {selectedService.price} {selectedService.currency}
//       </p>
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Active</h3>
//       <p className="text-sm text-gray-500">
//         {selectedService.is_active ? "Yes" : "No"}
//       </p>
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Category</h3>
//       <p className="text-sm text-gray-500">{selectedService.category}</p>
//     </div>
//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">User ID</h3>
//       <p className="text-sm text-gray-500">{selectedService.user_id}</p>
//     </div>

//     <div className="border border-gray-400/50 p-4 col-span-2">
//       <h3 className="font-bold text-sm">Ratings</h3>
//       {selectedService.ratings?.length > 0 ? (
//         <ul className="list-disc list-inside">
//           {selectedService.ratings.map((r: number, i: number) => (
//             <li className="text-sm text-gray-500" key={i}>
//               {r}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-sm text-gray-500">No ratings yet.</p>
//       )}
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Start Time</h3>
//       <p className="text-sm text-gray-500">{selectedService.start_time}</p>
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">End Time</h3>
//       <p className="text-sm text-gray-500">{selectedService.end_time}</p>
//     </div>

//     <div className="border border-gray-400/50 p-4 col-span-2">
//       <h3 className="font-bold text-sm">Working Days</h3>
//       {selectedService.working_days?.length > 0 ? (
//         <ul className="list-disc list-inside">
//           {selectedService.working_days.map((day: string, i: number) => (
//             <li className="text-sm text-gray-500" key={i}>
//               {day}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-sm text-gray-500">No working days set.</p>
//       )}
//     </div>

//     <div className="border border-gray-400/50 p-4">
//       <h3 className="font-bold text-sm">Created At</h3>
//       <p className="text-sm text-gray-500">
//         {new Date(selectedService.created_at).toLocaleString()}
//       </p>
//     </div>
//   </div>
//     </>
//   );
// };

// export default ServiceDetails;

// // "use client";

// // import { useDashboard } from "@/stores/dashboard";

// // /*
// //             id:"",
// //             name:"",
// //             provider_name:"",
// //             description:"",
// //             details:[],
// //             appointments:[],
// //             max_appointments_per_day:0,
// //             duration:0,
// //             price:0,
// //             category:"",
// //             ratings:[],
// //             start_time:"",
// //             end_time:"",
// //             working_days:[],
// //             user_id:"",
// //             created_at:new Date(),
// //             currency:"",
// //             is_active:true,
// // */
// // const ServiceDetails = () => {
// //   const { selectedService } = useDashboard();
// //   return (
// //     <div className="grid grid-cols-2 grid-rows-5">
// //       <div className="border border-gray-400/50 p-4">
// //         {selectedService.name}
// //       </div>
// //       <div className="border border-gray-400/50 p-4 flex flex-col">
// //         <span>{selectedService.start_time}</span>
// //         <span>{selectedService.end_time}</span>
// //       </div>
// //       <div className="border border-gray-400/50 p-4">
// //         {selectedService.description}
// //       </div>
// //       <div className="border border-gray-400/50 p-4">
// //         {selectedService.name}
// //       </div>
// //       <div className="border border-gray-400/50 p-4">
// //         {selectedService.name}
// //       </div>
// //       <div className="border border-gray-400/50 p-4">
// //         {selectedService.name}
// //       </div>
// //     </div>
// //   );
// // };
// // export default ServiceDetails;
