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
    
    //Copy/paste from plugin source code to fix typo in plugin
    _listenToQuery(query) {
        query.on('child_added', (snapshot, previousKey) => {
            this._onItemAdded(snapshot, previousKey);
        });
        query.on('child_removed', (snapshot) => {
            this._onItemRemoved(snapshot);
        });
        query.on('child_changed', (snapshot, previousKey) => {
            this._onItemChanged(snapshot, previousKey);
        });
        query.on('child_moved', (snapshot, previousKey) => {
            this._onItemMoved(snapshot, previousKey);
        });
    }
}

export class ReferenceCollection extends ReactiveCollectionWithTransform
{
    /**
    Arguments:
    path: the path for the collection of reference keys, relative to the base
    refBase: the path to the source collection, relative to the base
    twoWay: for two-way relationships, an array containing:
        the key within each source object for inserting the reference to this collection
        the key to use to represent this collection
    For one-way relationships, pass null for twoWay
    transformer: A function to transform the pulled-in results before displaying them
    */
    constructor(path, refBase, twoWay, transformer)
    {
        super(path, transformer);
        
        let config = Container.instance.get(Configuration);
        
        this._refBase = ReactiveCollection._getChildLocation(config.getFirebaseUrl(), refBase) + "/";
        this._frb_refBase = new Firebase(this._refBase);
        this._refMap = new Map();
        [this._twoWayKey, this._twoWayVal] = twoWay;
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
            let frontRef = new Promise((resolve, reject) => {
                let query = this._query.child(key);
                query.set(true, e => {
                    if(e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            });
            
            let backRef = () => {
                return new Promise((resolve, reject) => {
                    let query = this._frb_refBase.child(`${key}/${this._twoWayKey}/${this._twoWayVal}`);
                    query.set(true, e => {
                        if(e) {
                            reject(e);
                        }
                        else {
                            resolve();
                        }
                    });
                });
            };
            
            if (this._twoWayKey) {
                return Promise.all([frontRef, backRef()])
                    .then(() => Promise.resolve(item));
            }
            else {
                return frontRef;
            }
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
            let frontRef = new Promise((resolve, reject) => {
                let query = this._query.child(key);
                query.set(true, e => {
                    if(e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            });
            
            let backRef = () => {
                return new Promise((resolve, reject) => {
                    let query = this._frb_refBase.child(`${key}/${this._twoWayKey}/${this._twoWayVal}`);
                    query.set(true, e => {
                        if(e) {
                            reject(e);
                        }
                        else {
                            resolve();
                        }
                    });
                });
            };
            
            if (this._twoWayKey) {
                return Promise.all([frontRef, backRef()])
                    .then(() => Promise.resolve(item));
            }
            else {
                return frontRef;
            }
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
            let frontRef = new Promise((resolve, reject) => {
                let query = this._query.child(key);
                query.remove(e => {
                    if(e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            });
            
            let backRef = () => {
                return new Promise((resolve, reject) => {
                    let query = this._frb_refBase.child(`${key}/${this._twoWayKey}/${this._twoWayVal}`);
                    query.remove(e => {
                        if(e) {
                            reject(e);
                        }
                        else {
                            resolve();
                        }
                    });
                });
            };
            
            if (this._twoWayKey) {
                return Promise.all([frontRef, backRef()]);
            }
            else {
                return frontRef;
            }
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
        console.error("Don't use clear() on ReferenceCollections! Use clearRefs() or clearRefsAndVals() instead.");
    }
    
    clearRefs()
    {
        if (this._twoWayKey)
        {
            //Do this an item at a time because we have to deal with two-way relationships where we have to delete a lot of nested keys
            let prom = Promise.resolve();
            for (let [key] of this._valueMap) {
                prom = prom.then(this.removeByKey(key, false));
            }
            return prom;
        }
        else {
            return super.clear();
        }
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

export class FilteredCollection extends ReactiveCollectionWithTransform
{
    constructor(path, filter, transformer)
    {
        super(path, transformer);
        
        this.filter = filter;
    }
    
    _onItemAdded(snapshot, prevKey)
    {
        if (this.filter)
        {
            let val = this._valueFromSnapshot(snapshot);
            if (!this.filter(val)) {
                return;
            }
        }
        
        super._onItemAdded(snapshot, prevKey);
    }
    
    _onItemChanged(snapshot, prevKey)
    {
        if (this.filter)
        {
            let val = this._valueFromSnapshot(snapshot);
            if (!this.filter(val))
            {
                this._onItemRemoved(snapshot);
                return;
            }
        }
        
        super._onItemChanged(snapshot, prevKey);
    }
}
