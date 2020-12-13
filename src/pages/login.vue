<template>
  <v-row justify="center">
    <v-col id="login"
           cols="12"
           sm="6"
           md="4"
           lg="2"
    >
      <v-card ref="form">
        <v-form v-if="showLoginForm"
                ref="form"
                lazy-validation
        >
          <v-card-title>
            📚 Zaloguj się
          </v-card-title>
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
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn @click="login()" color="primary" text>Zaloguj</v-btn>
            <v-btn @click="toggleForm()" color="secondary" text>Załóż konto</v-btn>
          </v-card-actions>
          <password-reset v-if="showPasswordReset" @close="togglePasswordReset()"></password-reset>
        </v-form>
        <v-form v-else>
          <v-card-title>
            📚 Załóż konto
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="signupForm.name"
                label="Imię"
                required
            ></v-text-field>
            <v-text-field
                v-model.trim="signupForm.email"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                v-model="signupForm.password"
                label="Hasło"
                type="password"
                name="input-10-1"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="signup()" class="button" color="primary" text>
              Załóż konto
            </v-btn>
            <v-btn @click="toggleForm()" text color="secondary">
              Wróć
            </v-btn>
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
