import { FieldConfig } from "@/types";

export const sectionForms: FieldConfig[] = [
  {
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "Enter objective name",
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  {
    type: "text",
    name: "target",
    label: "Target",
    placeholder: "Note learning Target",
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  {
    type: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Briefly describe about this objective",
    minLength: 10,
    maxLength: 500,
    required: false,
  },
];
