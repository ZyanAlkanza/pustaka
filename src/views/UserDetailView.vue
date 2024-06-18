<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold"> Detail Pengguna</h1>

            <div class="h-5/6 px-4 py-8 mt-2 bg-white flex rounded">
                <div class="image w-1/6 flex justify-center">
                    <img src="/public/default_cover.png"
                        class="w-40 h-40 border-2 border-blue-500 rounded-full bg-yellow-300" alt="profile-image">
                </div>
                <div class="info w-3/6 ml-4 flex flex-col">
                    <label class="text-sm text-gray-500">Nama Pengguna</label>
                    <h5 class="mb-3">Zyan Mujaddid Alkanza</h5>
                    <label class="text-sm text-gray-500">Email</label>
                    <h5 class="mb-3">zyan.mujaddid@gmail.com</h5>
                    <label class="text-sm text-gray-500">No Telepon</label>
                    <h5 class="mb-3">089653534708</h5>
                    <label class="text-sm text-gray-500">Alamat Rumah</label>
                    <h5 class="mb-3">Puri Kencana Blok D7 RT.009/018 Pengasinan-Rawalumbu</h5>
                    <label class="text-sm text-gray-500">Tanggal Bergabung</label>
                    <h5 class="mb-3">18 Januari 2024</h5>
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