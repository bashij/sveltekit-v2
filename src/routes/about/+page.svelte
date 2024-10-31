<script lang='ts'>
    // serverでfetch userデータ
    import type { PageData } from './$types';

    export let data: PageData;

    // clientでfetch postデータ
	let posts: any

    async function fetchPosts() {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	
		posts = await response.json();
	}
</script>

<h1>about</h1>
<p>this is the about page.</p>

<p>
    {console.log(data)}
    {#if data}
        <ul>
            {#each data.users as { id, name, email }}
                <li>{id}. {name}, {email}</li>
            {/each}
        </ul>
    {/if}
</p>


<button on:click={fetchPosts}>ポストを取得する</button>

<p>
    {console.log(posts)}
    {#if posts}
        <ul>
            {#each posts as { id, title }}
                <li>{id}. {title}</li>
            {/each}
        </ul>
    {/if}
</p>

