"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldConfig } from "@/types";
import { useState } from "react";

interface ContentModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  title: string;
  description?: string;
  fields: FieldConfig[];
  defaultValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
};

export function ContentModal({
  open,
  setOpen,
  title,
  description,
  fields,
  defaultValues = {},
  onSubmit,
}: ContentModalProps) {
  const [values, setValues] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const handleChange = (name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateField = (field: FieldConfig, value: any) => {
    if (field.type === "text" || field.type === "textarea") {
      if (field.required && !value)
        return `${field.label} is required`;
      if (field.minLength && value.length < field.minLength)
        return `${field.label} must be at least ${field.minLength} characters`;
      if (field.maxLength && value.length > field.maxLength)
        return `${field.label} must be at most ${field.maxLength} characters`;
      if (field.pattern && !field.pattern.test(value))
        return `${field.label} is invalid`;
    }

    if (field.type === "checkbox" && field.required && !value)
      return `${field.label} is required`;

    if (field.type === "radio" && field.required && !value)
      return `Select one option for ${field.label}`;

    if (field.type === "select" && field.required && !value)
      return `Select one option for ${field.label}`;

    return null;
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const error = validateField(field, values[field.name]);
      if (error) newErrors[field.name] = error;
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((field) => {
            const error = errors[field.name];
            const value = values[field.name];

            switch (field.type) {
              case "text":
                return (
                  <div className="space-y-1" key={field.name}>
                    <Label htmlFor={field.name}>
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      defaultValue={value ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) => handleChange(field.name, event.target.value)}
                    />
                    {error && (
                      <p className="text-sm text-destructive text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                )

              case "textarea":
                return (
                  <div className="space-y-1" key={field.name}>
                    <Label htmlFor={field.name}>
                      {field.label}
                    </Label>
                    <Textarea
                      className="resize-none"
                      id={field.name}
                      defaultValue={value ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) => handleChange(field.name, event.target.value)}
                      rows={5}
                    />
                    {error && (
                      <p className="text-sm text-destructive text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                )

              case "checkbox":
                return (
                  <div className="space-x-2" key={field.name}>
                    <Checkbox
                      id={field.name}
                      checked={value}
                      onCheckedChange={(checked) =>
                        handleChange(field.name, checked)
                      }
                    />
                    <Label htmlFor={field.name}>
                      {field.label}
                    </Label>
                    {error && (
                      <p className="text-sm text-destructive text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                )

              case "radio":
                return (
                  <div className="space-y-1" key={field.name}>
                    <RadioGroup value={value} onValueChange={(value) => handleChange(field.name, value)}>
                      <div className="flex items-center space-x-2">
                        {field.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem key={option} value={option} id={option} />
                            <Label htmlFor={option}>
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                    <Label htmlFor={field.name}>
                      {field.label}
                    </Label>
                    {error && (
                      <p className="text-sm text-destructive text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                )

              case "select":
                return (
                  <div className="space-y-1" key={field.name}>
                    <Select onValueChange={(value) => handleChange(field.name, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label htmlFor={field.name}>
                      {field.label}
                    </Label>
                    {error && (
                      <p className="text-sm text-destructive text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                )

              default:
                return null
            }
          })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}