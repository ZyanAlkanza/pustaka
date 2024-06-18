<template>
    <main class="h-full flex">
        <sidebar />
        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <div class="header flex justify-between items-center">
                <h1 class="py-3 text-xl font-semibold">Pengguna</h1>
                <input type="text"
                    class="h-max px-4 py-2 rounded focus:outline-none border-2 border-white focus:border-blue-500"
                    placeholder="Pencarian">
            </div>
            <div class="table mt-2">
                <table class="w-full table-fixed bg-white rounded">
                    <thead class="text-left">
                        <tr>
                            <td scope="col" class="w-[3%] px-2 py-4 text-center">No</td>
                            <td scope="col" class="w-[15%]">Nama</td>
                            <td scope="col" class="w-[20%] px-2">Alamat</td>
                            <td scope="col" class="w-[20%] px-2">Email</td>
                            <td scope="col" class="w-[10%]">No Telp</td>
                            <td scope="col" class="w-[20%] text-center">Aksi</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="index" class="hover:bg-gray-100">
                            <td class="px-2 py-4 text-center">{{ index + 1 + (pagination.current_page - 1) *
                                pagination.per_page }}</td>
                            <td class="truncate">{{ user.username }}</td>
                            <td class="px-2 truncate">{{ user.address }}</td>
                            <td class="px-2 truncate">{{ user.email }}</td>
                            <td class="">{{ user.phone }}</td>
                            <td class="text-center">
                                <router-link :to="`/userDetail/${user.id}`" title="Detail"
                                    class="px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out"><i
                                        class="ri-eye-line"></i></router-link>
                                <a href="" title="Edit"
                                    class="px-4 py-1 mx-2 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out"><i
                                        class="ri-edit-line"></i></a>
                                <button title="Hapus"
                                    class="px-4 py-1 text-red-500 hover:text-white hover:bg-red-600 border-2 border-red-500 hover:border-red-600 rounded transition duration-300 ease-in-out"><i
                                        class="ri-delete-bin-line"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="px-4 mt-4 flex justify-end gap-4">
                    <button @click="fetchUsers(prev)" :disabled="!prev"
                        :class="[{ 'disabled:opacity-50 disabled:cursor-not-allowed': !prev }, 'px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out']"><i
                            class="ri-arrow-left-double-line"></i></button>
                    <button @click="fetchUsers(next)" :disabled="!next"
                        :class="[{ 'disabled:opacity-50 disabled:cursor-not-allowed': !next }, 'px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out']"><i
                            class="ri-arrow-right-double-line"></i></button>
                </div>
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
            users: [],
            next: '',
            prev: '',
            pagination: {
                current_page: 1,
                per_page: 10,
            },
            token: '',
            role: '',
        }
    },
    methods: {
        fetchUsers(url = 'http://127.0.0.1:8000/api/users') {
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    const data = response.data.data;
                    this.users = data.data;
                    this.pagination = {
                        current_page: data.current_page,
                        per_page: data.per_page,
                    };
                    this.next = data.next_page_url;
                    this.prev = data.prev_page_url;
                })
                .catch(error => {
                    console.error(error, 'Failed to fetch data');
                })
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.role = localStorage.getItem('role');
        if (this.token == null || this.role != 1) {
            router.push('/');
        }
        this.fetchUsers();
    },
}
</script>