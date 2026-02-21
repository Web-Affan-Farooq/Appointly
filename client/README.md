### Completed :
- [X] Show today’s schedule in calender in dashboard.
- [X] Complete the slot regeneration .
- [X] Complete the fix of slot allocation .
- [X] Create an accounts page from where the user check his booked appointment .
- [X] Appointment rescheduling route .
- [X] Implement functionality to send otp for login of service provider .
- [X] Render the view profile icon on header when the user is logged in .

## Bugs :
#### Validation failure on provider login form :
**Defination :** Validation hasbeen failing in the provider login form , the email field is running race conditions which the password fields are permenently not showing any kind of validation . While otp form is working perfectly .
**Clue :** Both provider and user signup form is using the same zod schema validation .
**Possible causes :** The signup form is handling the validation and post request login in the custom hook called `use-login-form.ts`. There is possibility of data lost due to rerenders in state .

### Basic :
- Remove auth related extra api routes and make sure to use better auth builtin methods .
- Add proper error handling to all api calls routes .
- Create a utility that returns the user's credentials from `authClient()`.
- All a universal debugging logger .
- Update the service details page to show all the metadata about service .
- Update the cards component in account page to show meaningful data .
- on dashboards Create cards for total earnings this month , a side div for any popup
- Number of appointments per week/month.
- No-shows, cancellations, revenue earned. 
- Add a refund logic for cancelled appointments [see more details in this document] (./IMPROVEMENTS.md)
- Implement appointment cancellation . `[MENTIONED]`
- Notification push . `[MENTIONED]`
- Acknowledgement feature through qr code .
- UI polish . `[MENTIONED]`

### Intermediate :
- Improve success and failure pages .
- Implement feature of state saving .

### Advanced :
- Add proper testing for the cases .
- Create appointment booking tool for AI agent .
 
## Optional :
-  Create a new route for verifying if user has completed onboarding or not . Create a new field in 
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

#### Updating services :

- When `max_appointments_per_day` changes, don’t delete everything.

- Fetch all future unbooked slots and delete them.

- Then regenerate new slots for the upcoming period with the new limit.

- Keep past and booked slots untouched.

#### Update UI :
the current application has just a simple UI to make sure the application functionality can be visible . Update the UI of the following pages 

##### /account :
- User can be able to check his upcoming appointment .
- User can be able to loguot of his account .
- User can be able to check cancelled appointments .
- User can be able to cancel his appointment .
- User can be able to check his pending reschedule appointments requests .
- User can be able to can cancel its reschedule appointments request .

##### /service/[id]:
- User can see an intuitive UI showing each and every detail about the available service data fetched by the hooks .

#### /dashboard :
- Sidebar must contain a button which access the camera , then capture image of a qr code , scans it and mark the encoded appointment as `COMPLETED`  

##### /dashboard/appointments :
- Provider can be able to view appointments as table OR list .
- Provider can be able to cancel any appointment .

##### /dashboard/schedule :
- Fix the calender view so that user can be able to view his all his schedule .
- Calender component should be customized ,  should be according to theme , and can be very easy to understand .

##### /dashboard/reschedules :
- User can be able to view reschedule requests . 
- User can be able to accept or reject the appointment reschedule request .

shakirali@gmail.com (alpHA23@)

```bash
docker exec -i postgres psql -U affan -d appointly < reschedule_requests.sql
```