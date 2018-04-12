export class Transactions {
    constructor(
        public id: number,
        public user: string,
        public amount: number,
        public currency: string,
        public txn_date: string ) {
    }
}
