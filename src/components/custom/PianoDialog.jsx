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
import React from "react";

const PianoDialog = ({ triggerRef }) => {
  const handlePianoCompletion = async (e) => {
    e.preventDefault();

    const description = e.target.description.value;
    const courseProgress = e.target.courseProgress.value;

    if (!description || !courseProgress) {
      toast("Incomplete form", {
        description: "Please fill the entire form!",
      });
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/tasks", {
        description: description,
        courseProgress: courseProgress.toString(),
      });

      e.target.description.value = "";
      e.target.courseProgress.value = "";

      triggerRef.current.click();

      toast("Task completed successfully", {
        description: "Piano task was successfully completed",
      });
    } catch (error) {
      toast("An error occurred", {
        description: "Unable to complete the piano task",
      });
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef}></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => handlePianoCompletion(e)}>
          <DialogHeader>
            <DialogTitle>Complete Piano Task</DialogTitle>
            <DialogDescription>
              Write a description of what you played today and your course
              progress.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="col-span-4">
              <Label htmlFor="description" className="block text-left">
                Description
              </Label>
              <Input
                autoComplete="off"
                id="description"
                className="w-full mt-2"
                name="description"
              />
            </div>
            <div className="col-span-4">
              <Label htmlFor="courseProgress" className="block text-left">
                Course Progress (Number of videos completed)
              </Label>
              <Input
                autoComplete="off"
                id="courseProgress"
                className="w-full mt-2"
                type="number"
                name="courseProgress"
              />
            </div>
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PianoDialog;
