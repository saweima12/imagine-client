import { createStore } from "lib/utils/store";

interface DirectoryPathInfo {
    curPath?: string
    davPath?: string   
}


export const checkedListStore = createStore<Array<string>>([]);
export const directoryPathStore = createStore<DirectoryPathInfo>({});