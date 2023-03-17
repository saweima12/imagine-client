import { navMenuStateStore } from "layouts/AdminLayout/store"

export default () => {

    const onClick = () => {
        // dispatch close menu event.
        navMenuStateStore.setState(false);
    }

    return <div className="menu-mask" onClick={onClick}></div>
}

