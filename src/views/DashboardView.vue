<template>
    <main class="h-full flex">
        <sidebar />
        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Dashboard</h1>
            <div class="card mt-2 grid grid-cols-4 gap-x-4">
                <router-link to="/users" class="p-4 bg-white rounded text-center">
                    <div class="title"><i class="ri-user-6-line mr-2"></i>Total Pengguna</div>
                    <div class="data mt-2 text-4xl font-semibold">{{ transactionData.users }}</div>
                </router-link>
                <router-link to="/books" class="p-4 bg-white rounded text-center">
                    <div class="title"><i class="ri-book-open-line mr-2"></i>Total Buku</div>
                    <div class="data mt-2 text-4xl font-semibold">{{ transactionData.books }}</div>
                </router-link>
                <router-link to="/books" class="p-4 bg-white rounded text-center">
                    <div class="title"><i class="ri-check-line mr-2"></i>Buku Tersedia</div>
                    <div class="data mt-2 text-4xl font-semibold">{{ transactionData.available }}</div>
                </router-link>
                <router-link to="/books" class="p-4 bg-white rounded text-center">
                    <div class="title"><i class="ri-close-line mr-2"></i>Buku Tidak Tersedia</div>
                    <div class="data mt-2 text-4xl font-semibold">{{ transactionData.notAvailable }}</div>
                </router-link>

            </div>
        </section>
    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue'
import router from '@/router';
import axios from 'axios';

export default {
    components: {
        sidebar
    },
    data() {
        return {
            transactionData: '',
            token: '',
            role: '',
        }
    },
    methods: {
        fetchTransactionData() {
            axios.get('http://127.0.0.1:8000/api/transactiondata')
                .then(response => {
                    this.transactionData = response.data.data;
                })
                .catch(error => {
                    console.error(error, 'Failed to fetch data');
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.role = localStorage.getItem('role');
        if (this.token == null || this.role != 1) {
            router.push({ name: 'login', query: { message: 'Login Dahulu!' } });
        }

        this.fetchTransactionData();
    },
}
</script>