## Appointly | Appointments Management PlatForm :
Appointly is a complete appointments management platform where business owners and service providers sell thier services and expand thier reach to thier potential clients . This application allows a provider list services , while clients can book thier appointments and check out best services from platform .

## Features :
- Category based listing to find best provider's services .

### Appointments booking :
The user can easily select a desired service and booked the appointment . When the appointment is booked , the payment of this appointment is holded by the central platform and 95% of funds should be transfered to provider on the successfull apppointment completion .

### Appointments Rescheduling :
Users can request appointments reschedules from provider with thier desired appointment slot . While in the dashboard , provider can check out and approve schedule changes , and accept / reject the reschedule request . From creating request to rescheduling appointments , all the process is automated , means all the process is handled by the application logic , and provider can easily manage all the flow in one click approval . 

### Appointments cancellation :
In case of any circumstances , the appointments can be cancelled by both customers and service providers and funds should be refunded to customer from the central platform .

### Appointments completions :
- Appointments can be completed physically , the customer can scan the qr code after completing appointments , acknowledging the platform . If this is not acknowledged , the funds cannot be transfered to the provider's account .

### User accounts :
users can manage booked appointments and reschedule requests from thier accounts .   

### Starting out :
For starting out in the platform the provider have to complete a simple onboarding process of stripe customer account creation which collects following information from provider .
- Complete information of business , including tax registration documents , country and funding information (bank account number etc ...) . 
- Name , email , phone number , cnic passport (optional).

the only purpose for the account creation is for registering the provider to a source where platform easily transfer the funds . **The onboarding process is solely related to stripe bank and none of the information is collected by platform** . The provider must have to complete the onboarding as it is required for creating services and transfering funds .


## Pending Features :

**Filters for service listing :**

A feature is requested to create following filters in listings page .
1. Filter with the location . 
2. Filter with ratings .
3. Filter with maximum trusted (according to completed appointments) .

**Appointments completion :**
Service details should show the total completed appointments .

**Ratings :**
Service details should also show the ratings of service .

**Reviews :**
Service details should show the list of testimonials about service .

**Implement recommendation feature :**
Implement a feature to recommend the service to customer which has 
- The most completed appointments .
- Its 80% reviews are positive .  
- and its rated 5 out of 5 by atleast 80% ratings.