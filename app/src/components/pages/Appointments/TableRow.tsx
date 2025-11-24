import { IconCalendarEvent } from "@tabler/icons-react";

import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "./Badge";

import { AppointmentObjectSecured } from "@/@types/types";

import { useAppointments } from "./useAppointments";

const TableRow = ({
	appointment,
}: {
	appointment: AppointmentObjectSecured;
}) => {
	const { selectedAppointments, setSelectedAppointments } = useAppointments();
	return (
		<div className="relative">
			<input
				type="checkbox"
				className="absolute top-7 left-[7px]"
				value={appointment.id}
				checked={selectedAppointments.includes(appointment.id)}
				onChange={(e) => {
					const { checked, value } = e.target;
					if (checked) {
						setSelectedAppointments([...selectedAppointments, appointment.id]);
					} else if (!checked) {
						const filtered = selectedAppointments.filter((id) => id !== value);
						setSelectedAppointments(filtered);
					}
				}}
			/>

			{/* Row trigger */}
			<SheetTrigger className="w-full px-7 sm:px-9 py-4 flex flex-row flex-nowrap justify-between items-center ring ring-gray-400">
				<div>
					<h2 className="text-sm font-bold">{appointment.customer_name}</h2>
					<span className="text-sm text-gray-400">
						{appointment.customer_email}
					</span>
				</div>

				<div className="flex flex-col items-end gap-[4px]">
					<div className="w-[80px] text-center">
						<Badge status={appointment.status} />
					</div>
					<div className="text-sm text-gray-400 flex flex-row gap-[5px] items-center">
						<IconCalendarEvent size={15} />
						<span>{new Date(appointment.created_at).toLocaleString()}</span>
					</div>
				</div>
			</SheetTrigger>

			{/* Drawer content */}
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="flex flex-row gap-[20px] items-center">
						<span>Appointment details</span>
						<Badge status={appointment.status} />
					</SheetTitle>
					<SheetDescription className="hidden">
						Appointment details
					</SheetDescription>

					<div className="my-[50px] flex flex-col gap-[40px]">
						{/* Customer name */}
						<div>
							<p className="text-sm text-gray-500">Customer name</p>
							<p className="ml-5 text-sm">{appointment.customer_name}</p>
						</div>

						{/* Customer email */}
						<div>
							<p className="text-sm text-gray-500">Customer email</p>
							<p className="ml-5 text-sm">{appointment.customer_email}</p>
						</div>

						{/* Requested date */}
						<div>
							<p className="text-sm text-gray-500">Requested on</p>
							<p className="ml-5 text-sm">
								{new Date(appointment.created_at).toLocaleString()}
							</p>
						</div>
					</div>
				</SheetHeader>
			</SheetContent>
		</div>
	);
};

export { TableRow };
