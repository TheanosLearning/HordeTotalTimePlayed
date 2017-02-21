function hordeTimePlayed() {

    const hordeClasses = ['Soldier', 'Sniper', 'Scout', 'Heavy', 'Engineer'];
    const unitTime = ['d', 'h', 'm'];
    const hordeDataId = 'initialState';
    var hordeData = JSON.parse(document.getElementById(hordeDataId).textContent).horde;
    var timePlayed = [];
    var totalTimePlayed = [0,0,0];

    for(let i = 0; i < hordeClasses.length; i++) {
        timePlayed.push(
            hordeData.ModeStats[i].Stats[0].Value
                .replace(/d|h|m/gi, '').split(' ').map(Number)
        );
    }

    // sum d/h/m over all classes
    for(let i = 0; i < unitTime.length; i++) {
        for(let j = 0; j < hordeClasses.length; j++) {
            totalTimePlayed[i] += timePlayed[j][i];
        }
    }

    // put total time in lowest terms i.e. 95m -> 1h + 35m
    const minutes = totalTimePlayed[2] % 60;
    const hoursFromMinutes = Math.floor(totalTimePlayed[2] / 60);
    const hours = (totalTimePlayed[1] + hoursFromMinutes) % 24;
    const daysFromHours = Math.floor((totalTimePlayed[1] + hoursFromMinutes) / 24);
    const days = totalTimePlayed[0] + daysFromHours;

    const totalReduced = [days, hours, minutes];
    //const workWeeks = (24 * days + hours + (minutes / 60)) / 40;

    let hordeTitleText = "HORDE";
    let hordeTitleDiv = Array.from(document.querySelectorAll('.module-title')).filter(div => div.innerText.includes(hordeTitleText))[0];

    // build display node
    let timePlayedNode = document.createElement('h4');
    timePlayedNode.innerHTML = "TOTAL TIME PLAYED: " + totalReduced[0] + "D " + totalReduced[1] + "H " + totalReduced[2] + "M";
    timePlayedNode.align="center";

    hordeTitleDiv.parentNode.insertBefore(timePlayedNode, hordeTitleDiv.nextSibling);
}