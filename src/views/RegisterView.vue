<template>
    <main class="h-full flex flex-col gap-y-2 justify-start items-center">
        <div class="w-2/5 h-12 mt-12 flex items-center">
            <span v-if="errors" class="w-full p-3 text-red-500 text-sm font-semibold bg-red-100 rounded">
                <i class="ri-close-large-line mr-2"></i>
                {{ errors }}
            </span>
            <span v-if="alert" class="w-full p-3 text-green-500 text-sm font-semibold bg-green-100 rounded">
                <i class="ri-check-line mr-2"></i>
                {{ alert }}
            </span>
        </div>
        <div class="card w-2/5 px-8 p-2 bg-gray-100 rounded">
            <h1 class="mt-2 mb-6 text-center text-blue-500 text-2xl font-semibold">Registrasi</h1>
            <form @submit.prevent="register" class="card flex flex-row gap-4">
                <div class="left-col w-1/2">
                    <div class="username flex flex-col gap-y-2">
                        <label for="username">Nama Pengguna</label>
                        <input type="text" v-model="username" name="username" id="username"
                            class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                        <div class="validation h-6 flex justify-start">
                            <small v-if="validations.username" class="text-red-500 leading-none font-semibold">{{
                                validations.username[0] }}</small>
                        </div>
                    </div>
                    <div class="email flex flex-col gap-y-2">
                        <label for="email">Email</label>
                        <input type="text" v-model="email" name="email" id="email"
                            class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                        <div class="validation h-6 flex justify-start">
                            <small v-if="validations.email" class="text-red-500 leading-none font-semibold">{{
                                validations.email[0] }}</small>
                        </div>
                    </div>
                    <div class="password flex flex-col gap-y-2">
                        <label for="password">Kata Sandi</label>
                        <input type="password" v-model="password" name="password" id="password"
                            class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                        <div class="validation h-6 flex justify-start">
                            <small v-if="validations.password" class="text-red-500 leading-none font-semibold">{{
                                validations.password[0] }}</small>
                        </div>
                    </div>
                    <div class="password-confirm flex flex-col gap-y-2">
                        <label for="password-confirmation">Konfirmasi Kata Sandi</label>
                        <input type="password" v-model="password_confirmation" name="password-confirmation"
                            id="password-confirmation"
                            class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                        <!-- <div class="validation h-6 flex justify-start">
                            <small v-if="validations" class="text-red-500 leading-none font-semibold">{{
                                validations.password_confirmation[0] }}</small>
                        </div> -->
                    </div>
                </div>
                <div class="right-col w-1/2">
                    <div class="address flex flex-col gap-y-2">
                        <label for="address">Alamat</label>
                        <!-- <input type="text" name="address" id="address"
                            class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded"> -->
                        <textarea name="address" v-model="address" id="address" maxlength="155"
                            class="h-[135px] p-1 resize-none"></textarea>
                        <div class="validation h-6 flex justify-start">
                            <small v-if="validations.address" class="text-red-500 leading-none font-semibold">{{
                                validations.address[0] }}</small>
                        </div>
                    </div>
                    <div class="phone flex flex-col gap-y-2">
                        <label for="phone">Nomor Telepon</label>
                        <input type="text" v-model="phone" name="phone" id="phone"
                            class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                        <div class="validation h-6 flex justify-start">
                            <small v-if="validations.phone" class="text-red-500 leading-none font-semibold">{{
                                validations.phone[0] }}</small>
                        </div>
                    </div>
                    <div class="gender flex flex-col gap-y-2">
                        <label for="gender">Jenis Kelamin</label>
                        <select v-model="gender" name="gender" id="gender"
                            class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                            <option value="">--Pilih--</option>
                            <option value="L">Pria</option>
                            <option value="P">Wanita</option>
                        </select>
                        <div class="validation h-6 flex justify-start">
                            <small v-if="validations.gender" class="text-red-500 leading-none font-semibold">{{
                                validations.gender[0] }}</small>
                        </div>
                    </div>
                </div>
            </form>
            <button @click="register" type="button"
                class="w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded">
                <i class="ri-check-line"></i>
                Daftar
            </button>
            <h5 class="my-6 text-sm text-center">Sudah memiliki akun? <router-link to="/login"
                    class="text-blue-500 hover:text-blue-600 font-semibold transition duration-300 ease-in-out">Masuk</router-link>
            </h5>
        </div>
    </main>
</template>
<script>
import axios from 'axios';
import router from '@/router';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            address: '',
            phone: '',
            gender: '',
            errors: '',
            validations: '',
            alert: '',
        }
    },
    methods: {
        register() {
            axios.post('http://127.0.0.1:8000/api/register', {
                username: this.username,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
                address: this.address,
                phone: this.phone,
                gender: this.gender,
            })
                .then(response => {
                    this.alert = response.data.message;
                    router.push({ name: 'login', query: { message: response.data.message + '. Silahkan Login' } })
                })
                .catch(error => {
                    this.errors = error.response.data.message;
                    if (this.errors) {
                        setTimeout(() => {
                            this.errors = '';
                        }, 1500);
                    }
                    this.validations = error.response.data.data;
                })
        }
    },
}
</script>