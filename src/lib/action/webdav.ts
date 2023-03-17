import { ActionResult } from "lib/types";
import { WebDAVClient, FileStat, ResponseDataDetailed} from "webdav";

export async function getDirectoryContents(client: WebDAVClient, path: string): Promise<ActionResult<FileStat[]>> {
    return await client.getDirectoryContents(path)
        .then(response => ActionResult.New<FileStat[]>({ status: 200, data: (response as FileStat[])}))
        .catch((err: any) => {
            return ActionResult.New({status: err.status, msg: err.message});
        });    
}

export default {
    getDirectoryContents,
}