export class UserQuestion
{
    //start-es7
    timestamp: Date;
    text: string;
    isAnon: boolean;
    //end-es7

    constructor(timestamp, text, isAnon)
    {
        this.timestamp = timestamp;
        this.text = text;
        this.isAnon = isAnon;
    }
}
