import { Button } from "../../Button";
import PopupLayout from "../../PopupLayout";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { InputText, InputTextArea } from "../../FormInputs";
import Icons from "../../Icons";
import { DropDown } from "../../DropDown";
import { formTypeProp, useBoard } from "../../../context/BoardContext";
import { BoardSubtask, BoardTask } from "../../../types/generalTypes";

//@ts-expect-error imported library not supporting types.
import { v4 as createUUID } from "uuid";

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

  const handleDeleteTask = (index: number) => () => {
    remove(index);
  };

  const onSubmit: SubmitHandler<TaskFormFields> = (data) => {
    console.log(data, formType);
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
        <InputText
          register={register}
          label="title"
          placeholder="e.g. Take coffee break"
          required
          showError={Boolean(errors?.title)}
        />
        <InputTextArea
          register={register}
          label="description"
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
        />
        <div className="">
          <h3 className="text-primary text-sm mb-2">Subtasks</h3>
          <div className="grid gap-3 max-h-[10rem] overflow-y-auto">
            {fields.map((field, i) => {
              return (
                <section key={field.id} className="flex gap-4">
                  <InputText
                    disableLabelDisplay={true}
                    register={register}
                    label={`subtaskList.${i}.title`}
                    placeholder="e.g. Make coffee"
                    required
                    showError={Boolean(errors?.subtaskList?.[i]?.title?.type)}
                  />
                  <button onClick={handleDeleteTask(i)}>
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
          onClick={handleCreateTask}
        >
          + Add New Subtask
        </Button>
        <div>
          <h3 className="text-primary text-sm mb-2">Status</h3>
          <Controller
            control={control}
            name="status"
            defaultValue={formData?.status || statusList[0]}
            render={({ field: { onChange } }) => {
              return (
                <DropDown
                  onSelect={(data) => {
                    onChange(data);
                    console.log(data);
                  }}
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
