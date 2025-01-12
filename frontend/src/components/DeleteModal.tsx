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

const DeleteModal = ({ open, close, handleDelete, message }: any) => {
  return (
    <AlertDialog open={open} onOpenChange={close}>
      {/* <AlertDialogTrigger asChild>{children}</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <div className="py-4">
            <CircleAlert className="h-20 w-20 mx-auto" />
          </div>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {message} and remove your data from our servers.
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

// onOpenChange={closeModal}

// {
//     children: any;
//     type: string;
//     handleDelete: () => Promise<void>;
//   }
