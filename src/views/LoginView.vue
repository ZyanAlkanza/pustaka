<template>
    <main class="h-full flex flex-col gap-y-4 justify-start items-center">
        <div class="alert w-1/4 h-20 mt-20 flex">
            <span v-if="errors" class="w-full p-4 mt-6 text-red-500 text-sm font-semibold bg-red-100 rounded">
                <i class="ri-close-large-line mr-2"></i>
                {{ errors.message }}
            </span>
            <span v-if="alert" class="w-full p-4 mt-6 text-green-500 text-sm font-semibold bg-green-100 rounded">
                <i class="ri-check-line mr-2"></i>
                {{ alert }}
            </span>
            <span v-if="message" class="w-full p-4 mt-6 text-green-500 text-sm font-semibold bg-green-100 rounded">
                <i class="ri-check-line mr-2"></i>
                {{ message }}
            </span>
        </div>
        <form @submit.prevent="login" class="card w-1/4 px-8 py-4 bg-gray-100 rounded">
            <h1 class="mt-2 mb-6 text-center text-blue-500 text-2xl font-semibold">Masuk</h1>
            <div class="email flex flex-col gap-y-2">
                <label for="email">Email</label>
                <input type="email" v-model="email" name="email" id="email"
                    class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                <div class="validation h-6 flex justify-start">
                    <small v-if="validations.email" class="text-red-500 leading-none font-semibold">{{
                        validations.email[0] }}</small>
                </div>
            </div>
            <div class="password mb-6 flex flex-col gap-y-2">
                <label for="password">Kata Sandi</label>
                <input type="password" v-model="password" name="password" id="password"
                    class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                <div class="validation h-6 flex justify-start">
                    <small v-if="validations.password" class="text-red-500 leading-none font-semibold">{{
                        validations.password[0] }}</small>
                </div>
            </div>
            <button type="submit"
                class="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded">
                <i class="ri-login-box-line mr-1"></i>
                Masuk
            </button>
            <h5 class="my-6 text-sm text-center">Belum memiliki akun? <router-link to="/register"
                    class="text-blue-500 hover:text-blue-600 font-semibold transition duration-300 ease-in-out">Registrasi</router-link>
            </h5>
        </form>
    </main>
</template>

<script>
import router from '@/router'
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: '',
            alert: '',
            errors: '',
            validations: '',
            token: '',
            message: '',
        }
    },
    methods: {
        login() {
            axios.post('http://127.0.0.1:8000/api/login', {
                email: this.email,
                password: this.password
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', response.data.data.username);
                    localStorage.setItem('role', response.data.data.role);
                    this.alert = response.data.message;
                    if (response.data.data.role == 1) {
                        setTimeout(() => {
                            router.push('/')
                        }, 1500);
                    } else if (response.data.data.role == 3) {
                        setTimeout(() => {
                            router.push('/')
                        }, 1500);
                    }
                })
                .catch(error => {
                    this.errors = error.response.data;
                    if (this.errors) {
                        setTimeout(() => {
                            this.errors = '';
                        }, 1500);
                    }
                    this.validations = error.response.data.data;
                });
        }

    },
    mounted() {
        this.message = this.$route.query.message;
        if (this.message) {
            setTimeout(() => {
                this.message = '';
                router.push('/login')
            }, 1500);
        }

        this.token = localStorage.getItem('token');
        if (this.token) {
            router.push('/');
        }
    },
}
</script>
