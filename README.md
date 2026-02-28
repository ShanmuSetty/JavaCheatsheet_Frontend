# ☕ Java DSA Cheatsheet

> *Because Googling "how to declare a HashMap in Java" for the 47th time is not the vibe.*

---

## 💡 The Idea

Every DSA session starts the same way — you open your IDE, you *know* what you want to build, but then you spend the first 10 minutes just... trying to remember syntax.

> *Was it `new ArrayList<>()` or `new ArrayList<Integer>()`?*  
> *Does Scanner use `nextLine()` or `next()` for strings again?*  
> *How do I make a max-heap with PriorityQueue?*

It's not that you don't know the concept. You do. It's just that Java is verbose, and the tiny syntax details break your flow right when you're in the zone.

So instead of opening 5 browser tabs, scrolling through Stack Overflow, or digging through old code — I built **one clean page** that has every declaration and initialization I actually need, with a one-line explanation for each. Dead simple. Always there. Copy and go.

---

## 🚀 What It Is

A single, self-contained HTML file — no frameworks, no dependencies, no login — that serves as your **personal Java DSA reference sheet**.

- Every common data structure, declared and ready to paste
- One-sentence explanation so you *understand*, not just copy
- Search + category filters so you find things in seconds
- Deployable anywhere — GitHub Pages, Netlify, Vercel — for free

---

## 🏗 Architecture

### Frontend
- Pure HTML + CSS + Vanilla JavaScript

### Backend
- Spring Boot
- JWT Authentication
- PostgreSQL (Render hosted)
- REST API for:
  - Auth (login/register)
  - Favorites
  - Custom snippets

---

## 🔐 Authentication Flow

- User registers or logs in
- Backend returns JWT
- JWT stored in memory (client-side)
- Token attached to protected API requests
- Favorites & custom snippets fetched after login

---

## 🤝 Contributing

Built this for myself, but if it helps you too — feel free to fork, extend, and make it yours.

---

*Stop context-switching. Stay in flow. Ship the solution.* ✨
