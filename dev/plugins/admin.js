/**
 * Admin load
 *
 * @param {import('@nuxt/types').Context} context nuxt context
 * @return {Promise<void>}
 */
export default async function (context) {
  if (context.query.loggedIn === 'true') {
    await context.$adminLoader.load()
  }
}
