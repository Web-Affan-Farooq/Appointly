const days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
const pagesNotAllowed = [
  "/dashboard",
  "/dashboard/appointments",
  "/dashboard/reschedules",
  "/dashboard/schedule",
  "/add-service",
  "/book-appointment",
  "/login",
  "/create-account",
  "/checkout/failed",
  "/checkout/success",
  "/account",
];

const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const serviceCategories = ["All", "Salon", "Hair cut", "Interview", "Clinic"];

export { days, serviceCategories, pagesNotAllowed, TIMEZONE };
