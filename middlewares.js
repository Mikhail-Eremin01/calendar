const path = require('path');
const fs = require('fs');

function saveDataFromForm(request, response, next) {

    let fileAddress = request.route.path.substring(1);

    const myFileName = path.join(__dirname, fileAddress + '.json');
    //  read the list of saved meetings
    new Promise((resolve, reject) => {
        fs.readFile(myFileName, (err, data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
    .then((data) => {
        return new Promise((resolve, reject) => {
            const listPartOrMeetings = JSON.parse(data);
            
            // If we have property "idtime" we use this check
            for(let i = 0; i < listPartOrMeetings.length; i++) {
                if(listPartOrMeetings[i].hasOwnProperty('idtime')) {
                    if(listPartOrMeetings[i].idtime == request.body.idtime && listPartOrMeetings[i].idday == request.body.idday) {

                        console.log(`${listPartOrMeetings[i].idnameEvent} has been deleted`);
                        listPartOrMeetings.splice(i, 1);
                    }
                }
            }
            const dataObj = request.body;

            listPartOrMeetings.push(dataObj);
            console.log('saveData', dataObj);
            //  Convert from Object to text format
            let dataToSave = JSON.stringify(listPartOrMeetings);
            console.log(dataToSave);
            fs.writeFile(myFileName, dataToSave, (err) => {
                if(err) reject(err);
                resolve(dataToSave);
            })
        })
    }).then((str) => {
        response.end(str);
        // response.end('<p>data saved on server</p><a href = "/">back</a>');
    }).catch((err) => {
        throw err;
    })
}

module.exports = saveDataFromForm;