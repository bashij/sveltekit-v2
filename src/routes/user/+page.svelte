<script lang="ts">
    import type { PageData } from "./$types"

    export let data: PageData; // +page.server.tsでloadで取得したデータ
</script>

<h1>prisma テスト!!!!!</h1>

<ul>
    {#each data.users as { id, name, email }}
        <li>{id}. {name}, {email}</li>
    {/each}
</ul>

{console.log(data.users.length)}