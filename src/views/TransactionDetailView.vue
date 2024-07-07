<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold"> Detail Transaksi</h1>

            <div class="h-5/6 px-4 py-8 mt-2 flex bg-white rounded">
                <div class="w-2/6 flex justify-center rounded">
                    <img :src="book.image ? url + book.image : '/default_cover.png'" class="rounded" alt="cover_buku">
                </div>

                <div class="w-1/5 ml-6 bg-white rounded">
                    <label class="text-sm text-gray-500">Judul Buku</label>
                    <h5 class="mb-3">{{ book.title }}</h5>
                    <label class="text-sm text-gray-500">Tanggal Pinjam</label>
                    <h5 class="mb-3">{{ transaction.format_loan_date }}</h5>
                    <label class="text-sm text-gray-500">Tanggal Pengembalian</label>
                    <h5 class="mb-3">{{ transaction.format_date_of_return }}</h5>
                    <label class="text-sm text-gray-500">Tanggal Kembali</label>
                    <h5 v-if="transaction.return_date" class="mb-3">{{ transaction.return_date }}</h5>
                    <h5 v-else="!transaction.return_date" class="mb-3">-</h5>
                </div>

                <div class="w-1/4 bg-white rounded">
                    <label class="text-sm text-gray-500">Nama Pengguna</label>
                    <h5 class="mb-3">{{ user.username }}</h5>
                    <label class="text-sm text-gray-500">Email</label>
                    <h5 class="mb-3">{{ user.email }}</h5>
                    <label class="text-sm text-gray-500">No Telepon</label>
                    <h5 class="mb-3">{{ user.phone }}</h5>
                    <label class="text-sm text-gray-500">Alamat Rumah</label>
                    <h5 class="mb-3">{{ user.address }}</h5>
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
            transaction: '',
            book: '',
            user: '',
            url: 'http://127.0.0.1:8000/storage/covers/',
            token: '',
            role: '',
        }
    },
    methods: {
        fetchTransaction() {
            axios.get(`http://127.0.0.1:8000/api/transaction/${this.$route.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.transaction = response.data.data;
                    this.book = response.data.data.book;
                    this.user = response.data.data.user;
                })
                .catch(error => {
                    console.error(error.response.data.message);
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.role = localStorage.getItem('role');
        if (this.token == null || this.role != 1) {
            router.push({ name: 'login', query: { message: 'Login Dahulu!' } });
        }

        this.fetchTransaction();
    },
}
</script>