<template>
    <main class="h-full flex">
        <sidebar />
        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Tambah Pengguna</h1>

            <div class="w-1/3 h-fit p-4 mt-2 bg-white flex flex-col rounded">
                <div class="username flex flex-col">
                    <label for="username">Nama Pengguna</label>
                    <input type="text" name="username" id="username"
                        class="px-2 py-1 mt-2 bg-gray-100 rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message">
                        <small class="text-red-500 font-semibold">Pesan Kesalahan</small>
                    </div>
                </div>

                <div class="email flex flex-col">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email"
                        class="px-2 py-1 mt-2 bg-gray-100 rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message">
                        <small class="text-red-500 font-semibold">Pesan Kesalahan</small>
                    </div>
                </div>

                <div class="address flex flex-col">
                    <label for="address">Alamat</label>
                    <textarea name="address" id="address" class="h-32 p-2 bg-gray-100 resize-none"></textarea>
                    <div class="message">
                        <small class="text-red-500 font-semibold">Pesan Kesalahan</small>
                    </div>
                </div>

                <div class="gender flex flex-col">
                    <label for="gender">Jenis Kelamin</label>
                    <select name="gender" id="gender"
                        class="px-2 py-1 mt-2 bg-gray-100 rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                        <option value="" class="text-gray-100">--Pilih--</option>
                        <option value="L">Laki-Laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    <div class="message">
                        <small class="text-red-500 font-semibold">Pesan Kesalahan</small>
                    </div>

                    <div class="phone flex flex-col">
                        <label for="phone">Telepon</label>
                        <input type="text" name="phone" id="phone"
                            class="px-2 py-1 mt-2 bg-gray-100 rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                        <div class="message">
                            <small class="text-red-500 font-semibold">Pesan Kesalahan</small>
                        </div>
                    </div>

                    <button
                        class="py-2 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out"><i
                            class="ri-add-large-line mr-2"></i>Tambah
                        Data</button>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue'

export default {
    components: {
        sidebar,
    }
}
</script>