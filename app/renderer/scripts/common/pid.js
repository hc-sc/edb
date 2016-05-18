import uuid from 'node-uuid';

/* @alexgagnon
This module is responsible for generating and validating PID's. Use it to generate a new PID with the proper ghsts prefix, to add a prefix to an otherwise valid PID, or to return a new valid PID if the PID passed in as an argument was invalid */

// The user should be able to create any number of nill pids
const regex = new RegExp(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-5][0-9a-f]{3}-?[089ab][0-9a-f]{3}-?[0-9a-f]{12}$/i);

// Generates pid with custom prefix.
const generatePid = () => {
    return `urn:ghsts:${uuid.v4()}`;
}

// Formats and validates pid. If it fails validation, it will generate a new one
const validatePid = (pid) => {
    pid.replace(/ /g, '');
    if (pid.indexOf(':') === -1) {
        if (pid.match(regex)) {
            return `urn:ghsts:${pid}`;
        }
        else {
            return generatePid();
        }
    }
    else {
        const strs = pid.split(':');
        if (strs.length === 3 && 
            strs[strs.length].match(regex) && 
            strs[0] === 'urn') {

            return pid;
        }
        else {
            return generatePid();
        }
    }
}

export { generatePid, validatePid }