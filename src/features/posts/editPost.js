import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'

export const EditPost = ({ match }) => {
    const { postId } = match.params
    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )
    const users = useSelector(state => state.users)

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const [userId, setUserId] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()
    
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content,user: userId }))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1" >Post Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div className="form-group">
                    <label >Author:</label>
                    <select className="form-control form-control-lg" id="postAuthor" value={userId} onChange={onAuthorChanged}>
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>
                <div className="form-group">
                <label >Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                </div>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post
                </button>

            </form>
        </section>
    )
}