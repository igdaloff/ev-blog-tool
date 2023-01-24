<template>
  <div class="isolate bg-white">
    <main>
      <div class="px-60 lg:px-8">
        <div class="mx-auto max-w-3xl pt-20 pb-20 sm:pt-8">
          <div>
            <div class="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            <div>
              <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                Create Blogs<br />
                at the Click of a Button
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center">An AI driven content creation tool to help nonprofits creator content, fast.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
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
                  <textarea type="text" v-model="subjectInput" name="subjectInput" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="These are for giving Tuesday" />
                </div>
              </div>

              <div>
                <label for="about" class="block text-sm font-medium text-gray-700">What are some keywords you'd like to include in the title?</label>
                <div class="mt-1">
                  <input type="text" v-model="keywordsInput" name="keywordsInput" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="donors, panda" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-start mt-8">
            <button type="submit" class="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
          </div>
        </div>
      </form>

      <!-- Step 2: Select title (connected to OpenAI) -->
      <div v-if="titleOutputs.length" class="bg-white px-4 py-5 mt-8 shadow sm:rounded-lg sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">2. Select a Title</h3>
        <p class="mt-1 text-sm text-gray-500">Here are the titles we've come up with. Select one to use for generating the blog post.</p>

        <div class="mt-5">
          <ul role="list" class="border-b">
            <li v-for="title in titleOutputs" :key="title.text" class="group border border-gray-200 border-b-0 relative bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
              <a href="#" @click.prevent="submitTitleForBody" :data-titleInput="title.text" class="flex justify-between space-x-3 py-5 px-3">
                <div class="min-w-0 flex-1">
                  <div class="flex focus:outline-none items-center">
                    <p class="truncate text-sm font-medium text-gray-900">{{ title.text }}</p>
                    <span class="sr-only">Use this headline</span>
                    <span class="absolute right-4 opacity-0 group-hover:opacity-100 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
            <a href="#" @click.prevent="submitTextForTitle" class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Regenerate Headlines
              <ArrowPathIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <!-- Step 2 alt: Select title (this uses dummy data; uncomment for testing purposes so we don't hit API every time) -->
      <!-- <div v-if="dummyPosts.length" class="bg-white px-4 py-5 mt-8 shadow sm:rounded-lg sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">2. Select a Title</h3>
        <p class="mt-1 text-sm text-gray-500">Here are the titles we've come up with. Select one to use for generating the blog post.</p>

        <div class="mt-5">
          <ul role="list" class="border-b">
            <li v-for="item in dummyPosts" :key="item.title" class="group border border-gray-200 border-b-0 relative bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
              <a href="#" @click.prevent="submitTitleForBody" :data-titleInput="item.title" class="flex justify-between space-x-3 py-5 px-3">
                <div class="min-w-0 flex-1">
                  <div class="flex focus:outline-none items-center">
                    <p class="truncate text-sm font-medium text-gray-900">{{ item.title }}</p>
                    <span class="sr-only">Use this headline</span>
                    <span class="absolute right-4 opacity-0 group-hover:opacity-100 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
            <a href="#" @click.prevent="submitTextForTitle" class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Regenerate Headlines
              <ArrowPathIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div> -->

      <!-- Step 3: View blog post output -->
      <div v-if="bodyOutput" class="bg-white px-4 py-5 mt-8 shadow sm:rounded-lg sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Here's Your AI-Generated Blog Post!</h3>
        <div class="relative pt-12">
          <div class="mx-auto max-w-prose text-lg">
            <h1>
              <span class="block text-center text-lg font-semibold text-indigo-600">{{}}</span>
              <span class="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">{{ titleInput }}</span>
            </h1>
          </div>
          <div class="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <p>{{ bodyOutput }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      apiKey: process.env.VUE_APP_OPENAI_API_KEY,
      subjectInput: '',
      keywordsInput: '',
      titleOutputs: [],
      titleInput: '',
      bodyOutput: '',
      dummyPosts: [
        {
          title: '5 Ways You Can Help Save the Children Today',
          description: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
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
      const client = axios.create({
        headers: { Authorization: 'Bearer ' + this.apiKey },
      })
      const params = {
        prompt: 'Write a blog post title about ' + this.subjectInput + ' and include the words ' + this.keywordsInput,
        model: 'text-davinci-003',
        temperature: 0.5,
        max_tokens: 100,
        n: 4,
      }
      client
        .post('https://api.openai.com/v1/completions', params)
        .then((result) => {
          this.titleOutputs = result.data.choices
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitTitleForBody(e) {
      this.titleInput = e.currentTarget.getAttribute('data-titleInput').replace(/["]+/g, '')

      const client = axios.create({
        headers: { Authorization: 'Bearer ' + this.apiKey },
      })
      const params = {
        prompt: 'Write a blog post about ' + this.subjectInput + ' that has a title of ' + this.titleInput.replace(/["]+/g, ''),
        model: 'text-davinci-003',
        temperature: 0.5,
        max_tokens: 2000,
      }
      client
        .post('https://api.openai.com/v1/completions', params)
        .then((result) => {
          this.bodyOutput = result.data.choices[0].text
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<script setup>
import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
</script>
