import { ActionResult } from "lib/types";
import { WebDAVClient, FileStat, ResponseDataDetailed} from "webdav";

function davRoute(path: string) {
    return `${import.meta.env["VITE_WEBDAV_PATH"]}${path}`
}

export async function getDirectoryContents(client: WebDAVClient, path: string): Promise<ActionResult<FileStat[]>> {
    return await client.getDirectoryContents(davRoute(path))
        .then(response => ActionResult.New<FileStat[]>({ status: 200, data: (response as FileStat[])}))
        .catch((err: any) => {
            return ActionResult.New({status: err.status, msg: err.message});
        });    
}


export async function createDirectory(client: WebDAVClient, path: string) {
    return await client.createDirectory(path, {recursive: false})
        .then(response => ActionResult.New({status: 200}))
        .catch((err: any) => ActionResult.New({status: err.status, msg: err.message}))
}

export async function putFile(client: WebDAVClient, file: File) {
    // return await client.putFileContents()
}

export default {
    getDirectoryContents,
    createDirectory,
    putFile
}