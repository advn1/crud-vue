const pagesKey = 'pages'

const pagesJson = localStorage.getItem(pagesKey)
const pagesStore = JSON.parse(pagesJson)

function save() {
    localStorage.setItem("pages", JSON.stringify(pagesStore))
}

export default {
    getAllPages() {
        return pagesStore
    },

    getPage(index) {
        return pagesStore[index]
    },

    addPage(page) {
        pagesStore.push(page)
        save()
    },

    editPage(index, page) {
        pagesStore[index] = page
        save()
    },
    
    deletePage(index) {
        pagesStore.splice(index, 1)
        save()
    }
}