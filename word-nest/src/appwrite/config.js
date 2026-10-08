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
                    userid
                }
            });
        } catch (error) {
            console.log(
                "Appwrite Service :: createPost :: error",
                error
            );
        }
    }

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
                    status
                }
            });
        } catch (error) {
            console.log(
                "Appwrite Service :: updatePost :: error",
                error
            );
        }
    }

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            });

            return true;
        } catch (error) {
            console.log(
                "Appwrite Service :: deletePost :: error",
                error
            );

            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            });
        } catch (error) {
            console.log(
                "Appwrite Service :: getPost :: error",
                error
            );

            return false;
        }
    }

    async getPosts(
        queries = [Query.equal("status", "active")]
    ) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries
            });
        } catch (error) {
            console.log(
                "Appwrite Service :: getPosts :: error",
                error
            );

            return false;
        }
    }

    // File upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log(
                "Appwrite Service :: uploadFile :: error",
                error
            );

            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );

            return true;
        } catch (error) {
            console.log(
                "Appwrite Service :: deleteFile :: error",
                error
            );

            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();

export default service;