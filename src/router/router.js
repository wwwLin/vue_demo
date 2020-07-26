import Person from "../page/person/index.vue"
import Cat from "../page/cat/index.vue"
import Book from "../page/book/index.vue"
import Music from "../page/musical/index.vue"
import Chat from "../page/chat/index.vue"

const Router = [
    {
        path: '/',
        component: Person,
    },
    {
        path: '/person',
        component: Person,
    },
    {
        path: '/cat',
        component: Cat,
    },
    {
        path: '/book',
        component: Book,
    },
    {
        path: '/music',
        component: Music,
    }, {
        path: '/chat',
        component: Chat,
    }
]

export default Router