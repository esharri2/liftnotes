<script>
  export let error;

  console.log("ERROR: ", error);

  const errorMessages = {
    "auth/wrong-password": "Your password is not correct. Please try again.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/email-already-in-use": "This email is already in use.",
  }
  // Clean up error message from Firebase to make it user-facing
  const errorMessage = errorMessages[error.code] || "Sorry, there was a problem!";
</script>

<div role="alert">{errorMessage}</div>