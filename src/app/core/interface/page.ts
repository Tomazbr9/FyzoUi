export interface Page<Transaction> {
    content: Transaction[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;

}