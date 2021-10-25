import {Pager} from "interfaces/pager";


export function uid() {
    const letters = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allowedChars = "0123456789" + letters;
    const NUMBER_OF_CODEPOINTS = allowedChars.length;
    const CODESIZE = 11;
    let uid;
    uid = letters.charAt(Math.random() * letters.length);
    for (let i = 1; i < CODESIZE; ++i) {
        uid += allowedChars.charAt(Math.random() * NUMBER_OF_CODEPOINTS);
    }
    return uid;
}

export function updatePager(pager: Pager, itemListLength: number) {
    const {page, pageSize} = pager;

    return {
        page,
        pageSize,
        pageCount: Math.ceil(itemListLength / pageSize),
        total: itemListLength,
    };
}
