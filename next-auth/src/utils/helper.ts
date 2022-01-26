
function varNameGenerator(str, timeStemp = true, time = Date.now()) {
    if (typeof str !== 'string') throw new Error("utils/helper.ts: param error.");
    var varname = str.replace(/[^a-zA-Z0-9]/g, "");
    if (!timeStemp)
        return varname;
    return (varname + time);
}

//Functional Programming helper funcitons
const Tap = (fn = console.log) => x => (fn(x), x);
const Pipe = (...fns) => fns.reduce((result, f) => (...args) => f(result(...args)));


export { varNameGenerator, Tap, Pipe }