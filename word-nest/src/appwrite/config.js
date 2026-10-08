import conf from '../conf/conf.js';
import { Client, ID , Databases,Storage,Query } from "appwrite";


export class Service(){
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredimg,status,userid}){
        try{
            return await this.databases.createDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteTableId,
                 slug,
                 {
                    title,
                    content,
                    featuredimg,
                    status,
                    userid
                 }
                
            )
        }catch(error){
            console.log("Appwrite Service :: createPost ::error",error);
        }
    }

    async updatePost(slug,{title,content,featuredimg,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredimg,
                    status,
                }
            )
        }catch(error){
            console.log("Appwrite Services :: updatePost :: error",error);
        }
    }



    async deletePost(slug){
        try{
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug, 
            ) 
            return true; 
        }catch(error){
            console.log("Appwrite Service :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
            )
        }catch(error){
            console.log("Appwrite Services :: getpost :: error",error);
            return false;
        }
    }

    async getposts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                queries,
                
            )
        }catch(error){
            console.log("Appwrite Services :: getposts :: error",error);
            return false
        }
    }

    
}


const service = new service()
export default service