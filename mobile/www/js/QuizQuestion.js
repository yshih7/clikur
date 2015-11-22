export class QuizQuestion
{
    //start-es7
    id: numeric;
    text: string;
    type: numeric;
    choices: array<string>;
    expiration: Date;
    static questionTypes = Object.freeze({
        TEXT: 0,
        MULTI: 1,
        IMG: 2
    });
    //end-es7
    
    constructor(id, text, type, expiration, choices)
    {
        this.id = id;
        this.text = text;
        this.type = type;
        this.expiration = expiration;
        this.choices = choices;
    }
}
