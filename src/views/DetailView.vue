<template>
    <main class="h-full">
        <navigation />

        <section class="h-5/6 px-20 py-10 flex">
            <div class="w-2/6 flex justify-center">
                <img src="/public/default_cover.png" class="h-full" alt="cover_buku">
            </div>
            <div class="w-4/6">
                <h1 class="text-2xl font-semibold">Sebuah Seni Untuk Bersikap Bodo Amat</h1>
                <h3 class="text-gray-500 text-md font-semibold">Mark Manson</h3>
                <h5 class="w-max px-4 py-1 my-4 text-blue-500 font-medium bg-blue-100 rounded">Tersedia</h5>
                <h5 class="mb-1 font-semibold">Detail Buku</h5>
                <textarea name="book_detail" id="book_detail" maxlength="700" readonly
                    class="w-5/6 h-[360px] resize-none focus:outline-none cursor-default">Buku Karya Mark Manson Berjudul Sebuah Seni Untuk Bersikap Bodo Amat
                </textarea>
                <div class="button mt-3 flex gap-4">
                    <button
                        class="px-4 py-2 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out"><i
                            class="ri-bookmark-line mr-1"></i>Koleksi</button>
                    <button
                        class="px-8 py-2 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out"><i
                            class="ri-book-open-line mr-1"></i>Pinjam Buku</button>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import navigation from '@/components/navigation.vue';

export default {
    components: {
        navigation,
    }
}
</script>
