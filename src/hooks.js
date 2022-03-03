/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const response = await resolve(event, {
        ssr: false, // !event.url.pathname.startsWith('/admin')
    });

    return response;
}
