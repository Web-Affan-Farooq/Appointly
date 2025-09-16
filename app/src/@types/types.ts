import { Service } from "@/db/schemas"

type ServiceData = Service & {
    appointments:[],
}

export type {
    ServiceData
}