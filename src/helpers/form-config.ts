import { FieldConfig } from "@/types";

export const sectionForms: FieldConfig[] = [
  {
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "Enter section name",
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  {
    type: "text",
    name: "target",
    label: "Target",
    placeholder: "Note your learning Target",
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  {
    type: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Briefly describe this",
    minLength: 10,
    maxLength: 500,
    required: true,
  },
];
