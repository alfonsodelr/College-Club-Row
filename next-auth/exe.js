var str = ["member@ags", "president@112", "officer@33475club"]

function roleParser() {

}

function isUpper(str) {
    // return !/[a-z]/.test(str) && /[A-Z]/.test(str);
    return str.toLowerCase();
    console.log("hi")
}
const startTimer = () => performance.now();
const endTimer = () => performance.now();


const start = startTimer();

isUpper("YasemasdfasdfasdfasdfasdfasdfaEUURUTJTsdfasfdasdfadsfsan")

const end = endTimer();

function urlClean(str) {
    var url = str.replace(/[^a-zA-Z0-9/]/g, "");
    return url.toLowerCase();
}


console.log(urlClean("/yasen t/S- "))

