export function needsPreservation(id) {
    return function(target)
    {
        if ("WinJS" in window) {
            return class extends target
            {
                constructor()
                {
                    super(...arguments);

                    var store = window.preservationStore;
                    store.id = id;
                    store.src = this;

                    if (store.rehydrate && store.rehydrate.id === id)
                    {
                        console.log("Found previous values to rehydrate");
                        for (let item of store.rehydrate.values)
                        {
                            console.log("%O", item);
                            if (item.setter) {
                                this[item.key](item.val);
                            }
                            else {
                                this[item.key] = item.val;
                            }
                        }

                        store.rehydrate.id = null;
                        store.rehydrate.values = null;
                    }
                }
            };
        }
        else {
            return target;
        }
    };
}
    
export function preserve(setter) {
    return function(target, key, desc) {
        if ("WinJS" in window) {
            console.log("Registering " + key + " to preserve");
            window.preservationStore.preserve.push({
                key,
                setter: setter || null
            });
        }
        
        //console.log("Desc: %O", desc);
        desc.writable = true;
        return desc;
    };
}
