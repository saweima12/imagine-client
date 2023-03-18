import { createDirectory } from "lib/action/webdav";
import log from "loglevel";
import { ChangeEvent, useSyncExternalStore } from "react";
import { filePageInfoStore } from "../store";
import { FaFolderPlus } from 'react-icons/fa';


export default () => {

    const filePageInfo = useSyncExternalStore(filePageInfoStore.subscribe, filePageInfoStore.getState)

    const onSelectFile = (e: ChangeEvent) => {
        const files = (e.target as HTMLInputElement).files;
        // if (!files) 
        //     return;

        // const file = files[0];

        // selectedFileListStore.setState([ file ]);
        
    }

    const onNewFolder = async () => {
        const item = document.getElementById("test")
        item?.click();

        // const client = filePageInfo.davClient;
        // if (client) {
        //     // await createDirectory(client, "/webdav/abcdc");
        //     const selectedList = selectedFileListStore.getState()
        //     log.debug(selectedList);          

        //     selectedList.forEach(async (item) => {
        //         let buffer = await item.arrayBuffer();
        //         await client.putFileContents(`/webdav/${item.name}`, buffer)
        //     })
        // }
    }

    return <section className="mb-4 toolbar-wrapper">
        <div className="toolbar-container">
            <input type="file" className="hidden" id="test" onChange={onSelectFile} multiple></input>

            <button className="flex p-1 items-center border" onClick={onNewFolder}>
                <div className="mr-2 icon">
                    <FaFolderPlus />
                </div>
                New Folder</button>

        </div>
    </section>
};