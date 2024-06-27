<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Edit Buku</h1>

            <div class="mt-2 flex">
                <div class="w-1/3 h-fit p-4  bg-white flex flex-col rounded">
                    <form @submit.prevent="editBook()">
                        <div class="title flex flex-col">
                            <label for="title">Judul Buku</label>
                            <input type="text" v-model="book.title" name="title" id="title" autocomplete="off"
                                :class="errors.title ? 'border-red-500' : ''"
                                class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <div class="message h-6">
                                <small v-if="errors.title" class="text-red-500 font-semibold">{{ errors.title[0]
                                    }}</small>
                            </div>
                        </div>

                        <div class="author flex flex-col">
                            <label for="author">Penulis</label>
                            <input type="text" v-model="book.author" name="author" id="author"
                                :class="errors.author ? 'border-red-500' : ''"
                                class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <div class="message h-6">
                                <small v-if="errors.author" class="text-red-500 font-semibold">{{ errors.author[0]
                                    }}</small>
                            </div>
                        </div>

                        <div class="book_detail flex flex-col">
                            <label for="book_detail">Detail Buku</label>
                            <textarea v-model="book.book_detail" name="book_detail" id="book_detail"
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
                            <input type="file" @change="previewImage" name="image" id="image"
                                :class="errors.image ? 'border-red-500' : ''"
                                class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <div class="message h-6">
                                <small v-if="errors.image" class="text-red-500 font-semibold">{{ errors.image[0]
                                    }}</small>
                            </div>
                        </div>
                    </form>
                    <button @click="editBook()" type="button"
                        class="py-2 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out"><i
                            class="ri-add-large-line mr-2"></i>Tambah
                        Data</button>
                </div>

                <div class="w-1/3 p-4 ml-4 rounded bg-white">
                    <img :src="imagePreview || (book.image ? url + book.image : '/public/default_cover.png')"
                        class="rounded" alt="cover_buku">
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
            book: {
                title: '',
                author: '',
                book_detail: '',
                image: '',
            },
            imagePreview: '',
            url: 'http://127.0.0.1:8000/storage/covers/',
            errors: '',

        }
    },
    methods: {
        fetchBook() {
            axios.get(`http://127.0.0.1:8000/api/book/${this.$route.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.book = response.data.data;
                })
                .catch(error => {
                    console.error(error.response.data.message);
                })
        },
        editBook() {
            const formData = new FormData();
            formData.append('_method', 'patch');
            formData.append('title', this.book.title);
            formData.append('author', this.book.author);
            formData.append('book_detail', this.book.book_detail);
            if (this.book.image instanceof File) {
                formData.append('image', this.book.image);
            }

            axios.post(`http://127.0.0.1:8000/api/book/${this.$route.params.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    router.push({ name: 'books', query: { message: response.data.message } });
                })
                .catch(error => {
                    this.errors = error.response.data.error;
                    console.error(error.response.data.message);
                })
        },
        previewImage(event) {
            const file = event.target.files[0];
            this.book.image = file;
            this.imagePreview = URL.createObjectURL(file);
        }
    },
    mounted() {
        this.fetchBook();
    },
}
</script>