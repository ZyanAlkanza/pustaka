<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Edit Transaksi</h1>

            <div class="w-1/3 h-fit p-4 mt-2 bg-white flex flex-col rounded">
                <form @submit.prevent="editTransactionData()">

                    <div class="user_id flex flex-col">
                        <label for="user_id">Nama Peminjam</label>

                        <select v-model="transaction.user_id" name="user_id" id="user_id"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <option v-for="user in users" :value="user.id" :key="user.id"
                                :disabled="user.id == transaction.user_id">
                                {{ user.username }}
                            </option>
                        </select>

                        <div class="message h-6">
                            <small class="text-red-500 font-semibold">Pesan</small>
                        </div>
                    </div>
                    <div class="book_id flex flex-col">
                        <label for="book_id">Judul Buku</label>

                        <select name="book_id" id="book_id" v-model="transaction.newBook_id"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <option v-for="book in books" :value="book.id" :key="book.id"
                                :disabled="book.id == transaction.book_id || book.status == 2">{{
                                    book.title }}</option>
                        </select>

                        <div class="message h-6">
                            <small class="text-red-500 font-semibold">Pesan</small>
                        </div>
                    </div>

                </form>
                <button @click="editTransactionData()" type="button"
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
            transaction: {
                user_id: '',
                book_id: '',
                newBook_id: '',
            },
            users: [],
            books: [],
        }
    },
    methods: {
        fetchTransaction() {
            axios.get(`http://127.0.0.1:8000/api/transaction/${this.$route.params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.transaction = response.data.data;
                    this.transaction.newBook_id = this.transaction.book_id;
                })
                .catch(error => {
                    console.error(error.response.data);
                })
        },
        fetchUsers() {
            axios.get(`http://127.0.0.1:8000/api/usersData`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.books = response.data.data;
                })
                .catch(error => {
                    console.error(error.response.data);
                })
        },
        editTransactionData() {
            axios.post(`http://127.0.0.1:8000/api/transaction/${this.$route.params.id}`, {
                _method: 'patch',
                user_id: this.transaction.user_id,
                book_id: this.transaction.newBook_id,
                prevBook_id: this.transaction.book_id
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    router.push({ name: 'transactions', query: { message: response.data.message } });
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        this.fetchTransaction();
        this.fetchUsers();
        this.fetchBooks();
    },
}
</script>