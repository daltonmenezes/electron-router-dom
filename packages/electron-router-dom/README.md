<p align="center">
  <a href="#">
    <img alt="Electron Router DOM - A react-router-dom adapter for Electron apps" src="https://github.com/user-attachments/assets/2bbef3c6-d34e-4bc9-ade3-e17f06e034a8" />
  </a>
</p>

<p align="center">
  <!-- GitHub -->
  <a href="https://github.com/sponsors/daltonmenezes">
    <img alt="github url" src="https://img.shields.io/badge/support%20on-github-1C1E26?style=for-the-badge&labelColor=1C1E26&color=ffe27a"/>
  </a>
  <!-- Patreon -->
  <a href="https://www.patreon.com/daltonmenezes">
    <img alt="patreon url" src="https://img.shields.io/badge/support%20on-patreon-1C1E26?style=for-the-badge&labelColor=1C1E26&color=50e1c7"/>
  </a>
  <!-- Version -->
  <a href="https://github.com/daltonmenezes/electron-router-dom/releases">
     <img alt="releases url" src="https://img.shields.io/github/v/release/daltonmenezes/electron-router-dom.svg?style=for-the-badge&labelColor=1C1E26&color=ffe27a"/>
  </a>
  <!-- License -->
  <a href="https://github.com/daltonmenezes/electron-router-dom/blob/main/LICENSE.md">
    <img alt="license url" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=50e1c7"/>
  </a>
</p>

If you've ever tried using the `react-router-dom` library with `Electron`,
you've probably had trouble getting it to work properly,
both in development and production environments.

From this, the `Electron Router DOM` library was born,
which aims to facilitate the integration of `react-router-dom` with `Electron` and window routing,
where each window can have its own routing.

# Features

- 🚀 Ready for production and development environments
- 📱 Window routing support
- 🌐 Support for `query strings` sent from the main process to the renderer
- 🧬 Type-safe API designed to provide good DX

# Installation

> **Minimum required versions**
>
> - electron: >=17.0
> - react: >=18.0
> - react-router-dom: >=6.22.3

In your terminal and in the root folder of your application, run:

```bash
npm i electron-router-dom
```

**Router DOM is a peer dependency**, if you haven't installed it yet or your package manager won't handle it automatically for you, so run:

```bash
npm i react-router-dom
```

# Links
- [Documentation](https://electron-router-dom.daltonmenezes.com/docs)
- [Blog](https://electron-router-dom.daltonmenezes.com/blog)
- [Examples](https://github.com/daltonmenezes/electron-router-dom/tree/main/examples)


# Contributing
> **Note**: contributions are always welcome, but always **ask first**, — please — before work on a PR.

That said, there's a bunch of ways you can contribute to this project, like by:

- :beetle: Reporting a bug
- :page_facing_up: Improving documentation
- :rotating_light: Sharing this project and recommending it to your friends
- :dollar: Supporting this project on GitHub Sponsors or Patreon
- :star2: Giving a star on this repository

# License

[MIT © Dalton Menezes](https://github.com/daltonmenezes/electron-router-dom/blob/main/LICENSE)
