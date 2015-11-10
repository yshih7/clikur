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
                        for (let item of store.rehydrate.values)
                        {
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
    return function(target, key) {
        if ("WinJS" in window) {
            window.preservationStore.preserve.push({
                key,
                setter: setter || null
            });
        }
    };
}
