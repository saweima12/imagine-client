import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";

import { FileTreeCtx } from 'lib/store';

import NavMenu from 'components/nav/Navmenu';
import NavBar from 'components/nav/Navbar';
import { loadSysInfo } from "lib/action/dashboard";
import type { SysInfo } from "lib/types";
import { EventCode, EventEmitter } from "lib/utils/event";
import { clsx } from "clsx";
import MenuMask from "components/MenuMask";

const layout = () => {

    const [fileTree, setFileTree] = useState([])
    const [sysInfo, setSysInfo] = useState<SysInfo>();
    const [isMenuOpen, setMenuOpen] = useState(false);

    EventEmitter.subscribe(EventCode.toggleDrawer, (status: boolean) => {
        setMenuOpen(status);
    })

    useEffect(() => {
        // get dashboard info
        const load = async () => {
            const result = await loadSysInfo();            
            
            if (result.isOK()) {
                setSysInfo(result.data)
            }
        };
        load();
    }, []);


    return <div className={clsx("dark", "admin-wrapper", isMenuOpen && "menu-open")}> 
        <div>
            <NavBar />
            <MenuMask />
            <NavMenu diskInfo={sysInfo?.disk}/>

            <div className={"pt-8 admin-container"}>
                <FileTreeCtx.Provider value={[fileTree]}>
                    <Outlet />
                </FileTreeCtx.Provider>
            </div>

        </div>
    </div>
};

export default layout;