import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field } from "../ui/Field";
import { Form, Select, type SelectProps } from "antd";
import { FormFooterError } from "./FormFooterError";

interface FormSelectProps<T extends FieldValues> extends Omit<
  SelectProps,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
  options: { label: string; value: string | number }[];
  label: string;
  required?: boolean;
}

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  size = "large",
  options,
  ...selectProps
}: FormSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field label={label} required={required}>
          <Form.Item
            validateStatus={fieldState.error ? "error" : ""}
            help={<FormFooterError message={fieldState.error?.message} />}
            style={{ width: "100%" }}
          >
            <Select {...field} {...selectProps} size={size} options={options} />
          </Form.Item>
        </Field>
      )}
    />
  );
};
