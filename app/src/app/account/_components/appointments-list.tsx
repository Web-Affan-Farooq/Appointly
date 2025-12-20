import AppointmentCard from "./card";

export default function AppointmentsList() {
  // hardcoded data for UI testing
  const appointments = [
    {
      id: "1",
      title: "Dentist Checkup",
      date: "2025-01-12",
      time: "4:00 PM",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Eye Specialist",
      date: "2025-01-10",
      time: "11:00 AM",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-4 mt-4">
      {appointments.map((item) => (
        <AppointmentCard
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
}
