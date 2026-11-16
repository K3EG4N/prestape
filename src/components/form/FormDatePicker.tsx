import { DatePicker, Form, type DatePickerProps } from "antd";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormFooterError } from "./FormFooterError";
import { Field } from "../ui/Field";

interface FormDatePickerProps<T extends FieldValues> extends Omit<
  DatePickerProps,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
}

export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  size = "large",
  ...datePickerProps
}: FormDatePickerProps<T>) => {
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
            <DatePicker
              {...datePickerProps}
              value={field.value ?? null}
              placeholder=""
              onChange={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              size={size}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Field>
      )}
    />
  );
};
