<template>
  <div class="isolate bg-white">
    <div class="px-6 pt-6 lg:px-8">
      <div>
        <nav class="flex h-9 items-center justify-between" aria-label="Global">
          <div class="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
            <!-- <a v-for="item in navigation" :key="item.name" :href="item.href" class="font-semibold text-gray-900 hover:text-gray-900">{{ item.name }}</a>-->
          </div>
          <div class="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            <!--<a href="#" class="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">Log in</a>-->
          </div>
        </nav>
        <Dialog as="div" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
          <DialogPanel focus="true" class="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div class="flex h-9 items-center justify-between">
              <div class="flex">
                <a href="#" class="-m-1.5 p-1.5">
                  <span class="sr-only">Your Company</span>
                  <img class="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
              </div>
              <div class="flex">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">{{ item.name }}</a>
                </div>
                <div class="py-6">
                  <a href="#" class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10">Log in</a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </div>
    </div>
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
    <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
    <div class="mx-auto max-w-3xl pt-12 pb-20">
      <form class="space-y-6" action="#" method="POST">
        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <div>
                <label for="about" class="block text-sm font-medium text-gray-700">What should the posts be about?</label>
                <div class="mt-1">
                  <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="These are for giving Tuesday" />
                </div>
                <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
              </div>

              <div>
                <label for="about" class="block text-sm font-medium text-gray-700">What are some keywords you'd like to include?</label>
                <div class="mt-1">
                  <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="donors, panda" />
                </div>
                <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
          <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
        </div>

        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Post Titles</h3>
              <p class="mt-1 text-sm text-gray-500">Here are the titles we've come up with.</p>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="post in posts" :key="post.title">
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="flex min-w-0 flex-1 items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
                        <div class="hidden md:block">
                          <div>
                            <p class="text-sm text-gray-900">
                              {{ post.title }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
          <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Generate Blog Posts</button>
        </div>
      </form>
    </div>
  </div>

  <div class="container mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 pb-20">
    <div class="bg-white px-6 pt-16 lg:px-8 lg:pt-24 lg:pb-28 shadow">
      <div class="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-2xl">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Success!</h2>
          <div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
            <p class="text-xl text-gray-500">10 posts have been created.</p>
            <form class="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
              <div>
                <label for="email-address" class="sr-only">Email Me Blog Posts</label>
                <input id="email-address" name="email-address" type="email" autocomplete="email" required="" class="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 lg:max-w-xs" placeholder="Enter your email" />
              </div>
              <div class="mt-2 flex w-full flex-shrink-0 rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto">
                <button type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto">Send</button>
              </div>
            </form>
          </div>
        </div>
        <div class="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          <div v-for="post in posts" :key="post.title">
            <a href="#" class="mt-2 block">
              <p class="text-xl font-semibold text-gray-900">{{ post.title }}</p>
              <p class="mt-3 text-base text-gray-500">{{ post.description }}</p>
            </a>
            <div class="mt-3">
              <a href="/reports" target="_blank" class="text-base font-semibold text-indigo-600 hover:text-indigo-500">View Post</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      formSubmitted: false,
    }
  },
  methods: {
    submitForm() {
      // submit form logic goes here
      this.formSubmitted = true
    },
  },
}
</script>

<script setup>
const posts = [
  {
    title: '5 Ways You Can Help Save the Children Today',
    href: '#',
    description: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
  },
  {
    title: 'The Impact of Covid-19 on Children in Developing Countries',
    href: '#',
    description: 'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
  },
  {
    title: 'Meet the Children Who Have Benefited from Save the Children Work',
    href: '#',
    description: 'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
  },
  {
    title: 'Why Education is Essential for Every Childs Future',
    href: '#',
    description: 'Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.',
    date: 'Jan 29, 2020',
    datetime: '2020-01-29',
  },
]
</script>
