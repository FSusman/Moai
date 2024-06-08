import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const CodingDialog = ({ triggerRef }) => {
  const handleCodingCompletion = async (e) => {
    e.preventDefault();

    const codingTime = e.target.codingTime.value;
    const description = e.target.description.value;

    if (!description || !codingTime) {
      toast("Incomplete form", {
        description: "Please fill the entire form! ",
      });
      return;
    }

    await axios.post("http://localhost:3000/api/tasks", {
      taskType: "coding",
      codingTime: codingTime.toString(),
      description: description,
    });

    e.target.description.value = "";
    e.target.codingTime.value = "";

    triggerRef.current.click();

    toast("Task completed successfully", {
      description: "Coding task was successfully completed",
    });
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef}></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => handleCodingCompletion(e)}>
          <DialogHeader>
            <DialogTitle>Complete Coding Task</DialogTitle>
            <DialogDescription>
              Write a description of what you coded today and also enter the
              time spent.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="col-span-4">
              <Label htmlFor="description" className="block text-left">
                What did you write today?
              </Label>
              <Input
                autoComplete="off"
                id="description"
                className="w-full mt-2"
                name="description"
              />
            </div>
            <div className="col-span-4">
              <Label htmlFor="codingTime" className="block text-left">
                How long did you code?
              </Label>
              <Input
                autoComplete="off"
                id="codingTime"
                className="w-full mt-2"
                type="number"
                name="codingTime"
              />
            </div>
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CodingDialog;
