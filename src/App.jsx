import { useEffect, useRef, useState } from "react";
import ExerciseDialog from "./components/custom/ExerciseDialog";
import CodingDialog from "./components/custom/CodingDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import WritingDialog from "./components/custom/WritingDialog";
import PianoDialog from "./components/custom/PianoDialog";

function App() {
  const [taskType, setTaskType] = useState("");
  const [tasks, setTasks] = useState([]);

  const exerciseRef = useRef(null);
  const codingRef = useRef(null);
  const writingRef = useRef(null);
  const pianoRef = useRef(null);

  useEffect(() => {
    setTasks([
      {
        name: "exercise",
        handler: () => {
          taskType === "" ? setTaskType("exercise") : setTaskType("");
          exerciseRef.current.click();
        },
        proved: false,
        dialog: <ExerciseDialog triggerRef={exerciseRef} />,
      },
      {
        name: "coding",
        handler: () => {
          taskType === "" ? setTaskType("coding") : setTaskType("");
          codingRef.current.click();
        },
        proved: false,
        dialog: <CodingDialog triggerRef={codingRef} />,
      },
      {
        name: "writing",
        handler: () => {
          taskType === "" ? setTaskType("writing") : setTaskType("");
          writingRef.current.click();
        },
        proved: false,
        dialog: <WritingDialog triggerRef={writingRef} />,
      },
      {
        name: "piano",
        handler: () => {
          taskType === "" ? setTaskType("piano") : setTaskType("");
          pianoRef.current.click();
        },
        proved: false,
        dialog: <PianoDialog triggerRef={pianoRef} />,
      },
    ]);
  }, []);

  return (
    <>
      <h1 className="font-bold text-3xl text-center">
        {tasks.map((task, id) => (
          <div key={id} className="flex capitalize items-center space-x-2">
            <Checkbox
              checked={task.proved}
              onClick={task.handler}
              id={task.name}
            />
            <Label htmlFor={task.name}>{task.name}</Label>
            {task.dialog}
          </div>
        ))}
      </h1>
    </>
  );
}

export default App;
