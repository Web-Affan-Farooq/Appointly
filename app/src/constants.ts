const days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
const serviceCategories = [
  "All",  
  "Salon",
    "Hair cut",
    "Interview",
    "Clinic",
]

const plans = [
  {
    name:"Free",
    price:0,
    service:1,
    appointmentsPerMonth:100,
    specialities:[
      "Basic calendar view",
"Email notifications only",
"Community/email support",
    ]
  },
  {
    name:"Starter",
    price:15,
    service:5,
    appointmentsPerMonth:1000,
    specialities:[
      "Calendar integrations (Google, Outlook, iCal)",
"Automated email + SMS reminders",
"Basic analytics (appointments per week, no-shows, etc.)",
"Standard email support (48h response time)",
    ]
  },

  {
    name:"Pro",
    price:25,
    service:10,
    appointmentsPerMonth:3000,
    specialities:[
"Advanced analytics & reporting (conversion rates, customer isights)",
"Staff accounts (up to 3 team members)",
"Online payment collection (Stripe, Razorpay, etc.)",
"Custom branding (logo, colors on booking page)",
"Priority email + chat support (24h response)",
    ]
  },

  {
    name:"Business",
    price:50,
    service:20,
    appointmentsPerMonth:10000,
    specialities:["Unlimited staff accounts",
"White-label option (remove SaaS branding, use custom domain)",
"API access & integrations (Zapier, CRMs, etc.)",
"Priority onboarding + dedicated account manager",
"24/7 premium support",
    ]
  },
]
export {days, plans, serviceCategories}