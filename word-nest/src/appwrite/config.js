
import conf from "../conf/conf.js";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create a new post
    async createPost({ title, slug, content, featuredimg, status, userid }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredimg,
                    status,
                    userid,
                },
            });
        } catch (error) {
            console.error("Appwrite Service :: createPost :: error", error);
            return false;
        }
    }

    // Update an existing post
    async updatePost(slug, { title, content, featuredimg, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredimg,
                    status,
                },
            });
        } catch (error) {
            console.error("Appwrite Service :: updatePost :: error", error);
            return false;
        }
    }

    // Delete a post
    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });

            return true;
        } catch (error) {
            console.error("Appwrite Service :: deletePost :: error", error);
            return false;
        }
    }

    // Get one post
    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });
        } catch (error) {
            console.error("Appwrite Service :: getPost :: error", error);
            return false;
        }
    }

    // Get all posts
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries,
            });
        } catch (error) {
            console.error("Appwrite Service :: getPosts :: error", error);
            return false;
        }
    }

    // Upload a file to Appwrite Storage
    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.error("Appwrite Service :: uploadFile :: error", error);
            return false;
        }
    }

    // Delete a file from Appwrite Storage
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId,
            });

            return true;
        } catch (error) {
            console.error("Appwrite Service :: deleteFile :: error", error);
            return false;
        }
    }

    // Get a file preview URL

getFilePreview(fileId) {
    return this.bucket.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
    });
}
}

const appwriteService = new Service();

export default appwriteService;
