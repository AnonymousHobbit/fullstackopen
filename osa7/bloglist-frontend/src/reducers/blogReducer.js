import blogService from "../services/blogs.js"

export const initialize = (content) => {
  return async dispatch => {
    const blog = await blogService.getAll()
    dispatch({type: "INIT_BLOG", data: {blogs: blog}})
  }
}

export const newBlog = (content) => {
  return async dispatch => {
    const blog = await blogService.create(content)
    console.log(blog)
    dispatch({type: "NEW_BLOG", data: {blog: blog}})
  }
}

export const likeBlog = (content) => {
  return async dispatch => {
    const likedBlog = { ...content, likes: content.likes + 1, user: content.user.id}
    await blogService.update(likedBlog)
    dispatch({type: "LIKE_BLOG", data: {blog: { ...content, likes: content.likes+1}}})
  }
}

export const remBlog = (content) => {
  return async dispatch => {
    await blogService.remove(content)
    dispatch({type: "REM_BLOG", data: {blog: content}})
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case "NEW_BLOG":
      return state.concat(action.data.blog)
    case "INIT_BLOG":
      return action.data.blogs
    case "REM_BLOG":
      return state.filter(b => b.id !== action.data.blog)
    case "LIKE_BLOG":
      return state.map(b => b.id === action.data.blog.id ?  action.data.blog : b)
    default:
      return state
  }
}

export default reducer
