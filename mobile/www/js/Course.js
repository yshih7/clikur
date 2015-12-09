import {FilteredCollection} from "js/EnhancedReactiveCollections";
import {Container} from "aurelia-dependency-injection";
import {UserData} from "js/UserData";
import {UserQuestion} from "js/UserQuestion";
import {QuizQuestion} from "js/QuizQuestion";

export class Course
{
    //start-es7
    name: string; //e.g., "Intro to HCI"
    callSign: string; //e.g., "CSC212"
    session: Session;
    semester;
    id: string;
    userQuestions: FilteredCollection;
    quizQuestions: FilteredCollection;
    //end-es7

    constructor(name, callSign, session, id, semester)
    {
        this.userData = Container.instance.get(UserData);
        this.name = name;
        this.callSign = callSign;
        this.session = session;
        this.id = id;
        this.semester = semester;
    }

    initCollections()
    {
        this.userQuestions = new FilteredCollection(`userQs/${this.id}/${this.userData.user.uid}/submissions`, val => {
            return !val.flag;
        },
        val => {
            return new UserQuestion(val.__firebaseKey__, val.text, val.isAnon);
        }, true);
        
        this.quizQuestions = new FilteredCollection(`quizQs/${this.id}`, val => {
            return (!val.hasAnswered || !val.hasAnswered[this.userData.user.uid]) &&
                val.active &&
                val.expiration > Date.now();
        },
        val => {
            return new QuizQuestion(val.__firebaseKey__, val.text, val.type, new Date(val.expiration), val.choices);
        }, true);
    }

    static fromServerObj(obj, id)
    {
        let session = Session.fromServerObj(obj.session);
        return new Course(obj.title, obj.callsign, session, id, obj.semester);
    }
}

export class Session
{
    //start-es7
    static daysRegex: Regexp = /^(?!$)M?T?W?R?F?S?U?$/;

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

    toString() {
        return `${this.days} ${this.startTime}-${this.endTime}`;
    }

    static fromServerObj(obj)
    {
        let start = Time.fromSerialString(obj.start);
        let end = Time.fromSerialString(obj.end);
        return new Session(obj.days, start, end);
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

    toString()
    {
        var hour = this.hour;
        var ampm = "";

        //Military time is much easier to store. But AM/PM is what most people want.
        if (hour < 12)
        {
            ampm = "AM";
            if (hour === 0) {
                hour = 12;
            }
        }
        else {
            if (hour !== 12) {
                hour -= 12;
            }
            ampm = "PM";
        }

        return `${hour}:${this.min < 10 ? "0" + this.min : this.min}${ampm}`;
    }

    toSerialString() {
        return `${this.hour}:${this.min}`;
    }

    static fromSerialString(str)
    {
        const format = /^(\d+):(\d+)$/;
        
        let parseResult = format.exec(str);
        
        if (!parseResult) {
            throw new Error("Argument is not a valid serialized Time");
        }
        
        let hour = +parseResult[1];
        let min = +parseResult[2];
        
        return new Time(hour, min);
    }
}
