export default async function(context) {
    if (context.query.loggedIn === 'true') {
        await context.$adminLoader.load()
    }
}
