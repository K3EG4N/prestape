import { Form, Input } from "antd";
import type { TextAreaProps } from "antd/es/input";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormFooterError } from "./FormFooterError";
import { Field } from "../ui/Field";

interface FormTextAreaProps<T extends FieldValues> extends Omit<
  TextAreaProps,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rightlabel?: string | React.ReactNode;
  required?: boolean;
}

export function FormTextArea<T extends FieldValues>({
  name,
  control,
  label,
  rightlabel,
  required,
  onBlur,
  size = "large",
  autoSize = { minRows: 3, maxRows: 6 },
  ...textAreaProps
}: FormTextAreaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field label={label} rightlabel={rightlabel} required={required}>
          <Form.Item
            validateStatus={fieldState.error ? "error" : ""}
            help={<FormFooterError message={fieldState.error?.message} />}
            style={{ width: "100%" }}
          >
            <Input.TextArea
              {...textAreaProps}
              {...field}
              value={field.value ?? ""}
              onBlur={(event) => {
                field.onBlur();
                onBlur?.(event);
              }}
              size={size}
              autoSize={autoSize}
            />
          </Form.Item>
        </Field>
      )}
    />
  );
}
