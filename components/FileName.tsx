import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function FileName({ file }: { file: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const updateData = useMutation(api.data.updateData);

  function updateName(newname: string) {
    updateData({ id: file._id, Filename: newname });
  }
  return (
    <>
      <UpdateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        updateName={updateName}
      />
      <p
        className="flex gap-2 items-center text-blue-300 cursor-pointer underline"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {file.Filename}
        <Pencil width={15} height={15} />
      </p>
    </>
  );
}

export function UpdateModal({ isOpen, setIsOpen, updateName }: any) {
  const [text, setText] = useState("");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your file</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Button
            className="w-full mt-3"
            onClick={() => {
              updateName(text);
              setText("");
              setIsOpen(false);
            }}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
