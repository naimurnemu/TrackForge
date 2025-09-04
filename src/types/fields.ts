export type TextLikeField = {
  type: "text" | "textarea";
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (val: string) => string | null;
};

export type CheckboxField = {
  type: "checkbox";
  name: string;
  label: string;
  required?: boolean;
};

export type RadioField = {
  type: "radio";
  name: string;
  label: string;
  options: string[];
  required?: boolean;
};

export type SelectField = {
  type: "select";
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
};

export type FieldConfig = TextLikeField | CheckboxField | RadioField | SelectField;
