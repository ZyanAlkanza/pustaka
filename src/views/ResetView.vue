<template>
    <main class="h-5/6 flex flex-col gap-y-4 justify-center items-center">
        <div class="w-96 h-14 rounded">
            <div v-if="errorMessages"
                class="errorAlert w-full h-full px-4 py-2 flex items-center text-red-500 text-sm font-semibold bg-red-100 rounded">
                <i class="ri-close-large-line mr-2"></i>{{ errorMessages }}
            </div>
        </div>
        <div class="w-96 h-min px-6 py-8 flex flex-col bg-gray-100 rounded">
            <h1 class="mb-4 text-blue-500 text-center font-semibold">Reset Kata Sandi</h1>

            <label for="password" class="text-sm text-gray-500">Kata Sandi</label>
            <input type="password" name="password" id="password" v-model="password"
                class="px-2 py-1 focus:outline-none border-2 border-white focus:border-blue-500 rounded">
            <div class="h-6">
                <small v-if="validationError.password" class="text-red-500">{{ validationError.password[0] }}</small>
            </div>

            <label for="password_confirmation" class="text-sm text-gray-500">Konfirmasi Kata Sandi</label>
            <input type="password" name="password_confirmation" id="password_confirmation"
                v-model="password_confirmation"
                class="px-2 py-1 focus:outline-none border-2 border-white focus:border-blue-500 rounded">
            <div class="h-6">
                <small v-if="validationError.password_confirmation" class="text-red-500">{{
                    validationError.password_confirmation[0]
                }}</small>
            </div>

            <button type="submit" @click="resetPass()"
                class="mt-4 py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded"><i
                    class="ri-save-line mr-2"></i>Simpan
                Perubahan</button>
        </div>
    </main>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
    data() {
        return {
            password: '',
            password_confirmation: '',
            email: sessionStorage.getItem('email'),
            errorMessages: '',
            validationError: '',
        }
    },
    methods: {
        resetPass() {
            axios.post('http://127.0.0.1:8000/api/reset', {
                password: this.password,
                password_confirmation: this.password_confirmation,
                email: this.email
            })
                .then(response => {
                    sessionStorage.removeItem('email');
                    router.push({ name: 'login', query: { message: 'Reset Berhasil, Silahkan Login!' } });
                    console.log(response.data.message);
                })
                .catch(error => {
                    this.errorMessages = error.response.data.message;
                    if (this.errorMessages) {
                        setTimeout(() => {
                            this.errorMessages = ''
                        }, 1500);
                    }

                    this.validationError = error.response.data.data || '';
                    console.log(error.response);
                })
        }
    },
}
</script>