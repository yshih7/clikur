export class Course
{
    //start-es7
    name: string; //e.g., "Intro to HCI"
    callSign: string; //e.g., "CSC212"
    session: Session;
    id: numeric;
    //end-es7

    constructor(name, callSign, session, id)
    {
        this.name = name;
        this.callSign = callSign;
        this.session = session;
        this.id = id;
    }
}

export class Session
{
    //start-es7
    static daysRegex = /^(?!$)M?W?T?R?F?S?U?$/;
    
    days: string;
    startTime: Time;
    endTime: Time;
    //end-es7

    constructor(days, startTime, endTime)
    {
        if (!Session.daysRegex.test(days)) {
            throw new Error(`Invalid days string "${days}"`);
        }
        
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

export class Time
{
    //start-es7
    hour: numeric;
    min: numeric;
    //end-es7

    constructor(hour, min)
    {
        if (hour < 0 || hour > 23 || min < 0 || min > 59) {
            throw new Error(`Invalid time "${hour}:${min}"`);
        }
        
        this.hour = hour;
        this.min = min;
    }
}
