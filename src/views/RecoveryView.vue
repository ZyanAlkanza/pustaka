<template>
    <main>
        <main class="h-full flex flex-col gap-y-4 justify-start items-center">
            <div class="alert w-1/4 h-20 mt-20 flex">
                <span v-if="errorMessages"
                    class="w-full p-4 mt-6 text-red-500 text-sm font-semibold bg-red-100 rounded">
                    <i class="ri-close-large-line mr-2"></i>
                    {{ errorMessages }}
                </span>
            </div>
            <form class="card w-1/4 px-8 py-4 bg-gray-100 rounded">
                <h1 class="mt-2 mb-6 text-center text-blue-500 text-2xl font-semibold">Pemulihan Akun</h1>
                <div class="email flex flex-col gap-y-2">
                    <label for="email">Masukkan kode pemulihan anda</label>
                    <div class="flex justify-center gap-x-2">
                        <input type="text" inputmode="numeric" name="code_1" id="code_1" maxlength="1" v-model="code_1"
                            autocomplete="off" :class="validationError.token ? 'border-red-500' : 'border-white'"
                            class="px-2 py-1 w-12 bg-white focus:outline-none border-2 focus:border-blue-500 rounded">
                        <input type="text" inputmode="numeric" name="code_2" id="code_2" maxlength="1" v-model="code_2"
                            autocomplete="off" :class="validationError.token ? 'border-red-500' : 'border-white'"
                            class="px-2 py-1 w-12 bg-white focus:outline-none border-2 focus:border-blue-500 rounded">
                        <input type="text" inputmode="numeric" name="code_3" id="code_3" maxlength="1" v-model="code_3"
                            autocomplete="off" :class="validationError.token ? 'border-red-500' : 'border-white'"
                            class="px-2 py-1 w-12 bg-white focus:outline-none border-2 focus:border-blue-500 rounded">
                        <input type="text" inputmode="numeric" name="code_4" id="code_4" maxlength="1" v-model="code_4"
                            autocomplete="off" :class="validationError.token ? 'border-red-500' : 'border-white'"
                            class="px-2 py-1 w-12 bg-white focus:outline-none border-2 focus:border-blue-500 rounded">
                        <input type="text" inputmode="numeric" name="code_5" id="code_5" maxlength="1" v-model="code_5"
                            autocomplete="off" :class="validationError.token ? 'border-red-500' : 'border-white'"
                            class="px-2 py-1 w-12 bg-white focus:outline-none border-2 focus:border-blue-500 rounded">
                        <input type="text" inputmode="numeric" name="code_6" id="code_6" maxlength="1" v-model="code_6"
                            autocomplete="off" :class="validationError.token ? 'border-red-500' : 'border-white'"
                            class="px-2 py-1 w-12 bg-white focus:outline-none border-2 focus:border-blue-500 rounded">
                    </div>
                    <div class="validation h-6 flex justify-start">
                        <small v-if="validationError.token" class="text-red-500 leading-none font-semibold">{{
                            validationError.token[0] }}</small>
                    </div>
                </div>

                <button type="button" @click="recoveryPass()"
                    class="w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded">
                    <i class="ri-mail-send-line mr-1"></i>
                    Kirim
                </button>
            </form>
        </main>
    </main>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
    data() {
        return {
            code_1: '',
            code_2: '',
            code_3: '',
            code_4: '',
            code_5: '',
            code_6: '',
            email: sessionStorage.getItem('email'),
            errorMessages: '',
            validationError: '',
        }
    },
    methods: {
        recoveryPass() {
            axios.post('http://127.0.0.1:8000/api/recovery', {
                token: this.code_1 + this.code_2 + this.code_3 + this.code_4 + this.code_5 + this.code_6,
                email: this.email
            })
                .then(response => {
                    console.log(response.data.message);
                    router.push('/reset');
                })
                .catch(error => {
                    this.errorMessages = error.response.data.message;
                    if (this.errorMessages) {
                        setTimeout(() => {
                            this.errorMessages = '';
                        }, 1500);
                    }
                    this.validationError = error.response.data.data || '';
                    console.log(error.response.data.data);
                })
        }
    },
}
</script>