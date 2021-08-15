import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!', user: 'A' },
    { id: '2', title: 'Second Post', content: 'More text', user: 'B' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // postAdded: {
        //     reducer(state, action) {
        //         state.push(action.payload)
        //     },
        //     prepare(title, content) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content
        //             }
        //         }
        //     }
        // },
        postAdded(state, action) {
            state.push(action.payload)
        },
        postUpdated(state, action) {
            const { id, title, content, user } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
                existingPost.user = user
            }
        }
    }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer