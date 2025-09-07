import { IconBrandAppleArcade } from "@tabler/icons-react";
import { Button } from "@/components/common";

const services = [
  {
    name: "example service 1",
    appointments: 20,
  },
  {
    name: "example service 1",
    appointments: 20,
  },
  {
    name: "example service 1",
    appointments: 20,
  },
  {
    name: "example service 1",
    appointments: 20,
  },
];

const ServicesCard = () => {
  return (
    <div className="border border-black flex flex-row">
      <IconBrandAppleArcade size={20} />
      <div className="flex flex-col justify-start items-start">
        <h1>service name</h1>
      </div>
    </div>
  );
};
const Services = () => {
  return (
    <main>
      <article>
        <section>
          <h1 className="font-bold p-5 text-[20px]">Services</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 max-sm:p-2">
            {services.map((services, index) => (
              <div
                key={index}
                className="bg-pink relative group w-full py-4 px-7 max-sm:px-5 rounded-lg transition-all duration-200"
              >
                <h2 className="my-2 text-xl font-firacode font-semibold">
                  {services.name}
                </h2>
                <p className="font-firacode text-sm leading-[19px]">
                  {services.appointments} &nbsp; appointments
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
};

export default Services;
