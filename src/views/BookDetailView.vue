<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold"> Detail Buku</h1>

            <div class="h-5/6 px-4 py-8 mt-2 bg-white flex rounded">
                <div class="image w-2/6 flex justify-center">

                    <!-- <img :src="userData.image ? url + userData.image : '/default_profile.png'"
                        class="w-40 h-40 border-2 border-blue-500 rounded-full" alt="profile-image"> -->
                    <img src="/public/default_cover.png" class=" rounded" alt="cover_buku">
                </div>
                <div class="info w-3/6 ml-4 flex flex-col">
                    <label class="text-sm text-gray-500">Judul Buku</label>
                    <h5 class="mb-3">book</h5>
                    <label class="text-sm text-gray-500">Penulis</label>
                    <h5 class="mb-3">book</h5>
                    <label class="text-sm text-gray-500">Status</label>
                    <h5 class="mb-3">book</h5>
                    <label class="text-sm text-gray-500">Detail Buku</label>
                    <h5 class="mb-3">book</h5>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue'

export default {
    components: {
        sidebar
    }
}
</script>