<template>
    <main class="h-full flex">
        <sidebar />

        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold"> Detail Pengguna</h1>

            <div class="h-5/6 px-4 py-8 mt-2 bg-white flex rounded">
                <div class="image w-1/6 flex justify-center">

                    <img :src="userData.image ? url + userData.image : '/default_profile.png'"
                        class="w-40 h-40 border-2 border-blue-500 rounded-full" alt="profile-image">
                </div>
                <div class="info w-3/6 ml-4 flex flex-col">
                    <label class="text-sm text-gray-500">Nama Pengguna</label>
                    <h5 class="mb-3">{{ userData.username }}</h5>
                    <label class="text-sm text-gray-500">Email</label>
                    <h5 class="mb-3">{{ userData.email }}</h5>
                    <label class="text-sm text-gray-500">No Telepon</label>
                    <h5 class="mb-3">{{ userData.phone }}</h5>
                    <label class="text-sm text-gray-500">Alamat Rumah</label>
                    <h5 class="mb-3">{{ userData.address }}</h5>
                    <label class="text-sm text-gray-500">Tanggal Bergabung</label>
                    <h5 class="mb-3">{{ dateFormat }}</h5>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
import axios from 'axios';

export default {
    components: {
        sidebar,
    },
    data() {
        return {
            userData: '',
            dateFormat: '',
            url: 'http://127.0.0.1:8000/storage/profile/',
        }
    },
    methods: {
        fetchUserDetail() {
            axios.get(`http://127.0.0.1:8000/api/user/${this.$route.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.userData = response.data.data.data;
                    this.dateFormat = response.data.data.date_format;
                })
                .catch(error => {
                    console.error(error);
                })
        },
    },
    mounted() {
        this.fetchUserDetail();
    },
}
</script>