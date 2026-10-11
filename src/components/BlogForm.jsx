
import { useEffect, useState } from 'react'

function BlogForm({
  onSubmit,
  initialTitle = '',
  initialContent = '',
  initialTags = [],
  initialImage = '',
  buttonText = 'Publish Post',
}) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [tags, setTags] = useState(initialTags.join(', '))
  const [image, setImage] = useState(initialImage)
  const [error, setError] = useState('')

  useEffect(() => {
    setTitle(initialTitle)
    setContent(initialContent)
    setTags(initialTags.join(', '))
    setImage(initialImage)
  }, [initialTitle, initialContent, initialTags, initialImage])

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      event.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Please choose an image smaller than 2 MB.')
      event.target.value = ''
      return
    }

    setError('')
    const reader = new FileReader()

    reader.onload = () => {
      setImage(reader.result)
    }

    reader.readAsDataURL(file)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) {
      setError('Please enter a title.')
      return
    }

    if (!content.trim()) {
      setError('Please enter the post content.')
      return
    }

    const tagList = [
      ...new Set(
        tags
          .split(',')
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean)
      ),
    ]

    onSubmit({
      title: title.trim(),
      body: content.trim(),
      tags: tagList,
      image,
    })

    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block font-semibold text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter your post title"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block font-semibold text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your story..."
          rows={7}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="mb-2 block font-semibold text-gray-700"
        >
          Tags
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="technology, travel, lifestyle"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <p className="mt-1 text-sm text-gray-500">
          Separate tags with commas.
        </p>
      </div>

      <div>
        <label
          htmlFor="image"
          className="mb-2 block font-semibold text-gray-700"
        >
          Upload Photo (optional)
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm"
        />

        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Post preview"
              className="max-h-80 w-full rounded-xl border border-gray-200 object-cover"
            />
            <button
              type="button"
              onClick={() => setImage('')}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Remove photo
            </button>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <button
  type="submit"
  className="w-full rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white transition hover:bg-gray-600 sm:w-auto"
>
  {buttonText}
</button>
    </form>
  )
}

export default BlogForm
