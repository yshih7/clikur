import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import * as course from "js/Course"; //jshint ignore:line
import {FilteredCollection} from "js/EnhancedReactiveCollections";

//start-es7
@inject(UserData)
//end-es7
export class AddCourse
{
    //start-es7
    searchQuery: string;
    userData: UserData;
    results: FilteredCollection;
    //end-es7

    constructor(userData) {
        this.userData = userData;
    }

    activate() {
        this.results = this.getCollection();
    }

    searchAction(e) {
        if (e.keyCode === 13) {
            this.results = this.getCollection();
        }
    }

    getCollection() {
        return new FilteredCollection("courses", val => {
            return !this.userData.courseList.getByKey(val.id) && this.searchFilter(val);
        },
        val => {
            return course.Course.fromServerObj(val, val.__firebaseKey__);
        });
    }

    searchFilter(val)
    {
        if (this.searchQuery && this.searchQuery.length > 0)
        {
            let query = this.searchQuery.toLowerCase();
            return val.name.toLowerCase().includes(query) ||
                val.callSign.toLowerCase().includes(query) ||
                val.id.toLowerCase().includes(query);
        }
        
        //A still truthy, but distinct, value
        return 1;
    }

    courseSelectAction(id)
    {
        var course = this.results.getByKey(id);

        navigator.notification.confirm(`Add class ${course.callSign} ("${course.name}")?`, choice => {
            if (choice === 1) {
                this.userData.courseList.addRef(id);
            }
        }, "Confirm class selection", ["Yes", "Cancel"]);
    }
}
