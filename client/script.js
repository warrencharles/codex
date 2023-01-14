import axios from 'axios'
import Typed from 'typed.js'
import bot from './assets/bot.svg'
import user from './assets/user.svg'

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    try {
        const response = await axios.post('http://localhost:5000', {
            prompt: data.get('prompt')
        })

        clearInterval(loadInterval)
        messageDiv.innerHTML = " "

        if (response.status === 200) {
            const parsedData = response.data.bot.trim() // trims any trailing spaces/'\n' 
            new Typed(`#${uniqueId}`, {
                strings: [parsedData],
                typeSpeed: 20
            })
        } else {
            messageDiv.innerHTML = "Something went wrong"
            alert(response.data)
        }
    } catch (err) {
        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}
