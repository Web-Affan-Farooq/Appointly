## Appointly :

## Service provider :
#### Associated Routes :

- `/login-provider`
- `/dashboard`
- `/dashboard/reschedules`
- `/dashboard/schedule`
- `/dashboard/appointments`

#### User stories :
- Provider can be able to login through form in `/login-provider` page .
- Provider can enter email and password which should be validated . After that and otp form will be appeared when the email and password is verified from server .
- User can be able to enter the otp in otp input to verify its identity , if verified , redirected to `/dashboard` route other wise toast should be shown .
- On the `/dashboard` page , user can be able to check metrics such as total earnings , total bookings .
- A sidebar which contains options like appointments , reschedules , schedule .
- An option related to logout is also be shown .


## User stories :

User can be able to login to thier account on `/login-user` page . User can either login through email password , or perform social login through login with google button . After success full login , user should be redirected to `/account` page .
- If provider 
- on `/account` route user can be able to check out it's booked appointments , requested reschedules and cancelled appointments and completed appointments .
- User can be able to create a reschedule request using a button , the shadcn ui based popup will be shown with a calender along with slot timings on the selected date in calender , when date is changed in calender , the available slots will be shown in the slots list .

- User can be able to select a date in calender , and all remaining slots will be rendered . 

- 404 not found page 
- payment success page 
- payment failure page
