## Frontend Context : 
```markdown
## Claude code context for Appointly :

#### Overview :
Appointly is a complete appointments management platform where business owners and service providers sell thier services and expand thier reach to thier potential clients . This application allows a provider list services , while clients can book thier appointments and check out best services from platform .

#### Routes :
**/services** : Service listing page .
**/service/[id]** : Service details page on which details about service are shown .
**/account** : User's account page where user check his upcoming booked appointments , request any reschedules .
**/login-user** : Login page for user 
**/login-provider** : Login for service providers .
**/signup-user** : Signup page for user .
**/create-account** : Signup page for service provider . After signup provider is redirected to the stripe onboarding page and provider is required to complete the onboarding to list services and accept payments .

#### Development Architecture :
In traditional fullstack nextjs projects , the project is strutured in following ways .

```markdown
----/src
| ---- /components
            | ------- /Layout
                        | ------- 
            | ------- /Pages 
| ---- /stores  (Reusable zustand states)
| ---- /app  (App router)
| ---- /lib  
| ---- /utils  (Reusable utilities)
| ---- /db  (Drizzle)
| ---- proxy.ts  (Next.JS middleware)
```



```