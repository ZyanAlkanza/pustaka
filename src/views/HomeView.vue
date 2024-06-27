<script setup>
import axios from 'axios';
import navigation from '../components/navigation.vue'
</script>

<template>
  <main class="h-full flex flex-col bg-[#eaeaea]">
    <navigation />

    <section class="px-20 py-10 grid grid-cols-8 gap-6">
      <router-link :to="`/detail/${book.id}`" v-for="(book, index) in books" :key="index"
        class="h-max px-2 pt-2 pb-4 flex flex-col bg-white rounded hover:shadow-md transition duration-300 ease-in-out">
        <div class="image h-[75%] flex justify-center rounded bg-gray-100">
          <img :src="url + (book.image || 'default_cover.png')" class="h-full rounded" alt="cover_buku">
        </div>
        <div class="text">
          <h5 v-if="book.status == 1"
            class="w-max px-2 py-1 my-2 text-blue-500 text-xs font-semibold rounded bg-blue-100">Tersedia</h5>
          <h5 v-if="book.status == 2"
            class="w-max px-2 py-1 my-2 text-red-500 text-xs font-semibold rounded bg-red-100">
            Tidak Tersedia</h5>
          <h3 class="text-gray-500 text-xs font-medium">{{ book.author }}</h3>
          <h1 class="font-semibold truncate">{{ book.title }}</h1>
        </div>
      </router-link>
    </section>

  </main>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      url: 'http://127.0.0.1:8000/storage/covers/'
    }
  },
  methods: {
    fetchBooks() {
      axios.get('http://127.0.0.1:8000/api/home')
        .then(response => {
          this.books = response.data.data;
        })
        .catch(error => {
          console.log(error, 'Failed to fetch books');
        })
    }
  },
  mounted() {
    this.fetchBooks();
  },
}
</script>