<script>
  import AuthForm from "../../lib/components/Login/AuthForm.svelte";
  import messagesStore from "$lib/stores/messages.store";
  import { mailResetPasswordEmail } from "$lib/firebase/auth.client";

  let hideForm = false;
  async function onForgotPassword(e) {
    try {
      const formData = new FormData(e.target.value);
      const email = formData.get("email");
      if (!email) {
        messagesStore.showError("Please enter the email");
      }
      await mailResetPasswordEmail(email);
      hideForm = true;
      messagesStore.showSuccess("Reset password email sent!");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        messagesStore.showError("Email not found, please try again!!!");
        return;
      }
      messagesStore.showError();
      console.log(
        `Error occured while sending forgot password link - ${error}`
      );
    }
  }
</script>

<div class="row">
  <div class="col">
    <h1>Forgot Password</h1>
  </div>
</div>

{#if !hideForm}
  <AuthForm
    btnName="Forgot Password"
    forgotPassword={true}
    onSubmitFunc={onForgotPassword}
  />
{/if}

<svelte:head>
  <title>Book Lovers - Forgot Password</title>
</svelte:head>
