<template>
    <Navigation />
    <main class="h-5/6 flex flex-col gap-y-4 justify-center items-center">
        <div class="w-96 h-14 rounded">
            <div v-if="errors"
                class="errorAlert w-full h-full px-4 py-2 flex items-center text-red-500 text-sm font-semibold bg-red-100 rounded">
                <i class="ri-close-large-line mr-2"></i>{{ errors }}
            </div>
            <div v-if="success"
                class="successAlert w-full h-full px-4 py-2 flex items-center text-green-500 text-sm font-semibold bg-green-100 rounded">
                <i class="ri-check-line mr-2"></i>{{ success }}
            </div>
        </div>
        <div class="w-96 h-min px-6 py-8 flex flex-col bg-gray-100 rounded">
            <h1 class="mb-4 text-blue-500 text-center font-semibold">Ubah Kata Sandi</h1>

            <label for="password" class="text-sm text-gray-500">Kata Sandi</label>
            <input type="password" name="password" id="password" v-model="password"
                class="px-2 py-1 focus:outline-none border-2 border-white focus:border-blue-500 rounded">
            <div class="h-6">
                <small v-if="validationError.password" class="text-red-500">{{ validationError.password[0] }}</small>
            </div>

            <label for="new_password" class="text-sm text-gray-500">Kata Sandi Baru</label>
            <input type="password" name="new_password" id="new_password" v-model="new_password"
                class="px-2 py-1 focus:outline-none border-2 border-white focus:border-blue-500 rounded">
            <div class="h-6">
                <small v-if="validationError.new_password" class="text-red-500">{{ validationError.new_password[0]
                    }}</small>
            </div>

            <label for="password_confirmation" class="text-sm text-gray-500">Konfirmasi Kata Sandi Baru</label>
            <input type="password" name="password_confirmation" id="password_confirmation"
                v-model="password_confirmation"
                class="px-2 py-1 focus:outline-none border-2 border-white focus:border-blue-500 rounded">
            <div class="h-6">
                <small v-if="validationError.password_confirmation" class="text-red-500">{{
                    validationError.password_confirmation[0]
                    }}</small>
            </div>

            <button type="submit" @click="passwordEdit()"
                class="mt-4 py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded"><i
                    class="ri-save-line mr-2"></i>Simpan
                Perubahan</button>
        </div>
    </main>
</template>

<script>
import Navigation from '@/components/navigation.vue';
import router from '@/router';
import axios from 'axios';

export default {
    components: {
        Navigation
    },
    data() {
        return {
            id: localStorage.getItem('id'),
            password: '',
            new_password: '',
            password_confirmation: '',
            errors: '',
            success: '',
            validationError: '',
        }

    },
    methods: {
        passwordEdit() {
            axios.put(`http://127.0.0.1:8000/api/passwordEdit`, {
                id: this.id,
                password: this.password,
                new_password: this.new_password,
                password_confirmation: this.password_confirmation
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.success = response.data.message;
                    setTimeout(() => {
                        router.push('/profile');
                    }, 1500);
                    console.log(response.data);
                })
                .catch(error => {
                    this.errors = error.response.data.message;
                    setTimeout(() => {
                        this.errors = '';
                    }, 1500);
                    this.validationError = error.response.data.data || '';
                    console.error(error.response.data.message);
                })
        }
    },
}
</script>