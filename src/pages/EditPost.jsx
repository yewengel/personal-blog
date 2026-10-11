import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()

  const savedPosts = JSON.parse(
    localStorage.getItem('myBlogPosts') || '[]'
  )
  const existingPost = savedPosts.find(
    (post) => String(post.id) === id
  )

  const [title, setTitle] = useState(existingPost?.title || '')
  const [body, setBody] = useState(existingPost?.body || '')
  const [tags, setTags] = useState(existingPost?.tags?.join(', ') || '')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!existingPost) {
      setError('This post cannot be edited.')
      return
    }

    if (!title.trim() || !body.trim()) {
      setError('Please enter both a title and content.')
      return
    }

    const cleanedTags = [...new Set(
      tags.split(',').map((tag) => tag.trim().replace(/^#/, '')).filter(Boolean)
    )]

    const updatedPosts = savedPosts.map((post) =>
      String(post.id) === id
        ? {
            ...post,
            title: title.trim(),
            body: body.trim(),
            tags: cleanedTags,
          }
        : post
    )

    localStorage.setItem('myBlogPosts', JSON.stringify(updatedPosts))
    navigate(`/blog/${id}`)
  }

  const inputClass =
    'w-full min-w-0 rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'

  if (!existingPost) {
    return (
      <div className="rounded-xl bg-white p-5 text-center shadow-sm sm:p-8">
        <p className="text-gray-700">Your post was not found.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-8 lg:p-10">
      <Link
        to={`/blog/${id}`}
        className="mb-5 inline-block font-medium text-indigo-600 hover:text-indigo-800"
      >
        ← Back to Post
      </Link>

      <h1 className="break-words text-2xl font-extrabold text-gray-900 sm:text-3xl">
        Edit Post
      </h1>

      <p className="mt-2 text-sm text-gray-500 sm:text-base">
        Update your story and save your changes.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
        <div>
          <label htmlFor="edit-title" className="mb-2 block font-semibold text-gray-700">
            Blog Title *
          </label>
          <input
            id="edit-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              setError('')
            }}
            maxLength={120}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="edit-body" className="mb-2 block font-semibold text-gray-700">
            Blog Content *
          </label>
          <textarea
            id="edit-body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value)
              setError('')
            }}
            rows={8}
            required
            className={`${inputClass} resize-y`}
          />
        </div>

        <div>
          <label htmlFor="edit-tags" className="mb-2 block font-semibold text-gray-700">
            Tags
          </label>
          <input
            id="edit-tags"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="technology, learning"
            className={inputClass}
          />
          <p className="mt-2 text-sm text-gray-500">
            Separate tags with commas.
          </p>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(`/blog/${id}`)}
            className="w-full rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost
