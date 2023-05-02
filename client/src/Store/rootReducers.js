import createImmutableUpdate, { spread, remove } from 'maraj'

// STORE RESET
export const resetStoreKey = 'RESET_STORE_TO_INITIAL_STATE'
export const resetStore = () => ({ type: resetStoreKey })


// STORE UPDATE
export const functionUpdateKey = 'UPDATE_STORE_WITH_FUNCTION_CALL'
const wrapAsReduxAction = (fn) => ({ type: functionUpdateKey, functionUpdate: fn })

export const setValue = (path, value) => wrapAsReduxAction(state => createImmutableUpdate(state, {
    [path]: value
}))

export const toggleValue = (path) => wrapAsReduxAction(state => createImmutableUpdate(state, {
    [path]: c => !c
}))

export const spreadValue = (path, value) => wrapAsReduxAction(state => createImmutableUpdate(state, {
    [path]: spread(value)
}))

export const removeValue = (path, indexOrPropertyOrAnArrayOfThose) => wrapAsReduxAction(state => createImmutableUpdate(state, {
    [path]: remove(indexOrPropertyOrAnArrayOfThose)
}))

export const update = (objectUpdate) => wrapAsReduxAction(state => createImmutableUpdate(state, objectUpdate))

export const functionalUpdate = (functionUpdate) => wrapAsReduxAction(state => createImmutableUpdate(state, functionUpdate(state)))