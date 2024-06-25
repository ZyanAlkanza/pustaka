<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Tambah Buku</h1>

            <div class="mt-2 flex">
                <div class="w-1/3 h-fit p-4  bg-white flex flex-col rounded">
                    <form @submit.prevent="bookAdd()">
                        <div class="title flex flex-col">
                            <label for="title">Judul Buku</label>
                            <input type="text" v-model="title" name="title" id="title" autocomplete="off"
                                :class="errors.title ? 'border-red-500' : ''"
                                class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <div class="message h-6">
                                <small v-if="errors.title" class="text-red-500 font-semibold">{{ errors.title[0]
                                    }}</small>
                            </div>
                        </div>

                        <div class="author flex flex-col">
                            <label for="author">Penulis</label>
                            <input type="author" v-model="author" name="author" id="author"
                                :class="errors.author ? 'border-red-500' : ''"
                                class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <div class="message h-6">
                                <small v-if="errors.author" class="text-red-500 font-semibold">{{ errors.author[0]
                                    }}</small>
                            </div>
                        </div>

                        <div class="book_detail flex flex-col">
                            <label for="book_detail">Detail Buku</label>
                            <textarea name="book_detail" v-model="book_detail" id="book_detail"
                                :class="errors.book_detail ? 'border-red-500' : ''"
                                class="h-56 p-2 bg-[#eaeaea] border-2 border-gray-100 resize-none"></textarea>
                            <div class="message h-6">
                                <small v-if="errors.book_detail" class="text-red-500 font-semibold">{{
                                    errors.book_detail[0]
                                }}</small>
                            </div>
                        </div>

                        <div class="image flex flex-col">
                            <label for="image">Sampul Buku</label>
                            <input type="file" name="image" id="image" :class="errors.image ? 'border-red-500' : ''"
                                class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <div class="message h-6">
                                <small v-if="errors.image" class="text-red-500 font-semibold">{{
                                    errors.image[0]
                                }}</small>
                            </div>
                        </div>
                    </form>
                    <button @click="bookAdd()" type="button"
                        class="py-2 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out"><i
                            class="ri-add-large-line mr-2"></i>Tambah
                        Data</button>
                </div>

                <div class="w-1/3 p-4 ml-4 rounded bg-white">
                    <img src="/public/default_cover.png" class="rounded" alt="cover_buku">
                </div>
            </div>

        </section>
    </main>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import sidebar from '@/components/sidebar.vue';

export default {
    components: {
        sidebar
    },
    data() {
        return {
            title: '',
            author: '',
            book_detail: '',
            image: '',
            errors: '',
            message: ''
        }
    },
    methods: {
        bookAdd() {
            axios.post(`http://127.0.0.1:8000/api/book`, {
                title: this.title,
                author: this.author,
                book_detail: this.book_detail,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    this.message = response.data.message;
                    router.push({ name: 'books', query: { message: response.data.message } });
                })
                .catch(error => {
                    this.errors = error.response.data.error;
                })
        }
    },
}
</script>