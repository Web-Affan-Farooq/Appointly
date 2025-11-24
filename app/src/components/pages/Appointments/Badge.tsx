type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

const Badge = ({ status }: { status: AppointmentStatus }) => {
	const baseClasses =
		"text-[10px] rounded-full px-[9px] py-[2px] w-auto border";

	switch (status) {
		case "CANCELLED":
			return (
				<div
					className={`${baseClasses} border-red-500/30 bg-red-500/30 text-red-400`}
				>
					Cancelled
				</div>
			);
		case "PENDING":
			return (
				<div
					className={`${baseClasses} border-yellow-500/30 bg-yellow-500/30 text-yellow-700`}
				>
					Pending
				</div>
			);
		case "CONFIRMED":
			return (
				<div
					className={`${baseClasses} border-blue-500/30 bg-blue-500/30 text-blue-600`}
				>
					Confirmed
				</div>
			);
		case "COMPLETED":
			return (
				<div
					className={`${baseClasses} border-green-500/30 bg-green-500/30 text-green-600`}
				>
					Completed
				</div>
			);
		default:
			return null;
	}
};

export { Badge };
