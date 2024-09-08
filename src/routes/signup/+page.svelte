<script>
  import AuthForm from "../../lib/components/Login/AuthForm.svelte";
  import { registerWithEmailAndPassword, sendJWTToken } from "$lib/firebase/auth.client";
  import messagesStore from "$lib/stores/messages.store";
  import { goto } from "$app/navigation";
  import { afterLogin } from '../../lib/helpers/route.helper';
  import { page } from "$app/stores";

  async function register(e) {
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
      const user = await registerWithEmailAndPassword(email, password);
      await sendJWTToken();
      await afterLogin($page.url, user.uid);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        // @ts-ignore
        messagesStore.showError("You have already registered, please login");
        await goto("/login");
      }
      messagesStore.showError();
    }
  }
</script>

<div class="row">
  <div class="col">
    <h1>Sign Up</h1>
  </div>
</div>
<AuthForm btnName="Sign Up" onSubmitFunc={register} />
