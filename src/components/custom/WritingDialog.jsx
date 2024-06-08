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
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";

const WritingDialog = ({ triggerRef }) => {
  const [images, setImages] = useState([]);
  const [pagesWritten, setPagesWritten] = useState("");
  const [description, setDescription] = useState("");

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      validImages.forEach((file) => reader.readAsDataURL(file));
    } else {
      toast("Please upload valid images!", {description:"Only image types are supported."});
    }
  };

  const handleWritingCompletion = async (e) => {
    e.preventDefault();

    if (!pagesWritten || !description || images.length === 0) {
      toast("Please fill the entire form!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/tasks", {
        imageOfWriting: images,
        pagesWritten: pagesWritten,
        description: description,
      });

      setImages([]);
      setPagesWritten("");
      setDescription("");
      triggerRef.current.click();
      toast("Writing task completed successfully", {
        description: "Writing task was successfully completed",
      });
    } catch (error) {
      if (error.response.status === 413) {
        toast("Image too big", {
          description: "Please try uploading smaller images",
        });
      } else {
        toast("An error occurred", {
          description: "Unable to complete the writing task",
        });
      }
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={triggerRef}></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleWritingCompletion}>
          <DialogHeader>
            <DialogTitle>Complete Writing Task</DialogTitle>
            <DialogDescription>
              Upload images of your writing and provide details about the pages written and a description.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            <div className="col-span-4 md:col-span-1 flex items-center">
              <Label htmlFor="images" className="text-right">
                Images
              </Label>
            </div>
            <div className="col-span-4 md:col-span-3 flex items-center">
              <Input
                id="images"
                onChange={handleFileUpload}
                name="images"
                type="file"
                multiple
                className="w-full"
              />
            </div>
            <div className="col-span-4 md:col-span-1 flex items-center">
              <Label htmlFor="pagesWritten" className="text-right">
                Pages 
              </Label>
            </div>
            <div className="col-span-4 md:col-span-3 flex items-center">
              <Input
                autoComplete="off"
                id="pagesWritten"
                type='number'
                value={pagesWritten}
                onChange={(e) => setPagesWritten(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="col-span-4 md:col-span-1 flex items-center">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
            </div>
            <div className="col-span-4 md:col-span-3 flex items-center">
              <Input
                autoComplete="off"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="col-span-4 flex justify-center">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`image-${index}`} className="max-w-full h-auto mb-2" />
              ))}
            </div>
          </div>

          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WritingDialog;