export class ProcessedRewards {
    public id: number;
    public blocknumber: number
    public amountDFT: number;
    public amountToken: number;
    public symbolToken: string;
    public transactionHash: string;
    public eventType: string
    public direction: string

    constructor(id: number, blocknumber: number, amount: number, amountToken: number, symbolToken: string, transactionHash: string, eventType: string, direction: string) {
        this.id = id;
        this.blocknumber = blocknumber;
        this.amountDFT = amount;
        this.amountToken = amountToken;
        this.symbolToken = symbolToken
        this.transactionHash = transactionHash;
        this.eventType = eventType;
        this.direction = direction;
    }
}