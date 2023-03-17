import { useSyncExternalStore } from "react"
import { directoryPathStore } from "../store"

export default () => {
    const directoryPathInfo = useSyncExternalStore(
        directoryPathStore.subscribe, 
        directoryPathStore.getState
    )

    return (
        <div className="w-full">
            {directoryPathInfo.curPath}
        </div>
    )
}