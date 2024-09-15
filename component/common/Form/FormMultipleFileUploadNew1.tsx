import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "./style.multiUpload.css";



interface Image {
  url: string;
  file: File;
  name: string;
  base64: string;
}


interface MultipleFileUploadNewProps {
  onImagesChange: (images: { url: string; file: File; name: string; base64: string }[]) => void;
  namelabel?: string;
  attachmentLabel?: string;
}

const MultipleFileUploadNew: React.FC<MultipleFileUploadNewProps> = ({ onImagesChange, namelabel = "", attachmentLabel = "" }) => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [images, setImages] = useState<Image[]>([]);

  const handleUpload = () => {
    const formData = methods.getValues(); // Get form data using react-hook-form method
    const files: FileList = formData.images;
    const imageNames: string[] = formData.image_names
      .split(",")
      .map((name: string) => name.trim());
    const imagePromises = Array.from(files).map((file, i) => {
      return new Promise<Image>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve({
            url: URL.createObjectURL(file),
            file,
            name: imageNames[i] || `Image ${i + 1}`,
            base64: base64String,
          });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
        onImagesChange([...images, ...newImages]);
        // reset();
      })
      .catch((error) => console.error("Error uploading images:", error));
  };

  const handleDelete = (url: string) => {
    const updatedImages = images.filter((image) => image.url !== url);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleImagesChange = (newImages: Image[]) => {
    setImages(newImages);
  };

  useEffect(() => {
    // Reset the attachment name input field when images change
    reset({ image_names: "" });
  }, [images, reset]);

  // Reusable Label component defined within ImageUploadForm
  const Label: React.FC<{ text: string }> = ({ text }) => (
    <p className="text-sm mb-2 text-gray-500 tracking-wide">{text}</p>
  );

  return (
    <FormProvider {...methods}>
      <div>
        {/* <h1>Attachment</h1> */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-6">
            {/* Reusable Label component */}
            {/* <Label text="File Name" />  */}
            <p className="text-sm mb-2 text-gray-500 tracking-wide">{namelabel}</p>
            <input
              type="text"
              {...methods.register("image_names")}
              placeholder="Attachment Name"
              className="flex h-10 w-full focus-visible:outline-[#30329E] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 m-0 p-0 bg-white border-[1px] rounded-md border-[#cccccc] outline-none px-2"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            {/* Reusable Label component */}
            {/* <Label text="Attachment" />  */}
            <p className="text-sm mb-2 text-gray-500 tracking-wide">{attachmentLabel}</p>
            <div className="flex items-center justify-center">
              <label className="rounded-lg border-2 w-full h-10 text-center flex items-center justify-center cursor-pointer">
                <p className="pointer-none text-gray-500"> + Attachment</p>
                <input
                  type="file"
                  {...methods.register("images")}
                  multiple
                  accept="image/*"
                  className="hidden w-full"
                />
              </label>
            </div>
            <div className="text-right py-4">
              <Button
                type="button"
                onClick={handleUpload}
                className="bg-green-600 hover:bg-green-600"
              >
                <Plus /> Upload
              </Button>
            </div>
          </div>
        </div>
        {images.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <table>
              <thead>
                <tr>
                  <th className="text-left">File Name</th>
                  <th className="text-center">Attachment</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {images.map((image: any, index: number) => (
                  <tr key={index} className="relative">
                    <td className="text-left">{image.name}</td>
                    <td>
                      {image?.file?.type === "application/pdf" ? (
                        <a
                          href={image.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            priority={true}
                            src="/assets/Image/pdf.png"
                            alt="Logo"
                            width="128"
                            height="128"
                            className="pdfIcon"
                          />
                        </a>
                      ) : image?.file?.type ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                        <Image
                          priority={true}
                          src="/assets/Image/word.png"
                          alt="Logo"
                          width="128"
                          height="128"
                          className="pdfIcon"
                        />
                      ) : (
                        <a
                          href={image.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Dialog>
                            <DialogTrigger asChild>
                              <p className="px-5 transition flex gap-4 items-center text-textColor cursor-pointer">
                                <img
                                  src={image.url}
                                  alt={`Uploaded ${index}`}
                                  className="uploadImage"
                                />
                              </p>
                            </DialogTrigger>
                            <DialogContent className="">
                              <div className="bg-white rounded-sm p-2">
                                <img
                                  src={image.url}
                                  alt={`Uploaded ${index}`}
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </a>
                      )}
                    </td>
                    <td className="action">
                      <button
                        type="button"
                        onClick={() => handleDelete(image.url)}
                        className="removeIcon"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default MultipleFileUploadNew;
