import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import clsx from "clsx";
import * as React from "react";
import { createPortal } from "react-dom";
import { NestedValue, SubmitHandler, useForm } from "react-hook-form";

// For some reason, as an interface,
// it can't be used as a generic argument to NestedValue.
// I have no idea why that would be.
type Preferences = {
  food: string;
  drink: string;
};

interface OuterFormState {
  name?: string;
  editingPreferences?: boolean;
  preferences?: NestedValue<Preferences>;
}

export default function NestedForms() {
  const { handleSubmit, register, errors, setValue, watch } =
    useForm<OuterFormState>();
  const onSubmit: SubmitHandler<OuterFormState> = (data) => {
    return alert(JSON.stringify(data, null, 2));
  };

  register(
    { name: "editingPreferences", type: "custom" },
    {
      validate: (value) => {
        if (value) {
          return "Please save or cancel your preferences before submitting.";
        }
      },
    }
  );
  register(
    { name: "preferences", type: "custom" },
    { required: "You must set your preferences" }
  );

  const isEditingPreferences = watch("editingPreferences");
  const preferences = watch("preferences");

  const preferencesError =
    errors.editingPreferences?.message ?? errors.preferences?.message;

  return (
    <main className="p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="name"
          className={clsx("mr-3", {
            "text-red-500": errors.name,
          })}
        >
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          errorState={Boolean(errors.name)}
          ref={register({ required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500 ml-2">{errors.name.message}</span>
        )}
        <br />
        <label
          className={clsx("mr-3", {
            "text-red-500": preferencesError,
          })}
        >
          Preferences
        </label>
        {!isEditingPreferences && (
          <PreferencesReadOnly
            food={preferences?.food}
            drink={preferences?.drink}
            onEdit={() => setValue("editingPreferences", true)}
          />
        )}
        {isEditingPreferences && (
          <PreferencesForm
            currentPreferences={preferences}
            onSave={(preferences) => {
              setValue("preferences", preferences);
              setValue("editingPreferences", false);
            }}
            onCancel={() => setValue("editingPreferences", false)}
          />
        )}
        {preferencesError && (
          <div className="text-red-500">{preferencesError}</div>
        )}
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </main>
  );
}

export function PreferencesReadOnly(props: {
  food?: string;
  drink?: string;
  onEdit: () => void;
}) {
  const { food, drink } = props;
  return (
    <div className="inline-block align-top">
      {food && (
        <div>
          <label className="font-bold">Food:</label> {food}
        </div>
      )}
      {drink && (
        <div>
          <label className="font-bold">Drink:</label> {drink}
        </div>
      )}
      <div>
        <button type="button" className="text-blue-500" onClick={props.onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}

interface PreferencesFormState {
  food?: string;
  drink?: string;
}

export function PreferencesForm(props: {
  currentPreferences: Preferences | undefined;
  onSave: (preferences: Preferences) => void;
  onCancel: () => void;
}) {
  const { handleSubmit, register, errors } = useForm<PreferencesFormState>({
    defaultValues: props.currentPreferences,
  });

  const onSubmit: SubmitHandler<PreferencesFormState> = (data) => {
    if (data.food && data.drink) {
      props.onSave({
        food: data.food,
        drink: data.drink,
      });
    }
  };

  return (
    <>
      {createPortal(
        // Forms can't be nested, so mount the form outside the document
        // and use `form="preferencesForm"` on the inputs to associate them
        <form
          id="preferencesForm"
          onSubmit={(e) => {
            e.stopPropagation();
            return handleSubmit(onSubmit)(e);
          }}
        />,
        document.body
      )}
      <div className="inline-block align-top">
        <label
          htmlFor="food"
          className={clsx("mr-3", {
            "text-red-500": errors.food,
          })}
        >
          Food
        </label>
        <Input
          type="text"
          id="food"
          form="preferencesForm"
          name="food"
          errorState={Boolean(errors.food)}
          ref={register({ required: true })}
        />
        {errors.food?.type === "required" && (
          <span className="text-red-500 ml-2">Required</span>
        )}
        <br />
        <label
          htmlFor="drink"
          className={clsx("mr-3", {
            "text-red-500": errors.drink,
          })}
        >
          Drink
        </label>
        <Input
          type="text"
          id="drink"
          form="preferencesForm"
          name="drink"
          errorState={Boolean(errors.drink)}
          ref={register({ required: true })}
        />
        {errors.drink?.type === "required" && (
          <span className="text-red-500 ml-2">Required</span>
        )}
        <br />
        <Button type="submit" form="preferencesForm">
          Save
        </Button>
        <button type="button" onClick={props.onCancel} className="ml-3">
          Cancel
        </button>
      </div>
    </>
  );
}
