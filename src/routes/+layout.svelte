<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import Nav from "$lib/components/nav.svelte";
  import messagesStore from "$lib/stores/messages.store";
  import { onMount } from "svelte";
  import { sendJWTToken } from "../../src/lib/firebase/auth.client";
  import "$lib/firebase/firebase.client";

  // @ts-ignore
  /**
   * @type {string | number | NodeJS.Timeout | undefined}
   */
  let timerId;

  function closeMessage() {
    messagesStore.hide();
  }

  async function sendServerToken() {
    try {
      await sendJWTToken();
    } catch (error) {
      clearInterval(timerId);
    }
  }

  onMount(async () => {
    try {
      await sendServerToken();
      timerId = setInterval(
        async () => {
          await sendServerToken();
        },
        1000 * 10 * 60
      );
    } catch (e) {
      console.log(`Error occurred while sending jwt token - ${e}`);
      messagesStore.showError();
    }
    return () => {
      clearInterval(timerId);
    };
  });
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
          {$messagesStore.message}
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
