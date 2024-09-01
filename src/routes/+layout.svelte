<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import Nav from "$lib/components/nav.svelte";
  import messagesStore from "$lib/stores/messages.store";
  // import { onMount } from "svelte";
  import '$lib/firebase/firebase.client';

  // onMount(() => {
  //   setTimeout(() => {
  //     messagesStore.showError();
  //   }, 1000);
  // });

  function closeMessage() {
    messagesStore.hide();
  };
</script>

<main class="container">
  <Nav />
  {#if $messagesStore.show}
  <div class="row mt-3">
    <div class="col">
      <div
        class:alert-success={$messagesStore.type &&
          $messagesStore.type === "success"}
        class:alert-danger={$messagesStore.type &&
          $messagesStore.type === "error"}
        class="alert alert-dismissible"
        role="alert"
      >
        <strong
          >{$messagesStore.type === "success" ? "Success:" : "Error:"}</strong
        >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti nisi sit
        praesentium.
        <button
          type="button"
          on:click={closeMessage}
          class="btn-close"
          aria-label="Close"
        />
      </div>
    </div>
  </div>
  {/if}
  <slot />
</main>
