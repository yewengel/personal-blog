
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const savedPosts = JSON.parse(localStorage.getItem('myBlogPosts') || '[]')
  const ownPost = savedPosts.find((item) => String(item.id) === id)

  useEffect(() => {
    async function loadPost() {
      try {
        if (ownPost) {
          setPost(ownPost)
          setComments([])
          return
        }

        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`https://dummyjson.com/posts/${id}`),
          fetch(`https://dummyjson.com/posts/${id}/comments`),
        ])

        if (!postResponse.ok || !commentsResponse.ok) {
          throw new Error('Post not found')
        }

        const postData = await postResponse.json()
        const commentsData = await commentsResponse.json()

        setPost(postData)
        setComments(commentsData.comments)
      } catch {
        setError('Unable to load this blog post.')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete this post?')
    if (!confirmed) return

    const remainingPosts = savedPosts.filter(
      (item) => String(item.id) !== id
    )

    localStorage.setItem('myBlogPosts', JSON.stringify(remainingPosts))
    navigate('/')
  }

  if (loading) {
    return <p className="py-10 text-center">Loading blog post...</p>
  }

  if (error || !post) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <p className="text-red-600">{error || 'Blog post not found.'}</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/" className="mb-8 inline-block font-medium text-indigo-600">
        ← Back to Home
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-5 flex flex-wrap gap-2">
          {(post.tags || []).map((tag) => (
            <span key={tag} className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700">
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {post.title}
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          ♥ {post.reactions?.likes ?? 0} likes
        </p>

        <p className="whitespace-pre-wrap border-t border-gray-100 pt-6 leading-8 text-gray-700">
          {post.body}
        </p>

        {ownPost && (
          <div className="mt-8 flex gap-3 border-t border-gray-100 pt-6">
            <Link
              to={`/edit/${post.id}`}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Edit Post
            </Link>

            <button
              onClick={handleDelete}
              className="rounded-xl bg-red-50 px-5 py-3 font-semibold text-red-600 hover:bg-red-100"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900">
                  {comment.user?.fullName || 'Anonymous'}
                </h3>
                <p className="mt-2 leading-6 text-gray-600">{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  )
}

export default BlogDetails
