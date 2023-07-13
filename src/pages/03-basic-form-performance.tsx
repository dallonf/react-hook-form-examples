import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { findFirstNPrimes } from "@/utils/primes";
import { useState } from "react";

export default function BasicFormWithPerformanceProblem() {
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

  const primes = findFirstNPrimes(2500);

  return (
    <main className="p-2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="mr-3">
          Email
        </label>
        <Input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <div className="text-xs mt-6">
          these are my favorite prime numbers: {primes.join(", ")}
        </div>
      </form>
    </main>
  );
}
