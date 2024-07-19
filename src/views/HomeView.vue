<script setup>
import axios from 'axios';
import navigation from '../components/navigation.vue'
</script>

<template>
  <navigation @search="filterBooks" class="w-full fixed" />
  <main class="h-full flex flex-col bg-[#eaeaea]">

    <section class="px-20 py-10 mt-20 grid grid-cols-8 gap-6">
      <router-link :to="`/detail/${book.id}`" v-for="(book, index) in filteredBooks" :key="index"
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
      filteredBooks: [],
      url: 'http://127.0.0.1:8000/storage/covers/'
    }
  },
  methods: {
    fetchBooks() {
      axios.get('http://127.0.0.1:8000/api/home')
        .then(response => {
          this.books = response.data.data;
          this.filteredBooks = this.books;
        })
        .catch(error => {
          console.log(error, 'Failed to fetch books');
        })
    },
    filterBooks(query) {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchBooks();
  },
}
</script>