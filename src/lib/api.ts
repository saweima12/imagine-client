import axios from 'axios';
import { ActionResult } from 'types';


const instance = axios.create({
    baseURL: "http://localhost:8001/api/v1",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
})

/**
 * User login api.
 */
export async function userLogin(username: string, password: string): Promise<ActionResult> {
    return await instance.post("/login", {
            username: username,
            password: password
        })
        .then(response => new ActionResult({ status: response.status, data: response.data}))
        .catch(err => {
            if (axios.isAxiosError(err)) {
                return new ActionResult({ status: err.status || 400, msg: err.message})
            }
            return new ActionResult({ status: 400 })
        });
    
}

export async function checkAuthorized(ua: string, up: string): Promise<ActionResult> {
    return await instance.get("/health")
        .then(response => new ActionResult({ status: response.status }))
        .catch(err => {
            if (axios.isAxiosError(err)) {
                return new ActionResult({status: err.status || 400, msg: err.message})
            }
            return new ActionResult({status: 400})
        });
}
