import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { EMAIL_REGEX } from "@/utils/validation";
import clsx from "clsx";
import { useState } from "react";

export default function BasicFormWithValidation() {
  const [email, setEmail] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formState = {
      email,
      favoriteFood,
    };
    alert(JSON.stringify(formState, null, 2));
  };

  let emailError: string | undefined = undefined;
  if (!email.length) {
    emailError = "Email is required";
  } else if (email.match(EMAIL_REGEX) === null) {
    emailError = "Email must be a valid format";
  }

  return (
    <main className="p-2">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className={clsx("mr-3", {
            "text-red-500": emailError,
          })}
        >
          Email
        </label>
        <Input
          type="text"
          id="email"
          errorState={Boolean(emailError)}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span className="text-red-500 ml-2">{emailError}</span>}
        <br />
        <label htmlFor="favoriteFood" className="mr-3">
          Favorite Food
        </label>
        <Input
          type="text"
          id="favoriteFood"
          value={favoriteFood}
          onChange={(e) => setFavoriteFood(e.target.value)}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
