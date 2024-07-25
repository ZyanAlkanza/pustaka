<template>
    <main class="h-full flex flex-col gap-y-4 justify-start items-center">
        <div class="alert w-1/4 h-20 mt-20 flex">
            <span class="w-full p-4 mt-6 text-red-500 text-sm font-semibold bg-red-100 rounded">
                <i class="ri-close-large-line mr-2"></i>
                Pesan Kesalahan
            </span>
        </div>
        <form class="card w-1/4 px-8 py-4 bg-gray-100 rounded">
            <h1 class="mt-2 mb-6 text-center text-blue-500 text-2xl font-semibold">Lupa Kata Sandi</h1>
            <div class="email flex flex-col gap-y-2">
                <label for="email">Email</label>
                <input type="email" name="email" id="email"
                    class="px-2 py-1 bg-white focus:outline-none border-2 border-white focus:border-blue-500 rounded">
                <div class="validation h-6 flex justify-start">
                    <!-- <small v-if="validations.email" class="text-red-500 leading-none font-semibold">{{
                        validations.email[0] }}</small> -->
                </div>
            </div>

            <button type="submit"
                class="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded">
                <i class="ri-mail-send-line mr-1"></i>
                Kirim
            </button>

            <h5 class="mt-6 text-sm text-center">Belum memiliki akun? <router-link to="/register"
                    class="text-blue-500 hover:text-blue-600 font-semibold transition duration-300 ease-in-out">Registrasi</router-link>
            </h5>
        </form>
    </main>
</template>