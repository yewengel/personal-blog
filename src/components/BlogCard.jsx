import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { persistentBookmarksAtom } from '../atoms/bookmarkAtoms'

function BlogCard({ post }) {
  const [bookmarks, setBookmarks] = useAtom(persistentBookmarksAtom)

  const isBookmarked = bookmarks.some(
    (item) => String(item.id) === String(post.id)
  )

  function handleBookmark(event) {
    event.preventDefault()
    event.stopPropagation()

    if (isBookmarked) {
      setBookmarks((previous) =>
        previous.filter(
          (item) => String(item.id) !== String(post.id)
        )
      )
    } else {
      setBookmarks((previous) => [...previous, post])
    }
  }

  return (
    <article className="relative h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Bookmark star */}
      <button
        type="button"
        onClick={handleBookmark}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        aria-pressed={isBookmarked}
        title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        className="absolute right-4 top-4 z-10 rounded-full bg-white p-1 text-3xl leading-none"
      >
        <span className={isBookmarked ? 'text-blue-500' : 'text-gray-400'}>
          {isBookmarked ? '★' : '☆'}
        </span>
      </button>

      {/* Post image */}
      {post.image && (
        <Link to={`/blog/${post.id}`} className="block">
          <img
            src={post.image}
            alt={post.title}
            className="mb-4 h-48 w-full rounded-lg object-cover"
          />
        </Link>
      )}

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2 pr-8">
        {(post.tags || []).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      {}
      <Link to={`/blog/${post.id}`} className="block">
        <h2 className="text-xl font-bold text-gray-900 transition hover:text-gray-600">
          {post.title}
        </h2>
      </Link>

      {}
      <p className="mt-3 line-clamp-4 text-sm leading-7 text-gray-600">
        {post.body}
      </p>

      {}
      <Link
        to={`/blog/${post.id}`}
        className="mt-5 block border-t border-gray-200 pt-4 font-semibold text-gray-700 transition hover:text-black"
      >
        Read Full Story →
      </Link>
    </article>
  )
}

export default BlogCard