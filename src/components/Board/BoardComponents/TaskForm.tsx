import { Button } from "../../Button";
import PopupLayout from "../../PopupLayout";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
  FieldArrayWithId,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";
import { InputText, InputTextArea } from "../../FormInputs";
import Icons from "../../Icons";
import { DropDown } from "../../DropDown";
import { formTypeProp, useBoard } from "../../../context/BoardContext";
import { BoardSubtask, BoardTask } from "../../../types/generalTypes";

//@ts-expect-error imported library not supporting types.
import { v4 as createUUID } from "uuid";
import { Path } from "react-router-dom";

export type TaskFormFields = {
  title: string;
  description: string;
  subtaskList: BoardSubtask[];
  status: string;
  id: string;
};

type TaskFormProps = {
  formType: formTypeProp;
  formData: BoardTask | undefined;
};

type formDisplay = {
  title: string;
  button: string;
};

const formTypeDisplay: Record<string, formDisplay> = {
  "create/task": {
    title: "Add New Task",
    button: "Create Task",
  },
  "edit/task": {
    title: "Edit Task",
    button: "Save Changes",
  },
};

export function TaskForm({ formType, formData }: TaskFormProps) {
  const { boardData, dispatch } = useBoard();

  const statusList = boardData?.columns.map((column) => column.name) || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormFields>({
    defaultValues: {
      title: formData?.title || "",
      description: formData?.description || "",
      subtaskList: formData?.subtasks.filter((subtask) => subtask.title) || [
        { title: "", isCompleted: false, id: createUUID() },
      ],
      status: formData?.status || statusList[0],
      id: formData?.id || createUUID(),
    },
    shouldUseNativeValidation: false,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtaskList",
  });

  const handleCreateTask = () => {
    append({
      title: "",
      isCompleted: false,
      id: createUUID(),
    });
  };

  const handleDeleteTask = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<TaskFormFields> = (data) => {
    const newTask = {
      description: data.description,
      id: data.id,
      status: data.status,
      subtasks: data.subtaskList,
      title: data.title,
    };
    dispatch({ type: "form/submit/task", payload: newTask });
  };

  return (
    <PopupLayout onClose={() => dispatch({ type: "form/close" })}>
      <form
        className="bg-elements p-8 rounded-lg text-primary grid gap-6 w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
        id="new Task"
      >
        <h2 className="text-lg font-bold">{formTypeDisplay[formType].title}</h2>
        <InputText<TaskFormFields>
          register={register}
          label="title"
          placeholder="e.g. Take coffee break"
          required
          showError={Boolean(errors?.title)}
        />
        <InputTextArea<TaskFormFields>
          register={register}
          label="description"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
        />
        <FormInputList<TaskFormFields>
          fields={fields}
          register={register}
          showErrors={(i) => Boolean(errors?.subtaskList?.[i]?.title?.type)}
          onAppend={handleCreateTask}
          onRemove={handleDeleteTask}
          label={(i) => `subtaskList.${i}.title`}
          formOptions={{
            heading: "Subtasks",
            appendButtonText: "+ Add New Subtask",
          }}
        />
        <div>
          <h3 className="text-primary text-sm mb-2">Status</h3>
          <Controller
            control={control}
            name="status"
            defaultValue={formData?.status || statusList[0]}
            render={({ field: { onChange } }) => {
              return (
                <DropDown
                  onSelect={(data) => onChange(data)}
                  optionList={statusList}
                  value={formData?.status || statusList[0]}
                />
              );
            }}
          />
        </div>
        <Button className="text-md [&]:py-2" htmlType="submit">
          {formTypeDisplay[formType].button}
        </Button>
      </form>
    </PopupLayout>
  );
}

type FormInputListType<T extends FieldValues> = {
  fields: FieldArrayWithId<T>;
  register: UseFormRegister<T>;
  showErrors: (index: number) => boolean;
  label: (index: number) => string;
  onAppend: () => void;
  onRemove: (index: number) => Path;
  formOptions: {
    heading: string;
    appendButtonText: string;
  };
};

function FormInputList<T extends FieldValues>({
  fields,
  register,
  showErrors,
  onAppend,
  onRemove,
  label: formLabel,
  formOptions: { heading = "", appendButtonText = "" },
}: FormInputListType<T>) {
  return (
    <>
      <div className="">
        <h3 className="text-primary text-sm mb-2">{heading}</h3>
        <div className="grid gap-3 max-h-[10rem] overflow-y-auto">
          {fields.map((field, i) => {
            return (
              <section key={field.id} className="flex gap-4">
                <InputText
                  disableLabelDisplay={true}
                  register={register}
                  label={formLabel(i)}
                  placeholder="e.g. Make coffee"
                  required
                  showError={showErrors(i)}
                />
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
