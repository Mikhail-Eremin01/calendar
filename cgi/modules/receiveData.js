//  Отправить данные формы и
//  Получить новые данные о встречах
//  С помощью параметра method сделать из 2 функций getMeeting и receiveData одну

const receiveData = function(url, str, method) {
    console.log(`New meetinG: ${str}`);
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();

        xhttp.open(method, url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.responseType = 'json';

        xhttp.onload = () => {
            if(xhttp.status >= 400) {
                reject(err)
            } else{
                resolve(xhttp.response);
            }
        }
        xhttp.send(str);
    })
}