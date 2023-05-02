/**
 * @type {boolean | undefined}
 */
const setManually = undefined

const myManualServerPort = "5173"
const isRunningLocally = setManually ?? (window.location.hostname === 'localhost' && window.location.port !== myManualServerPort)

export default isRunningLocally

