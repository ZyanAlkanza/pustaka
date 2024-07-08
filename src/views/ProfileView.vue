<template>
    <navigation />
    <main class="h-5/6 px-20 flex">
        <div class="w-1/3 py-10 gap-y-4 flex flex-col items-center">
            <img src="/public/default_profile.png" class="w-1/2 border-2 border-blue-500 rounded-full" alt="profile">
            <button
                class="w-40 py-1 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded"><i
                    class="ri-pencil-line mr-2"></i>Edit
                Profil</button>
            <button
                class="w-40 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded">Ubah
                Kata Sandi</button>
        </div>
        <div class="w-2/3 py-10">
            <h1 class="mb-4 text-blue-500 font-semibold">Informasi Akun</h1>

            <label class="text-sm text-gray-500">Nama Pengguna</label>
            <h5 class="mb-2">Zyan Mujaddid Alkanza</h5>
            <label class="text-sm text-gray-500">Email</label>
            <h5 class="mb-2">zyan.mujaddid@gmail.com</h5>
            <label class="text-sm text-gray-500">Alamat</label>
            <h5 class="mb-2">Puri Kencana Blok D7 Pengasinan-Rawalumbu</h5>
            <label class="text-sm text-gray-500">Nomor Telepon</label>
            <h5 class="mb-2">089653534708</h5>
            <label class="text-sm text-gray-500">Tanggal Bergabung</label>
            <h5 class="mb-2">18 Januari 2024</h5>
        </div>
    </main>
</template>

<script>
import navigation from '@/components/navigation.vue';

export default {
    components: {
        navigation
    },
    data() {
        return {

        }
    },
}
</script>