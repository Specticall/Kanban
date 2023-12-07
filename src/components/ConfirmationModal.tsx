import { Button } from "./Button";
import PopupLayout from "./PopupLayout";

interface ConfirmationModalProps {
  onAccept: () => void;
  onReject: () => void;
  headingText: string;
  paragraphText: string;
}

const defaultHeadingText = "Delete this Task?";

const defaultParagraphText =
  "Are you sure you want to delete the [NAME] task and its subtaks? the action cannot be reversed.";

export function ConfirmationModal({
  onAccept: handleAccept,
  onReject: handleReject,
  headingText = defaultHeadingText,
  paragraphText = defaultParagraphText,
}: ConfirmationModalProps) {
  return (
    <PopupLayout onClose={handleReject}>
      <div className="bg-elements max-w-[34rem] p-8 rounded-lg grid gap-6">
        <h2 className="text-lg text-red font-bold">{headingText}</h2>
        <p className="text-md text-secondary">{paragraphText}</p>
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="w-full text-md [&]:py-3"
            buttonType="destructive"
            onClick={handleAccept}
          >
            Delete
          </Button>
          <Button
            className="w-full text-md [&]:py-3"
            buttonType="secondary"
            onClick={handleReject}
          >
            Cancel
          </Button>
        </div>
      </div>
    </PopupLayout>
  );
}
