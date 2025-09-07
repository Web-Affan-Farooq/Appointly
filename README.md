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

## 3. Database Schema (MVP Level)

Tables you’ll need:
users → id, name, email, password, role (client | provider | admin).
providers → id, userId (FK), bio, services_offered.
services → id, providerId, name, duration, price.
availability → id, providerId, dayOfWeek, startTime, endTime.
appointments → id, clientId, providerId, serviceId, startTime, endTime, status (pending | confirmed | cancelled | completed).

- user have many services 
- many services belongs to same user
- each service has many appointments 
- many appointments belong to same service 


## Business model :
#### **Free — $0/month** :
- 1 service
- 100 appointments / month (total)
- Basic calendar view
- Email notifications only
- Community/email support

#### **Starter — $15/month**:
- 5 services
- 1,000 appointments / month (total)
- Calendar integrations (Google, Outlook, iCal)
- Automated email + SMS reminders
- Basic analytics (appointments per week, no-shows, etc.)
- Standard email support (48h response time)

#### **Pro — $25/month** :
- 10 services
- 3,000 appointments / month (total)
- Advanced analytics & reporting (conversion rates, customer isights)
- Staff accounts (up to 3 team members)
- Online payment collection (Stripe, Razorpay, etc.)
- Custom branding (logo, colors on booking page)
- Priority email + chat support (24h response)

#### **Business — $50/month** :
- Unlimited services
- 10,000+ appointments / month (total)
- Unlimited staff accounts
- White-label option (remove SaaS branding, use custom domain)
- API access & integrations (Zapier, CRMs, etc.)
- Priority onboarding + dedicated account manager
- 24/7 premium support

## 4. Database schema points :
- user creates an account with email , password , plan
- user have many services 
- many services belongs to same user
- Each service has appointments limit 

## **Notes :**
- Create a landing page 
- Create a signup page for providers
- Create a login page 