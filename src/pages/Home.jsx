import { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'

function Home() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('https://dummyjson.com/posts?limit=10')

        if (!response.ok) {
          throw new Error('Unable to load sample posts.')
        }

        const data = await response.json()
        const savedPosts = JSON.parse(
          localStorage.getItem('myBlogPosts') || '[]'
        )

        if (!cancelled) {
          setPosts([...savedPosts, ...(data.posts || [])])
        }
      } catch {
        const savedPosts = JSON.parse(
          localStorage.getItem('myBlogPosts') || '[]'
        )

        if (!cancelled) {
          setPosts(savedPosts)
          setError(
            savedPosts.length
              ? 'Sample posts could not be loaded. Your own posts are still available.'
              : 'Could not load posts. Check your internet connection and try again.'
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  const allTags = [
    ...new Set(posts.flatMap((post) => post.tags || [])),
  ]

  const filteredPosts = posts.filter((post) => {
    const query = search.trim().toLowerCase()

    const matchesSearch =
      !query ||
      post.title?.toLowerCase().includes(query) ||
      post.body?.toLowerCase().includes(query) ||
      (post.tags || []).some((tag) => tag.toLowerCase().includes(query))

    const matchesTag =
      selectedTag === 'all' || (post.tags || []).includes(selectedTag)

    return matchesSearch && matchesTag
  })

  return (
    <div className="min-w-0">
      {/* Dark gray hero */}
      <section className="mb-8 rounded-2xl bg-gray-800 px-5 py-10 text-white sm:px-8 sm:py-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-300">
          Welcome to Personal Blog
        </p>

        <h1 className="max-w-3xl break-words text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          Discover Stories Worth Reading.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
          Explore ideas, discover new perspectives, and share your thoughts
          with the world.
        </p>

        <a
          href="/create"
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-100 px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-300 sm:w-auto"
        >
          + Create New Post
        </a>
      </section>

      {/* Posts section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Explore Posts
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Find stories and ideas that interest you.
          </p>
        </div>

        {/* Search and tag filter */}
        <div className="mb-6 flex min-w-0 flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search posts, topics, or tags..."
            aria-label="Search posts"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />

          <select
            value={selectedTag}
            onChange={(event) => setSelectedTag(event.target.value)}
            aria-label="Filter by tag"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-800 outline-none focus:border-gray-500 sm:w-52"
          >
            <option value="all">All Topics</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="mb-5 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading posts...
          </p>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 px-4 py-12 text-center">
            <p className="text-lg font-semibold text-gray-700">
              No posts found
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or choose a different topic.
            </p>
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home