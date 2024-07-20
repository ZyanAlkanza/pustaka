<template>
    <navigation />
    <main class="h-5/6 px-20 flex">
        <div class="w-1/3 py-10 gap-y-4 flex flex-col items-center">
            <img :src="'/public/default_profile.png'" class="w-1/2 border-2 border-blue-500 rounded-full" alt="profile">
            <button
                class="w-40 py-1 text-blue-500 hover:text-white hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-600 rounded">Ubah
                Foto Profile</button>
        </div>

        <div class="w-1/3 py-10 flex flex-col rounded">
            <h1 class="mb-4 text-blue-500 font-semibold">Ubah Profil</h1>
            <form>
                <div class="username flex flex-col">
                    <label for="username" class="text-sm text-gray-500">Nama Pengguna</label>
                    <input type="text" name="username" id="username" autocomplete="off"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message h-6">
                        <!-- <small v-if="errors.username" class="text-red-500 font-semibold">{{ errors.username[0]
                                }}</small> -->
                    </div>
                </div>

                <div class="email flex flex-col">
                    <label for="email" class="text-sm text-gray-500">Email</label>
                    <input type="email" name="email" id="email"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message h-6">
                        <!-- <small v-if="errors.email" class="text-red-500 font-semibold">{{ errors.email[0] }}</small> -->
                    </div>
                </div>

                <div class="address flex flex-col">
                    <label for="address" class="text-sm text-gray-500">Alamat</label>
                    <textarea name="address" id="address"
                        class="h-32 p-2 bg-[#eaeaea] border-2 border-gray-100 resize-none"></textarea>
                    <div class="message h-6">
                        <!-- <small v-if="errors.address" class="text-red-500 font-semibold">{{ errors.address[0]
                                }}</small> -->
                    </div>
                </div>

                <div class="gender flex flex-col">
                    <label for="gender" class="text-sm text-gray-500">Jenis Kelamin</label>
                    <select name="gender" id="gender"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                        <option value="" class="text-gray-100">--Pilih--</option>
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
                    <input type="text" name="phone" id="phone"
                        class="px-2 py-1 mt-2 bg-[#eaeaea] rounded focus:outline-none border-2 border-gray-100 focus:border-blue-500">
                    <div class="message h-6">
                        <!-- <small v-if="errors.phone" class="text-red-500 font-semibold">{{ errors.phone[0] }}</small> -->
                    </div>
                </div>
            </form>
            <button type="button"
                class="py-2 mt-8 text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 ease-in-out"><i
                    class="ri-add-large-line mr-2"></i>Tambah
                Data</button>
        </div>
    </main>
</template>

<script>
import navigation from '@/components/navigation.vue'

export default {
    components: {
        navigation
    }
}
</script>