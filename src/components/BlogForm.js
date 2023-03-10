const BlogForm = ({ addBlog, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl}) => {
  return (
    <div>
      <h2>Create a new blog</h2>

      <form style={{display: "flex", flexDirection: "column", width: "20%", gap:"20px"}} onSubmit={addBlog}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <label name='title'>title:</label>
      <input
        id='title'
        defaultValue={newTitle}
        onChange={(event) => handleTitleChange(event.target.value)}
      />
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <label name='author'>author:</label>
      <input
        id='author'
        defaultValue={newAuthor}
        onChange={(event) => handleAuthorChange(event.target.value)}
      />
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <label name='url'>url:</label>
      <input
      id='url'
      defaultValue={newUrl}
      onChange={(event) => handleUrlChange(event.target.value)}
      />
      </div>
    <button style={{width:"40%", marginTop: "20px"}} type="submit">create</button>
        
    </form>
    </div>
  )
}

export default BlogForm