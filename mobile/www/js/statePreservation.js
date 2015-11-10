export function needsPreservation(id) {
    return function(target)
    {
        if ("WinJS" in window)
        {
            let _activate = target.prototype.activate;
            target.prototype.activate = function()
            {
                var store = window.preservationStore;
                store.id = id;
                store.src = this;
                console.log("Store Configured: %O", store);

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
                
                if (typeof _activate === "function") {
                    return _activate.apply(this, arguments);
                }
            };
        }
        
        return target;
    };
}
    
export function preserve(setter) {
    return function(target, key, desc) {
        if ("WinJS" in window)
        {
            let _init = desc.initializer;
            desc.initializer = function()
            {
                console.log("Registering " + key + " to preserve");
                window.preservationStore.preserve.push({
                    key,
                    setter: setter || null
                });
                if (typeof _init === "function") {
                    return _init(...arguments);
                }
            };
        }
        
        //Babel bug? Anyway, this is necessary or the prop is magically read-only
        desc.writable = true;
        return desc;
    };
}
