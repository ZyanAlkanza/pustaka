<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Edit Data Pengguna</h1>

            <div class="w-1/3 h-fit p-4 mt-2 bg-white flex flex-col rounded">
                <form @submit.prevent="editUserData">
                    <div class="username flex flex-col">
                        <label for="username">Nama Pengguna</label>
                        <input type="text" v-model="userData.username" name="username" id="username" autocomplete="off"
                            :class="errors.username ? 'border-red-500' : ''"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                        <div class="message h-6">
                            <small v-if="errors.username" class="text-red-500 font-semibold">{{ errors.username[0]
                                }}</small>
                        </div>
                    </div>

                    <div class="email flex flex-col">
                        <label for="email">Email</label>
                        <input type="email" v-model="userData.email" name="email" id="email"
                            :class="errors.email ? 'border-red-500' : ''"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                        <div class="message h-6">
                            <small v-if="errors.email" class="text-red-500 font-semibold">{{ errors.email[0] }}</small>
                        </div>
                    </div>

                    <div class="address flex flex-col">
                        <label for="address">Alamat</label>
                        <textarea v-model="userData.address" name="address" id="address"
                            :class="errors.address ? 'border-red-500' : ''"
                            class="h-32 p-2 bg-[#eaeaea] border-2 border-gray-100 resize-none"></textarea>
                        <div class="message h-6">
                            <small v-if="errors.address" class="text-red-500 font-semibold">{{ errors.address[0]
                                }}</small>
                        </div>
                    </div>

                    <div class="gender flex flex-col">
                        <label for="gender">Jenis Kelamin</label>
                        <select v-model="userData.gender" name="gender" id="gender"
                            :class="errors.gender ? 'border-red-500' : ''"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                            <option value="" class="text-gray-100">--Pilih--</option>
                            <option value="L">Laki-Laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        <div class="message h-6">
                            <small v-if="errors.gender" class="text-red-500 font-semibold">{{ errors.gender[0]
                                }}</small>
                        </div>
                    </div>

                    <div class="phone flex flex-col">
                        <label for="phone">Telepon</label>
                        <input type="text" v-model="userData.phone" name="phone" id="phone"
                            :class="errors.phone ? 'border-red-500' : ''"
                            class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                        <div class="message h-6">
                            <small v-if="errors.phone" class="text-red-500 font-semibold">{{ errors.phone[0] }}</small>
                        </div>
                    </div>
                </form>
                <button @click="editUserData" type="button"
                    class="py-2 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out"><i
                        class="ri-add-large-line mr-2"></i>Tambah
                    Data</button>
            </div>
        </section>
    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
import router from '@/router';
import axios from 'axios';

export default {
    components: {
        sidebar
    },
    data() {
        return {
            userData: {
                username: '',
                email: '',
                address: '',
                gender: '',
                phone: '',
            },
            errors: '',
            token: '',
            role: '',

        }
    },
    methods: {
        fetchUserData() {
            axios.get(`http://127.0.0.1:8000/api/user/${this.$route.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.userData = response.data.data.data;
                })
                .catch(error => {
                    console.error(error.response.data);
                })
        },
        editUserData() {
            axios.put(`http://127.0.0.1:8000/api/userEdit`,
                this.userData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    router.push({ name: 'users', query: { message: response.data.message } });
                })
                .catch(error => {
                    this.errors = error.response.data.data;
                    console.log(error.response.data.message);
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.role = localStorage.getItem('role');
        if (this.token == null || this.role != 1) {
            router.push({ name: 'login', query: { message: 'Login Dahulu!' } });
        }

        this.fetchUserData();
    },

}
</script>