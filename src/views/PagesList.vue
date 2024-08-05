<template>
    <h2>Pages</h2>
    <div class="text-end">
        <router-link to="pages/create" class="btn btn-primary btn-sm">
            New Page
        </router-link>
    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Title</th>
                <th>Link Text</th>
                <th>Is Published</th>
            </tr>
        </thead>
        <tbody>
            <tr @click.prevent="goToPage(index)" v-for="(page, index) in pages">
                <td>{{ page.pageTitle }}</td>
                <td>{{ page.link.text }}</td>
                <td>{{ page.published ? "Yes" : "No" }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const pages = inject("$pages").getAllPages();
const router = useRouter()

function goToPage(index) {
    router.push({path: `pages/${index}/edit`})
}
</script>

<style scoped>
.table.table-hover tr:hover {
    cursor: pointer;
}
</style>