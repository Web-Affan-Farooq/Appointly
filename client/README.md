### Completed :
- [X] Show today’s schedule in calender in dashboard.
- [X] Complete the slot regeneration .
- [X] Complete the fix of slot allocation .
- [X] Create an accounts page from where the user check his booked appointment .
- [X] Appointment rescheduling route .
- [X] Implement functionality to send otp for login of service provider .

### Basic :
- Render the view profile icon on header when the user is logged in .
- All a universal debugging logger .
- Add proper error handling to all api calls routes .
- Create a utility that returns the user's credentials from `authClient()`.
- Assign provider a name .
- Update the service details page to show all the metadata about service .
- Update the cards component in account page to show meaningful data .
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
- Create appointment booking tool for AI agent .
 
## Optional :
-  Create server action for verifying if user has completed onboarding or not . Create a new field in 
`useDashboard` and update it in `FetchDashboardData` component

## Features implementation :

### Acknowledgement feature through QR code :
- Service providers have thier own QR code provided by platform .
- This qr code contain the link `http://localhost:3000/mark?app_id=exampleid&service_id=exampleid&`
- In this route , create a useEffect hook that sends a post request to `/api/acknowledge` with the following request body :
```javascript
{
appointment_id:string;
service_id:string;
}
```
- On the api route  :
   - Mark appointment as completed .
   - Push reminder of ratings and review to account .
   - transfer 95% funds to service provider's account .


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
- Server recieve the valid email and password of service provider from login form .
- If user exists , server insert a row in `otp-session` and pass it along with email to `send_email` function .
- `send_email` function will :
      * Attached the generated code to email and send it in user inbox
      * Return a url with dynamic id (id which it takes from parameter) .
- server send this url to `/create-account` route so that it redirect user to otp form .
- Create a new nextjs route called `auth/[id]` where a form should be shown with otp input . user enters otp and the form should send the code to another route.
- route takes the url id , find a row with this id in `otp-session` and match the user entered otp with actual . Also check if it's expired or not .
- If expired , delete this entry and tell user to login again . Redirect user to `/login-provider` and send it email and password .
- if matched send user response 200 and it will redirected to `/dashboard` page .
- else repeat again and again until user enters correct code within 5 minutes 

#### Updating services :

- When `max_appointments_per_day` changes, don’t delete everything.

- Fetch all future unbooked slots and delete them.

- Then regenerate new slots for the upcoming period with the new limit.

- Keep past and booked slots untouched.

shakirali@gmail.com (alpHA23@)

```bash
docker exec -i postgres psql -U affan -d appointly < reschedule_requests.sql
```