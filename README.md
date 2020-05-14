![Node.js Package](https://github.com/sedona-cms/core/workflows/Node.js%20Package/badge.svg)

<br />
<p align="center">
  <h3 align="center">Sedona CMS</h3>

  <p align="center">
    Admin Panel for Nuxt.js sites
    <br />
    <br />
    <a href="https://sedona-cms.github.io/core/">View Demo</a>
    ·
    <a href="https://github.com/sedona-cms/core/issues">Report Bug</a>
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Setup](#setup)
* [Usage](#usage)
  * [Config](#config)
  * [Toolbar configuration](#toolbar-configuration)
  * [Menu Items configuration](#menu-items-configuration)
  * [Events](#events)
* [Development](#development)

## About the project

### Built With

* [Nuxt.js](https://nuxtjs.org/)
* [Quasar Framework](https://quasar.dev/)

## Getting Started

### Prerequisites

* [Nuxt.js](https://nuxtjs.org/)

## Setup

1. Add @sedona-cms/core dependency to your project

```bash
npm i @sedona-cms/core # or yarn add @sedona-cms/core
```

2. Add `@sedona-cms/core` to the `modules` section of `nuxt.config.js`

3. Create `sedona.config.json` in project root and create `admin` folder in src root. [Will be fixed](../../issues/3)

4. Add plugin in **client** mode

*admin.client.js*

```js
export default async function(ctx) {
   // check for user logged in
   await ctx.$adminLoader.load()
}
```

*nuxt.config.js*

```js
export default {
  modules: [
    '@sedona-cms/core',
  ],
  plugins: [
    '~plugins/admin.client.js',
  ],
}
```

## Usage

### Config

`sedona.config.json` has two main sections.
  
  1. toolbar – toolbar customization, adding buttons, changing title
  2. items – menu customization, add items, sections and subitems
  
Config file has [json schema](src/schema/sedona.config.schema.json). This tool helps validate config when module loading. And edit the file without errors. 

Editing the config file may be handier with webstorm or vscode.

1. Webstorm – Languages and Frameworks -> Schemas and DTDs -> JSON Schema Mappings

### Toolbar configuration

### Menu Items configuration

### Events

Sedona CMS uses own [global event bus](src/utils/event-bus.ts). 

Using example:

```js
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'

eventBus.on('sedona:loaded', () => console.log('Fired after Sedona CMS panel loaded'))
```

#### Used events:

* `sedona:loaded` (no args) – Sedona CMS panel loaded
* `core:navigate` (item: [MenuItem](types/config/index.d.ts#L1))– change an active panel

## Development

1. Install dependencies

```bash
npm ci
```

```bash
npx npm-self-link # links the package in which it is run
```

2. Run watch process

```bash
npm run watch # typescript watch process
```

3. Run nuxt project from `dev` directory

```bash
npm run dev
```
