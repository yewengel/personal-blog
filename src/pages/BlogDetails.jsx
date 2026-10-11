import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { persistentBookmarksAtom } from '../atoms/bookmarkAtoms'

function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [bookmarks, setBookmarks] = useAtom(persistentBookmarksAtom)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const isBookmarked = bookmarks.some(
    (item) => String(item.id) === String(id)
  )

  useEffect(() => {
    let cancelled = false

    async function loadPost() {
      setLoading(true)
      setError('')
      setPost(null)
      setComments([])

      try {
        const savedPosts = JSON.parse(
          localStorage.getItem('myBlogPosts') || '[]'
        )

        const ownPost = savedPosts.find(
          (item) => String(item.id) === String(id)
        )

        if (ownPost) {
          if (!cancelled) {
            setPost(ownPost)
            setComments([])
          }
          return
        }

        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`https://dummyjson.com/posts/${id}`),
          fetch(`https://dummyjson.com/comments/post/${id}`),
        ])

        if (!postResponse.ok) {
          throw new Error('Post not found.')
        }

        const postData = await postResponse.json()

        let commentsData = { comments: [] }

        if (commentsResponse.ok) {
          commentsData = await commentsResponse.json()
        }

        if (!cancelled) {
          setPost(postData)
          setComments(commentsData.comments || [])
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load this blog post. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPost()

    return () => {
      cancelled = true
    }
  }, [id])

  function handleBookmark() {
    if (!post) return

    setBookmarks((previous) => {
      const alreadySaved = previous.some(
        (item) => String(item.id) === String(post.id)
      )

      if (alreadySaved) {
        return previous.filter(
          (item) => String(item.id) !== String(post.id)
        )
      }

      return [...previous, post]
    })
  }

  function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?'
    )

    if (!confirmed) return

    const savedPosts = JSON.parse(
      localStorage.getItem('myBlogPosts') || '[]'
    )

    const remainingPosts = savedPosts.filter(
      (item) => String(item.id) !== String(post.id)
    )

    localStorage.setItem(
      'myBlogPosts',
      JSON.stringify(remainingPosts)
    )

    setBookmarks((previous) =>
      previous.filter((item) => String(item.id) !== String(post.id))
    )

    navigate('/')
  }

  if (loading) {
    return (
      <p className="py-10 text-center text-gray-600">
        Loading blog post...
      </p>
    )
  }

  if (error || !post) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-red-600">
          {error || 'Blog post not found.'}
        </p>

        <Link
          to="/"
          className="mt-4 inline-block rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white transition hover:bg-gray-600"
        >
          ← Back to Home
        </Link>
      </div>
    )
  }

  const isOwnPost = String(post.id).startsWith('local-')

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        to="/"
        className="mb-6 inline-block font-medium text-gray-700 transition hover:text-black"
      >
        ← Back to Home
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mb-6 max-h-96 w-full rounded-xl object-cover"
          />
        )}

        <div className="mb-5 flex flex-wrap gap-2">
          {(post.tags || []).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
            >
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

        <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={handleBookmark}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              isBookmarked
                ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {isBookmarked ? '★ Remove Bookmark' : '☆ Add Bookmark'}
          </button>

          {isOwnPost && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
            >
              Delete Post
            </button>
          )}
        </div>
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
              <div
                key={comment.id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h3 className="font-semibold text-gray-900">
                  {comment.user?.fullName || 'Anonymous'}
                </h3>

                <p className="mt-2 leading-6 text-gray-600">
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  )
}

export default BlogDetails