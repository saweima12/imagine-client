import type { FileStat } from 'webdav';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useQuery } from 'react-query';

import action from 'lib/action/webdav';
import { getUserInfo } from 'lib/utils/user';
import { getClient } from 'lib/webdav';

import { checkedListStore, directoryPathStore } from './store';
import FileList from './component/FileList';
import Toolbar from './component/Toolbar';
import UploadBox from './component/UploadBox';


const page = () => {
    // process query path.
    const location = useLocation();

    // initialize webdav client.
    const {ua, up} = getUserInfo();
    const client = getClient(ua, up);

    // calculate currentPath.
    const curPath = useMemo(() => {
        const path = location.pathname.replace(/^\/file/, "");
        return path ? path : "/";
    }, [location.pathname])
    const davPath = useMemo(() => `/webdav${curPath}`, [curPath])
    // declare state
    const [fileList, setFileList] = useState<FileStat[]>();

    // get directory content from webdav.
    const load = async () => await action.getDirectoryContents(client, davPath);
    const refreshList = () => checkedListStore.setState([]);

    // Query directory content from webdav.
    const { isLoading } = useQuery(["loadDirectoryContent", davPath], load, {
        onSuccess: (result) => { 
            setFileList(result.data);
            // reset checkedList
            refreshList();

            // set filepage store.
            directoryPathStore.setState({
                curPath: curPath,
                davPath: davPath,
            })
            
        },
    })


    if (isLoading) {
        return (
            <div>isLoading...</div>
        )
    }

    return <div className="filepage-wrapper">
        <div className="filepage-container">
            <Toolbar />
            <FileList curPath={curPath} list={fileList || []}/>
            <UploadBox />
        </div>
    </div>
};


export default page