<template>

</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      prompt: '',
      response: ''
    }
  },
  methods: {
    async sendPrompt() {
      const apiKey = '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';
      try {
        const response = await axios.post('https://api.chatgpt.com/v1/chat', {
          'prompt': this.prompt
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        this.response = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
}

</script>
