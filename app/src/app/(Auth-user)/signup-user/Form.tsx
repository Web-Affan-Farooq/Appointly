"use client";
// _____ Components ...
import Link from "next/link";
import {
  PasswordInput,
  Loader,
  Input,
  Label,
  Button,
} from "@/components/common";
import Image from "next/image";
// _____ Libraries ...
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// _____ Types ...
import { UserSignupFormSchema } from "./_schema/user-signup";
// _____ Hooks ...
import { useForm } from "react-hook-form";
// _____ actions ...
import { signUpWithGoogle, signupWithEmail } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSignupFormSchema),
    mode: "onChange",
  });

  const signup = async (formData: z.infer<typeof UserSignupFormSchema>) => {
    const { message, statusCode } = await signupWithEmail(formData);
    if (statusCode === 201) {
      toast.success(message);
      router.push("/account");
    } else if (statusCode === 422) {
      toast.success("Account already exists");
    } else if (statusCode === 500) {
      toast.success("An error occured");
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(signup)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Get started </h1>
        <p className="text-muted-foreground text-sm">
          Browse variety of best selling services and providers
          <strong className="text-pink font-bold">&nbsp; Appointly</strong>
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="name"
            placeholder="John doe"
            required
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <PasswordInput id="password" required {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`flex justify-center items-center ${isSubmitting ? "bg-pink/50 cursor-not-allowed py-[20px]" : "cursor-pointer"}`}
        >
          {isSubmitting ? (
            <>
              <span>Please wait</span> <Loader />
            </>
          ) : (
            <span>Signup</span>
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <SocialButtons />
      </div>
      <div className="text-center text-sm">
        Already have an account?
        <Link href="/login" className="text-pink font-bold">
          &nbsp; Login
        </Link>
      </div>
    </form>
  );
};

/* ____ Social icons for OAuth */
const icons = [
  {
    name: "Google",
    image: "/icons/google.svg",
    function: signUpWithGoogle,
  },
];
const SocialButtons = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      {icons.map((icon) => (
        <div
          key={icon.name}
          className="border border-gray-300 p-1 rounded-md"
          onClick={() => icon.function()}
        >
          <Image
            src={icon.image}
            alt={icon.name}
            width={48}
            height={48}
            className="w-[25px] h-[25px]"
          />
        </div>
      ))}
    </div>
  );
};

export default Form;
