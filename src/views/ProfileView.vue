<template>
    <navigation />
    <main class="h-5/6 px-20 flex">
        <div class="w-1/3 py-10 gap-y-4 flex flex-col items-center">
            <img :src="user.image ? url + user.image : '/public/default_profile.png'"
                class="w-1/2 border-2 border-blue-500 rounded-full" alt="profile">
            <button
                class="w-40 py-1 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded"><i
                    class="ri-pencil-line mr-2"></i>Edit
                Profil</button>
            <button
                class="w-40 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded">Ubah
                Kata Sandi</button>
        </div>
        <div class="w-2/3 py-10">
            <h1 class="mb-4 text-blue-500 font-semibold">Informasi Akun</h1>

            <label class="text-sm text-gray-500">Nama Pengguna</label>
            <h5 class="mb-2">{{ user.username }}</h5>
            <label class="text-sm text-gray-500">Email</label>
            <h5 class="mb-2">{{ user.email }}</h5>
            <label class="text-sm text-gray-500">Alamat</label>
            <h5 class="mb-2">{{ user.address }}</h5>
            <label class="text-sm text-gray-500">Nomor Telepon</label>
            <h5 class="mb-2">{{ user.phone }}</h5>
            <label class="text-sm text-gray-500">Tanggal Bergabung</label>
            <h5 class="mb-2">{{ date.date_format }}</h5>
        </div>
    </main>
</template>

<script>
import navigation from '@/components/navigation.vue';
import axios from 'axios';
import router from '@/router';

export default {
    components: {
        navigation
    },
    data() {
        return {
            id: localStorage.getItem('id'),
            user: '',
            date: '',
            url: 'http://127.0.0.1:8000/storage/profile/',
            token: '',
            role: '',
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
                    this.date = response.data.data;
                    console.log(response.data.data.data);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.role = localStorage.getItem('role');
        if (this.role != 3) {
            router.push('/');
            if (this.token == null) {
                router.push({ name: 'login', query: { message: 'Login Dahulu!' } });
            }

        }

        this.fetchUser();
    },
}
</script>