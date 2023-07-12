import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

interface FormState {
  age: number;
  favoriteDrink: string;
}

export default function WatchDemo() {
  const { register, handleSubmit, watch } = useForm<FormState>();
  const onSubmit: SubmitHandler<FormState> = (data) => {
    return alert(JSON.stringify(data, null, 2));
  };

  const age = watch("age");

  return (
    <main className="p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="age" className="mr-3">
          Age
        </label>
        <Input
          type="number"
          id="age"
          name="age"
          ref={register({
            valueAsNumber: true,
          })}
        />
        {age > 21 && (
          <>
            <br />
            <label htmlFor="favoriteDrink" className="mr-3">
              Favorite Drink
            </label>
            <Input
              type="text"
              id="favoriteDrink"
              name="favoriteDrink"
              ref={register}
            />
          </>
        )}
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
