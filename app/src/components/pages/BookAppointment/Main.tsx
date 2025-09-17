"use client";
// _____ Hooks ...
import { useService } from "@/stores/service";
// _____ Components ...
import Form from "./Form";

const BookingForm: React.FC = () => {
  const { selectedService } = useService();
  return (
    <main>
      <article>
        <section className="flex flex-row justify-center items-center gap-[10px]">
          <div className="w-1/2 h-screen flex flex-col justify-center items-center relative">
            <span className="absolute right-5 top-[20%] bg-indigo-100 text-indigo-800 text-sm font-medium px-[10px] py-[5px] rounded-full flex flex-row flex-nowrap justify-center items-center gap-[7px]">
              <span className="bg-green-500 w-[8px] h-[8px] rounded-full"></span>
              <span>Paid service</span>
            </span>
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Book an Appointment
            </h1>
            <p className="text-center text-sm text-gray-400 dark:text-gray-400">
              Fill out the form below to schedule your service.
            </p>
            <Form />
          </div>
          <div className="w-1/2">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl shadow-gray-400 duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedService.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedService.provider_name}
                </p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {selectedService.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default BookingForm;
