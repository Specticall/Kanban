import { Button } from "../../Button";
import PopupLayout from "../../PopupLayout";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { InputText, InputTextArea } from "../../FormInputs";
import Icons from "../../Icons";
import { DropDown } from "../../DropDown";
import { useBoard } from "../../../context/BoardContext";

export type TaskFormFields = {
  title: string;
  description: string;
  subtaskList: {
    title: string;
  }[];
};

export function TaskForm({ type = "Add" }: { type: string }) {
  const { boardData } = useBoard();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormFields>({
    defaultValues: {
      title: "",
      description: "",
      subtaskList: [{ title: "" }],
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
    });
  };

  const handleDeleteTask = (index: number) => () => {
    remove(index);
  };

  const onSubmit: SubmitHandler<TaskFormFields> = (data) => {
    console.log(data);
  };

  const statusList = boardData?.columns.map((column) => column.name) || [];

  return (
    <PopupLayout onClose={() => {}}>
      <form
        className="bg-elements p-8 rounded-lg text-primary grid gap-6 w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
        id="new Task"
      >
        <h2 className="text-lg font-bold">{type} New Task</h2>
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
          <DropDown
            onSelect={(data) => {
              console.log(data);
            }}
            optionList={statusList}
            value={statusList[0]}
          />
        </div>
        <Button className="text-md [&]:py-2" htmlType="submit">
          Create Task
        </Button>
      </form>
    </PopupLayout>
  );
}
