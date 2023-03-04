import { useState } from "react"
import { clsx } from 'clsx';
import { EventCode, EventEmitter } from "lib/utils/event";


export default () => {

    const [toggle, setToggle] = useState(false);

    const onToggle = () => {
        const newState = !toggle;
        EventEmitter.dispatch(EventCode.toggleDrawer, newState);
    }
    EventEmitter.subscribe(EventCode.toggleDrawer, (state: boolean) => setToggle(state))

    return <div 
                className={clsx("menu-button-wrapper", toggle && "toggle")}
                onClick={onToggle}
            >
        <div className="menu-button-container">
            <div className="menu-button"></div>
        </div>
    </div>
}