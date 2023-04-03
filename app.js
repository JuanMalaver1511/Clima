const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(nameCity.value === '' || nameCountry.value === ''){
        showError('Los dos campos son obligatorios: ');
        return;
    }
    callAPI(nameCity.value, nameCountry.value);
    console.log(nameCity.value);
    console.log(nameCountry.value);
})

function callAPI(city, country){
    const apiId = '95ac0745e5e14ad711d5ffb09b7a31d1';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},{state code},${country}&appid=${apiId}`;
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON =>{
            if(dataJSON.cod === '404'){
                showError('La ciudad no se encuentra')
            }else{
                clearHTML();
                showWeather(dataJSON);
            }
            console.log(dataJSON);
        })
        .catch(error =>{
            console.log(error);
        })
}
function showWeather(data){
    const {name, main:{temp, temp_min, temp_max},weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);
    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}</h2>
        <p>Max: ${max}</p>
        <p>Min: ${min}</p>
    `
    result.appendChild(content);
}

function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('.alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() =>{
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}