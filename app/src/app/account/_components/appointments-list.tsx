import { useProfile } from "../_hooks/use-profile";
import AppointmentCard from "./card";

export default function AppointmentsList() {
  const {appointments} = useProfile();

  return (
    <div className="space-y-4 mt-4">
      {appointments.map((item) => (
        <AppointmentCard
          key={item.id}
          appointment={item}
        />
      ))}
    </div>
  );
}
