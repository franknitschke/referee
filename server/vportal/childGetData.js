const {dbMemory} = require('../db/db');
const {dbGet} = require('../helper');
const {getStages} = require('../vportal/vportalHelper');

function getAthletes() {
    let n = 0;
    const fetchIntervall = setInterval(async () => {
        const accessData = await dbGet(dbMemory, 'vportalToken');
        n++
        console.log('From Intervalle: ', accessData);
        //io.emit('intervall', {intervall: n});
        process.send({intervall: n});
        
    }, 10000)
};

process.on('message', (msg) => {
    getAthletes();
})