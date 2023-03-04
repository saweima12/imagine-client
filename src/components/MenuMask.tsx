import { EventCode, EventEmitter } from "lib/utils/event"

export default () => {

    const onClick = () => {
        // dispatch close menu event.
        EventEmitter.dispatch(EventCode.toggleDrawer, false);
    }

    return <div className="menu-mask" onClick={onClick}></div>
}

