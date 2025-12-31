## Tasks :
- [X] Complete the fix of slot allocation .
- [X] Complete the slot regeneration .
- [X] Implement functionality to send otp for login of service provider .
- [] Implement feature of state saving .
- [] Create an accounts page from where the user check his booked appointment 
- [] Create appointment rescheduling functionality
- [] Create appointment booking tool for Ai agent .
- [X] Show today’s schedule in calender in dashboard.
- [] SMS reminders (Twilio API).
- [] on dashboards Create cards for total earnings this month , a side div for any popup
- [] Number of appointments per week/month.
- [] No-shows, cancellations, revenue earned. 
- [] Create Separate login approaches for providers and user login
- [] Implement polling on account page .
- [] Add a refund logic for cancelled appointments [see more details in this document] (./IMPROVEMENTS.md)
- [] Improve success and failure pages .

## Check the test flow : 
- create a popup to display calender to select a new slot when creating reschedule request .
- send the selected slot to server action which insert a new row in reschedule sessions and push a notification to admin that a new reschedule is requested .
- implement server action to accept the reschedule request on dashboard .
  
## Optional :
- [] Create server action for verifying if user has completed onboarding or not . Create a new field in 
`useDashboard` and update it in `FetchDashboardData` component

## Features implementation :

### Appintment cancellation :
- Provider can be able to select multiple appointments and mark them `CANCELLED` .
- Create a server action which takes array of appointment ids and mark them `CANCELLED` .
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
 
### Appointment rescheduling :
- user clicks on an appointment which is `PENDING`. An option will appear for rescheduling .
- on clicking the option , the calender with remaining slots is shown .
- user selectes the appointment . then request reschedule using the route which contain previous slot id and new desired slot id , 
- if request is accepted from dashboard , call a server action which  
    - fetches the previous slot .
    - extract its `customer_name` , `customer_email` , `transfer_group` 
    - update the `booked` status of previous slot to **false**
    - update and insert the target slot with `customer_name` , `customer_email` , `transfer_group`

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

```bash
docker exec -i appointly-postgres psql -U affan -d mydb < services_rows.sql
```