const clock = document.getElementById("clock")
const alertDis = document.getElementById("alert")
const btnStop = document.getElementById("stop")
const addAlarm = document.getElementById("addAlarm")
const alarmHour = document.getElementById("alarmHour")
const alarmMinutes = document.getElementById("alarmMinutes")
const alarmLabel = document.getElementById("alarmLabel")
const alarmAudio = document.getElementById("alarmAudio")
const alarmTable = document.getElementById("alarmTable")

const alarmArr = []

setInterval(() => {
    clock.innerHTML = new Date().toLocaleString();
    for (let i = 0; i < alarmArr.length; i++) {
        const element = alarmArr[i];
        let dt = new Date();
        let abc = `${dt.getHours()}:${dt.getMinutes()}`
        if (element.dt === abc && !element.stopped) {
            playSound();
            stopAlarm(i);
            alertDis.hidden = false;
        }
    }
}, 1000);

function stopAlarm(index) {
    btnStop.onclick = function () {
        alarmAudio.src = "";
        alertDis.hidden = true
        alarmArr.stopped = true;
    }
}

addAlarm.onclick = function () {
    alarmArr.push({
        label: alarmLabel.value,
        dt: `${alarmHour.value}:${alarmMinutes.value}`,
        stopped: false
    })
    renderTable()
}

function renderTable() {

    let html = ""
    for (let i = 0; i < alarmArr.length; i++) {
        const element = alarmArr[i];
        html += `                <tr>
    <td>${i + 1}</td>
    <td>${element.label}</td>
    <td>${element.dt}</td>
    </tr>`
    }

    alarmTable.innerHTML = html
}


let flag = true;
function playSound() {
    if (flag) {
        alarmAudio.src = "./robin-sound.mp3";
        alarmAudio.autoplay = true
        flag = false
    }
}

// playSound()
renderTable();