<script>
import searchbar from './searchbar.vue';

export default {
    data() {
        return {
            username: '',
            token: '',
        }
    },
    mounted() {
        this.username = localStorage.getItem('username');
        this.token = localStorage.getItem('token');
    },
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
            <router-link to="/login" v-if="token == null"
                class="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded">
                <i class="ri-login-box-line mr-1"></i>Masuk
            </router-link>

            <!-- <router-link to="/logout" v-if="token != null"
                class="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded">
                <i class="ri-logout-box-line mr-1"></i>Logout
            </router-link> -->

            <details class="dropdown" v-if="token != null">
                <summary class="m-1 btn bg-[#eaeaea]">Hi, {{ username }}</summary>
                <ul class="p-2 shadow menu dropdown-content z-[1] bg-gray-100 rounded-box w-52">
                    <li><router-link to="/profile"><i class="ri-user-6-line mr-1"></i>Profil</router-link></li>
                    <li><router-link to="/profile"><i class="ri-book-open-line mr-1"></i>Buku Saya</router-link></li>
                    <li><router-link to="/mark"><i class="ri-bookmark-line mr-1"></i>Koleksi</router-link></li>
                    <li><router-link to="/logout"><i class="ri-logout-box-line mr-1"></i>Keluar</router-link></li>
                </ul>
            </details>
        </div>
    </main>
</template>