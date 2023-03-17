export interface DiskInfo {
    free: number,
    all: number,
    usage: number,
}

export interface SysInfo{
    disk?: DiskInfo
}
