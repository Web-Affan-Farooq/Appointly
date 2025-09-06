import { pgEnum } from "drizzle-orm/pg-core";

export const PlanEnum = pgEnum("plan",["FREE","PRIMARY","PREMIUM"])

// $0/month 
//    - 50 appointments/week 
//    - 3+ services  
//    - no ai features 

// $15/month 
//    - 100 appointments/week 
//    - 10+ services  
//    - basic ai features  

// $25/month 
//    - 250 appointments/week 
//    - 20+ services  
//    - integrated AI 

// 24/7 support to every plan