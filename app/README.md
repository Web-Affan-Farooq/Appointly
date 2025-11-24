## Milestone 1 — Core Setup & Auth
✅ **Deliverable**:
- **User must be able to login either using email and password or social account (google login required)**
- **User must be able to signup either using email and password or social account (google signup required)**
- **User must be able to logout from dashboard**
- Create an appropriate landing page.

## Milestone 2 — Provider Onboarding (Completed)

- **Create `user facing form page` for `provider account creation`**.
- **Create connect account of users**
- **Create form on `/add-service` for adding a  new service**
- **Create backend route for adding service**
- **After completing the onboarding redirect user to the /dashboard route**

## Milestone 3 — Client Booking Flow

- **Create use facing services page with search bar** 
- **Create a dynamic route page for service details**
- **Create a appointment booking form .**
- **on the details page the user should be navigated to the booking page**
- **Create backend of book appointment**
- **Book appointment (status: PENDING).**

## Milestone 4 — Provider Dashboard Actionstask

- Provider can confirm/reject/.
- Update appointment status accordingly.
- Show today’s schedule in dashboard.

## Milestone 5 — Notifications & Reminders

Email confirmations via Resend/Nodemailer.

Optional: SMS reminders (Twilio or another API).

Reminder system for upcoming appointments.
✅ Deliverable: User + provider both receive reminders.

## Milestone 6 — Analytics & Reporting
- on dashboards Create cards for total earnings this month , a side div for any popup
- Number of appointments per week/month.
- No-shows, cancellations, revenue earned.

## Milestone 7 — Polish & Launch
Prepare landing page + README + demo video.

- attach token system

## Implementation of the slot technique : (Completed)
- Add a booked boolean (default: false) to appointments column .
- Optionally, add slot_date (the date the slot belongs to) so you can easily regenerate month-by-month.
- Keep a foreign key to the service.

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

#### Booking flow

- When a user books, update that slot’s booked → true and attach their details.

- Stripe session logic stays the same — you just associate the payment with that slot ID.

```bash
docker exec -i appointly-postgres psql -U affan -d mydb < services_rows.sql
```

check this error in terminal 
```bash

E:\Appointly\app>npx drizzle-kit generate
No config path provided, using default 'drizzle.config.ts'
Reading config file 'E:\Appointly\app\drizzle.config.ts'

~ started_time › start_time column will be renamed

+ booked column will be created
--- all columns conflicts in appointments table resolved ---

6 tables
appointments 13 columns 0 indexes 1 fks
services 20 columns 0 indexes 1 fks
account 13 columns 0 indexes 1 fks
session 8 columns 0 indexes 1 fks
user 9 columns 0 indexes 0 fks
verification 6 columns 0 indexes 0 fks

[✓] Your SQL migration file ➜ drizzle\0011_redundant_marvex.sql 🚀

E:\Appointly\app>npx drizzle-kit migrate
No config path provided, using default 'drizzle.config.ts'
Reading config file 'E:\Appointly\app\drizzle.config.ts'
Using 'postgres' driver for database querying
[⣟] applying migrations...{
  severity_local: 'NOTICE',
  severity: 'NOTICE',
  code: '42P06',
  message: 'schema "drizzle" already exists, skipping',
  file: 'schemacmds.c',
  line: '132',
  routine: 'CreateSchemaCommand'
}
{
  severity_local: 'NOTICE',
  severity: 'NOTICE',
  code: '42P07',
  message: 'relation "__drizzle_migrations" already exists, skipping',
  file: 'parse_utilcmd.c',
  line: '208',
  routine: 'transformCreateStmt'
}
DrizzleQueryError: Failed query: CREATE TYPE "public"."appointment_status" AS ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
params:
    at PostgresJsPreparedQuery.queryWithCache (E:\Appointly\app\node_modules\.pnpm\drizzle-orm@0.44.5_@libsql+_b89d3a22341d06be9134c8f80f0999d8\node_modules\src\pg-core\session.ts:73:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async <anonymous> (E:\Appointly\app\node_modules\.pnpm\drizzle-orm@0.44.5_@libsql+_b89d3a22341d06be9134c8f80f0999d8\node_modules\src\pg-core\dialect.ts:102:7)
    at async scope (file:///E:/Appointly/app/node_modules/.pnpm/postgres@3.4.7/node_modules/postgres/src/index.js:260:18)
    at async sql.begin (file:///E:/Appointly/app/node_modules/.pnpm/postgres@3.4.7/node_modules/postgres/src/index.js:243:14)
    at async PgDialect.migrate (E:\Appointly\app\node_modules\.pnpm\drizzle-orm@0.44.5_@libsql+_b89d3a22341d06be9134c8f80f0999d8\node_modules\src\pg-core\dialect.ts:95:3)
    at async migrate (E:\Appointly\app\node_modules\.pnpm\drizzle-orm@0.44.5_@libsql+_b89d3a22341d06be9134c8f80f0999d8\node_modules\src\postgres-js\migrator.ts:10:2) {
  query: `CREATE TYPE "public"."appointment_status" AS ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');`,
  params: [],
  cause: PostgresError: type "appointment_status" already exists
      at ErrorResponse (file:///E:/Appointly/app/node_modules/.pnpm/postgres@3.4.7/node_modules/postgres/src/connection.js:794:26)
      at handle (file:///E:/Appointly/app/node_modules/.pnpm/postgres@3.4.7/node_modules/postgres/src/connection.js:480:6)
      at Socket.data (file:///E:/Appointly/app/node_modules/.pnpm/postgres@3.4.7/node_modules/postgres/src/connection.js:315:9)
      at Socket.emit (node:events:508:28)
      at addChunk (node:internal/streams/readable:559:12)
      at readableAddChunkPushByteMode (node:internal/streams/readable:510:3)
      at Readable.push (node:internal/streams/readable:390:5)
      at TCP.onStreamRead (node:internal/stream_base_commons:189:23) {
    severity_local: 'ERROR',
    severity: 'ERROR',
    code: '42710',
    file: 'typecmds.c',
    line: '1211',
    routine: 'DefineEnum'
  }
}
```

also check this schema 
```typescript
import {
	date,
	pgTable,
	uuid,
	timestamp,
	text,
	boolean,
	integer,
} from "drizzle-orm/pg-core";
import { service } from "./services";
import { AppointmentStatus } from "./appointment-type";
import { InferSelectModel } from "drizzle-orm";

export const appointment = pgTable("appointments", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	service_id: uuid("service_id")
		.notNull()
		.references(() => service.id, { onDelete: "cascade" }),

	// bookkeeping
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),

	// customer info
	customer_name: text("customer_name"),
	customer_email: text("customer_email"),

	// status lifecycle
	status: AppointmentStatus("status").default("PENDING").notNull(),

	// Payment intent ...
	transfer_group: text(),
	// scheduling
	start_time: timestamp("start_time", { withTimezone: true }),
	end_time: timestamp("end_time", { withTimezone: true }),
	token: integer("token").notNull(),

	slot_date: date("slot_date").notNull(),
	booked:boolean().default(false)
});

export type Appointment = InferSelectModel<typeof appointment>;


```
also check this appointments type , note that i have removed the "Confirmed" type from it 
```typescript
import { pgEnum } from "drizzle-orm/pg-core";

export const AppointmentStatus = pgEnum("appointment_status", [
	"PENDING",
	"COMPLETED",
	"CANCELLED",
]);

/*
pending -----  > appointment booked and slot alloted 
completed  ---- > userattended the appointment 
cancelled ------> provider has cancelled the appointment .
*/

```