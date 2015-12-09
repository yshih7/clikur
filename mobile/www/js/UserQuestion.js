export class UserQuestion
{
    //start-es7
    timestamp: Date;
    text: string;
    isAnon: boolean;
    id: string;
    //end-es7

    constructor(timestamp, text, isAnon)
    {
        this.timestamp = timestamp;
        this.id = timestamp;
        this.text = text;
        this.isAnon = isAnon;
    }
}
