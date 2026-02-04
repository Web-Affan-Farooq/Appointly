import Image from "next/image";
import { LoginForm } from "./Form";

const LoginPage = () => {
  return (
    <div className="py-[100px] flex flex-row flex-wrap justify-center items-center gap-[100px] h-screen">
      <div className="w-[350px]">
        <LoginForm />
      </div>
      <div className="flex flex-col flex-nowrap justify-center items-center w-[500px] h-[500px]">
        <Image
          src="/images/signup.svg"
          alt="Image"
          width={450}
          height={450}
          className="object-cover w-auto h-auto m-auto"
        />
      </div>
    </div>
  );
};
export default LoginPage;
