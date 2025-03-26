import { useFormContext } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const COMPANY = ["Google", "Apple", "Microsoft"];
const CONTACT = ["Support", "Sales", "HR"];
const COUNTRY = ["USA", "Canada", "Germany"];

const CustomForm = () => {
  const form = useFormContext();

  const renderSelectField = (name: any, label: string, options: string[]) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );

  return (
    <div className="flex space-x-4 items-end">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      {renderSelectField("company", "Company", COMPANY)}
      {renderSelectField("contact", "Contact", CONTACT)}
      {renderSelectField("country", "Country", COUNTRY)}
      <Button type="button" className="flex-1" onClick={() => form.reset()}>
        Reset Form
      </Button>
    </div>
  );
};

export default CustomForm;
