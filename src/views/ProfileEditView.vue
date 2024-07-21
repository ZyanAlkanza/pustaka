<template>
    <navigation />
    <main class="h-5/6 px-20 flex">
        <div class="w-1/3 py-10 gap-y-4 flex flex-col items-center">
            <img :src="'/public/default_profile.png'" class="w-1/2 border-2 border-blue-500 rounded-full" alt="profile">
        </div>

        <div class="w-1/3 py-10 flex flex-col rounded">
            <div class="mb-4 flex justify-between">
                <h1 class="text-blue-500 font-semibold">Ubah Profil</h1>
                <button type="button" @click="editProfile()"
                    class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out"><i
                        class="ri-save-line mr-2"></i>Simpan Perubahan</button>
            </div>
            <form>
                <input type="hidden" name="" id="" v-model="user.id">

                <div class="username flex flex-col">
                    <label for="username" class="text-sm text-gray-500">Nama Pengguna</label>
                    <input type="text" name="username" id="username" autocomplete="off" v-model="user.username"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message h-6">
                        <!-- <small v-if="errors.username" class="text-red-500 font-semibold">{{ errors.username[0]
                                }}</small> -->
                    </div>
                </div>

                <div class="email flex flex-col">
                    <label for="email" class="text-sm text-gray-500">Email</label>
                    <input type="email" name="email" id="email" v-model="user.email"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message h-6">
                        <!-- <small v-if="errors.email" class="text-red-500 font-semibold">{{ errors.email[0] }}</small> -->
                    </div>
                </div>

                <div class="address flex flex-col">
                    <label for="address" class="text-sm text-gray-500">Alamat</label>
                    <textarea name="address" id="address" v-model="user.address"
                        class="h-20 p-2 bg-[#eaeaea] border-2 border-gray-100 resize-none"></textarea>
                    <div class="message h-6">
                        <!-- <small v-if="errors.address" class="text-red-500 font-semibold">{{ errors.address[0]
                                }}</small> -->
                    </div>
                </div>

                <div class="image flex flex-col">
                    <label for="image" class="text-sm text-gray-500">Foto Profil</label>
                    <input type="file" name="image" id="image"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message h-6">
                        <!-- <small v-if="errors.image" class="text-red-500 font-semibold">{{
                            errors.image[0]
                        }}</small> -->
                    </div>
                </div>

                <div class="gender flex flex-col">
                    <label for="gender" class="text-sm text-gray-500">Jenis Kelamin</label>
                    <select name="gender" id="gender" v-model="user.gender"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                        <option value="">--Pilih--</option>
                        <option value="L">Laki-Laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    <div class="message h-6">
                        <!-- <small v-if="errors.gender" class="text-red-500 font-semibold">{{ errors.gender[0]
                                }}</small> -->
                    </div>
                </div>

                <div class="phone flex flex-col">
                    <label for="phone" class="text-sm text-gray-500">Telepon</label>
                    <input type="text" name="phone" id="phone" v-model="user.phone"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message h-6">
                        <!-- <small v-if="errors.phone" class="text-red-500 font-semibold">{{ errors.phone[0] }}</small> -->
                    </div>
                </div>
            </form>

        </div>
    </main>
</template>

<script>
import navigation from '@/components/navigation.vue'
import router from '@/router';
import axios from 'axios';

export default {
    components: {
        navigation
    },
    data() {
        return {
            user: {
                id: '',
                username: '',
                email: '',
                address: '',
                gender: '',
                phone: '',
                image: '',
            },
            url: 'http://127.0.0.1:8000/storage/profile/',
            id: localStorage.getItem('id')
        }
    },
    methods: {
        fetchUser() {
            axios.get(`http://127.0.0.1:8000/api/user/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.user = response.data.data.data;
                })
                .catch(error => {
                    console.error(error);
                })
        },
        editProfile() {
            axios.put(`http://127.0.0.1:8000/api/userEdit`, this.user, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    localStorage.setItem('username', this.user.username);
                    router.push({ name: 'profile', query: { message: response.data.message } });
                    console.log(this.user.username);
                })
                .catch(error => {
                    console.error(error);
                })
            // console.log(this.user);
        }
    },
    mounted() {
        this.fetchUser();
    },
}
</script>