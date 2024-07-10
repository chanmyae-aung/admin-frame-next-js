// FormComponents.tsx
import * as React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext
} from "react-hook-form";
import { TextFieldProps as CustomTextFieldProps } from "../inputs/TextField";
import { cn } from "@/utils/cn";
import TextField from "../inputs/TextField"; // Import your custom TextField
import { forwardRef } from "react";
import {
  FormControl as MUIFormControl,
  FormHelperText,
  InputLabel
} from "@mui/material";
import { Icons } from "../images/Icons";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    ...fieldState
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();
  const { error } = useFormField();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className="mb-8">
        <div ref={ref} className={cn("space-y-1", className)} {...props} />
        {error && (
          <div className="text-xs text-red-600 flex items-center mt-1">
            <div className="me-1">
              <Icons.error />
            </div>
            {error?.message}
          </div>
        )}
      </div>
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<typeof InputLabel>
>(({ className, ...props }, ref) => {
  const { error } = useFormField();
  return (
    <InputLabel
      ref={ref}
      className={cn(error && "text-destructive", className)}
      error={!!error}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

export { Form, FormField, FormItem, FormLabel, useFormField };
