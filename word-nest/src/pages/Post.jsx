
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor =
        post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (!slug) {
            navigate("/");
            return;
        }

        appwriteService
            .getPost(slug)
            .then((response) => {
                if (response) {
                    setPost(response);
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error("Failed to fetch post:", error);
                navigate("/");
            });
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post || !isAuthor) return;

        try {
            const deleted = await appwriteService.deletePost(post.$id);

            if (deleted) {
                if (post.featuredimg) {
                    await appwriteService.deleteFile(post.featuredimg);
                }

                navigate("/");
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="relative mb-4 flex w-full justify-center rounded-xl border p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredimg)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-green-500"
                                    className="mr-3"
                                >
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mb-6 w-full">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
