<template>
    <Navigation />
    <main class="h-5/6 flex justify-center items-center">
        <div class="w-96 h-min px-6 py-8 flex flex-col bg-gray-100 rounded">
            <h1 class="mb-4 text-blue-500 text-center font-semibold">Ubah Kata Sandi</h1>

            <label for="password" class="text-sm text-gray-500">Kata Sandi</label>
            <input type="password" name="password" id="password"
                class="px-2 py-1 focus:outline-none border-2 border-white focus:border-blue-500 rounded">
            <div class="h-6">
                <small class="text-red-500">Pesan Kesalahan</small>
            </div>

            <label for="new_password" class="text-sm text-gray-500">Kata Sandi Baru</label>
            <input type="password" name="new_password" id="new_password"
                class="px-2 py-1 focus:outline-none border-2 border-white focus:border-blue-500 rounded">
            <div class="h-6">
                <small class="text-red-500">Pesan Kesalahan</small>
            </div>

            <label for="password_confirmation" class="text-sm text-gray-500">Konfirmasi Kata Sandi Baru</label>
            <input type="password" name="password_confirmation" id="password_confirmation"
                class="px-2 py-1 focus:outline-none border-2 border-white focus:border-blue-500 rounded">
            <div class="h-6">
                <small class="text-red-500">Pesan Kesalahan</small>
            </div>

            <button class="mt-4 py-2 text-white bg-blue-500 rounded"><i class="ri-save-line mr-2"></i>Simpan
                Perubahan</button>
        </div>
    </main>
</template>

<script>
import Navigation from '@/components/navigation.vue';

export default {
    components: {
        Navigation
    }
}
</script>