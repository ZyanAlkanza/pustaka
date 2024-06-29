<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold"> Detail Transaksi</h1>

            <div class="h-5/6 mt-2 flex bg-white rounded">
                <div class="w-1/3 px-4 py-8  bg-white rounded">
                    <img src="/public/laut_bercerita.png" class="rounded" alt="cover_buku">
                </div>

                <div class="w-1/5 px-4 py-8 bg-white rounded">
                    <label class="text-sm text-gray-500">Judul Buku</label>
                    <h5 class="mb-3">Laut Bercerita</h5>
                    <label class="text-sm text-gray-500">Tanggal Pinjam</label>
                    <h5 class="mb-3">18 Januari 2024</h5>
                    <label class="text-sm text-gray-500">Tanggal Pengembalian</label>
                    <h5 class="mb-3">18 Februari 2024</h5>
                    <label class="text-sm text-gray-500">Tanggal Kembali</label>
                    <h5 class="mb-3">-</h5>
                </div>

                <div class="w-1/5 px-4 py-8 bg-white rounded">
                    <label class="text-sm text-gray-500">Nama Pengguna</label>
                    <h5 class="mb-3">Zyan Mujaddid Alkanza</h5>
                    <label class="text-sm text-gray-500">Email</label>
                    <h5 class="mb-3">zyan.mujaddid@gmail.com</h5>
                    <label class="text-sm text-gray-500">No Telepon</label>
                    <h5 class="mb-3">089653534708</h5>
                    <label class="text-sm text-gray-500">Alamat Rumah</label>
                    <h5 class="mb-3">Puri Kencana Bekasi</h5>
                </div>
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