import { capitalize } from "../helper/helper";
import {
  UseFormRegister,
  Path,
  FieldValues,
  Controller,
} from "react-hook-form";
import { FormInputListType } from "./Board/BoardComponents/TaskForm";
import { Button } from "./Button";
import Icons from "./Icons";
import { ColorPickerInput } from "./ColorPicker";

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
          {...register(`${label}` as Path<T>, {
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

export function FormInputList<T extends FieldValues>({
  fields,
  register,
  showErrors,
  onAppend,
  onRemove,
  colorPicker = false,
  control,
  colorPickerLabel,
  label: formLabel,
  formOptions: { heading = "", appendButtonText = "" },
}: FormInputListType<T>) {
  if (colorPicker && !colorPickerLabel) {
    throw new Error(
      "Form Input List has color picker enabled but no color picker label was provided"
    );
  }

  return (
    <>
      <div className="relative">
        <h3 className="text-primary text-sm mb-2">{heading}</h3>
        <div className="grid gap-3 max-h-[10rem] overflow-y-auto ">
          {fields.map((field, i) => {
            return (
              <section
                key={field.id}
                className="flex gap-4 items-center justify-center "
              >
                <InputText
                  disableLabelDisplay={true}
                  register={register}
                  label={formLabel(i)}
                  placeholder="e.g. Make coffee"
                  required
                  showError={showErrors(i)}
                />
                {colorPicker && colorPickerLabel && (
                  <Controller
                    control={control}
                    name={colorPickerLabel(i)}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <ColorPickerInput
                          identifier={`color-picker-form-${i}`}
                          onSelectColor={onChange}
                          color={value}
                          style={{ height: "1.25rem", width: "1.25rem" }}
                          colorPickerStyle={{
                            right: "6rem",
                            left: "initial",
                            top: "0rem",
                          }}
                        />
                      );
                    }}
                  />
                )}
                <button onClick={() => onRemove(i)}>
                  <Icons iconType="cross" />
                </button>
              </section>
            );
          })}
        </div>
      </div>
      <Button
        className="text-md [&]:py-2"
        buttonType="secondary"
        onClick={onAppend}
      >
        {appendButtonText}
      </Button>
    </>
  );
}
