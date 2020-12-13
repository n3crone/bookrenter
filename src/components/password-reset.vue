<template>
  <div class="modal">
    <v-icon @click="$emit('close')" class="close">mdi-close</v-icon>
    <div class="modal-content text-center">
      <h3>Zresetuj hasło</h3>
      <div v-if="!showSuccess">
        <form @submit.prevent>
          <v-text-field v-model.trim="email" type="email" placeholder="Email"/>
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <v-btn @click="resetPassword()" class="button">Reset</v-btn>
      </div>
      <p v-else>Success! Check your email for a reset link.</p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/db';

export default {
  name: 'PasswordReset',
  data() {
    return {
      email: '',
      showSuccess: false,
      errorMsg: '',
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = '';
      try {
        await auth.sendPasswordResetEmail(this.email);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>
