import { useDashboard } from "@/stores/dashboard";

const useDashboardAnalytics = () => {
  const { selectedService } = useDashboard();

  if (!selectedService) {
    return {
      completedAppointments: [],
    };
  }

  const currentDate = new Date();
  const sevenDaysAgoDate = new Date(currentDate);
  sevenDaysAgoDate.setDate(currentDate.getDate() - 7);

  const completedAppointments = selectedService.appointments.filter(
    (appointment) =>
      appointment.status === "COMPLETED" &&
      new Date(appointment.created_at) > sevenDaysAgoDate
  );

  const totalAppointments = selectedService.appointments.filter(
    (appointment) =>
      appointment.status === "PENDING" &&
      new Date(appointment.created_at) > sevenDaysAgoDate
  );

  return {
    completedAppointments,
    totalAppointments,
  };
};

export default useDashboardAnalytics;
