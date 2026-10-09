
import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!slug) {
            navigate("/");
            return;
        }

        let cancelled = false;

        appwriteService.getPost(slug).then((response) => {
            if (cancelled) return;

            if (response) {
                setPost(response);
            } else {
                navigate("/");
            }
        }).catch((error) => {
            console.error("Failed to fetch post:", error);
            if (!cancelled) navigate("/");
        });

        return () => {
            cancelled = true;
        };
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
