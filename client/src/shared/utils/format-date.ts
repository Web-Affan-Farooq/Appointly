import dayjs from "@/lib/dayjs";
import { TIMEZONE } from "../constants";

export const formatDate = (time: Date, format = "DD MMM YYYY") => {
  return dayjs(time).tz(TIMEZONE).format(format);
};
