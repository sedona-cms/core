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
  * [The visibility of menu items](#the-visibility-of-menu-items)
  * [Events](#events)
* [Development](#development)

## About the project

Sedona CMS can create beautiful and fully customizable admin panel on frontend site.

### Built With

* [Nuxt.js](https://nuxtjs.org/)
* [Quasar Framework](https://quasar.dev/)
* [Material Icons](https://material.io/resources/icons/)

## Getting Started

### Prerequisites

* [Nuxt.js](https://nuxtjs.org/)

### Setup

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

`toolbar` section (object)

```typescript
type ToolbarConfig = {
  showHome: boolean
  title: string
  buttons: ToolbarButton[]
}

type ToolbarButton = {
  title: string
  icon: string
  component: string
}
```

### Menu Items configuration

A menu item may be of 3 display variants:

1. `item` – a simple menu item
2. `header` – a subheader item (not clickable)
3. `section` – an item can navigate to another menu list

Examples:

Simple menu item with required fields only

```json
{
  "title": "Post List",
  "type": "item",
  "component": "posts/posts-view"
}
```

Simple menu item with all available fields

```json
{
  "title": "Post List",
  "type": "item",
  "component": "posts/posts-view",
  "icon": "edit",
  "subTitle": "Managment posts",
  "params": {
    "lang": "ru"
  }
}
```

`items` section (array)

```typescript
type MenuItem = {
  id?: string
  title?: string
  subTitle?: string
  icon?: string
  type: 'item' | 'section' | 'header'
  component?: string | Function
  params?: {
    [key: string]: any
  }
  items?: MenuItem[]
}
```

### The visibility of menu items

By default, all menu items shows on each page on site. This behavior may be change in the config file.

The visibility depends on a current vue route. All components have property [$route](https://router.vuejs.org/api/#the-route-object).
Use the `$route` property in conditions you can change the visibility of menu items on site pages.

The `$route` properties that can be used in conditions:

1. `name`
2. `path`
3. `meta`

Type of conditions that can be used.

1. `=`
2. `regex`

Examples:

The menu item shows only on page `about`. 
The item shows only on pages when the condition returns true `$route.name === 'about'`

```json
{
  "title": "Test",
  "type": "item",
  "component": "posts/posts-view",
  "conditions": [
    {
      "field": "name",
      "value": "about"
    }
  ],
}
```

The menu item shows only on page `about` or `index`. 
The item shows only on pages when the condition returns true `$route.name === 'about' || $route.name === 'index'`

```json
{
  "title": "Test",
  "type": "item",
  "component": "posts/posts-view",
  "conditions": [
    {
      "field": "name",
      "value": "about"
    },
    {
      "field": "name",
      "value": "index"
    }
  ],
}
```

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
