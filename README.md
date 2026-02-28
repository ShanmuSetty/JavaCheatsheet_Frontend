# ☕ Java DSA Cheatsheet — Frontend

> *Because Googling "how to declare a HashMap in Java" for the 47th time is not the vibe.*

---

## 💡 The Idea

Every DSA session starts the same way — you open your IDE, you *know* what you want to build, but then you spend the first 10 minutes just... trying to remember syntax.

> *Was it `new ArrayList<>()` or `new ArrayList<Integer>()`?*
> *Does Scanner use `nextLine()` or `next()` for strings again?*
> *How do I make a max-heap with PriorityQueue?*

It's not that you don't know the concept. You do. It's just that Java is verbose, and the tiny syntax details break your flow right when you're in the zone.

So instead of opening 5 browser tabs, scrolling through Stack Overflow, or digging through old code — I built **one clean page** with every declaration and initialization I actually need, a one-line explanation for each, and a full backend so your favorites and custom snippets follow you everywhere.

---

## 🚀 Features

- **Snippet library** — every common Java data structure, declared and ready to paste
- **Search + category filters** — find what you need in seconds
- **Complexity table** — time & space complexity for every data structure at a glance
- **Quiz mode** — test yourself on declarations without looking
- **Favorites** — star snippets and access them across sessions (requires login)
- **Custom snippets** — save your own code to your account (requires login)
- **Dark / light theme** — with persistence
- **Fully responsive** — works on mobile and desktop

---

## 🛠️ Built With

- **HTML / CSS / Vanilla JavaScript** — zero frameworks, zero build tools
- **JetBrains Mono + Syne** — fonts via Google Fonts
- **REST API** — connects to a Spring Boot backend for auth, favorites, and custom snippets

---

## 🔐 Auth

Authentication is handled by the backend. On login/register:

- Backend returns a JWT token
- Token is stored in `localStorage`
- All protected requests (favorites, custom snippets) attach the token as `Authorization: Bearer <token>`
- On page reload, the token is read from `localStorage` and the user session is restored automatically

---

## 🗂️ Project Structure

```
├── index.html       # App shell, markup, tab panels
├── styles.css       # All styling, theming, responsive layout
└── script.js        # All logic — rendering, auth, API calls, quiz, search
```

---

## ⚙️ Backend

This frontend connects to a Spring Boot backend. See the [backend repo](#) for setup instructions.

**API Base URL** (configured in `script.js`):
```
https://javacheatsheet-backend.onrender.com/api
```

**Endpoints used:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Login, receive JWT |
| GET | `/favorites` | Fetch user's favorites |
| POST | `/favorites/:id` | Toggle favorite |
| GET | `/snippets` | Fetch custom snippets |
| POST | `/snippets` | Save new custom snippet |
| DELETE | `/snippets/:id` | Delete custom snippet |

---

## 🚢 Deployment

Deploy as a static site — no server needed for the frontend.

**GitHub Pages:**
```bash
# Push to main, enable Pages in repo settings
# Set source to / (root)
```

**Netlify / Vercel:**
Drop the folder or connect the repo — zero config needed.

---

## 🤝 Contributing

Built this for myself, but if it helps you too — feel free to fork, extend, and make it yours.

---

*Stop context-switching. Stay in flow. Ship the solution.* ✨
