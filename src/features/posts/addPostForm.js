import React, { useState } from 'react'
import { postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)
    // function postAdded(title, content) {
    //     const id = nanoid()
    //     return {
    //         type: 'posts/postAdded',
    //         payload: { id, title, content }
    //     }
    // }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content,
                    user: userId
                })
            )

            setTitle('')
            setContent('')
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>

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