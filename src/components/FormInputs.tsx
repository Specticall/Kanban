import { capitalize } from "../helper/helper";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";

type InputTextProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  label: Path<T>;
  placeholder: string;
  className?: string;
  required?: boolean;
  showError?: boolean;
  labelDisplay?: string;
  disableLabelDisplay?: boolean;
};
export function InputText<T extends FieldValues>({
  label,
  labelDisplay = "",
  placeholder,
  register,
  required,
  className = "",
  showError = false,
  disableLabelDisplay = false,
}: InputTextProps<T>) {
  if (labelDisplay.length === 0) labelDisplay = label;

  return (
    <div className="flex flex-col gap-2 w-full">
      {disableLabelDisplay || (
        <label htmlFor={`text-input-${label}`} className="text-primary text-sm">
          {capitalize(labelDisplay)}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          {...register(`${label}` as const, {
            required,
          })}
          placeholder={placeholder}
          className={`${className} bg-elements border-[1px] w-full border-lines text-md px-4 py-2 rounded-md outline-none focus:border-purple placeholder:text-placeholder leading-6 ${
            showError ? "!border-red" : ""
          }`}
        />
        {showError && (
          <p className="absolute right-4 top-[50%] translate-y-[-50%] text-red text-md">
            Can't be empty
          </p>
        )}
      </div>
    </div>
  );
}
export function InputTextArea<T extends FieldValues>({
  label,
  placeholder,
  register,
  required,
  className = "",
  showError = false,
}: InputTextProps<T>) {
  return (
    <div className="flex flex-col gap-2 ">
      <label htmlFor={`text-input-${label}`} className="text-primary text-sm">
        {capitalize(label)}
      </label>
      <textarea
        {...register(label, { required })}
        placeholder={placeholder}
        className={`${className} bg-elements border-[1px] border-lines text-md px-4 py-2 rounded-md outline-none focus:border-purple resize-none placeholder:text-placeholder leading-6 ${
          showError ? "!border-red" : ""
        }`}
      ></textarea>
    </div>
  );
}
