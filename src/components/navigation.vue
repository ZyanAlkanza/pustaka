<template>
    <main class="h-16 px-20 flex justify-between bg-white shadow-md">
        <router-link to="/" class="flex justify-center items-center">
            <img src="/public/pustaka.png" alt="logo-pustaka" class="h-10">
            <span class="ml-[-4px] text-3xl font-bold">ustaka</span>
        </router-link>
        <div class="button flex justify-center items-center gap-x-4">
            <searchbar v-if="$route.name == 'home'" />
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
                <ul class="p-2 shadow menu dropdown-content z-[1] bg-gray-100 rounded-md w-52">
                    <li class="px-2 py-2 hover:bg-gray-200 rounded-md"><router-link to="/profile"><i
                                class="ri-user-6-line mr-1"></i>Profil</router-link></li>
                    <li class="px-2 py-2 hover:bg-gray-200 rounded-md"><router-link to="/profile"><i
                                class="ri-book-open-line mr-1"></i>Buku Saya</router-link></li>
                    <li class="px-2 py-2 hover:bg-gray-200 rounded-md"><router-link to="/mark"><i
                                class="ri-bookmark-line mr-1"></i>Koleksi</router-link></li>
                    <li class="px-2 py-2 text-red-500 hover:bg-gray-200 rounded-md"><a href="#" @click="logout()"><i
                                class="ri-logout-box-line mr-1"></i>Keluar</a></li>
                    <!-- <li><router-link to="/logout"><i class="ri-logout-box-line mr-1"></i>Keluar</router-link></li> -->
                </ul>
            </details>
        </div>
    </main>
</template>

<script>
import searchbar from './searchbar.vue';
import axios from 'axios'
import router from '@/router'

export default {
    data() {
        return {
            delay: false,
            username: '',
            token: '',
        }
    },
    mounted() {
        setTimeout(() => {
            this.delay = true;
        }, 200);
        this.username = localStorage.getItem('username');
        this.token = localStorage.getItem('token');
    },
    components: {
        searchbar
    },
    methods: {
        logout() {
            axios.get('http://127.0.0.1:8000/api/logout', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    router.push({ name: 'login', query: { message: response.data.message } })
                    // console.log(response.data.message);
                })
                .catch(error => {
                    console.log('gagal');
                });
        }
    },
}
</script>