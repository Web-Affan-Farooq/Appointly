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
// _____ Libraries ...
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
// _____ Types ...
import {
  SignupAPIRequestSchema,
  SignupAPIResponseSchema,
} from "./_validations/provider-signup";
// _____ Hooks ...
import { useForm } from "react-hook-form";
// _____ actions ...
import { useState } from "react";

// ____ Constant data ...
import CountriesData from "@/data/countries.json";

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupAPIRequestSchema),
    mode: "onChange",
  });

  const signup = async (formData: z.infer<typeof SignupAPIRequestSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/accounts/create", formData);
      const { data }: { data: z.infer<typeof SignupAPIResponseSchema> } =
        response;
      window.document.location.href = data.url;
    } catch (err) {
      console.log(err);
      alert("An error occured while creating account");
    }
    setLoading(false);
  };

  return (
    <form
      className={"flex flex-col gap-6"}
      onSubmit={handleSubmit(signup)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Get started with
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
        <div className="grid gap-3">
          <Label htmlFor="Select your country">Select Country</Label>
          <select
            id="country"
            className="text-sm px-[10px] py-[5px] shadow-md shadow-gray-400"
            {...register("country")}
          >
            {CountriesData.map((country, idx) => (
              <option value={country.code} key={idx}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p>{errors.country.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={`${loading ? "bg-pink/50 cursor-not-allowed" : ""}`}
        >
          {loading ? (
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
      </div>
      <div className="text-center text-sm">
        Already have an account?
        <Link href="/login" className="text-pink font-bold">
          &nbsp; Login
        </Link>
      </div>
    </form>
  );
}
export default SignupForm;
