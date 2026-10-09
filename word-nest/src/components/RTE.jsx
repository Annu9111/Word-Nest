import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
    name,
    control,
    label,
    defaultValue = "",
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-1 inline-block pl-1 font-medium">
                    {label}
                </label>
            )}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        value={value}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | removeformat | code fullscreen | help",
                            content_style:
                                "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; padding: 10px; }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}