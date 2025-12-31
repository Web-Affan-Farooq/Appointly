import { Button } from "@/components/common";
import Link from "next/link";
import { ClientService } from "@/@types/types";

const Card = ({ service }: { service: ClientService }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl shadow-gray-400 duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            {service.name}
          </h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <span className="text-green-500">{service.currency} </span>
            {service.price}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mb-2">
          {service.provider_name}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm  mb-4 line-clamp-2">
          {service.description}
        </p>
        <Link href={`/services/${service.id}`}>
          <Button className="text-sm cursor-pointer px-[18px] py-[5px]">
            Book now
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Card;
