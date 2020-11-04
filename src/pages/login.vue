<template>
  <v-row justify="center">
    <v-col id="login"
           cols="12"
           sm="8"
           md="6"
           lg="4"
    >
      <v-card ref="form">
        <v-form v-if="showLoginForm"
                ref="form"
                lazy-validation
        >
          <v-card-text>
            <v-text-field
                v-model.trim="loginForm.email"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                v-model="loginForm.password"
                type="password"
                name="input-10-1"
                label="Hasło"
                hint="At least 8 characters"
                counter
            ></v-text-field>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions class="justify-center">
            <v-btn @click="login()">Log In</v-btn>
            <v-btn @click="togglePasswordReset()">Forgot Password</v-btn>
            <v-btn @click="toggleForm()">Create an Account</v-btn>
          </v-card-actions>
          <password-reset v-if="showPasswordReset" @close="togglePasswordReset()"></password-reset>
        </v-form>
        <v-form v-else>
          <h1>Get Started</h1>
          <v-card-text>
            <v-text-field
                v-model="signupForm.name"
                label="Name"
                required
            ></v-text-field>
            <v-text-field
                v-model.trim="signupForm.email"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                v-model="signupForm.password"
                type="password"
                name="input-10-1"
                label="Normal with hint text"
                hint="At least 8 characters"
                counter
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="signup()" class="button">Sign Up</v-btn>
            <v-btn @click="toggleForm()">Back to Log In</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PasswordReset from '@/components/password-reset';

export default {
  name: 'Login',
  components: {
    PasswordReset,
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      signupForm: {
        name: '',
        email: '',
        password: '',
      },
      showLoginForm: true,
      showPasswordReset: false,
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title,
      });
    },
  },
};
</script>
