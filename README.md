# BlogSpace — Personal Blog App

## 1. Project Overview

BlogSpace is a personal blogging web application built with React. It allows users to explore blog posts, search for content, create and edit their own posts, and save favorite posts as bookmarks.

## 2. Features

- View blog posts
- Read individual posts and comments
- Create new blog posts
- Edit and delete personal posts
- Search posts by title, content, or tag
- Filter posts by tags
- Bookmark favorite posts
- Save personal posts and bookmarks using browser localStorage
- Responsive design for mobile, tablet, and desktop

## 3. Technologies Used

- React
- Vite
- React Router DOM
- Jotai
- Tailwind CSS
- DummyJSON API
- Browser localStorage
- JavaScript and JSX

## 4. Installation and Setup

### Requirements

- Node.js
- npm
- A web browser
- Internet connection for loading sample posts

### Steps

1. Open the project folder in a terminal.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL displayed in the terminal.

## 5. Build for Production

Run:

```bash
npm run build
```

Vite generates the production build in the `dist` folder.

## 6. Data Storage

Sample blog posts are retrieved from the DummyJSON API.

Personal posts are stored in browser localStorage under `myBlogPosts`, while bookmarks are persisted under `myBookmarks`.

This is a frontend learning project. Personal posts and bookmarks are stored in the current browser and are not synchronized between different users or devices.

## 7. Project Structure

```text
src/
├── atoms/
│   └── bookmarkAtoms.jsx
├── components/
│   ├── Navbar.jsx
│   ├── BlogCard.jsx
│   └── BlogForm.jsx
├── pages/
│   ├── Home.jsx
│   ├── BlogDetails.jsx
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   └── Bookmarks.jsx
├── App.jsx
├── main.jsx
└── index.css

public/
package.json
vite.config.js
README.md
```

## 8. Conclusion

BlogSpace demonstrates the use of React components, routing, state management, API integration, browser storage, and responsive user interface design to build a personal blogging application.
