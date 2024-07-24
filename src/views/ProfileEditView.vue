<template>
    <navigation />
    <main class="h-5/6 px-20 flex">
        <div class="w-1/3 py-10 gap-y-4 flex flex-col items-center">
            <img :src="imagePreview || (user.image ? url + user.image : '/public/default_profile.png')"
                class="w-1/2 border-2 border-blue-500 rounded-full" alt="profile" />
        </div>

        <div class="w-1/3 py-10 flex flex-col rounded">
            <div class="mb-4 flex justify-between">
                <h1 class="text-blue-500 font-semibold">Ubah Profil</h1>
                <button type="button" @click="editProfile()"
                    class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out">
                    <i class="ri-save-line mr-2"></i>Simpan Perubahan
                </button>
            </div>
            <form @submit.prevent="editProfile">
                <input type="hidden" name="" id="" v-model="user.id" />

                <div class="username flex flex-col">
                    <label for="username" class="text-sm text-gray-500">Nama Pengguna</label>
                    <input type="text" name="username" id="username" autocomplete="off" v-model="user.username"
                        :class="validationError.username ? 'border-red-500' : ''"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500" />
                    <div class="message h-6">
                        <small v-if="validationError.username" class="text-red-500 font-semibold">{{
                            validationError.username[0] }}</small>
                    </div>
                </div>

                <div class="email flex flex-col">
                    <label for="email" class="text-sm text-gray-500">Email</label>
                    <input type="email" name="email" id="email" v-model="user.email"
                        :class="validationError.email ? 'border-red-500' : ''"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500" />
                    <div class="message h-6">
                        <small v-if="validationError.email" class="text-red-500 font-semibold">{{
                            validationError.email[0] }}</small>
                    </div>
                </div>

                <div class="address flex flex-col">
                    <label for="address" class="text-sm text-gray-500">Alamat</label>
                    <textarea name="address" id="address" v-model="user.address"
                        :class="validationError.address ? 'border-red-500' : ''"
                        class="h-20 p-2 bg-[#eaeaea] border-2 border-gray-100 resize-none"></textarea>
                    <div class="message h-6">
                        <small v-if="validationError.address" class="text-red-500 font-semibold">{{
                            validationError.address[0] }}</small>
                    </div>
                </div>

                <div class="image flex flex-col">
                    <label for="image" class="text-sm text-gray-500">Foto Profil</label>
                    <input type="file" name="image" id="image" @change="previewImage"
                        :class="validationError.image ? 'border-red-500' : ''"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500" />
                    <div class="message h-6">
                        <small v-if="validationError.image" class="text-red-500 font-semibold">{{
                            validationError.image[0] }}</small>
                    </div>
                </div>

                <div class="gender flex flex-col">
                    <label for="gender" class="text-sm text-gray-500">Jenis Kelamin</label>
                    <select name="gender" id="gender" v-model="user.gender"
                        :class="validationError.gender ? 'border-red-500' : ''"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                        <option value="">--Pilih--</option>
                        <option value="L">Laki-Laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    <div class="message h-6">
                        <small v-if="validationError.gender" class="text-red-500 font-semibold">{{
                            validationError.gender[0] }}</small>
                    </div>
                </div>

                <div class="phone flex flex-col">
                    <label for="phone" class="text-sm text-gray-500">Telepon</label>
                    <input type="text" name="phone" id="phone" v-model="user.phone"
                        :class="validationError.phone ? 'border-red-500' : ''"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500" />
                    <div class="message h-6">
                        <small v-if="validationError.phone" class="text-red-500 font-semibold">{{
                            validationError.phone[0] }}</small>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import navigation from "@/components/navigation.vue";
import router from "@/router";
import axios from "axios";

export default {
    components: {
        navigation,
    },
    data() {
        return {
            user: {
                id: "",
                username: "",
                email: "",
                address: "",
                gender: "",
                phone: "",
                image: "",
            },
            url: "http://127.0.0.1:8000/storage/profile/",
            id: localStorage.getItem("id"),
            imagePreview: "",
            validationError: "",
        };
    },
    methods: {
        fetchUser() {
            axios
                .get(`http://127.0.0.1:8000/api/user/${this.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    this.user = response.data.data.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        editProfile() {
            const formData = new FormData();
            formData.append("_method", "patch");
            formData.append("id", this.id);
            formData.append("username", this.user.username);
            formData.append("email", this.user.email);
            formData.append("address", this.user.address);
            formData.append("gender", this.user.gender);
            formData.append("phone", this.user.phone);
            if (this.user.image instanceof File) {
                formData.append("image", this.user.image);
            }

            axios
                .post(`http://127.0.0.1:8000/api/userEdit`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    localStorage.setItem("username", this.user.username);
                    router.push({
                        name: "profile",
                        query: { message: response.data.message },
                    });
                    console.log(this.user.username);
                })
                .catch((error) => {
                    this.validationError = error.response.data.data || "";
                    console.error(error.response.data.data);
                });
        },
        previewImage(event) {
            const file = event.target.files[0];
            this.user.image = file;
            this.imagePreview = URL.createObjectURL(file);
        },
    },
    mounted() {
        this.fetchUser();
    },
};
</script>
