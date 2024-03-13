<template>
  <div class="modal col-12">
    <div class="modal-content text-center">
      <h3>Zresetuj hasło</h3>
      <div v-if="!showSuccess">
        <form @submit.prevent>
          <v-text-field v-model.trim="email" type="email" placeholder="Email" outlined dense/>
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <v-btn @click="resetPassword()" small color="secondary">Resetuj</v-btn>
        <v-btn @click="$emit('close')" small text>zamknij</v-btn>
      </div>
      <p v-else>
        Email z resetem hasła wysłany.<br/>
        <v-btn @click="$emit('close')" small text>zamknij</v-btn>
      </p>
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
