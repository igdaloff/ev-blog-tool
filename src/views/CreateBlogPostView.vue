<template>
  <Hero />
  <div class="mx-auto bg-gray-50">
    <div class="mx-auto max-w-3xl pt-12 pb-20">
      <!-- Step 1: Enter basic info -->
      <form class="space-y-6" @submit.prevent="submitTextForTitle">
        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">1. Enter Blog Post Info</h3>
          <p class="mt-1 text-sm text-gray-500">Enter info below</p>
          <div class="md:grid md:grid-cols-3 md:gap-6 mt-4">
            <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <div>
                <label for="about" class="block text-sm font-medium text-gray-700">What should the blog post be about?</label>
                <div class="mt-1">
                  <textarea type="text" v-model="subjectInput" name="subjectInput" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="How Save the Children raised $10 million dollars this year from our generous donors and it helped provide 300 meals to kids in need." />
                </div>
              </div>
              <div>
                <label for="about" class="block text-sm font-medium text-gray-700">What are keywords would you like to include in the title?</label>
                <div class="mt-1">
                  <input type="text" v-model="keywordsInput" name="keywordsInput" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="Seperate keywords with commas" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-start mt-8">
            <button type="submit" :disabled="!titlesLoading ? false : true" class="flex items-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
              {{ !titlesLoading ? 'Next' : 'Generating Titles' }}
              <svg v-if="titlesLoading" aria-hidden="true" role="status" class="inline w-4 h-4 ml-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#ffffff" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <!-- Step 2: Select title (connected to OpenAI) -->
      <div v-if="titleOutputs.length" class="bg-white px-4 py-5 mt-8 shadow sm:rounded-lg sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">2. Select a Title</h3>
        <p class="mt-1 text-sm text-gray-500">Here are the titles we've come up with. Select one to use for generating the blog post.</p>

        <div class="mt-5">
          <ul role="list" class="border-b">
            <li v-for="title in titleOutputs" :key="title.text" class="group border border-gray-200 border-b-0 relative bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 hover:bg-gray-50">
              <a href="#" @click.prevent="submitTitleForBody" :data-titleSelection="title.text" class="flex justify-between space-x-3 py-5 px-3">
                <div class="min-w-0 flex-1">
                  <div class="flex focus:outline-none items-center">
                    <p class="truncate text-sm font-medium text-gray-900">{{ title.text }}</p>
                    <span class="sr-only">Use this headline</span>
                    <span class="absolute right-4 opacity-0 group-hover:opacity-100 inline-flex items-center rounded-md border border-transparent bg-sky-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                      Use this headline
                      <ArrowRightIcon class="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <!-- <div class="flex justify-start mt-8">
            <span class="sr-only">Generate New Headlines</span>
            <a href="#" @click.prevent="submitTextForTitle" class="inline-flex items-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
              Regenerate Headlines
              <ArrowPathIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div> -->
        </div>
      </div>

      <!-- Step 2 alt: Select title (this uses dummy data; uncomment for testing purposes so we don't hit API every time) -->
      <!-- <div v-if="dummyPosts.length" class="bg-white px-4 py-5 mt-8 shadow sm:rounded-lg sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">2. Select a Title</h3>
        <p class="mt-1 text-sm text-gray-500">Here are the titles we've come up with. Select one to use for generating the blog post.</p>

        <div class="mt-5">
          <ul role="list" class="border-b">
            <li v-for="item in dummyPosts" :key="item.title" class="group border border-gray-200 border-b-0 relative bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600 hover:bg-gray-50">
              <a href="#" @click.prevent="submitTitleForBody" :data-titleSelection="item.title" class="flex justify-between space-x-3 py-5 px-3">
                <div class="min-w-0 flex-1">
                  <div class="flex focus:outline-none items-center">
                    <p class="truncate text-sm font-medium text-gray-900">{{ item.title }}</p>
                    <span class="sr-only">Use this headline</span>
                    <span class="absolute right-4 opacity-0 group-hover:opacity-100 inline-flex items-center rounded-md border border-transparent bg-sky-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                      Use this headline
                      <ArrowRightIcon class="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>

          <div class="flex justify-start mt-8">
            <span class="sr-only">Generate New Headlines</span>
            <a href="#" @click.prevent="submitTextForTitle" class="inline-flex items-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
              Regenerate Headlines
              <ArrowPathIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div> -->

      <!-- Step 4: View blog post output -->
      <div v-if="bodyLoading || bodyOutput" class="relative bg-white px-4 py-5 mt-8 shadow sm:rounded-lg sm:p-6">
        <div v-if="bodyOutput" class="relative border-b border-gray-200 pb-5 sm:pb-0">
          <div class="md:flex md:items-center md:justify-between pb-4">
            <div class="flex ml-auto">
              <a href="#" @click.prevent="submitTitleForBody" class="inline-flex items-center ml-3 rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                Try Again
                <ArrowPathIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div class="relative pt-12 px-8">
          <div class="prose prose-lg prose-sky mx-auto mt-6 text-gray-700 blog-post">
            <span class="text-sm block text-center">{{ bodyLoading ? "Today's Date" : todaysDate }} • Written by Author Name</span>
            <h1 class="mt-2 text-center px-3">{{ titleSelection }}</h1>
            <div v-html="bodyOutput"></div>
            <p v-if="bodyLoading">{{ loadingBodyCopy }}</p>
          </div>
        </div>
        <div v-if="!emailSubmitted" class="w-full h-full absolute left-0 right-0 bottom-0 top-0 bg-[rgba(255,255,255,0.95)]"></div>
        <div v-if="bodyLoading" role="status" class="absolute flex align-middle -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <div class="text-center">
            <em class="block">Scrybe AI is writing your blog post.<br />This may take a few seconds...</em>
            <svg aria-hidden="true" class="inline-block w-12 h-12 mt-4 text-gray-300 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#4f46e5" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <!-- Email overlay -->
        <form v-if="bodyLoaded && !emailSubmitted" method="POST" @submit.prevent="submit" action="https://script.google.com/macros/s/AKfycbyaF8Ci7F0s7E8c7yAiEKKnn_W13Bw-E8Z4cXAunwbCPVnFgSVLTja71Zh39xPqczOe/exec" class="space-y-6 absolute top-60 left-0 right-0 m-auto w-3/4">

          <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6 justify-center">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Submit your email to view your AI generated blog post</h3>
            <div class="md:grid md:grid-cols-3 md:gap-6 mt-4">
              <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">

              <!-- Beehiv iframe -->
                <iframe src="https://embeds.beehiiv.com/716b28bd-deb2-4570-8345-57faa39682d1?slim=true" data-test-id="beehiiv-embed" frameborder="0" scrolling="no" style="margin: 0; border-radius: 0px !important; background-color: transparent;"></iframe>
              <!-- Beehiv iframe -->
              
                <!--<div>
                  <div class="mt-1">
                    <input type="email" v-model="email" name="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" placeholder="email@email.com" />
                  </div>
                </div>-->
              </div>
            </div>
            <div class="flex justify-start mt-8">
              <button type="submit" class="flex items-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">Submit and View Blog Post</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Step 4 alt: View blog post output (this uses dummy data from below; uncomment for testing purposes)-->
      <!-- <div v-if="dummyPosts" class="bg-white px-4 py-5 mt-8 shadow sm:rounded-lg sm:p-6">
        <div class="relative border-b border-gray-200 pb-5 sm:pb-0">
          <div class="md:flex md:items-center md:justify-between pb-4">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Here's Your AI-Generated Blog Post!</h3>
            <div class="flex ml-auto">
              <a class="inline-flex items-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                Copy Text
                <DocumentDuplicateIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </a>
              <a href="#" @click.prevent="submitTitleForBody" class="inline-flex items-center ml-3 rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                Try Again
                <ArrowPathIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div class="relative pt-12 px-8">
          <div class="prose prose-lg prose-sky mx-auto mt-6 text-gray-700 blog-post">
            <span class="text-sm block text-center">January 25, 2023 • Written by Author Name</span>
            <h1 class="mt-2 text-center px-4">{{ dummyPosts[0].title }}</h1>
            <div v-html="dummyPosts[0].description"></div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Hero from '../components/marketing/Hero'

export default {
  data() {
    return {
      apiKey: process.env.VUE_APP_OPENAI_API_KEY,
      subjectInput: '',
      keywordsInput: '',
      titleOutputs: [],
      titleSelection: '',
      bodyOutput: '',
      todaysDate: '',
      email: '',
      titlesLoading: false,
      bodyLoading: false,
      bodyLoaded: false,
      emailSubmitted: false,
      loadingBodyCopy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      dummyPosts: [
        {
          title: '5 Ways You Can Help Save the Children Today',
          description: '<p>Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo.</p><p>Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>',
        },
        {
          title: 'The Impact of Covid-19 on Children in Developing Countries',
          description: 'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
        },
        {
          title: 'Meet the Children Who Have Benefited from Save the Children Work',
          description: 'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
        },
        {
          title: 'Why Education is Essential for Every Childs Future',
          description: 'Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.',
        },
      ],
    }
  },
  methods: {
    submitTextForTitle() {
      this.titlesLoading = true
      const client = axios.create({
        headers: { Authorization: 'Bearer ' + this.apiKey },
      })
      const params = {
        model: 'text-davinci-003',
        prompt: 'The following are some keywords and a topic for an AI assistant to use for writing a blog post title. As the AI assistant, pretend you are a friendly, creative, smart copywriter. Write a blog post title about the following topic and use the following keyword(s). Topic: ' + this.subjectInput + '. Keyword(s): ' + this.keywordsInput + ' The blog post title should be surrounded by quotes and should have between 5 and 15 words.',
        max_tokens: 50,
        temperature: 1,
        n: 4,
      }
      client
        .post('https://api.openai.com/v1/completions', params)
        .then((result) => {
          this.titleOutputs = result.data.choices
          this.titlesLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitTitleForBody(e) {
      this.bodyLoading = true
      this.bodyOutput = ''
      this.titleSelection = e.currentTarget.getAttribute('data-titleSelection').replace(/["]+/g, '')

      // Get today's date for byline
      let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      let today = new Date()
      this.todaysDate = today.toLocaleDateString('en-US', dateOptions)

      const client = axios.create({
        headers: { Authorization: 'Bearer ' + this.apiKey },
      })
      const params = {
        prompt: 'Write a blog post body in HTML about ' + this.subjectInput + ' using around 500 words, and exclude a title',
        model: 'text-davinci-003',
        temperature: 0.5,
        max_tokens: 3000,
      }
      client
        .post('https://api.openai.com/v1/completions', params)
        .then((result) => {
          this.bodyOutput = result.data.choices[0].text
          this.bodyLoading = false
          this.bodyLoaded = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submit() {
      this.$emit('submit', this.email)
      this.emailSubmitted = true
    },
  },
}
</script>

<script setup>
import { ArrowPathIcon, ArrowRightIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'
</script>
