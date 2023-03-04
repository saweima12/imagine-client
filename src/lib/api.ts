import axios, { AxiosInstance } from 'axios';

import { ActionResult  } from 'lib/types';
import type { SysInfo } from 'lib/types'

import { splitCookieString } from 'lib/utils/cookie';
import { AuthResponse } from 'lib/types/response';

const basicConfig = {
    baseURL: "http://localhost:8001/api/v1",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
};

export const getAuthInstance = (ua: string, up: string) => {    
    const newConfig = Object.assign(basicConfig, {
        auth: {
            username: ua,
            password: up
        }
    });

    return axios.create(newConfig);
}

/**
 * User login api.
 */
export async function authenticateLogin(username: string, password: string): Promise<ActionResult<AuthResponse>> {
    const instance = axios.create(basicConfig);

    return await instance.post("/login", {
            username: username,
            password: password
        })
        .then(response => ActionResult.New<AuthResponse>({ status: response.status, data: response.data}))
        .catch(err => {
            if (axios.isAxiosError(err)) {
                return ActionResult.New({ status: err.status || 400, msg: err.message})
            }
            return new ActionResult(400)
        });
}

/**
 * Chekc user authorized status.
 * @param ua 
 * @param up 
 * @returns boolean
 */
export async function checkAuthorized(instance: AxiosInstance): Promise<ActionResult> {
    return await instance.get("/health")
        .then(response => new ActionResult(response.status))
        .catch(err => {
            if (axios.isAxiosError(err)) {
                return ActionResult.New({status: err.status || 400, msg: err.message})
            }
            return new ActionResult(400)
        });
}


export async function getSysInfo(instance: AxiosInstance): Promise<ActionResult<SysInfo>> {
    // return await instance.
    return instance.get("/sysInfo")
        .then(response => ActionResult.New<SysInfo>({ status: response.status, data: response.data }))
        .catch(err => {
            if (axios.isAxiosError(err)) {
                return new ActionResult(err.status || 400)
            }
            return new ActionResult(400)
        })
}