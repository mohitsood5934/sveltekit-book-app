<script>
  import { loginWithGoogle } from "$lib/firebase/auth.client";
  import messagesStore from "$lib/stores/messages.store";

  async function loginGoogle() {
    try {
      const user = await loginWithGoogle();
      console.log(user, "google user");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        return;
      }
      messagesStore.showError();
      console.log(`Error occurred when logging in the user`);
    }
  }
</script>

<div class="row">
  <div class="col">
    <button class="btn btn-primary w-100" on:click={loginGoogle}
      >Login With Google</button
    >
  </div>
</div>
