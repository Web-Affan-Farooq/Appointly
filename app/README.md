## Milestone 1 — Core Setup & Auth
✅ **Deliverable**:
- **User must be able to login either using email and password or social account (google login required)**
- **User must be able to signup either using email and password or social account (google signup required)**
- **User must be able to logout from dashboard**
- Create an appropriate landing page.

## Milestone 2 — Provider Onboarding (Completed)

- **Create `user facing form page` for `provider account creation`**.
- **Create connect account of users**
- **Create form on `/add-service` for adding a  new service**
- **Create backend route for adding service**
- **After completing the onboarding redirect user to the /dashboard route**

## Milestone 3 — Client Booking Flow

- **Create use facing services page with search bar** 
- **Create a dynamic route page for service details**
- **Create a appointment booking form .**
- **on the details page the user should be navigated to the booking page**
- **Create backend of book appointment**
- **Book appointment (status: PENDING).**

## Milestone 4 — Provider Dashboard Actionstask

- Provider can confirm/reject/.
- Update appointment status accordingly.
- Show today’s schedule in dashboard.

## Milestone 5 — Notifications & Reminders

Email confirmations via Resend/Nodemailer.

Optional: SMS reminders (Twilio or another API).

Reminder system for upcoming appointments.
✅ Deliverable: User + provider both receive reminders.

## Milestone 6 — Analytics & Reporting
- on dashboards Create cards for total earnings this month , a side div for any popup
- Number of appointments per week/month.
- No-shows, cancellations, revenue earned.

## Milestone 7 — Polish & Launch
Prepare landing page + README + demo video.

- attach token system

## Implementation of the slot technique : (Completed)

- Add a booked boolean (default: false) to appointments column .
- Optionally, add slot_date (the date the slot belongs to) so you can easily regenerate month-by-month.
- Keep a foreign key to the service.

#### Slot generation logic :
- When a service is created, generate slots for (say) 30 days based on max_appointments_per_day and your business hours.

- You can write a small utility that, given a start time and a service duration, loops and inserts rows for the next month.

- You could even run a daily cron job to top up slots when a new month starts — basically always ensure 30 days ahead are ready.

#### Updating services :

- When `max_appointments_per_day` changes, don’t delete everything.

- Fetch all future unbooked slots and delete them.

- Then regenerate new slots for the upcoming period with the new limit.

- Keep past and booked slots untouched.

- If you store slot_date, this becomes a simple date range query.

#### Booking flow

- When a user books, update that slot’s booked → true and attach their details.

- Stripe session logic stays the same — you just associate the payment with that slot ID.