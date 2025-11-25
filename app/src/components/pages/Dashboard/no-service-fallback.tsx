import { Button } from "@/components/ui/button";
import Link from "next/link";

const NoServiceFallback = () => {
  return (
    <div className="flex flex-col gap-[10px] justify-center items-center w-full h-full">
      <h1 className="text-3xl font-bold">No services found</h1>
      <Link href="/add-service">
        <Button>Create Your first service</Button>
      </Link>
    </div>
  );
};
export default NoServiceFallback;
