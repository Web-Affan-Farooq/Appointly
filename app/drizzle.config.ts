import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	out: './drizzle',
	// schema: './src/db/schema.ts',
	schema: [
		'./src/db/schemas/users.ts',
		'./src/db/schemas/services.ts',
		'./src/db/schemas/plan.ts',
		'./src/db/schemas/relations/user-service.ts',
	],
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
})
