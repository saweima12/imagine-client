const sizeLevel: Record<number, string> = {
    0: "B",
    1: "KB",
    2: "MB",
    3: "GB",
    4: "TB"
}

export function formatSizeString(size: number) {

    let level = 0;
    while (size >= 1000) {
        level += 1; 
        size = size / 1024;
    }

    size = Math.round(size * 100) / 100;
    return `${size} ${sizeLevel[level]}`
}