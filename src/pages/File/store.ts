import { createStore } from 'lib/utils/store';
import { WebDAVClient } from 'webdav';

interface FilePageInfo {
  curPath?: string;
  davClient?: WebDAVClient;
}

export const checkedListStore = createStore<Array<string>>([]);
export const filePageInfoStore = createStore<FilePageInfo>({});
export const selectedFileListStore = createStore<File[]>([]);
