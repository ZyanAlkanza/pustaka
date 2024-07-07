<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold"> Detail Buku</h1>

            <div class="h-5/6 px-4 py-8 mt-2 bg-white flex rounded">
                <div class="image w-2/6 flex justify-center">

                    <img :src="book.image ? url + book.image : '/default_cover.png'" class=" rounded" alt="cover_buku">
                </div>
                <div class="info w-3/6 ml-4 flex flex-col">
                    <label class="text-sm text-gray-500">Judul Buku</label>
                    <h5 class="mb-3">{{ book.title }}</h5>
                    <label class="text-sm text-gray-500">Penulis</label>
                    <h5 class="mb-3">{{ book.author }}</h5>
                    <label class="text-sm text-gray-500">Status</label>
                    <h5 v-if="book.status == 1"
                        class="w-fit mt-1 mb-3 px-2 py-1 text-blue-500 text-xs font-semibold bg-blue-100 rounded">
                        Tersedia
                    </h5>
                    <h5 v-if="book.status == 2"
                        class="w-fit mt-1 mb-3 px-2 py-1 text-red-500 text-xs font-semibold bg-red-100 rounded">
                        Tidak Tersedia
                    </h5>
                    <label class="text-sm text-gray-500">Detail Buku</label>
                    <textarea readonly
                        class="h-80 mb-3 resize-none overflow-hidden focus:outline-none text-justify">{{ book.book_detail }}</textarea>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
import axios from 'axios';
import router from '@/router';

export default {
    components: {
        sidebar
    },
    data() {
        return {
            book: '',
            url: 'http://127.0.0.1:8000/storage/covers/',
            token: '',
            role: '',
        }
    },
    methods: {
        fetchBookDetail() {
            axios.get(`http://127.0.0.1:8000/api/book/${this.$route.params.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    this.book = response.data.data;
                })
                .catch(err => {
                    console.log('Failed to fetch data', err);
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.role = localStorage.getItem('role');
        if (this.token == null || this.role != 1) {
            router.push({ name: 'login', query: { message: 'Login Dahulu!' } });
        }

        this.fetchBookDetail();
    },

}
</script>