import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction, useState } from "react";

export default function DeleteButton({ row }: any) {
  const [isopen, setIsopen] = useState(false);

  return (
    <>
      {/* render the Modal */}
      <DeleteModal isopen={isopen} setIsopen={setIsopen} row={row} />
      <Button
        variant="outline"
        onClick={() => {
          setIsopen(true);
        }}
      >
        <TrashIcon width={20} height={20} />
      </Button>
    </>
  );
}

export function DeleteModal({
  isopen,
  setIsopen,
  row,
}: {
  isopen: boolean;
  setIsopen: Dispatch<SetStateAction<boolean>>;
  row: any;
}) {
  const deleteData = useMutation(api.data.deleteData);
  return (
    <AlertDialog open={isopen} onOpenChange={setIsopen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            file.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            asChild
            onClick={() => {
              deleteData({ id: row });
              toast.success("deleted successfully");
            }}
          >
            <AlertDialogAction>Continue</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
