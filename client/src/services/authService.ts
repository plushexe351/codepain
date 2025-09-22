import axios from "axios";

export type User = {
    id:string,
    username: string,
    email:string
}

export async function registerApi(
    username: string,
    email:string,
    password:string,
): Promise<{user:User}>{
    try{
        const res = await axios.post<{user: User; token:string }>(
            "/api/auth/register",
            {username, email, password},
            {withCredentials: true}
        );
        return {user:res.data.user};
    }
    catch(error:any){
        const errorMessage = error.response?.data?.message || "Registration failed";
        throw new Error(errorMessage);
    }
}

export async function loginApi(
    username:string,
    password:string,
): Promise<{user: User}>{
    try{
        const res = await axios.post<{user:User; token:string}>(
            "/api/auth/login",
            {username, password},
            {withCredentials:true}
        );
        return {user: res.data.user};
    }
    catch(error:any){
        const errorMessage = error.response?.data?.message || "Login failed";
        throw new Error(errorMessage);
    }
}

export async function logoutApi():Promise<void>{
    try{
        await axios.post("/api/auth/logout",{}, {withCredentials: true});
    }
    catch(error:any){
        const errorMessage = error.response?.data?.message || "Logout failed";
        throw new Error(errorMessage);
    }
}

export async function getCurrentUserApi(): Promise<{ user: User }> {
  try {
    const res = await axios.get<{ user: User }>("/api/auth/me", { withCredentials: true });
    return { user: res.data.user};
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to get user");
  }
}
