import { Button } from "@/components/common";

interface Service {
  id: number;
  name: string;
  provider: string;
  category: string;
  price: number;
  description: string;
}
const Card = ({ service }: { service: Service }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl shadow-gray-400 duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800">
            {service.name}
          </h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <span className="text-green-500">$ </span>
            {service.price}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{service.provider}</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>
        <Button className="text-sm cursor-pointer px-[18px] py-[5px]">
          Book now
        </Button>
      </div>
    </div>
  );
};
export default Card;
