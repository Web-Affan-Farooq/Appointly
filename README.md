# Appointly | Manage your appointments with ease 

## 1. Requirements & User Stories (Discovery Phase)
Break down requirements from 3 perspectives:

### 👤 Users
As a client, I can:
- Browse available services/providers.
- View provider availability (calendar slots).
- Book/cancel/reschedule appointments.
- Get reminders (email/notification).
- View my upcoming & past appointments.

As a provider, I can:
- Approve/reject/cancel bookings.
- Manage services (title, price, duration).
- See dashboard (list of today’s appointments, analytics).

As an admin (optional, Phase 2), I can:

- Manage all providers & users.
- Monitor bookings & system health.

Service flow :
user requesed the appointment (PENDING)
provider scheduled the appointment (CONFIRMED)
user cancelled the appointment (CANCELLED)
user attend appointment (COMPLETED)

## 2. Tech stack :

- **Frontend**: [`Next.js`, `TailwindCSS`].
- **State Management**: [`Zustand` ].
- **Database**: [`Supabase` , `Drizzle ORM`]
- **Calendar UI**: [ `React Calendar` , `FullCalendar`].
- **Reminders: Email**: (Resend, Nodemailer) / optional push notifications.

## 3. Related guides:
- [stripe accept payment features](https://docs.stripe.com/connect/enable-payment-acceptance-guide)

## 3. Database Schema (MVP Level)

Tables you’ll need:
users → id, name, email, password, role (client | provider | admin).
providers → id, userId (FK), bio, services_offered.
services → id, providerId, name, duration, price.
availability → id, providerId, dayOfWeek, startTime, endTime.
appointments → id, clientId, providerId, serviceId, startTime, endTime, status (pending | confirmed | cancelled | completed).

- user have many services 
- many services belongs to sam`e user
- each service has many appointments 
- many appointments belong to same service 

## 4. Database schema points :
- user creates an account with email , password , plan
- user have many services 
- many services belongs to same user
- Each service has appointments limit 

## 5. Deployment guide:
This project is under development and soon be published . Before production deployment , make sure to lint , build , test the code and also complete the following assets :
- thumbnail
- mdx guide
- Readme defining all API routes , layout

