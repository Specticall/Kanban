import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useBoard } from "../../../context/BoardContext";
import { BoardData } from "../../../types/generalTypes";
import PopupLayout from "../../PopupLayout";
import { FormInputList, InputText } from "../../FormInputs";
import { Button } from "../../Button";
import { BoardFormProps } from "./Board";

type BoardFormFields = BoardData;

const formTypeDisplay: Record<string, { title: string; button: string }> = {
  "create/board": {
    title: "Add New Board",
    button: "Create New Board",
  },
  "edit/board": {
    title: "Edit Board",
    button: "Save Changes",
  },
};

export function BoardForm({ formType, formData }: BoardFormProps) {
  const { dispatch } = useBoard();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BoardFormFields>({
    defaultValues: {
      name: formData?.name || "",
      columns: formData?.columns || [{ name: "", tasks: [] }],
    },
    shouldUseNativeValidation: false,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const handleCreateTask = () => {
    append({
      name: "",
      tasks: [],
    });
  };

  const handleDeleteTask = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<BoardFormFields> = (data) => {
    switch (formType) {
      case "create/board":
        dispatch({ type: "form/submit/add/board", payload: data });
        break;
      case "edit/board":
        // dispatch({ type: "form/submit/edit/board", payload: data });
        break;
      default:
        throw new Error(
          "Board form submit handler type not specified, formType most likely went wrong!"
        );
    }
  };

  return (
    <PopupLayout onClose={() => dispatch({ type: "form/close" })}>
      <form
        className="bg-elements p-8 rounded-lg text-primary grid gap-6 w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
        id="new Task"
      >
        <h2 className="text-lg font-bold">{formTypeDisplay[formType].title}</h2>
        <InputText<BoardFormFields>
          register={register}
          label="name"
          placeholder="e.g. Web Development"
          required
          showError={Boolean(errors?.name)}
        />
        <FormInputList<BoardFormFields>
          fields={fields}
          register={register}
          showErrors={(i) => Boolean(errors?.columns?.[i])}
          onAppend={handleCreateTask}
          onRemove={handleDeleteTask}
          label={(i) => `columns.${i}.name`}
          formOptions={{
            heading: "Board Columns",
            appendButtonText: "+ Add New Column",
          }}
        />
        <Button className="text-md [&]:py-2" htmlType="submit">
          {formTypeDisplay[formType].button}
        </Button>
      </form>
    </PopupLayout>
  );
}
