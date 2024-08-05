<template>
    <h2>Page Management</h2>
    <div class="container mb-3">
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label"> Page Title </label>
                <input type="text" class="form-control" v-model="pageTitle" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label"> Content </label>
                <textarea
                    type="text"
                    class="form-control"
                    rows="5"
                    v-model="pageContent"
                ></textarea>
            </div>
            <div class="mb-3">
                <button
                    class="btn btn-primary"
                    :class="isFormInvalid"
                    @click.prevent="submitForm"
                >
                    Create Page
                </button>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label for="" class="form-label"> Link Text </label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="linkText"
                    />
                </div>
                <div class="row mb-3">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            v-model="isPublished"
                        />
                        <label class="form-check-label" for="gridCheck1">
                            Published
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { computed, inject, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const pageTitle = ref("");
const pageContent = ref("");
const linkText = ref("");
const isPublished = ref(true);

const bus = inject("$bus");
const pages = inject("$pages");

const isFormInvalid = computed(() => {
    return {
        disabled: !pageTitle.value || !pageContent.value || !linkText.value,
    };
});

watch(pageTitle, (newText, oldText) => {
    if (linkText.value === oldText.value) {
        linkText.value = newText.value;
    }
});

function submitForm() {
    if (!pageTitle.value || !pageContent.value || !linkText.value) {
        alert("Please fill the form");
        return;
    }

    const page = {
        pageTitle: pageTitle.value,
        content: pageContent.value,
        link: {
            text: linkText.value,
        },
        published: isPublished.value,
    };
    
    pages.addPage(page);

    bus.$emit("page-created", { page });

    router.push({ path: "/pages" });
}
</script>
