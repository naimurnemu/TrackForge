import { FieldConfig } from "@/types";

export const sectionFormConfig: FieldConfig[] = [
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
    required: true,
  },
];

export const phaseFormConfig: FieldConfig[] = [
  {
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "Enter phase title",
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  {
    type: "select",
    name: "type",
    label: "Phase Type",
    placeholder: "Select phase type",
    options: ["Learn", "Practice", "Assessment"], 
    required: true,
  },
  {
    type: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Write a short description",
    minLength: 3,
    maxLength: 500,
    required: false,
  },
];

export const topicFormConfig: FieldConfig[] = [
  {
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "Enter topic title",
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  {
    type: "textarea",
    name: "description",
    label: "Details",
    placeholder: "Write a short details",
    minLength: 3,
    maxLength: 500,
    required: true,
  },
];

export const summaryFormConfig: FieldConfig[] = [
  {
    type: "text",
    name: "timeSpentMinutes",
    label: "Time Spent",
    placeholder: "Enter time spent in minutes",
    pattern: /^[0-9]+$/, 
    required: true,
  },
   {
    type: "textarea",
    name: "summary",
    label: "Summary",
    placeholder: "Write a short summary",
    minLength: 50,
    maxLength: 300,
    required: true,
  },
];

