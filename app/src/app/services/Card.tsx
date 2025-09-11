interface Service {
  id: number;
  name: string;
  provider: string;
  category: string;
  price: number;
  image: string;
  description: string;
}
const Card = ({ service }: { service: Service }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
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
        <p className="text-sm text-gray-600 mb-4">{service.provider}</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>
        <button className="w-full bg-pink hover:bg-pink/90 cursor-pointer text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};
export default Card;
