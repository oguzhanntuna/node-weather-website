const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', event => {
    event.preventDefault();

    const location = searchInput.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(async response => {
            const data = await response.json();

            if (data.error) {
                const { error } = data;
                
                messageOne.textContent = error;
            } else {
                const { location, forecast } = data;

                messageOne.textContent = location;
                messageTwo.textContent = forecast;
            }
        })
        .catch(error => messageOne.textContent = error)
        .finally(() => searchInput.value = "");
});