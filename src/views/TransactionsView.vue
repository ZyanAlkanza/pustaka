<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <div class="header flex justify-between items-center">
                <h1 class="py-3 text-xl font-semibold">Transaksi</h1>
                <span v-if="message" class="w-2/6 p-4 text-green-500 text-sm font-semibold bg-green-100 rounded">
                    <i class="ri-check-line mr-2"></i>
                    {{ message }}
                </span>
                <div class="accessibility flex gap-4">
                    <input type="text"
                        class="h-max px-4 py-2 rounded focus:outline-none border-2 border-white focus:border-blue-500"
                        placeholder="Pencarian">
                    <router-link to="/transactionAdd" title="Tambah Data"
                        class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out">
                        <i class="ri-add-large-line"></i>
                    </router-link>
                </div>
            </div>
            <div class="table mt-2">
                <table class="w-full table-fixed bg-white rounded">
                    <thead class="text-left">
                        <tr>
                            <td scope="col" class="w-[3%] px-2 py-4 text-center">No</td>
                            <td scope="col" class="w-[20%]">Nama Peminjam</td>
                            <td scope="col" class="w-[20%] px-2">Judul Buku</td>
                            <td scope="col" class="w-[13%] px-2 text-right">Tanggal Pinjam</td>
                            <td scope="col" class="w-[13%] text-right">Tanggal Pengembalian</td>
                            <td scope="col" class="w-[20%] text-center">Aksi</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(transaction, index) in transactions" :key="index" class="hover:bg-gray-100">
                            <td class="px-2 py-4 text-center">{{ index + 1 + (pagination.current_page - 1) *
                                pagination.per_page }}</td>
                            <td class="truncate">{{ transaction.user.username }}</td>
                            <td class="px-2 truncate">{{ transaction.book.title }}</td>
                            <td class="px-2 truncate text-right">{{ transaction.format_loan_date }}</td>
                            <td class="text-right">{{ transaction.format_date_of_return }}</td>
                            <td class="text-center flex justify-center gap-2">
                                <router-link :to="`/transactionDetail/${transaction.id}`" title="Detail"
                                    class="px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">
                                    <i class="ri-eye-line"></i>
                                </router-link>
                                <router-link :to="`/transactionEdit/${transaction.id}`" title="Edit"
                                    class="px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">
                                    <i class="ri-edit-line"></i>
                                </router-link>
                                <button @click="deleteTransactionModal(transaction.id)"
                                    class="px-4 py-1 text-red-500 hover:text-white hover:bg-red-600 border-2 border-red-500 hover:border-red-600 rounded transition duration-300 ease-in-out">
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="px-4 mt-4 flex justify-end gap-4">
                    <button @click="fetchTransaction(pagination.prev)" :disabled="!pagination.prev"
                        :class="[{ 'opacity-50 cursor-not-allowed': !pagination.prev }, 'px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out']">
                        <i class="ri-arrow-left-double-line"></i>
                    </button>
                    <button @click="fetchTransaction(pagination.next)" :disabled="!pagination.next"
                        :class="[{ 'opacity-50 cursor-not-allowed': !pagination.next }, 'px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out']">
                        <i class="ri-arrow-right-double-line"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- modal -->
        <dialog ref="deleteModal" class="modal-middle p-8 bg-[#eaeaea] shadow-lg rounded">
            <div class="modal-box flex flex-col justify-center items-center">
                <h3 class="font-bold text-lg text-red-500"><i class="ri-delete-bin-line mr-2"></i>Hapus Pengguna</h3>
                <p class="py-4">Apakah Anda yakin ingin menghapus pengguna ini?</p>
                <div class="modal-action gap-4">
                    <button @click="confirmDeleteTransaction"
                        class="px-6 py-2 text-red-500 hover:text-white bg-white hover:bg-red-600 border-2 border-red-500 hover:border-red-600 rounded transition duration-300 ease-in-out">Hapus</button>
                    <button @click="closeModal"
                        class="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">Batal</button>
                </div>
            </div>
        </dialog>
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
            transactions: [],
            pagination: {
                current_page: 1,
                per_page: 10,
                next: '',
                prev: '',
            },
            message: '',
            transactionIdToDelete: null,
        }
    },
    methods: {
        fetchTransaction(url = 'http://127.0.0.1:8000/api/transactions') {
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    const data = response.data.data;
                    this.transactions = data.data;
                    this.pagination = {
                        current_page: data.current_page,
                        per_page: data.per_page,
                        next: data.next_page_url,
                        prev: data.prev_page_url,
                    }
                    console.log(this.transactions);
                })
                .catch(error => {
                    console.error(error.response.data);
                })
        },
        deleteTransactionModal(transactionId) {
            this.transactionIdToDelete = transactionId;
            this.$refs.deleteModal.showModal();
        },
        closeModal() {
            this.$refs.deleteModal.close();
        },
        confirmDeleteTransaction() {
            this.deleteTransactionData(this.transactionIdToDelete);
            this.closeModal();
        },
        deleteTransactionData(transactionId) {
            axios.delete(`http://127.0.0.1:8000/api/transaction/${transactionId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.fetchTransaction();
                    this.message = response.data.message;
                    if (this.message) {
                        setTimeout(() => {
                            this.message = '';
                        }, 1500);
                    }
                })
                .catch(error => {
                    console.error(error.response.data);
                })
        }
    },
    mounted() {
        this.message = this.$route.query.message;
        if (this.message) {
            setTimeout(() => {
                this.message = '';
                router.push('/transactions');
            }, 1500);
        }
        this.fetchTransaction();
    },

}
</script>