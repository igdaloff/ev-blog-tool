<template>
  <div>
    <form @submit.prevent="submitText">
      <label>Enter your query:</label>
      <input type="text" v-model="textInput" />
      <button type="submit">Submit</button>
    </form>
    <p>Response: {{ blogText }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      textInput: '',
      blogText: '',
    }
  },
  methods: {
    submitText() {
      const apiKey = process.env.VUE_APP_OPENAI_API_KEY
      const client = axios.create({
        headers: { Authorization: 'Bearer ' + apiKey },
      })
      const params = {
        prompt: this.textInput,
        model: 'text-davinci-003',
        temperature: 0.5,
        max_tokens: 1000,
      }
      client
        .post('https://api.openai.com/v1/completions', params)
        .then((result) => {
          this.blogText = result.data.choices[0].text
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
