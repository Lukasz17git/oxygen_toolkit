/**
 * @type {boolean | undefined}
 */
const setManually = false

const myManualServerPort = "4000"
const isRunningLocally = setManually ?? (window.location.hostname === 'localhost' && window.location.port !== myManualServerPort)

export default isRunningLocally

