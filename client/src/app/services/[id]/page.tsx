"use client";
// _____ Hooks ...
import {useMemo } from "react";
import { useService } from "@/app/services/_hooks/use-service";
import { useParams } from "next/navigation";

// _____ Components  ...
import { IconCircleCheck, IconClock } from "@tabler/icons-react";
import { Loader } from "@/components/common";
import {BookingCalender} from "./_components/BookingCalender";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const { services, loading } = useService();

  const requiredService = useMemo(() => {
    return services.find((s) => s.id === id);
  }, [services, id]);

  if (!requiredService) {
    return (
      <main>
        <article>
          <section>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <p className="text-xl text-gray-500">Service not found.</p>
            </div>
          </section>
        </article>
      </main>
    );
  }
  if (loading) {
    return (
      <main>
        <article>
          <section>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <Loader />
            </div>
          </section>
        </article>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pt-[130px] pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-xl">
          <div className="p-6 sm:p-10 lg:gap-10">
            {/* --- Section 1: Service Information (Col 1 & 2) --- */}
            <div className="lg:col-span-2">
              {/* Header/Pricing */}
              <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-200">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                    {requiredService.name}
                  </h1>
                </div>

                <div className="bg-indigo-100  text-sm font-medium px-3 py-1 rounded-full">
                  <span className="text-green-500">
                    {requiredService.currency} &nbsp;
                  </span>
                  <span className="text-indigo-800">
                    {requiredService.price}
                  </span>
                </div>
              </header>

              {/* Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-pink pl-3">
                  About This Service
                </h2>
                <p className="text-gray-700 text-wrap">
                  {requiredService.description}
                </p>
              </section>

              {/* Details/Inclusions */}
              <section className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <IconCircleCheck className="w-6 h-6 text-green-500 mr-2" />
                  What's Included
                </h2>
                <ul className="list-none space-y-3">
                  {requiredService.details.map((detail, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <IconCircleCheck className="flex-shrink-0 w-4 h-4 text-green-500 mt-1 mr-3" />
                      <span className="text-base">{detail}</span>
                    </li>
                  ))}
                </ul>
                {requiredService.duration && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-sm text-gray-500">
                    <IconClock className="w-4 h-4 mr-2" />
                    Estimated Duration:{" "}
                    <span className="font-medium ml-1 text-gray-700">
                      {requiredService.duration}
                    </span>
                  </div>
                )}
              </section>
            </div>

            {/* --- Section 2: Booking/Calendar (Col 3) --- */}
            <BookingCalender service={requiredService} />
          </div>
        </article>
      </div>
    </main>
  );
};

export default ServiceDetailsPage;
