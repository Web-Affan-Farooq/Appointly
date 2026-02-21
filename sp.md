# Claude code context for Appointly :

## Overview :
Appointly is a complete appointments management platform where business owners and service providers sell thier services and expand thier reach to thier potential clients . This application allows a provider list services , while clients can book thier appointments and check out best services from platform .

## Routes :
**/services** : Service listing page .
**/service/[id]** : Service details page on which details about service are shown .
**/account** : User's account page where user check his upcoming booked appointments , request any reschedules .
**/login-user** : Login page for user 
**/login-provider** : Login for service providers .
**/signup-user** : Signup page for user .
**/create-account** : Signup page for service provider . After signup provider is redirected to the stripe onboarding page and provider is required to complete the onboarding to list services and accept payments .

## Development Practices (MANDATORY) :

#### **Use of zustand states :**
- If any state can be used by two components , the zustand should be used for state instead of react builtin `useContext` hook .
- Zustand state must be typesafe , means that zustand state should contain a type defining the state in its file 
Example :
```typescript
// must mention type ... 
interface ZustandState {
    stateValue:number;
    setStateValue:(val:number) => void;
}
export const useZustandState = create<ZustandState>()((set) => ({
// remaining state init ...
}))
```

#### **Form handling :**
- If a form has only one field , handle it manually using `useState`
- If a form contains input fields more than 1 , the form should be validated and handled using `react-hook-form`
- The react-hook-form should validate the form data using a corresponding zod schema placed withing `_validations` folder or `_validations.ts` file .
- The form can be able to show all the field errors in realtime .
must use `mode:"onchange"` in react-hook-form .
- Must use custom hook when integrating `react-hook-form` .

#### **Use of better auth :**
- All the authentication related functionality can be built in application using `better-auth`
- Don't create any extra routes related to authentication if more important than nessessary .

#### **Use of drizzle ORM :**
drizzle is the orm which should be used in the application 

In traditional fullstack nextjs projects , the project is strutured in following ways .

```markdown
----/src
| ---- /components
            | ------- /layout
                        | ------- Header.tsx
                        | ------- Footer.tsx
            | ------- /pages
                        | ------- Home
                                    | ------- Banner.tsx
                                    | ------- cta.tsx
            | ------- /common
                        | ------- Input.tsx
                        | ------- Button.tsx

| ---- /stores  (Zustand states)
            | ------- use-dashboard.ts
            | ------- use-services.ts
            | ------- use-otp-form.ts

| ---- /app  (App router)
| ---- /lib  
| ---- /utils  (Reusable utilities)
| ---- /db  (Drizzle)
| ---- proxy.ts  (Next.JS middleware)

```