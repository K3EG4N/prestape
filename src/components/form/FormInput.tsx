import { Form, Input } from "antd";
import type { InputProps } from "antd";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormFooterError } from "./FormFooterError";
import { Field } from "../ui/Field";

interface FormInputProps<T extends FieldValues> extends Omit<
  InputProps,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  password?: boolean;
  rightlabel?: string | React.ReactNode;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  password,
  size = "large",
  ...inputProps
}: FormInputProps<T>) {
  const Component = password ? Input.Password : Input;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field label={label} rightlabel={inputProps.rightlabel}>
          <Form.Item
            validateStatus={fieldState.error ? "error" : ""}
            help={<FormFooterError message={fieldState.error?.message} />}
            style={{ width: "100%" }}
          >
            <Component {...inputProps} {...field} size={size} />
          </Form.Item>
        </Field>
      )}
    />
  );
}
