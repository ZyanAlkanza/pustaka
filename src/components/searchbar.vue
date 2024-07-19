<template>
    <input type="text" v-model="searchQuery" @input="onSearch"
        class="w-60 px-2 py-2 bg-[#eaeaea] focus:outline-none border-2 border-[#eaeaea] focus:border-blue-500 rounded"
        placeholder="Pencarian..." autocomplete="off">
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
        }
    },
    methods: {
        onSearch() {
            this.$emit('search', this.searchQuery);
        }
    }
}
</script>