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
	"/dashboard/schedule",
	"/add-service",
	"/book-appointment",
	"/login",
	"/create-account",
	"/checkout/failed",
	"/checkout/success",
	"/account",
];

const serviceCategories = ["All", "Salon", "Hair cut", "Interview", "Clinic"];

export { days, serviceCategories, pagesNotAllowed };
