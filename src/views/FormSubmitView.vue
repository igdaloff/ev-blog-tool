<template>
  <div>
    <form @submit.prevent="submitText">
      <label>Enter your query:</label>
      <input type="text" v-model="textInput" />
      <button type="submit">Submit</button>
    </form>
    <p>Response: {{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      textInput: '',
      response: '',
    }
  },
  methods: {
    async submitText() {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: this.textInput,
            model: 'text-davinci-003',
            temperature: 0.5,
            max_tokens: 1000,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ` + process.env.OPENAI_API_KEY,
            },
          }
        )

        this.response = response.data.choices[0].text
      } catch (error) {
        console.log(error)
        this.response = 'Fugggged, its not working!'
      }
    },
  },
}
</script>
