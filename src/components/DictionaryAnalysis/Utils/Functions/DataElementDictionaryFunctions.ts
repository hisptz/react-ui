export function displayAccessPermission(access:any) {
    if (access?.search("w") >= 0) {
        return "read and write";
    }
    else {
        if (access?.search("r") >= 0) {
            return "read only";
        }
        else {
            return "none";
        }
    }
}

