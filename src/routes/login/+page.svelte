<script>
  import LoginWithGoogle from "$lib/components/Login/LoginWithGoogle.svelte";
  import { loginWithEmailAndPassword, sendJWTToken } from "$lib/firebase/auth.client";
  import AuthForm from "../../lib/components/Login/AuthForm.svelte";
  import { afterLogin } from '../../lib/helpers/route.helper';
  import messagesStore from "$lib/stores/messages.store";
  import { page } from "$app/stores";

  async function onLogin(e) {
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
      if (!email || !password) {
        // @ts-ignore
        messagesStore.showError("Please enter a valid email or password");
        return;
      }
      if (password.length < 6) {
        // @ts-ignore
        messagesStore.showError("Password must be 6 characters or more");
      }
      const user = await loginWithEmailAndPassword(email, password);
      await sendJWTToken();
      await afterLogin($page.url, user.uid);
    } catch (e) {
      if (
        ["auth/invalid-email", "auth/user-not-found", "auth/wrong-password"]
      ) {
        // @ts-ignore
        messagesStore.showError("Invalid email or password");
      }
      messagesStore.showError();
    }
  }
</script>

<div class="row">
  <div class="col">
    <h1>Login</h1>
  </div>
</div>

<hr />

<AuthForm btnName="Login" onSubmitFunc={onLogin} />

<hr />
<LoginWithGoogle />

<hr />
<div class="row">
  <div class="col">
    <a href="/forgot-password" class="btn btn-warning w-100">Forgot password?</a>
  </div>
</div>


<svelte:head>
  <title>Book Lovers - Login</title>
</svelte:head>
