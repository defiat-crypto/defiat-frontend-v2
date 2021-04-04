export class ProcessedRewards {
    public id: number;
    public timestamp: string
    public amountDFT: number;
    public amountToken: number;
    public symbolToken: string;
    public transactionHash: string;
    public eventType: string
    public direction: string

    constructor(id: number, timestamp: string, amount: number, amountToken: number, symbolToken: string, transactionHash: string, eventType: string, direction: string) {
        this.id = id;
        this.timestamp = timestamp;
        this.amountDFT = amount;
        this.amountToken = amountToken;
        this.symbolToken = symbolToken
        this.transactionHash = transactionHash;
        this.eventType = eventType;
        this.direction = direction;
    }
}