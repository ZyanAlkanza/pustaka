<template>
    <main class="h-full flex flex-col gap-y-4 justify-start items-center">
        <div class="alert w-1/4 h-20 mt-20 flex">
            <span v-if="errorMessages" class="w-full p-4 mt-6 text-red-500 text-sm font-semibold bg-red-100 rounded">
                <i class="ri-close-large-line mr-2"></i>
                {{ errorMessages }}
            </span>
            <span v-if="successMessages"
                class="w-full p-4 mt-6 text-green-500 text-sm font-semibold bg-green-100 rounded">
                <i class="ri-check-line mr-2"></i>
                {{ successMessages }}
            </span>
        </div>
        <form class="card w-1/4 px-8 py-4 bg-gray-100 rounded">
            <h1 class="mt-2 mb-6 text-center text-blue-500 text-2xl font-semibold">Lupa Kata Sandi</h1>
            <div class="email flex flex-col gap-y-2">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="email"
                    :class="validationError.email ? 'border-red-500' : 'border-white'"
                    class="px-2 py-1 bg-white focus:outline-none border-2 focus:border-blue-500 rounded">
                <div class="validation h-6 flex justify-start">
                    <small v-if="validationError.email" class="text-red-500 leading-none font-semibold">{{
                        validationError.email[0] }}</small>
                </div>
            </div>

            <button type="button" @click="forgotPass()"
                class="w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded">
                <i class="ri-mail-send-line mr-1"></i>
                Kirim
            </button>

            <h5 class="mt-6 text-sm text-center">Belum memiliki akun? <router-link to="/register"
                    class="text-blue-500 hover:text-blue-600 font-semibold transition duration-300 ease-in-out">Registrasi</router-link>
            </h5>
        </form>
    </main>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            successMessages: '',
            errorMessages: '',
            validationError: '',
        }
    },
    methods: {
        forgotPass() {
            axios.post(`http://127.0.0.1:8000/api/forgot`, {
                email: this.email,
            })
                .then(response => {
                    this.successMessages = response.data.message + ', Silahkan cek email anda!';
                    setTimeout(() => {
                        router.push('/recovery');
                    }, 1500);
                    console.log(response.data.message);
                })
                .catch(error => {
                    this.errorMessages = error.response.data.message;

                    if (this.errorMessages) {
                        setTimeout(() => {
                            this.errorMessages = '';
                        }, 1500);
                    }

                    this.validationError = error.response.data.data || '';
                    console.error(error);
                })
        }
    },

}
</script>