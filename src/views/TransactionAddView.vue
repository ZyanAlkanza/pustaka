<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Tambah Transaksi</h1>

            <div class="w-1/3 h-fit p-4 mt-2 bg-white flex flex-col rounded">
                <form @sumbit.prevent="addTransaction()">

                    <div class="user_id flex flex-col">
                        <label for="user_id">Nama Peminjam</label>
                        <select name="user_id" id="user_id" v-model="user"
                            :class="errors.user_id ? 'border-red-500' : ''"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <option value="">--Pilih--</option>
                            <option v-for="user in users" :value="user.id">{{ user.username }}
                            </option>
                        </select>
                        <div class="message h-6">
                            <small v-if="errors.user_id" class="text-red-500 font-semibold">{{ errors.user_id[0]
                                }}</small>
                        </div>
                    </div>
                    <div class="book_id flex flex-col">
                        <label for="book_id">Judul Buku</label>
                        <select name="book_id" id="book_id" v-model="book"
                            :class="errors.book_id ? 'border-red-500' : ''"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <option value="">--Pilih--</option>
                            <option v-for="book in books" :value="book.id" :disabled="book.status == 2"
                                :class="book.status == 2 ? 'text-gray-500' : ''">{{
                                    book.title }}</option>
                        </select>
                        <div class="message h-6">
                            <small v-if="errors.book_id" class="text-red-500 font-semibold">{{ errors.book_id[0]
                                }}</small>
                        </div>
                    </div>

                </form>
                <button @click="addTransaction()" type="button"
                    class="py-2 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out"><i
                        class="ri-add-large-line mr-2"></i>Tambah
                    Data</button>
            </div>
        </section>
    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
import router from '@/router';
import axios from 'axios';

export default {
    components: {
        sidebar
    },
    data() {
        return {
            users: [],
            user: '',
            books: [],
            book: '',
            errors: '',
            message: '',
        }
    },
    methods: {
        fetchUsers() {
            axios.get(`http://127.0.0.1:8000/api/usersData`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.users = response.data.data;
                })
                .catch(error => {
                    console.error(error.response.data);
                })
        },
        fetchBooks() {
            axios.get(`http://127.0.0.1:8000/api/booksData`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.books = response.data.data;
                })
                .catch(error => {
                    console.error(error.response.data);
                })
        },
        addTransaction() {
            axios.post(`http://127.0.0.1:8000/api/transaction`, {
                user_id: this.user,
                book_id: this.book,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.message = response.data.message;
                    router.push({ name: 'transactions', query: { message: response.data.message } });
                    console.log(response.data.message);
                })
                .catch(error => {
                    this.errors = error.response.data.error;
                    console.error(error.response.data.error);
                })
        }
    },
    mounted() {
        this.fetchUsers();
        this.fetchBooks();
    },
}
</script>