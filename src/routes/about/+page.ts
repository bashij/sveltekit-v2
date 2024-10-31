import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const rest = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await rest.json()

    return { users }
}
