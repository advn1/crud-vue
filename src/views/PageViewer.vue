<template>
    <div v-if="page" id="app" class="container">
        <h1>{{ page.pageTitle }}</h1>
        <p>{{ page.content }}</p>
    </div>
</template>

<script>
export default {
    props: ['index'],
    inject: ['$pages'],
    created() {
        this.page = this.$pages.getPage(this.$route.params.index);
    },
    data() {
        return {
            page: null,
        };
    },
    watch: {
        index(newIndex, oldIndex) {
            if (newIndex !== oldIndex) {
                this.page = this.$pages.getPage(newIndex)
            }
        }
    }
};
</script>

<style></style>
