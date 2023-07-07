import { ProjectForm, SessionInterface } from "@/common.types";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getUserQuery, projectsQuery } from "@/graphql";
import { GraphQLClient} from "graphql-request";

const isProduction=process.env.NODE_ENV==='production';
const apiUrl=isProduction? process.env.NEXT_PUBLIC_GRAFBASE_API_URL|| '':'http://127.0.0.1:4000/graphql'

const apiKey=isProduction?process.env.NEXT_PUBLIC_GRAFBASE_API_KEY||'':'momoislove'

const serverUrl=isProduction?process.env.NEXT_PUBLIC_SERVER_URL||'':'http://localhost:3000'
const client=new GraphQLClient(apiUrl)
const makeGraphQLRequest=async(query:string,variables={})=>{
    try{
        const res=await client.request(query,variables);
        return res
    }catch(error:any){
        console.log(error)
    }
}

export const getUser=(email:string)=>{
    client.setHeader('x-api-key',apiKey)
    return makeGraphQLRequest(getUserQuery,{email})
}

export const createUser=(name:string,email:string,avatarUrl:string)=>{
    client.setHeader('x-api-key',apiKey)
    const variables={
        input:{
            name,email,avatarUrl
        }
    }
    makeGraphQLRequest(createUserMutation,variables)
}

export const fetchToken=async()=>{
   
    try{
        const response=await fetch(`${serverUrl}/api/auth/token`)
        return response.json()
    }catch(error){
        console.log(error)
    }
}
export const uploadImage=async (imagePath:string)=>{
    try{
        const res=await fetch(`${serverUrl}/api/upload`,{
            method:'POST',
            body:JSON.stringify({path:imagePath})
        })
        return res.json()
    }catch(error:any){
        console.log(error)
    }
}
export const createNewProject = async (form: ProjectForm, creatorId: SessionInterface['user'], token: string) => {
    const imageUrl = await uploadImage(form.image);
  
    if (imageUrl.url) {
    //   client.setHeader("Authorization", `Bearer ${token}`);
    client.setHeader('x-api-key',apiKey)
  
      const variables = {
        input: { 
          ...form, 
          image: imageUrl.url, 
          createdBy: creatorId
        }
      };
  
      return makeGraphQLRequest(createProjectMutation, variables);
    }
  };

export const fetchAllProjects=async(category?:string,endcursor?:string)=>{
    client.setHeader('x-api-key',apiKey)
    return makeGraphQLRequest(projectsQuery,{category,endcursor})
}

export const getProjectDetails=(id:string)=>{
    client.setHeader('x-api-key',apiKey)
    return makeGraphQLRequest(getProjectByIdQuery,{id})
}

export const deleteProject=(id:string,token:string)=>{
    client.setHeader('x-api-key',apiKey)
    return makeGraphQLRequest(deleteProjectMutation,{id})
}