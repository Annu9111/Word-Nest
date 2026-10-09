
import  { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const slugTransform = useCallback((value) => {
        if (!value || typeof value !== "string") return "";

        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .slice(0, 36);
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform]);

    const submit = async (data) => {
        try {
            let fileId = post?.featuredimg;

            // Upload a new image only when one has been selected.
            if (data.image?.[0]) {
                const uploadedFile = await appwriteService.uploadFile(
                    data.image[0]
                );

                fileId = uploadedFile.$id;
            }

            let dbPost;

            if (post) {
                dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredimg: fileId,
                });

                if (dbPost && data.image?.[0] && post.featuredimg) {
                    await appwriteService.deleteFile(post.featuredimg);
                }
            } else {
                if (!fileId) {
                    throw new Error("Please select a featured image.");
                }

                dbPost = await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    featuredimg: fileId,
                    status: data.status,
                    userid: userData?.$id,
                });
            }

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Post submission failed:", error);
            alert(error.message || "Unable to save your post.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-6 lg:flex-row"
        >
            <div className="w-full space-y-4 lg:w-2/3">
                <Input
                    label="Title"
                    placeholder="Enter your post title"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="your-post-slug"
                    {...register("slug", {
                        required: true,
                        maxLength: 36,
                    })}
                    onInput={(event) => {
                        setValue(
                            "slug",
                            slugTransform(event.currentTarget.value),
                            { shouldValidate: true }
                        );
                    }}
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-full space-y-4 lg:w-1/3">
                <Input
                    label="Featured Image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                    {...register("image", {
                        required: !post,
                    })}
                />

                {post?.featuredimg && (
                    <div>
                        <p className="mb-2 text-sm font-medium">
                            Current image
                        </p>
                        <img
                            src={appwriteService.getFilePreview(
                                post.featuredimg
                            )}
                            alt={post.title || "Featured image"}
                            className="w-full rounded-xl object-cover"
                        />
                    </div>
                )}

                <Select
                    label="Status"
                    options={["active", "inactive"]}
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    className="w-full"
                    bgColor={post ? "bg-green-600" : "bg-blue-600"}
                >
                    {post ? "Update Post" : "Publish Post"}
                </Button>
            </div>
        </form>
    );
}
