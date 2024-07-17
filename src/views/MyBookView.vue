<template>
    <navigation />

    <main class="h-5/6 px-20 py-10">
        <div class="grid grid-cols-3 gap-x-4">

            <div v-for="transaction in transactions" class="p-4 bg-gray-100 flex rounded">
                <div class="w-1/3">
                    <img :src="transaction.book.image ? url + transaction.book.image : '/default_cover.png'"
                        class="h-40 rounded" alt="cover_buku">
                </div>
                <div class="w-2/3">
                    <h3 class="text-lg font-semibold">{{ transaction.book.title }}</h3>
                    <h5 class="mb-4 text-gray-500 text-xs">{{ transaction.book.author }}</h5>

                    <div class="flex">
                        <div class="w-1/2 flex flex-col">
                            <label class="text-gray-500 text-sm">Tanggal Pinjam</label>
                            <h5>{{ transaction.format_loan_date }}</h5>
                        </div>
                        <div class="w-1/2 flex flex-col">
                            <label class="text-gray-500 text-sm">Tanggal Kembali</label>
                            <h5>{{ transaction.format_date_of_return }}</h5>
                        </div>
                    </div>

                    <button @click="returnMyBook(transaction.id, transaction.book_id)"
                        class="w-full py-2 mt-4 flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 rounded"><i
                            class="ri-arrow-go-back-line mr-2"></i>Kembalikan
                        Buku</button>
                </div>
            </div>
        </div>

        <div v-if="successToast" class="fixed right-10 bottom-10">
            <div class="px-4 py-4 text-white bg-blue-500 rounded">
                <i class="ri-check-line mr-2"></i><span>Buku Berhasil Dikembalikan</span>
            </div>
        </div>
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
            transactions: [],
            url: 'http://127.0.0.1:8000/storage/covers/',
            id: localStorage.getItem('id'),
            successToast: false,
        }
    },
    methods: {
        fetchTransactions() {
            axios.get(`http://127.0.0.1:8000/api/myBook/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.transactions = response.data.data;
                    console.log(response.data.data);
                })
                .catch(error => {
                    console.error(error.response.data);
                })
        },
        returnMyBook($id, $bookId) {
            axios.put(`http://127.0.0.1:8000/api/returnMyBook/${$id}`, {
                book_id: $bookId
            })
                .then(response => {
                    this.fetchTransactions();
                    this.successToast = true;
                    if (this.successToast) {
                        setTimeout(() => {
                            this.successToast = false;
                        }, 1500);
                    }
                    console.log(response.data.message);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        this.fetchTransactions();
    },
}
</script>