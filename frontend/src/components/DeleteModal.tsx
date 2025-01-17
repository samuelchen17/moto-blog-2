import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  //   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleAlert } from "lucide-react";

const DeleteModal = ({
  open,
  close,
  handleDelete,
  message,
  confirm,
}: {
  open: boolean;
  close: () => void;
  handleDelete: () => Promise<void>;
  message?: string;
  confirm?: boolean;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={close}>
      {/* <AlertDialogTrigger asChild>{children}</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {confirm ? "Confirm changes" : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <div className="py-4">
            <CircleAlert className="h-20 w-20 mx-auto" />
          </div>
          <AlertDialogDescription>
            {confirm
              ? "Please confirm changes by pressing continue"
              : `This action cannot be undone. This will permanently delete ${message}
            .`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
