export type FormFieldTypes = "text" | "textarea" | "number" | "select" | "checkbox" | "radio" | "date" | "password"

type Option = {
  label: string;
  value: string;
};

type FormFieldBase = {
  fieldId: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  validation: null | {
    required: boolean;
    minLength: number;
    pattern: string;
    custom: (value: string) => string | null;
  };
};

type SelectField = FormFieldBase & {
  type: "select" | "radio";
  selectOptions: Option[];
};

type NonSelectField = FormFieldBase & {
  type: Exclude<FormFieldTypes, "select" | "radio">;
  selectOptions?: never;
};

export type FormField = SelectField | NonSelectField;
