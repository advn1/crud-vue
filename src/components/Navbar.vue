<template>
    <nav
        class="navbar navbar-expand-lg"
        :class="[`navbar-${theme}`, `bg-${theme}`]"
    >
        <div class="container-fluid">
            <a class="navbar-brand" href="#">My Vue</a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <NavbarLink
                    v-for="(page, index) in publishedPages"
                    :page="page"
                    :index="index"
                    :key="index"
                ></NavbarLink>
                <li>
                    <router-link
                        to="pages"
                        class="nav-link"
                        activeClass="active"
                        aria-current="page"
                        >Pages
                    </router-link>
                </li>
            </ul>
            <form class="d-flex">
                <button class="btn btn-primary" @click.prevent="changeTheme()">
                    {{ theme }}
                </button>
            </form>
        </div>
    </nav>
</template>

<script>
import NavbarLink from "./NavbarLink.vue";

export default {
    components: {
        NavbarLink,
    },
    inject: ["$pages", "$bus"],
    created() {
        this.getTheme();
        this.pages = this.$pages.getAllPages();

        this.$bus.$on("page-updated", () => {
            this.pages = [...this.$pages.getAllPages()];
        });

        this.$bus.$on("page-created", () => {
            this.pages = [...this.$pages.getAllPages()];
        });

        this.$bus.$on("page-deleted", () => {
            this.pages = [...this.$pages.getAllPages()];
        });
    },
    computed: {
        publishedPages() {
            return this.pages.filter((page) => page.published === true);
        },
    },
    data() {
        return {
            theme: "dark",
            pages: [],
        };
    },
    methods: {
        changeTheme() {
            let theme = "light";

            if (this.theme === "light") {
                theme = "dark";
            }
            this.theme = theme;
            this.setTheme();
        },
        setTheme() {
            localStorage.setItem("theme", JSON.stringify(this.theme));
        },
        getTheme() {
            let receivedTheme = localStorage.getItem("theme");
            if (receivedTheme) {
                this.theme = JSON.parse(receivedTheme);
            }
        },
    },
};
</script>

<style></style>
