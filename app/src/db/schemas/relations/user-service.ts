import { relations } from "drizzle-orm";
import { service } from "../tables/services";
import {user} from "../tables/users";

export const userToServiceRelation =relations(user, ({many}) => (
    {
        services:many(service)
    }
));

export const serviceRelationWithUser = relations(service, ({one}) => ({
    user:one(user, {
        fields:[service.user_id],
        references:[user.id]
    })
}))