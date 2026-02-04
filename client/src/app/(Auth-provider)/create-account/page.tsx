import { ProviderSignupForm } from "./ProviderSignupForm";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-[100px] h-screen">
      <div className="w-[350px]">
        <ProviderSignupForm />
      </div>
      <div className="flex flex-col flex-nowrap justify-center items-center w-[500px] h-[500px]">
        <Image
          src="/images/create-account.svg"
          alt="Image"
          width={450}
          height={450}
          className="object-cover w-auto h-auto m-auto"
        />
      </div>
    </div>
  );
}
