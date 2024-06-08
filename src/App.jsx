import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function App() {
  const [taskType, setTaskType] = useState("");

  const exerciseRef = useRef(null);

  const [tasks, setTasks] = useState([
    {
      name: "exercise",
      handler: () => {
        taskType === "" ? setTaskType("exercise") : setTaskType("");
        exerciseRef.current.click();
      },
      proved: false,
      dialog: <ExerciseDialog triggerRef={exerciseRef} />,
    },
  ]);

  return (
    <>
      <h1 className="font-bold text-3xl text-center">
        {tasks.map((task, id) => (
          <div key={id} className="flex capitalize items-center space-x-2">
            <Checkbox
              checked={task.proved}
              onClick={task.handler}
              id="exercise"
            />
            <Label htmlFor="exercise">{task.name}</Label>
            {task.dialog}
          </div>
        ))}
      </h1>
    </>
  );
}
const ExerciseDialog = ({ triggerRef }) => {
  const [image, setImage] = useState(null);
  const [setsRecorded, setSetsRecorded] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast("Please upload a valid image!");
    }
  };

  const handleExerciseCompletion = async (e) => {
    e.preventDefault();

    const description = e.target.description.value;

    if (!description || image === null) {
      toast("Please fill the entire form!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/tasks", {
        taskType: "exercise",
        description: description,
        image: image,
        recorded: setsRecorded,
      });
      setImage(null);
      setSetsRecorded(false);
      e.target.description.value = "";

      triggerRef.current.click();
      console.log("haha");
      toast("Tasks completed successfully", {
        description: "Exercise task was successfully completed",
      });
    } catch (error) {
      if (error.response.status === 413) {
        toast("Image too big", {
          description: "Please try uploading a smaller image",
        });
        console.log(error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef}></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => handleExerciseCompletion(e)}>
          <DialogHeader>
            <DialogTitle>Complete Exercise Task</DialogTitle>
            <DialogDescription>
              Upload an image in portrait and write a description of the
              workout.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            <div className="col-span-4 md:col-span-1 flex items-center">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
            </div>
            <div className="col-span-4 md:col-span-3 flex items-center">
              <Input
                id="image"
                onChange={(e) => handleFileUpload(e)}
                name="image"
                type="file"
                className="w-full"
              />
            </div>
            <div className="col-span-4 md:col-span-1 flex items-center">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
            </div>
            <div className="col-span-4 md:col-span-3 flex items-center">
              <Input autoComplete="off" id="description" className="w-full" />
            </div>
            <div className="col-span-4 flex items-center">
              <Checkbox
                id="setsRecorded"
                onClick={() => {
                  console.log(setsRecorded);
                  setSetsRecorded(!setsRecorded);
                }}
                checked={setsRecorded ? true : false}
              />
              <Label htmlFor="setsRecorded" className="ml-2">
                I recorded my sets too
              </Label>
            </div>
            <div className="col-span-4 flex justify-center">
              {image && (
                <img src={image} alt="image" className="max-w-full h-auto" />
              )}
            </div>
          </div>

          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default App;
