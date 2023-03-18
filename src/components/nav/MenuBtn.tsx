import { useSyncExternalStore } from "react"
import { clsx } from 'clsx';
import { navMenuStateStore } from "layouts/AdminLayout/store";


export default () => {

    const navMenuState = useSyncExternalStore(
        navMenuStateStore.subscribe, 
        navMenuStateStore.getState
    );

    const onToggle = () => {
        const newState = !navMenuState;
        navMenuStateStore.setState(newState);
    }

    return <div 
                className={clsx("menu-button-wrapper", navMenuState && "toggle")}
                onClick={onToggle}
            >
        <div className="menu-button-container">
            <div className="menu-button"></div>
        </div>
    </div>
}