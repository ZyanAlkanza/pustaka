<script>
import searchbar from './searchbar.vue';

export default {
    components: {
        searchbar
    },
}
</script>
<template>
    <main class="h-16 px-20 flex justify-between bg-white shadow-md">
        <router-link to="/" class="flex justify-center items-center">
            <img src="/public/pustaka.png" alt="logo-pustaka" class="h-10">
            <span class="ml-[-4px] text-3xl font-bold">ustaka</span>
        </router-link>
        <div class="button flex justify-center items-center gap-x-4">
            <searchbar />
            <router-link to="/login"
                class="px-6 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded">Masuk</router-link>
        </div>
    </main>
</template>