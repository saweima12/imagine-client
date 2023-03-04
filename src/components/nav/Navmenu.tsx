import { EventEmitter } from 'lib/utils/event';
import { DiskInfo } from 'lib/types/sysinfo';
import { NavLink } from 'react-router-dom';

const drawer = ( { diskInfo }: { diskInfo?: DiskInfo} ) => {

    return <aside className="pt-20 nav-menu">
        <div className="disk-info">
            {diskInfo?.all}
        </div>

        <ul className="px-5 nav-list">
            <li><NavLink to="/file">File</NavLink></li>
            <li><a href="">Logout</a></li>
        </ul>
    </aside>
};


export default drawer;