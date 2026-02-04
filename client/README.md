### Completed :
- [X] Show today’s schedule in calender in dashboard.
- [X] Complete the slot regeneration .
- [X] Complete the fix of slot allocation .
- [X] Create an accounts page from where the user check his booked appointment .
- [X] Appointment rescheduling route .

### Basic :
- Create a utility that returns the user's credentials from `authClient()`.
- Update the service details page to show all the metadata about service .
- Update the cards component in account page to show meaningful data .
- Implement functionality to send otp for login of service provider .

- on dashboards Create cards for total earnings this month , a side div for any popup
- Number of appointments per week/month.
- No-shows, cancellations, revenue earned. 
- Create Separate login approaches for providers and user login
- Add a refund logic for cancelled appointments [see more details in this document] (./IMPROVEMENTS.md)
- Implement appointment cancellation . `[MENTIONED]`
- Notification push . `[MENTIONED]`
### Intermediate :
- Improve success and failure pages .
- Implement feature of state saving .

### Advanced :
- Add proper testing for the cases .
- Implement open telemetry for logging and span collection .
- Create appointment booking tool for Ai agent .
 
## Optional :
-  Create server action for verifying if user has completed onboarding or not . Create a new field in 
`useDashboard` and update it in `FetchDashboardData` component

## Features implementation :

### Acknowledgement feature through QR code :
- Service providers have thier own QR code provided by platform .
- This qr code contain the link `http://localhost:3000/mark?id=exampleid&`

### Implement a task queue :
- Create a new table in postgres for task queue implementation with row level locking .
### Notification push :
- Integrate Twilio API for integration of notification and reminders .
**Push notification :**
- When the provider accepts the reschedule request from dashboard .
- When the provider cancel appointments .
- When the funds are transfered to provider account . 
- When reschedule is requested from accounts .
- When appointment is booked .

### Appointment cancellation :
- Provider can be able to select multiple appointments and mark them `CANCELLED` .
- Create a route which takes array of appointment ids and mark them `CANCELLED` .
- Server then calls another function to push message on whatsapp that your appointment hasbeen cancelled . OR Push a notification . 

### OTP sending :
- Create a new table in database called `otp-session` which have only two properties .
   - **id** for otp session recognition
   - **otp** as generated code .
   - **expiration** expiration timestamp (5 minutes)
   - **email** email which user entered 
   - **password**
- Server recieve the valid email and password of service provider .
- If user exists , server insert a row in `otp-session` and pass it along with email to `send_email` function .
- `send_email` function attached the generated code to email and send it to email , a url with dynamic id (id which it takes from parameter) is returned .
- server send this url to client to redirect user to otp form .
- Create a new route called `auth/[id]` where a form should be shown with otp input . user enters otp and send the code to another server action .
- Server action takes the url id , find a row with this id in `otp-session` and match the user entered otp with actual . Also check if it's expired or not .
- If expired , delete this entry and tell user to login again . Redirect user to `/login-provider` and send it email and password .
- if matched send user response 200 and it will redirected to `/dashboard` page .
- else repeat again and again until user enters correct code within 5 minutes 

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

shakirali@gmail.com (alpHA23@)
```bash
docker exec -i postgres psql -U affan -d appointly < reschedule_requests.sql
```