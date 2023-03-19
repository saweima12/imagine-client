import type { FileStat } from 'webdav';
import { lazy, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useQuery } from 'react-query';

import action from 'lib/action/webdav';
import { getUserInfo } from 'lib/utils/user';
import { getClient } from 'lib/webdav';

import { checkedListStore, filePageInfoStore } from './store';
import Toolbar from './component/Toolbar';
import Breadcrumb from './component/Breadcrumb';

const UploadBox = lazy(() => import("./component/UploadBox"));
const FileListGrid = lazy(() => import("./component/FileListGrid"));

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
    // declare state
    const [remoteList, setRemoteList] = useState<FileStat[]>();

    // get directory content from webdav.
    const load = async () => await action.getDirectoryContents(client, curPath);
    const clearCheckedList = () => checkedListStore.setState([]);

    // Query directory content from webdav.
    const { isLoading } = useQuery(["loadDirectoryContent", curPath], load, {
        onSuccess: (result) => {
            setRemoteList(result.data);
            // reset checkedList
            clearCheckedList();

            // set filepage store.
            filePageInfoStore.setState({
                curPath: curPath,
                davClient: client
            });
        },
    })


    if (isLoading) {
        return (
            <div>isLoading...</div>
        )
    }

    return <div className="filepage-wrapper">
        <div className="filepage-container">
            <Breadcrumb curPath={curPath}/>
            <Toolbar />
            <FileListGrid curPath={curPath} list={remoteList || []}/>
            <UploadBox />
        </div>
    </div>
};


export default page