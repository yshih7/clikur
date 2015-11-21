export class UserQuestion
{
    //start-es7
    timestamp: Date;
    text: string;
    isHandRaise: boolean;
    isAnon: boolean;
    id: numeric;
    //end-es7

    constructor(timestamp, text, isAnon, isHandRaise)
    {
        this.timestamp = timestamp;
        this.text = text;
        this.isAnon = isAnon;
        this.isHandRaise = isHandRaise;
    }
}
