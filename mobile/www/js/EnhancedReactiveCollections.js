import {ReactiveCollection, Configuration} from "aurelia-firebase";
import Firebase from "firebase";
import {Container} from "aurelia-dependency-injection";

/**
An extension of ReactiveCollection that accepts a function to
transform values in the collection
*/
export class ReactiveCollectionWithTransform extends ReactiveCollection
{
    constructor(path, transformer)
    {
        super(path);
        
        this.transformer = transformer;
    }
    
    _valueFromSnapshot(snapshot)
    {
        let initVal = super._valueFromSnapshot(snapshot);
        
        if (this.transformer)
        {
            let key = initVal.__firebaseKey__;
            let newVal = this.transformer(initVal);
            
            if (newVal.__firebaseKey__ === undefined)
            {
                if (typeof newVal !== "object") {
                    newVal = {
                        value: newVal,
                        __firebasePrimitive__: true
                    };
                }
                
                newVal.__firebaseKey__ = key;
            }
            
            return newVal;
        }
        else {
            return initVal;
        }
    }
}

export class ReferenceCollection extends ReactiveCollectionWithTransform
{
    constructor(path, refBase, transformer)
    {
        super(path, transformer);
        
        let config = Container.instance.get(Configuration);
        
        this._refBase = ReactiveCollection._getChildLocation(config.getFirebaseUrl(), refBase) + "/";
        this._frb_refBase = new Firebase(this._refBase);
        this._refMap = new Map();
    }
    
    /**
    Adds a new item to the collection via push.
    Automatically creates both the reference and the actual stored value.
    */
    add(item)
    {
        let setVal = new Promise((resolve, reject) => {
            let query = this._frb_refBase.push();
            query.set(item, e => {
                if(e) {
                    reject(e);
                }
                else {
                    resolve(query.key());
                }
            });
        });
        
        let setRef = key => {
            return new Promise((resolve, reject) => {
                let query = this._query.child(key);
                query.set(true, e => {
                    if(e) {
                        reject(e);
                    }
                    else {
                        resolve(item);
                    }
                });
            });
        };
        
        return setVal.then(setRef);
    }
    
    /**
    Adds a reference to the collection.
    An item value can be optionally passed to create a value on the other side of the reference
    */
    addRef(key, item)
    {
        let setVal = () => {
            return new Promise((resolve, reject) => {
                let query = this._frb_refBase.child(key);
                query.set(item, e => {
                    if(e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        
        let setRef = () => {
            return new Promise((resolve, reject) => {
                let query = this._query.child(key);
                query.set(true, e => {
                    if(e) {
                        reject(e);
                    }
                    else {
                        resolve(item);
                    }
                });
            });
        };
        
        if (item !== undefined) {
            return setVal().then(setRef);
        }
        else {
            return setRef();
        }
    }
    
    remove(item, removeValue)
    {
        if (typeof item !== "object" || !item.__firebaseKey__) {
            return Promise.reject({message: 'Unknown item'});
        }
        
        return this.removeByKey(item.__firebaseKey__, removeValue);
    }
    
    /**
    Removes an item by key.
    By default, removes only the reference.
    If second argument is true, the referenced object will be removed
    */
    removeByKey(key, removeValue)
    {
        let remRef = () => {
            return new Promise((resolve, reject) => {
                this._query.child(key).remove(e => {
                    if (e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        
        let remVal = () => {
            return new Promise((resolve, reject) => {
                this._frb_refBase.child(key).remove(e => {
                    if (e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        
        if (removeValue) {
            return remRef().then(remVal);
        }
        else {
            return remRef();
        }
    }
    
    clear() {
        //NOP: Protect by enforcing specificity of function calls
        console.log("Don't use clear() on ReferenceCollections! Use clearRefs() or clearRefsAndVals() instead");
    }
    
    clearRefs() {
        return super.clear();
    }
    
    clearRefsAndVals() {
        let clearVals = () => {
            return new Promise((resolve, reject) => {
                this._frb_refBase.remove(e => {
                    if (e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        
        return super.clear().then(clearVals);
    }
    
    _onItemAdded(snapshot, prevKey)
    {
        let ref = snapshot.key();
        let frb_ref = new Firebase(this._refBase + ref);
        this._refMap.set(ref, frb_ref);
        
        let firstAdd = true;
        frb_ref.on("value", snapshot => {
            if (firstAdd) {
                super._onItemAdded(snapshot, prevKey);
                firstAdd = false;
            }
            else {
                super._onItemChanged(snapshot, prevKey);
            }
        });
    }
    
    _onItemRemoved(oldSnapshot)
    {
        super._onItemRemoved(oldSnapshot);
        
        let ref = oldSnapshot.key();
        this._refMap.get(ref).off();
        this._refMap.delete(ref);
    }
}
