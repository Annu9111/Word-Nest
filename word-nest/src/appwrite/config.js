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

    
}


const service = new service()
export default service