console.log("Hello there. I'm from JS file");



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //It will prevent to refresh the browser by default after we 
    //click on submit button

    messageOne.textContent = "Loading";
    messageTwo.textContent = "";
    const location = search.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
});