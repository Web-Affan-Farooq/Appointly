import dayjs from "@/lib/dayjs";

export class Logger {
  date: string;
  location: string;

  constructor(location: string) {
    this.date = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.location = location;
  }
  // biome-ignore   lint/suspicious/noExplicitAny:err can be of different types
  error(details: any) {
    const data = {
      date: this.date,
      location: this.location,
      details: details,
    };
    console.log(JSON.stringify(data));
  }
}
