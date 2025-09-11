import React from "react";
import { IconCircleCheck, IconArrowNarrowRight } from "@tabler/icons-react";

const ServiceDetailsPage = () => {
  // Placeholder data for a single service, simulating data fetched via a dynamic route.
  const serviceData = {
    id: 1,
    name: "Haircut & Styling",
    provider: "The Barber's Shop",
    category: "salon",
    price: 45,
    image:
      "https://placehold.co/800x600/e0e7ff/1d4ed8?text=Haircut+%26+Styling",
    description:
      "Experience a professional haircut tailored to your style. Our expert stylists will consult with you to create the perfect look, followed by a professional wash, cut, and finish. This service is designed to leave you feeling confident and refreshed, ready for any occasion.",
    details: [
      "Personalized consultation",
      "Precision haircut and trim",
      "Scalp massage and wash",
      "Professional styling and finish",
      "Recommended for all hair types",
    ],
  };

  if (!serviceData) {
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
              {/* Service Image */}
              <div className="relative">
                <img
                  src={serviceData.image}
                  alt={serviceData.name}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Service Content */}
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                      {serviceData.name}
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">
                      {serviceData.provider}
                    </p>
                  </div>
                  <span className="bg-gray-200 text-pink text-sm font-semibold px-4 py-1 rounded-full">
                    <span className="text-green-500">$</span>{" "}
                    {serviceData.price}
                  </span>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Description and Details */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Service Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {serviceData.description}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    What's Included:
                  </h3>
                  <ul className="list-inside text-gray-600 space-y-1">
                    {serviceData.details.map((detail, index) => (
                      <li key={index} className="flex items-center">
                        <IconCircleCheck
                          className="stroke-green-400"
                          size={15}
                        />{" "}
                        &nbsp;
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
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
