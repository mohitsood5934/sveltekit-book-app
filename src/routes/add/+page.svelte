<script>
  import BookForm from "$lib/components/Books/BookForm.svelte";
  export let form;
</script>

{#if form && form.success}
  <h2>Form successfully submitted</h2>
{:else}
  <BookForm form={form} />
{/if}

<svelte:head>
  <title>Book Lovers - Add Book</title>
</svelte:head>
