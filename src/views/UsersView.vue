<template>
    <main class="h-full flex">
        <sidebar />
        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Users</h1>
            <div class="table mt-4">
                <table class="w-full table-fixed bg-white rounded">
                    <thead class="text-left">
                        <tr>
                            <th scope="col" class="w-[3%] px-2 py-4">No</th>
                            <th scope="col" class="w-[15%]">Nama</th>
                            <th scope="col" class="w-[20%] px-2">Alamat</th>
                            <th scope="col" class="w-[20%] px-2">Email</th>
                            <th scope="col" class="w-[10%]">No Telp</th>
                            <th scope="col" class="w-[20%] text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class=" hover:bg-gray-100">
                            <td class="px-2 py-4 text-center">1</td>
                            <td class="truncate">Zyan Mujaddid Alkanza</td>
                            <td class="px-2 truncate">Puri Kencana Blok D7 RT. 009/018 Pengasinan-Rawalumbu
                                Kota Bekasi 17115
                            </td>
                            <td class="px-2 truncate">zyan.mujaddid@gmail.com</td>
                            <td class="">089653534708</td>
                            <td class="text-center">
                                <a href=""
                                    class="px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">Detail</a>
                                <a href=""
                                    class="px-4 py-1 mx-2 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">Ubah</a>
                                <button
                                    class="px-4 py-1 text-red-500 hover:text-white hover:bg-red-600 border-2 border-red-500 hover:border-red-600 rounded transition duration-300 ease-in-out">Hapus</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue';

export default {
    components: {
        sidebar
    }
}
</script>