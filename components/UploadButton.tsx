import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export default function UploadButton() {
  const [file, setFile] = useState<File | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmiting, setISubmiting] = useState(false);

  const generateUploadUrl = useMutation(api.data.generateUploadUrl);
  const createData = useMutation(api.data.createData);
  const { user } = useUser();

  async function onSubmit() {
    if (file === undefined) return;

    try {
      console.log(file);
      setISubmiting(true);
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file!.type },
        body: file,
      });
      const { storageId } = await result.json();

      createData({
        Filename: file.name,
        fileId: storageId,
        size: file.size,
        type: file.type,
        userId: user?.id,
      });

      toast.success("Successfully created!");
    } catch (error) {
      toast.error("error occured!");
    } finally {
      setISubmiting(false);
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your file</DialogTitle>
        </DialogHeader>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (file === undefined) return;
              onSubmit();
            }}
          >
            <Input
              type="file"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
            />
            <Button className="w-full mt-3" disabled={isSubmiting}>
              {isSubmiting && <LoaderCircle className="animate-spin mr-2" />}
              Submit
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
