console.log('Client side js file is loaded')

fetch('http://localhost:4000/weather?address=!').then((response) => {
    response.json().then((data) => {
       if (data.error) {
        console.log(data.error)
       } else {
        console.log(data.location)
        console.log(data.forecast)
       }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()//prevents page from reloading
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:4000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
               } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
               }
        })
    })

})