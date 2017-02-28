(function() {
    var gow4Data = JSON.parse(document.getElementById('initialState').textContent);

    function hordeTimePlayed(gow4Data) {

        const hordeClasses = ['Soldier', 'Sniper', 'Scout', 'Heavy', 'Engineer'];
        const unitTime = ['d', 'h', 'm'];
        let hordeData = gow4Data.horde;
        let timePlayed = [];
        let totalTimePlayed = [0, 0, 0];

        for (let i = 0; i < hordeClasses.length; i++) {
            timePlayed.push(
                hordeData.ModeStats[i].Stats[0].Value
                    .replace(/d|h|m/gi, '').split(' ').map(Number));
        }

        for (let i = 0; i < unitTime.length; i++) {
            for (let j = 0; j < hordeClasses.length; j++) {
                totalTimePlayed[i] += timePlayed[j][i];
            }
        }

        let total = reduceTotalTime(totalTimePlayed);
        displayTotalTime(total);
    }

    function reduceTotalTime(totalTime) {
        const minutes = totalTime[2] % 60;
        const hoursFromMinutes = Math.floor(totalTime[2] / 60);
        const hours = (totalTime[1] + hoursFromMinutes) % 24;
        const daysFromHours = Math.floor((totalTime[1] + hoursFromMinutes) / 24);
        const days = totalTime[0] + daysFromHours;

        return [days, hours, minutes];
    }

    function displayTotalTime(totalReduced, active) {
        let hordeTitleDiv = Array.from(document.querySelectorAll('.module-title'))
            .filter(div => div.innerText
                .includes("HORDE"))[0];

        if (document.getElementById('horde-total-time') == null) {
            let timePlayedNode = document.createElement('h4');
            timePlayedNode.id = "horde-total-time";
            timePlayedNode.align = "center";
            timePlayedNode.innerHTML = "TOTAL TIME PLAYED: " +
                totalReduced[0] + "D " + totalReduced[1] + "H " + totalReduced[2] + "M";

            hordeTitleDiv.parentNode.insertBefore(timePlayedNode, hordeTitleDiv.nextSibling);
        }
    }

    hordeTimePlayed(gow4Data);
})();