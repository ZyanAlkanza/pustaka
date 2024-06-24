<template>
    <main class="h-full flex">
        <sidebar />
        <section class="w-5/6 px-5 py-4 bg-[#eaeaea]">
            <div class="header flex justify-between items-center">
                <h1 class="py-3 text-xl font-semibold">Pengguna</h1>
                <span v-if="message" class="w-2/6 p-4 text-green-500 text-sm font-semibold bg-green-100 rounded">
                    <i class="ri-check-line mr-2"></i>
                    {{ message }}
                </span>
                <div class="accessibility flex gap-4">
                    <input type="text" v-model="search" @input="searchData()"
                        class="h-max px-4 py-2 rounded focus:outline-none border-2 border-white focus:border-blue-500"
                        placeholder="Pencarian">
                    <router-link to="/userAdd" title="Tambah Data"
                        class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out">
                        <i class="ri-add-large-line"></i>
                    </router-link>
                </div>
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
                        <tr v-for="(user, index) in users" :key="user.id" class="hover:bg-gray-100">
                            <td class="px-2 py-4 text-center">{{ index + 1 + (pagination.current_page - 1) *
                                pagination.per_page }}</td>
                            <td class="truncate">{{ user.username }}</td>
                            <td class="px-2 truncate">{{ user.address }}</td>
                            <td class="px-2 truncate">{{ user.email }}</td>
                            <td>{{ user.phone }}</td>
                            <td class="text-center flex justify-center gap-2">
                                <router-link :to="`/userDetail/${user.id}`" title="Detail"
                                    class="px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">
                                    <i class="ri-eye-line"></i>
                                </router-link>
                                <router-link :to="`/userEdit/${user.id}`" title="Edit"
                                    class="px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">
                                    <i class="ri-edit-line"></i>
                                </router-link>
                                <button @click="deleteUserModal(user.id)"
                                    class="px-4 py-1 text-red-500 hover:text-white hover:bg-red-600 border-2 border-red-500 hover:border-red-600 rounded transition duration-300 ease-in-out">
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="px-4 mt-4 flex justify-end gap-4">
                    <button @click="fetchUsers(prev)" :disabled="!prev"
                        :class="[{ 'opacity-50 cursor-not-allowed': !prev }, 'px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out']">
                        <i class="ri-arrow-left-double-line"></i>
                    </button>
                    <button @click="fetchUsers(next)" :disabled="!next"
                        :class="[{ 'opacity-50 cursor-not-allowed': !next }, 'px-4 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out']">
                        <i class="ri-arrow-right-double-line"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- modal -->
        <dialog ref="deleteModal" class="modal-middle p-8 bg-[#eaeaea] shadow-lg rounded">
            <div class="modal-box flex flex-col justify-center items-center">
                <h3 class="font-bold text-lg text-red-500"><i class="ri-delete-bin-line mr-2"></i>Hapus Pengguna</h3>
                <p class="py-4">Apakah Anda yakin ingin menghapus pengguna ini?</p>
                <div class="modal-action gap-4">
                    <button @click="confirmDeleteUser"
                        class="px-6 py-2 text-red-500 hover:text-white bg-white hover:bg-red-600 border-2 border-red-500 hover:border-red-600 rounded transition duration-300 ease-in-out">Hapus</button>
                    <button @click="closeModal"
                        class="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded transition duration-300 ease-in-out">Batal</button>
                </div>
            </div>
        </dialog>
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
            message: '',
            userIdToDelete: null,
            search: '',
        }
    },
    methods: {
        fetchUsers(url = 'http://127.0.0.1:8000/api/users', search = '') {
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    search: search
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
                    console.error('Failed to fetch data', error);
                })
        },
        deleteUserModal(userId) {
            this.userIdToDelete = userId;
            this.$refs.deleteModal.showModal();
        },
        closeModal() {
            this.$refs.deleteModal.close();
        },
        confirmDeleteUser() {
            this.deleteUserData(this.userIdToDelete);
            this.closeModal();
        },
        deleteUserData(userId) {
            axios.delete(`http://127.0.0.1:8000/api/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    this.fetchUsers();
                    this.message = response.data.message;
                    if (this.message) {
                        setTimeout(() => {
                            this.message = '';
                        }, 1500);
                    }
                    console.log(response.data.message);
                })
                .catch(error => {
                    console.error('Failed to delete user', error.response.data);
                })
        },
        searchData() {
            this.fetchUsers('http://127.0.0.1:8000/api/users', this.search);
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.role = localStorage.getItem('role');
        if (this.token == null || this.role != 1) {
            router.push('/');
        }

        this.message = this.$route.query.message;
        if (this.message) {
            setTimeout(() => {
                this.message = '';
                router.push('/users');
            }, 1500);
        }
        this.fetchUsers(); // Load initial data without search
    },
}
</script>
