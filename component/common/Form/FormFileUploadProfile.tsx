import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { FileCode2 } from "lucide-react";
import Image from "next/image";
import prettyBytes from "pretty-bytes";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  onProfileEdit?: (data: { file: File | null; documentId: string,base64String?: string }) => void;
  documentId: string;
  label?: string;
  remark?: boolean;
};

const FormFileUploadProfile = ({ name, onProfileEdit, documentId, label, remark }: Props) => {
  const { setValue, getValues, watch, formState: { errors } } = useFormContext();
  const [imageDetails, setImageDetails] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setImageDetails(acceptedFiles); // Store the file details in local state
    const file = acceptedFiles[0];  // Handle the first file (single file upload)
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64String = reader.result as string; // Convert file to base64 string
      setValue(name, base64String); // Set the base64 string in the form state
      onProfileEdit?.({ file, documentId,base64String }); // Callback for parent component or form
    };
  
    reader.readAsDataURL(file); // Start the file reading process
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleDelete = () => {
    setImageDetails([]);
    setValue(name, null);
    onProfileEdit?.({ file: null, documentId });
  };

  const imageUrl = watch(name);
  const isImage = imageDetails[0]?.type.startsWith("image/") || imageUrl?.includes("data:image");

  return (
    <div className="w-full">
      {label && (
        <Label className="text-[#4B5563] my-2">
          {label}
          {remark && <span className="text-red-500 pl-1">*</span>}
        </Label>
      )}
      <div className="relative">
        {!imageDetails.length && !imageUrl ? (
          <div
            {...getRootProps()}
            className="transition-all bg-gray-50 w-full border border-[#9EAFFE] block border-dashed text-black p-2 rounded-lg cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-sm text-center">+ Attachment</p>
          </div>
        ) : (
          <div className="bg-gray-50 w-full border border-[#9EAFFE] block border-dashed text-black overflow-hidden p-4 rounded-lg cursor-pointer">
            <div className="flex gap-6">
              {isImage ? (
                <Image
                  src={imageUrl || ""}
                  alt="Image"
                  width={60}
                  height={60}
                  className="w-20 h-20 object-contain"
                />
              ) : (
                <FileCode2 className="w-20 h-full" />
              )}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p>{imageDetails[0]?.name}</p>
                  <small>{prettyBytes(imageDetails[0]?.size || 0)}</small>
                </div>
                <Icons.delete onClick={handleDelete} className="cursor-pointer" />
              </div>
            </div>
          </div>
        )}

{errors?.[name]?.message && (
  <p className="text-sm font-medium text-destructive absolute">
    {typeof errors[name]?.message === 'string' 
      ? (errors[name]?.message as string) 
      : ''
    }
  </p>
)}
      </div>
    </div>
  );
};

export default FormFileUploadProfile;
