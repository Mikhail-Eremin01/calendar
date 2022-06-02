const getMeeting = function(url) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();

        xhttp.open('GET', url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.responseType = 'json';

        xhttp.onload = () => {
            if(xhttp.status >= 400) {
                reject(err)
            } else{
                resolve(xhttp.response);
            }
        }
        xhttp.send();
    })
}