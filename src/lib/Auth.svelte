<script>
  import Error from './Error.svelte';
  import { authHandlers, user } from '../stores/authStore';

  export let signup;

  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';

  if ($user) {
    window.location.href = '/dashboard';
  }

  async function handleSubmit() {
    if (!email || !password || (signup && !confirmPassword)) {
      // TODO set error?
      return;
    }

    if (signup && password === confirmPassword) {
      try {
        await authHandlers.signup(email, password);
      } catch (err) {
        error = err;
      }
    } else {
      try {
        await authHandlers.login(email, password);
      } catch (err) {
        error = err;
      }
    }

    if ($user) {
      window.location.href = '/dashboard';
    }
  }
</script>

<div>
  <h1>{signup ? 'Sign up' : 'Login'}</h1>
  <form>
    <label>
      Email
      <input bind:value={email} type="email" placeholder="Email" required />
    </label>
    <label>
      Password
      <input bind:value={password} type="password" placeholder="Password" required />
    </label>
    {#if signup}
      <label>
        Confirm Password
        <input bind:value={confirmPassword} type="password" placeholder="Password" required />
      </label>
    {/if}
    <button on:click={handleSubmit}>Submit</button>
  </form>
  {#if signup}
    <div>
      Already have an account? <a href="/login">Log in</a>
    </div>
  {:else}
    <div>
      Don't have an account? <a href="/signup">Sign up</a>
    </div>
  {/if}
  {#if error}
    <Error {error} />
  {/if}
</div>
