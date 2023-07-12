import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { EMAIL_REGEX } from "@/utils/validation";
import clsx from "clsx";
import { findFirstNPrimes } from "@/utils/primes";

interface FormState {
  email: string;
  favoriteFood: string;
}

export default function ReactHookFormStressTest() {
  const { register, handleSubmit, errors } = useForm<FormState>();
  const onSubmit: SubmitHandler<FormState> = (data) => {
    return alert(JSON.stringify(data, null, 2));
  };

  const primes = findFirstNPrimes(2500);

  return (
    <main className="p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="email"
          className={clsx("mr-3", {
            "text-red-500": errors.email,
          })}
        >
          Email
        </label>
        <Input
          type="text"
          id="email"
          name="email"
          errorState={Boolean(errors.email)}
          ref={register({ required: true, pattern: EMAIL_REGEX })}
        />
        {errors.email?.type === "required" && (
          <span className="text-red-500 ml-2">Email is required</span>
        )}
        {errors.email?.type === "pattern" && (
          <span className="text-red-500 ml-2">
            Email must be a valid format
          </span>
        )}
        <br />
        <label htmlFor="favoriteFood" className="mr-3">
          Favorite Food
        </label>
        <Input
          type="text"
          id="favoriteFood"
          name="favoriteFood"
          ref={register}
        />
        <br />
        <Button type="submit">Submit</Button>
        <div className="text-xs mt-6">
          these are my favorite prime numbers: {primes.join(", ")}
        </div>
      </form>
    </main>
  );
}
