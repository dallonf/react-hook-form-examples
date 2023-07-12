import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { findFirstNPrimes } from "@/utils/primes";
import { useState } from "react";

interface FormState {
  email: string;
  favoriteFood: string;
}

export default function BasicFormPage() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    favoriteFood: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          value={formState.email}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <br />
        <label htmlFor="favoriteFood" className="mr-3">
          Favorite Food
        </label>
        <Input
          type="text"
          id="favoriteFood"
          value={formState.favoriteFood}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, favoriteFood: e.target.value }))
          }
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
