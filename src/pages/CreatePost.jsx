import { useNavigate } from 'react-router-dom'
import BlogForm from '../components/BlogForm'

function CreatePost() {
  const navigate = useNavigate()

  function handleCreatePost(formData) {
    try {
      const savedPosts = JSON.parse(
        localStorage.getItem('myBlogPosts') || '[]'
      )

      const newPost = {
        id: `local-${Date.now()}`,
        title: formData.title,
        body: formData.body,
        tags: formData.tags,
        image: formData.image || '',
        reactions: { likes: 0 },
        userId: 1,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem(
        'myBlogPosts',
        JSON.stringify([newPost, ...savedPosts])
      )

      window.dispatchEvent(new Event('postsUpdated'))

      navigate('/')
    } catch (error) {
      console.error('Unable to save post:', error)
      alert('Unable to publish your post. Please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Create a New Post
      </h1>

      <p className="mb-8 text-gray-500">
        Share your thoughts, stories, and photos.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <BlogForm onSubmit={handleCreatePost} />
      </div>
    </div>
  )
}

export default CreatePost
