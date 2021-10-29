import { Pager } from "../interfaces/pager";
export declare function uid(): string;
export declare function updatePager(pager: Pager, itemListLength: number): {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};
