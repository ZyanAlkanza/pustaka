<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Edit Transaksi</h1>

            <div class="w-1/3 h-fit p-4 mt-2 bg-white flex flex-col rounded">
                <form>

                    <div class="user_id flex flex-col">
                        <label for="user_id">Nama Peminjam</label>
                        <select name="user_id" id="user_id"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <option value="">--Pilih--</option>
                            <option>-</option>
                        </select>
                        <div class="message h-6">
                            <small class="text-red-500 font-semibold">Pesan</small>
                        </div>
                    </div>
                    <div class="book_id flex flex-col">
                        <label for="book_id">Judul Buku</label>
                        <select name="book_id" id="book_id"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <option value="">--Pilih--</option>
                            <option>-</option>
                        </select>
                        <div class="message h-6">
                            <small class="text-red-500 font-semibold">Pesan</small>
                        </div>
                    </div>

                </form>
                <button type="button"
                    class="py-2 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out"><i
                        class="ri-add-large-line mr-2"></i>Tambah
                    Data</button>
            </div>
        </section>

    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue';

export default {
    components: {
        sidebar
    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    },
}
</script>