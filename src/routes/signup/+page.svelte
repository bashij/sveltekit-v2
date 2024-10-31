<script lang="ts">
    import type { PageData, ActionData } from "./$types";

    export let data: PageData;
    export let form: ActionData;
</script>

<!-- ボタン押下直後のみ表示される -->
{#if form?.status === 200}
    <p>ユーザー登録成功!!</p>

    <p>user.id: {form?.user.id}</p>
    <p>user.name: {form?.user.name}</p>
    <p>user.email: {form?.user.email}</p>
	<p>user.accessToken: {form?.user.accessToken}</p>
	<p>user.refreshToken: {form?.user.accessToken}</p>

	{console.log(form?.user.name)}
{/if}

<!-- フォームだけならJS不要で動作可能 -->
<!-- https://kit.svelte.jp/docs/form-actions -->
<form method="POST" action="?/signup">
    <label>
		Name
		<input name="name" type="text">
	</label>
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Sign in</button>
</form>