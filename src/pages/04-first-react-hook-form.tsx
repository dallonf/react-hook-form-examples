import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

interface FormState {
  email?: string;
  favoriteFood?: string;
}

export default function BasicReactHookForm() {
  const { register, handleSubmit } = useForm<FormState>();
  const onSubmit: SubmitHandler<FormState> = (data) => {
    return alert(JSON.stringify(data, null, 2));
  };

  return (
    <main className="p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="mr-3">
          Email
        </label>
        <Input type="text" id="email" name="email" ref={register()} />
        <br />
        <label htmlFor="favoriteFood" className="mr-3">
          Favorite Food
        </label>
        <Input
          type="text"
          id="favoriteFood"
          name="favoriteFood"
          ref={register()}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
