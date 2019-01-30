const csv = require("fast-csv");

parseCSV().then(({ rotationData, spotData }) => {
    formatData(rotationData, spotData).then(({ rotations, spots }) => {
        const costPerView = {
            creative: {},
            rotations: {},
        };

        for (let spot of spots) {
            if (!costPerView.creative[spot.creativeName]) {
                costPerView.creative[spot.creativeName] = {
                    spend: 0,
                    views: 0,
                }
            }

            costPerView.creative[spot.creativeName].spend += parseFloat(spot.spend);
            costPerView.creative[spot.creativeName].views += parseFloat(spot.views);

            let search = true;

            Object.keys(rotations).forEach((key) => {
                if (!search) {
                    return;
                }

                const rotation = rotations[key];

                if (spot.date >= rotation.start && spot.date <= rotation.end) {
                    search = false;

                    if (!costPerView.rotations[`${rotation.name} - ${spot.dateString}`]) {
                        costPerView.rotations[`${rotation.name} - ${spot.dateString}`] = {
                            spend: 0,
                            views: 0
                        }
                    }

                    costPerView.rotations[`${rotation.name} - ${spot.dateString}`].spend += parseFloat(spot.spend);
                    costPerView.rotations[`${rotation.name} - ${spot.dateString}`].views += parseInt(spot.views);
                }
            });
        }

        console.log('Cost Per View:');
        console.log('- Per Creative:');
        Object.keys(costPerView.creative).forEach((key) => {
            const cost = parseFloat(costPerView.creative[key].spend/costPerView.creative[key].views);
            console.log(`--- ${key}: $${cost.toFixed(2)}`);
        });
        console.log('- By Rotations By Day:');
        Object.keys(costPerView.rotations).forEach((key) => {
            const cost = parseFloat(costPerView.rotations[key].spend/costPerView.rotations[key].views);
            console.log(`--- ${key}: $${cost.toFixed(2)}`);
        });


    })
    .catch(error => console.log(error));
});

function formatData(rotations, spots) {
    const formattedRotations = {};
    const formattedSpots = [];

    return new Promise((resolve, reject) => {
        for (let rotation of rotations) {
            formattedRotations[rotation[2]] = {
                name: rotation[2],
                start: parseDate(rotation[0]),
                end: parseDate(rotation[1]),
            }
        }

        for (let spot of spots) {
            formattedSpots.push({
                dateString: spot[0],
                date: parseDate(spot[1]),
                creativeName: spot[2],
                creativeFull: `${spot[2]}-${spot[0]}`,
                spend: parseFloat(spot[3]),
                views: parseInt(spot[4]),
            });
        }

        resolve({
            rotations: formattedRotations,
            spots: formattedSpots,
        });
    })
}

function parseDate(rawDate) {
    let startHour = 0;

    if (rawDate.toString().toLowerCase().indexOf('pm') > -1
        && rawDate.toString().toLowerCase().indexOf('12:00') === -1) {
        startHour += 12;
    }

    const startTime = rawDate.split(':');
    startHour = startHour + parseInt(startTime[0]);
    const startMin = parseInt(startTime[1].replace(/\D/g,''));
    return new Date(Date.UTC(2016, 02, 02, startHour, startMin, 0, 0));
}

function parseCSV() {
    const spots = [];
    const rotations = [];

    return new Promise((resolve, reject) => {
        csv
        .fromPath("rotations.csv")
        .on("data", (data) => {
            rotations.push(data);
        })
        .on("error", (error) => {
            reject(error);
        })
         .on("end", () => {
            csv
            .fromPath("spots.csv")
            .on("data", (data) => {
                spots.push(data);
            })
            .on("error", (error)  => {
                reject(error);
            })
            .on("end", () => {
                resolve({
                    rotationData: rotations.splice(1, rotations.length),
                    spotData: spots.splice(1, spots.length),
                })
            });
        });
    })
}