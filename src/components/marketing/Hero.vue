<template>
  <div class="isolate bg-gray-100">

    <div class="px-6 pt-6 lg:px-8">
      <div>
        <nav class="flex h-9 items-center justify-between" aria-label="Global">
          <div class="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-48 pt-14" src="@/assets/images/logo.png"/>
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
                  <img class="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=sky&shade=600" alt="" />
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
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-8">
          <div>
            <div class="hidden sm:mb-8 sm:flex sm:justify-center">
              <div class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span class="text-gray-600">
                  An Effectual Ventures creation. <a href="https://www.effectualventures.co/studio" class="font-semibold text-sky-600" target="_blank"><span class="absolute inset-0" aria-hidden="true" />Learn more <span aria-hidden="true">&rarr;</span></a>
                </span>
              </div>
            </div>
            <div>
              <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">Write Less. Publish More.</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center">Scrybe is an AI driven platform to help nonprofits create more content, quickly.</p>
              <div class="mt-8 flex gap-x-4 sm:justify-center">
                <a href="/create-blog" class="inline-block rounded-lg bg-sky-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-sky-600 hover:bg-sky-700 hover:ring-sky-700">
                  Try Now{{ ' ' }}
                  <span class="text-sky-200" aria-hidden="true">&rarr;</span>
                </a>
            <!--    <a href="#" class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Live demo{{ ' ' }}
                  <span class="text-gray-400" aria-hidden="true">&rarr;</span>
                </a>-->
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Blog Post Creator', href: '#' },
]

const mobileMenuOpen = ref(false)
</script>
