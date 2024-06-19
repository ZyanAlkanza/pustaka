<template>
    <section class="w-1/6 shadow-lg">
        <router-link to="/" class="logo h-[10%] flex justify-center items-center">
            <img src="/public/pustaka.png" class="h-10" alt="logo">
            <span class="ml-[-3px] text-3xl font-bold">ustaka</span>
        </router-link>
        <div class="menu h-[78%] mt-4 flex flex-col gap-y-2">
            <router-link to="/dashboard" :class="{ 'text-blue-500': $route.path === '/dashboard' }"
                class="px-4 py-2 text-base hover:text-white hover:bg-blue-500 transition duration-300 ease-in-out"><i
                    class="ri-home-line mr-2"></i>Dashboard</router-link>
            <router-link to="/users" :class="{ 'text-blue-500': $route.path === '/users' }"
                class="px-4 py-2 text-base hover:text-white hover:bg-blue-500 transition duration-300 ease-in-out"><i
                    class="ri-user-6-line mr-2"></i>Pengguna</router-link>
            <router-link to="/books" :class="{ 'text-blue-500': $route.path === '/books' }"
                class="px-4 py-2 text-base hover:text-white hover:bg-blue-500 transition duration-300 ease-in-out"><i
                    class="ri-book-open-line mr-2"></i>Buku</router-link>
            <router-link to="/transaction" :class="{ 'text-blue-500': $route.path === '/transaction' }"
                class="px-4 py-2 text-base hover:text-white hover:bg-blue-500 transition duration-300 ease-in-out"><i
                    class="ri-file-transfer-line mr-2"></i>Transaksi</router-link>
        </div>
        <div class="menuLogout h-fit flex">
            <a href=""
                class="w-full h-max px-4 py-2 text-base text-red-500 hover:text-white hover:bg-red-500 transition duration-300 ease-in-out"><i
                    class="ri-logout-box-line mr-2"></i>Keluar</a>
        </div>
    </section>
</template>