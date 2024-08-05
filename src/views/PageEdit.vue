<template>
    <form action="" class="container mb-3">
        <div class="row">
            <div class="col-md-8">
                <div class="mb-3">
                    <label for="" class="form-label"> Page Title </label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="pageTitle"
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label"> Content </label>
                    <textarea
                        type="text"
                        class="form-control"
                        rows="5"
                        v-model="content"
                    ></textarea>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="mb-3">
                <label for="" class="form-label"> Link Text </label>
                <input
                    type="text"
                    class="form-control"
                    v-model="text"
                />
            </div>
            <div class="row mb-3">
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="published"
                    />
                    <label class="form-check-label" for="gridCheck1">
                        Published
                    </label>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submitEdit">
                Edit
            </button>
            <button class="btn btn-secondary me2" @click.prevent="goToPages">Cancel</button>
            <button class="btn btn-danger" @click.prevent="deletePage">Delete Page</button>
        </div>
    </form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { inject, ref } from "vue";
const { index } = defineProps(["index"]);

const router = useRouter();

const pages = inject("$pages");
const bus = inject("$bus");

const page = pages.getPage(index)

const pageTitle = ref(page.pageTitle)
const content = ref(page.content)
const text = ref(page.link.text)
const published = ref(page.published)


const editedPage = {
    pageTitle,
    content,
    link: {
        text,
    },
    published
}

function submitEdit() {
    pages.editPage(index, editedPage);

    bus.$emit("page-updated", {
        page,
        index,
    });
    goToPages()
}

function deletePage() {
    pages.deletePage(index)

    bus.$emit("page-deleted", {
        page, index
    })

    goToPages()
}

function goToPages() {
    router.push({path: "/pages"})
}
</script>
