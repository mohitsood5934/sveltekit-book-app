<script>
  import { loginWithGoogle, sendJWTToken } from "$lib/firebase/auth.client";
  import { page } from "$app/stores";
  import messagesStore from "$lib/stores/messages.store";
  import { afterLogin } from "$lib/helpers/route.helper";

  async function loginGoogle() {
    try {
      const user = await loginWithGoogle();
      console.log(user, "google user");
      await sendJWTToken();
      await afterLogin($page.url, user.uid);
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
