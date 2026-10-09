import appwriteServices from "../appwrite/config.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimg }) {
    return (
        <Link to={`/post/${$id}`} className="block h-full">
            <article className="
                group h-full overflow-hidden
                rounded-2xl border border-gray-800
                bg-gray-900
                transition-all duration-300
                hover:-translate-y-1
                hover:border-pink-500/50
                hover:shadow-xl hover:shadow-pink-500/10
            ">
                {/* Featured image */}
                <div className="flex h-52 w-full items-center justify-center overflow-hidden bg-gray-800">
                    <img
                        src={appwriteServices.getFilePreview(featuredimg)}
                        alt={title}
                        loading="lazy"
                        className="
                            h-full w-full object-cover
                            transition-transform duration-500
                            group-hover:scale-105
                        "
                    />
                </div>

                {/* Post title */}
                <div className="p-5">
                    <h2 className="
                        line-clamp-2 text-xl font-bold
                        text-white transition-colors duration-200
                        group-hover:text-pink-400
                    ">
                        {title}
                    </h2>

                    <p className="mt-3 text-sm font-medium text-gray-400">
                        Read article <span aria-hidden="true">→</span>
                    </p>
                </div>
            </article>
        </Link>
    );
}

export default PostCard;