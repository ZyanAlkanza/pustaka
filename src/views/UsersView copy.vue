<template>
    <main class="h-full flex">
        <sidebar />
        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <h1 class="py-3 text-xl font-semibold">Users</h1>
            <div class="table mt-2">
                <table class="w-full table-fixed bg-white rounded">
                    <thead class="text-left">
                        <tr>
                            <th scope="col" class="w-[3%] px-2 py-4">No</th>
                            <th scope="col" class="w-[15%]">Nama</th>
                            <th scope="col" class="w-[20%] px-2">Alamat</th>
                            <th scope="col" class="w-[20%] px-2">Email</th>
                            <th scope="col" class="w-[10%]">No Telp</th>
                            <th scope="col" class="w-[20%] text-center">Aksi</th>
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
                                <a href=""
                                    class="px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">Detail</a>
                                <a href=""
                                    class="px-4 py-1 mx-2 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">Ubah</a>
                                <button
                                    class="px-4 py-1 text-red-500 hover:text-white hover:bg-red-600 border-2 border-red-500 hover:border-red-600 rounded transition duration-300 ease-in-out">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="mt-4 flex justify-end gap-4">
                    <button @click="fetchUsers(prev)" :disabled="!prev"
                        class="px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">Previous</button>
                    <button @click="fetchUsers(next)" :disabled="!next"
                        class="px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">Next</button>
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
                    console.error('Failed to fetch data:', error);
                })
        }
    },
    mounted() {
        this.fetchUsers();
    },
}
</script>
