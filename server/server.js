import axios from 'axios'

const openai_api_key = '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'

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)
    const prompt = data.get('prompt')

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 2048,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openai_api_key}`
            }
        })

        if (response.status === 200) {
            const parsedData = response.data.choices[0].text.trim() 
            console.log(parsedData)
        } else {
            console.log("Something went wrong")
            console.log(response.data)
        }
    } catch (err) {
        console.log(err)
    }
}

form.addEventListener('submit', handleSubmit)
