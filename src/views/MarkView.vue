<template>
    <navigation />
    <main class="h-5/6">

        <section class="px-20 py-10 grid grid-cols-8 gap-6">
            <router-link :to="`/detail/${mark.book.id}`" v-for="mark in marks"
                class="h-max px-2 pt-2 pb-4 flex flex-col bg-gray-100 rounded hover:shadow-md transition duration-300 ease-in-out">
                <div class="image h-[75%] flex justify-center rounded bg-gray-100">
                    <img :src="mark.book.image ? url + mark.book.image : '/default_cover.png'" class="h-full rounded"
                        alt="cover_buku">
                </div>
                <div class="text">
                    <h5 v-if="mark.book.status == 1"
                        class="w-max px-2 py-1 my-2 text-blue-500 text-xs font-semibold rounded bg-blue-100">
                        Tidak Tersedia</h5>
                    <h5 v-if="mark.book.status == 2"
                        class="w-max px-2 py-1 my-2 text-red-500 text-xs font-semibold rounded bg-red-100">
                        Tidak Tersedia</h5>
                    <h3 class="text-gray-500 text-xs font-medium">{{ mark.book.author }}</h3>
                    <h1 class="font-semibold truncate">{{ mark.book.title }}</h1>
                </div>
            </router-link>
        </section>

    </main>
</template>

<script>
import navigation from '@/components/navigation.vue';
import axios from 'axios';

export default {
    components: {
        navigation
    },
    data() {
        return {
            marks: [],
            id: localStorage.getItem('id'),
            url: `http://127.0.0.1:8000/storage/covers/`,
        }
    },
    methods: {
        fetchMarks() {
            axios.get(`http://127.0.0.1:8000/api/marks/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.marks = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        this.fetchMarks();
    },
}
</script>