<template>
    <navigation />

    <main class="h-5/6 px-20 py-10">
        <div class="grid grid-cols-3 gap-x-4">

            <div class="p-4 bg-gray-100 flex rounded">
                <div class="w-1/3">
                    <img src="/public/default_cover.png" class="h-40 rounded" alt="cover_buku">
                </div>
                <div class="w-2/3">
                    <h3 class="text-lg font-semibold">Laut Bercerita</h3>
                    <h5 class="mb-4 text-gray-500 text-xs">Leila</h5>

                    <div class="flex">
                        <div class="w-1/2 flex flex-col">
                            <label class="text-gray-500 text-sm">Tanggal Pinjam</label>
                            <h5>18 Jan 2024</h5>
                        </div>
                        <div class="w-1/2 flex flex-col">
                            <label class="text-gray-500 text-sm">Tanggal Kembali</label>
                            <h5>18 Feb 2024</h5>
                        </div>
                    </div>

                    <button
                        class="w-full py-2 mt-4 flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 rounded"><i
                            class="ri-arrow-go-back-line mr-2"></i>Kembalikan
                        Buku</button>
                </div>
            </div>

        </div>
    </main>
</template>

<script>
import navigation from '@/components/navigation.vue';

export default {
    components: {
        navigation
    }
}
</script>