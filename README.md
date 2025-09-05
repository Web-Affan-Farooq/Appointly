# Appointly | Manage your appointments with ease 

## 1. Requirements & User Stories (Discovery Phase)
Break down requirements from 3 perspectives:

### 👤 Users
As a client, I can:

- Sign up, log in, and manage my profile.
- Browse available services/providers.
- View provider availability (calendar slots).
- Book/cancel/reschedule appointments.
- Get reminders (email/notification).
- View my upcoming & past appointments.

As a provider, I can:
- Sign up & create a service profile.
- Set working hours & availability.
- Approve/reject/cancel bookings.
- Manage services (title, price, duration).
- See dashboard (list of today’s appointments, analytics).

As an admin (optional, Phase 2), I can:

- Manage all providers & users.
- Monitor bookings & system health.

## 2. Tech stack :

- **Frontend**: [`Next.js`, `TailwindCSS`].
- **State Management**: [`Zustand` ].
- **Database**: [`Supabase` , `Drizzle ORM`]
- **Calendar UI**: [ `React Calendar` , `FullCalendar`].
- **Reminders: Email**: (Resend, Nodemailer) / optional push notifications.

## 3. Database Schema (MVP Level)

Tables you’ll need:
users → id, name, email, password, role (client | provider | admin).
providers → id, userId (FK), bio, services_offered.
services → id, providerId, name, duration, price.
availability → id, providerId, dayOfWeek, startTime, endTime.
appointments → id, clientId, providerId, serviceId, startTime, endTime, status (pending | confirmed | cancelled | completed).

## **Notes :**
- Create a landing page 
- Create a signup page for providers
- Create a login page 