"use client";
import React, { useMemo } from "react";
import { IconCircleCheck, IconArrowNarrowRight } from "@tabler/icons-react";
import { useService } from "@/stores/service";
import { useParams } from "next/navigation";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const { services } = useService();
  const requiredService = useMemo(() => {
    return services.find((s) => s.id === id);
  }, []);

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

  return (
    <main>
      <article>
        <section>
          <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8 md:p-12">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Service Content */}
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                      {requiredService.name}
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">
                      {requiredService.provider_name}
                    </p>
                  </div>
                  <span className="bg-gray-200 text-pink text-sm font-semibold px-4 py-1 rounded-full">
                    <span className="text-green-500">$</span>
                    {requiredService.price}
                  </span>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Description and Details */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Service Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {requiredService.description}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    What's Included:
                  </h3>
                  {/* <ul className="list-inside text-gray-600 space-y-1">
                    {requiredService.details.map((detail, index) => (
                      <li key={index} className="flex items-center">
                        <IconCircleCheck
                          className="stroke-green-400"
                          size={15}
                        />{" "}
                        &nbsp;
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul> */}
                </div>

                {/* Booking Button */}
                <button className="bg-pink hover:bg-pink/ text-black cursor-pointer hover:bg-pink/90 py-1 px-3 rounded-md font-semibold text-md transition-colors duration-300 shadow-lg hover:shadow-xl flex flex-row flex-nowrap justify-center items-center gap-[10px]">
                  <span>Book this service</span>
                  <IconArrowNarrowRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default ServiceDetailsPage;
