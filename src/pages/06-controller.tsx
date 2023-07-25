import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

interface FormState {
  favoriteFood: string;
}

export default function ControllerDemo() {
  const { handleSubmit, control } = useForm<FormState>();
  const onSubmit: SubmitHandler<FormState> = (data) => {
    return alert(JSON.stringify(data, null, 2));
  };

  return (
    <main className="p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="favoriteFood" className="mr-3">
          Favorite Food
        </label>
        <Controller
          control={control}
          name="favoriteFood"
          render={(props) => (
            <Input
              type="text"
              id="favoriteFood"
              name={props.name}
              ref={props.ref}
              value={props.value ?? ""}
              onChange={props.onChange}
              onBlur={props.onBlur}
              // or {...props}
              // I just spelled it out so you can see what sort of props are passed
            />
          )}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
}
