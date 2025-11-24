import { z } from "zod";
import { ServicesAPISchema } from "@/validations/ServicesAPISchema";
import Card from "./Card";
import { Loader } from "@/components/common";

const Catalog = ({
	filteredServices,
	loading,
}: {
	filteredServices: z.infer<typeof ServicesAPISchema>[];
	loading: boolean;
}) => {
	if (loading && filteredServices.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center gap-[5px]">
				<Loader />
				<p className="text-sm text-center">Loading ...</p>
			</div>
		);
	}
	if (filteredServices.length > 0)
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredServices.map((service) => (
					<Card key={service.id} service={service} />
				))}
			</div>
		);
	else if (filteredServices.length === 0 && !loading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="col-span-full text-center text-gray-500 py-12">
					<i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
					<p className="text-xl">No services found.</p>
					<p className="text-sm">Try a different search term or category.</p>
				</div>
			</div>
		);
	}
};
export default Catalog;
