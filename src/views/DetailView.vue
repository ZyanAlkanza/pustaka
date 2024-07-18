<template>
    <main class="h-full">
        <navigation />
        <section v-if="loaded" class="h-5/6 px-20 py-10 flex">
            <div class="w-2/6 flex justify-center">
                <img :src="url + (book.image || '/default_cover.png')" class="h-full rounded" alt="cover_buku">
            </div>
            <div class="w-4/6">
                <h1 class="text-2xl font-semibold">{{ book.title }}</h1>
                <h3 class="text-gray-500 text-md font-semibold">{{ book.author }}</h3>
                <h5 v-if="book.status == 1" class="w-max px-4 py-1 my-4 text-blue-500 font-medium bg-blue-100 rounded">
                    Tersedia
                </h5>
                <h5 v-if="book.status == 2" class="w-max px-4 py-1 my-4 text-red-500 font-medium bg-red-100 rounded">
                    Tidak Tersedia
                </h5>
                <h5 class="mb-1 font-semibold">Detail Buku</h5>
                <textarea name="book_detail" id="book_detail" maxlength="700" readonly
                    class="w-5/6 h-[360px] resize-none focus:outline-none cursor-default">{{ book.book_detail }}
                </textarea>
                <div class="button mt-3 flex gap-4">
                    <button @click="toggleMark()" class="px-4 py-2 rounded transition duration-300 ease-in-out"
                        :class="isBookMarked ? 'text-red-500 hover:text-white hover:bg-red-600 border-2 border-red-500 hover:border-red-600' : 'text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600'">
                        <i :class="isBookMarked ? 'ri-bookmark-line' : 'ri-bookmark-line'"></i>
                        {{ isBookMarked ? 'Hapus dari Koleksi' : 'Tambah ke Koleksi' }}
                    </button>
                    <button @click="loanBook()" :disabled="book.status == 2"
                        :title="book.status == 2 ? 'Buku Tidak Tersedia' : 'Pinjam Buku'"
                        :class="book.status == 2 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600'"
                        class="px-8 py-2 text-white rounded transition duration-300 ease-in-out">
                        <i class="ri-book-open-line mr-1"></i>Pinjam Buku
                    </button>
                </div>
            </div>
            <div v-if="successToast" class="fixed right-10 bottom-10">
                <div class="px-4 py-4 text-white bg-blue-500 rounded">
                    <i class="ri-bookmark-fill mr-2"></i><span>{{ successToastMessage }}</span>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import navigation from '@/components/navigation.vue';
import router from '@/router';
import axios from 'axios';

export default {
    components: {
        navigation,
    },
    data() {
        return {
            book: '',
            url: 'http://127.0.0.1:8000/storage/covers/',
            user_id: localStorage.getItem('id'),
            book_id: this.$route.params.id,
            successToast: false,
            successToastMessage: '',
            isBookMarked: false,
            loaded: false
        }
    },
    methods: {
        fetchbook() {
            axios.get(`http://127.0.0.1:8000/api/book/${this.$route.params.id}`)
                .then(response => {
                    this.book = response.data.data;
                    this.checkMark();
                })
                .catch(error => {
                    console.error(error);
                })
        },
        checkMark() {
            axios.get(`http://127.0.0.1:8000/api/checkMark`, {
                params: {
                    user_id: this.user_id,
                    book_id: this.book_id
                }
            })
                .then(response => {
                    this.isBookMarked = response.data.isBookMarked;
                })
                .catch(error => {
                    console.error(error);
                })
        },
        toggleMark() {
            if (localStorage.getItem('token') == null) {
                router.push({ name: 'login', query: { message: 'Login Dahulu!' } })
            }
            axios.post(`http://127.0.0.1:8000/api/toggleMark`, {
                user_id: this.user_id,
                book_id: this.book_id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.successToastMessage = response.data.message;
                    this.successToast = true;
                    this.isBookMarked = !this.isBookMarked;
                    setTimeout(() => {
                        this.successToast = false;
                    }, 1500);
                })
                .catch(error => {
                    console.error(error.response.data.message);
                })
        },
        loanBook() {
            if (localStorage.getItem('id') == null) {
                router.push({ name: 'login', query: { message: 'Login Dahulu!' } });
            }
            axios.post(`http://127.0.0.1:8000/api/loanBook`, {
                user_id: this.user_id,
                book_id: this.$route.params.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.fetchbook();
                    this.successToastMessage = response.data.message;
                    this.successToast = true;
                    setTimeout(() => {
                        this.successToast = false;
                    }, 1500);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        this.fetchbook();
        setTimeout(() => {
            this.loaded = true
        }, 500);
    },
}
</script>
