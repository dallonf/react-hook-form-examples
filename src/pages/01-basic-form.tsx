import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";

export default function BasicFormPage() {
  const [email, setEmail] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      JSON.stringify(
        {
          email,
          favoriteFood,
        },
        null,
        2
      )
    );
  };

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
      </form>
    </main>
  );
}
