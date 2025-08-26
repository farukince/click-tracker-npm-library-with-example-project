<div align="center">
  <br />
  <img src="https://raw.githubusercontent.com/google/material-design-icons/master/png/action/touch_app/materialicons/48dp/2x/baseline_touch_app_black_48dp.png" alt="Logo">
  <br />

  <h1 align="center">Supabase Click Tracker</h1>

  <p align="center">
    A lightweight, zero-dependency library to track button clicks and send analytics directly to your Supabase project.
    <br />
    <br />
    <a href="https://www.npmjs.com/package/@your-npm-username/click-tracker">
      <img src="https://img.shields.io/npm/v/@your-npm-username/click-tracker.svg" alt="NPM Version">
    </a>
    <a href="https://github.com/your-github-username/your-repo-name/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/@your-npm-username/click-tracker.svg" alt="License">
    </a>
    <a href="https://github.com/your-github-username/your-repo-name/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/your-github-username/your-repo-name.svg" alt="Contributors">
    </a>
  </p>
</div>

---

## Why Supabase Click Tracker?

In a world of complex analytics platforms, **Supabase Click Tracker** offers a simple, self-hosted alternative. Instead of sending user data to third-party services, this library sends structured click event data directly to a Supabase table that *you* control. It's perfect for developers who want to own their analytics data and leverage the power of Supabase for real-time analysis, dashboards, or event-driven functionality.

## ✨ Features

-   **🎯 Simple Integration:** Get started in minutes with a single `init` function.
-   **🚀 Lightweight:** Zero dependencies and a tiny footprint.
-   **✍️ TypeScript Ready:** Fully written in TypeScript for a great developer experience with autocompletion and type safety.
-   **flexible Data:** Automatically captures button `id`, `classes`, and `text`.
-   **Custom Payloads:** Enrich your click data with custom context like user IDs, session info, or page metadata using the `payload` option.
-   **Self-Hosted Analytics:** You own your data, stored securely in your own Supabase project.

##  Prerequisites

Before you begin, you need a configured Supabase project.

### 1. Create a Supabase Table

In your Supabase project dashboard, go to the **Table Editor** and create a new table named `clicks`. Use the following schema:

| Column Name      | Type        | Notes                                           |
| ---------------- | ----------- | ----------------------------------------------- |
| `id`             | `bigint`    | Primary Key, Identity. (Default)                |
| `created_at`     | `timestamptz` | Defaults to `now()`. (Default)                    |
| `button_id`      | `text`      | Stores the ID of the clicked button.            |
| `button_classes` | `text`      | Stores the CSS classes of the clicked button.   |
| `button_text`    | `text`      | Stores the inner text of the clicked button.    |
| `payload`        | `jsonb`     | **Crucial.** Stores your custom JSON data. Nullable. |

### 2. Create a Row Level Security (RLS) Policy

For security, Supabase tables are not publicly writable by default. You must create an RLS policy that allows anonymous `INSERT` operations on your `clicks` table.

Go to **Authentication → Policies**, select your `clicks` table, and create a new policy. You can use a template or create one from scratch with the following configuration:

-   **Policy Name:** `Allow public insert access`
-   **Operation:** `INSERT`
-   **WITH CHECK expression:** `true`

This will allow the library, using your public `anon` key, to insert new rows.

## 📦 Installation

```bash
npm install @your-npm-username/click-tracker
```

## 🚀 Quick Start

Initialize the library at your application's entry point (e.g., `App.tsx` for React).

```typescript
import { init } from '@your-npm-username/click-tracker';

// Your Supabase credentials
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Basic initialization
init({
  supabaseUrl,
  supabaseAnonKey,
});
```

## Advanced Usage

You can provide a `payload` to add custom context to every click and use a `selector` to target specific buttons.

```typescript
import { init } from '@your-npm-username/click-tracker';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Get the current user info (example)
const user = { id: 'user_1a2b3c', segment: 'premium' };

init({
  supabaseUrl,
  supabaseAnonKey,

  // 1. Target only buttons with the class '.trackable'
  selector: 'button.trackable',

  // 2. Add a dynamic payload with user and page context
  payload: {
    userId: user.id,
    userSegment: user.segment,
    pagePath: window.location.pathname,
    appVersion: '2.1.0'
  }
});
```

## ⚙️ API Reference

The library exports one function: `init(options)`.

### `init(options)`

Initializes the click tracking listeners. It accepts a single configuration object.

| Parameter         | Type                  | Required | Default   | Description                                                              |
| ----------------- | --------------------- | :------: | --------- | ------------------------------------------------------------------------ |
| `supabaseUrl`     | `string`              |   Yes    | `null`      | The URL of your Supabase project.                                        |
| `supabaseAnonKey` | `string`              |   Yes    | `null`      | The `anon` (public) key of your Supabase project.                        |
| `selector`        | `string`              |    No    | `'button'`  | A CSS selector for the elements to track.                                |
| `payload`         | `Record<string, any>` |    No    | `undefined` | A JSON object that will be saved to the `payload` column with every click event. |


## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-github-username/your-repo-name/issues).

1.  **Fork** the Project
2.  Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a **Pull Request**

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
Made with ❤️ for the Open Source community.
</div>