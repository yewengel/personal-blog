import { useAtom } from 'jotai'
import { Link } from 'react-router-dom'
import { persistentBookmarksAtom } from '../atoms/bookmarkAtoms'

function Bookmarks() {
  const [bookmarks, setBookmarks] = useAtom(persistentBookmarksAtom)

  function removeBookmark(id) {
    setBookmarks((previous) =>
      previous.filter((post) => String(post.id) !== String(id))
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          My Bookmarks
        </h1>

        <p className="mt-4 text-gray-500">
          No bookmarks yet. Save a post to see it here.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white transition hover:bg-gray-600"
        >
          Browse Posts
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        My Bookmarks
      </h1>

      <p className="mb-6 text-gray-500">
        {bookmarks.length} saved post(s)
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((post) => (
          <article
            key={post.id}
            className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => removeBookmark(post.id)}
              aria-label="Remove bookmark"
              title="Remove bookmark"
              className="absolute right-4 top-4 text-3xl leading-none text-blue-500 transition hover:text-gray-500"
            >
              ★
            </button>

            <Link to={`/blog/${post.id}`} className="block pr-8">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="mb-4 h-40 w-full rounded-lg object-cover"
                />
              )}

              <div className="mb-3 flex flex-wrap gap-2">
                {(post.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-bold text-gray-900 transition hover:text-gray-600">
                {post.title}
              </h2>

              <p className="mt-3 line-clamp-4 text-sm leading-7 text-gray-600">
                {post.body}
              </p>

              <p className="mt-4 font-semibold text-gray-700 transition hover:text-black">
                Read Full Story →
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Bookmarks