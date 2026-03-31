Design complete frontend design system for the following platform .

## Overview | Appointly :
**Appointly** is a appointments management platform where business owners and service providers sell their services and expand their reach to their potential clients . This application allows a provider list services , while clients can book their appointments and check out best services from platform .

## Technical Overview :
#### Theme :
Primary (Text/Structure): #000000 (Black)

Secondary (Buttons/UI): #F6A7C1 (A softer, more pastel version of pink)

Tertiary (Background): #FFF9E6 (A soft off-white/cream background)

Accent (Calls to Action): #92e889 (Yellow - used sparingly)

Extra Detail: #9B6B9E (A muted purple to bridge the pink and black)


## Implementation :

Design all of the following pages listed below .

### Design UI of service listing page `my_domain_name/services/`:
- The application should have a feature to filter services on the basis of location , ratings and maximum trusted (according to completed appointments) .
- Contains a search bar for searching the service by name .
- Also user should be able to search using category buttons (All , Salons , Clinics etc) .
- User should be navigated to `my_domain_name/services/[service_uuid]` on clicking the service card .

### Design a service details page `my_domain_name/services/[uuid]`

- name: string
- provider_name: string
- category: string;
- description: string;
- price: number ;
- currency: number ;
- working_days : ["MONDAY" , "TUESDAY", "WEDNESDAY" , "THURSDAY" , "FRIDAY", "SATURDAY"]
- start_time: date string
- end_time: date string
- duration: number
- max_appointments_per_day: number
- ratings: array of numbers between 1 and 5 like [5,2,4,3,1,1,5]
- details: array of sentences ;
- total_completed_appointments :number;

Service details should also show the ratings of service .- It also show 1st 2 or 3 reviews and a clear CTA like `show more` or `See all` which takes to next page or open a modal with rendered reviews cards .
- User should be able to select a date from calender , and when date in calender changes , list of all the available slots will be shown . slots array usually contains .
    - slot date 
    - start_time :date string 
    - end_time :date string

- User should be able to click on the button with text "Book My Slot" , a modal will appear showing the data of selected slot and button with text "Proceed" 
- after that user should be redirected to stripe checkout page for checkout where it will complete the payment and redirected to `/checkout/success` .  

### Design Payment pages (`/payments/success`,`/payment/failed`): 
- Payment success page should show a image icon , with heading text and a button go to account which should redirect user to `/account` page .
- Payment failure page .
- Payment success page should show a image icon , with heading text and a go back button .

### Design a login page `/login-user` :
- The page must contain a svg icon to enhance user experience so that user feels the vibe rather than a data entry form .
- The form should contain field for email and password .
- Show error messages above the field OR below the field if a field is failed to be validated .
- A button for login .
- A button for login with google .

### Design a signup page `/signup-user` :
- The page must contain a svg icon to enhance user experience so that user feels the vibe rather than a data entry form .
- The form should contain field for name , email and password .
- Show error messages above the field OR below the field if a field is failed to be validated .
- A button for signup .
- A button for signup with google .

### Design a signup page for service provider at (`/create-account`) :
- The page must contain a svg icon to enhance experience so that provider feels the vibe rather than a data entry form .
- The form should contain field for name , email, password and a select box for country .
- Show error messages above the field OR below the field if a field is failed to be validated .
- A button with text `Continue` . On clicking the button , provider should be redirected to the stripe's customer onboarding page .


### Design a login page for service provider at (`/login-provider`) :
- The page must contain a svg icon to enhance experience so that provider feels the vibe rather than a data entry form .
- The form should contain field for email and password .
- Show error messages above the field OR below the field if a field is failed to be validated .
- A button for login .

- On successfull login , user should also have to enter the otp code sent through the email .
- A button with text `Verify` which should redirect user to `/dashboard` if verified and if not , show error message in toast .

### User account page (/account) :
- User can be able to check his upcoming appointment .
- User can be able to check cancelled appointments .
- User can be able to cancel his appointment .
- User can be able to check his pending reschedule appointments requests .
- User can be able to can cancel its reschedule appointments request .
- User can be able to logout of its account through settings .
- User can be able to change email and password through settings .
- User can be able to delete its account through .

### Design Provider dashboard (/dashboard):
- On Dashboard , a side bar should be present with following options .
1. Appointments 
2. Reschedules 
3. Schedule 
4. A button with text `Create` which should redirect user to `/add-service` page .
5. A Select box will be placed from which user can switch services , and the dashboard will only show data related to this specific service selected in that select box . On selecting a different service from it , dashboard shows the metrics and all data of the new selecetd service .

- On clicking the `Appointments` option on sidebar , user should be redirected to the `/dashboard/appointments` page .
- This appointments page show the paginated table view of the booked slots .
- Provider can be able to select multiple slots and click on `Cancel` button will results in cancelling all the selected appointments (like gmail multiple select functionality) .

- On clicking the `Reschedules` option on sidebar , user should be redirected to the `/dashboard/reschedules` page .
- On clicking the `Schedule` option on sidebar , user should be redirected to the `/dashboard/Schedule` page .
- On sidebar , a button with text `Mark as complete` will be placed . On clicking this button , a modal will show with a QR code which should be scanned by user 

# Constraints (MANDATORY):
- Dont design the provider dashboard for now . Only design client side pages 
- Always make sure that the design should be aligned with the theme of the application specified above .
- Dont develop Landing page , and provider dashboard .
- Dont write any kind of code . Only design the application .

## Deliverables (MANDATORY) :
- Service listing page .
- Service details page .
- login page for user .
- login page for provider .
- Signup page for user .
- Signup page for provider .
- account page for user .
- payment success fallback page .
- payment failure fallback page .
- 404 not found page .
- All the above pages , each consisting of three screens , mobile , desktop and tablet .
- All the screens should be aligned with the theme and vibe . Make sure nothing is incomplete .