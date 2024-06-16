<template>
    <main class="h-full flex">
        <sidebar />
        <section class="w-5/6 px-10 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Dashboard</h1>
            <div class="card grid grid-cols-4 gap-x-4">
                <router-link to="/users" class="p-4 bg-white rounded text-center">
                    <div class="title"><i class="ri-user-6-line mr-2"></i>Total Pengguna</div>
                    <div class="data mt-2 text-4xl font-semibold">50</div>
                </router-link>
                <router-link to="/books" class="p-4 bg-white rounded text-center">
                    <div class="title"><i class="ri-book-open-line mr-2"></i>Total Buku</div>
                    <div class="data mt-2 text-4xl font-semibold">50</div>
                </router-link>
                <router-link to="/books" class="p-4 bg-white rounded text-center">
                    <div class="title"><i class="ri-check-line mr-2"></i>Buku Tersedia</div>
                    <div class="data mt-2 text-4xl font-semibold">50</div>
                </router-link>
                <router-link to="/books" class="p-4 bg-white rounded text-center">
                    <div class="title"><i class="ri-close-line mr-2"></i>Buku Tidak Tersedia</div>
                    <div class="data mt-2 text-4xl font-semibold">50</div>
                </router-link>

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