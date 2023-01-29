<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-col id="login"
           cols="12"
           sm="6"
           md="4"
           lg="3"
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
                autocomplete="username"
                required
                outlined
            ></v-text-field>
            <v-text-field
                v-model="loginForm.password"
                type="password"
                autocomplete="current-password"
                label="Hasło"
                outlined
            ></v-text-field>
            <div v-if="loginError" class="error--text">
              Błąd - sprawdź poprawność loginu i hasła i spróbuj ponownie.
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn @click="toggleForm()" color="secondary" text small>Załóż konto</v-btn>
            <v-btn @click="login()" color="primary" small>Zaloguj</v-btn>
          </v-card-actions>
          <div class="d-flex justify-center pb-3">
          <a class="text-body-2" @click="togglePasswordReset()">Nie pamiętasz hasła?</a>
          </div>
          <password-reset v-if="showPasswordReset" @close="togglePasswordReset()"></password-reset>
        </v-form>
        <v-form v-else>
          <v-card-title>
            📚 Załóż konto
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model.trim="signupForm.email"
                label="E-mail"
                @blur="autocompleteName"
                outlined
                dense
            ></v-text-field>
            <v-text-field
                v-model="signupForm.name"
                label="Imię"
                outlined
                dense
            ></v-text-field>
            <v-text-field
                v-model="signupForm.surname"
                label="Nazwisko"
                outlined
                dense
            ></v-text-field>
            <v-select
                v-model="signupForm.department"
                :items="Object.values(departments)"
                label="Dział"
                outlined
                dense
            ></v-select>
            <v-text-field
                v-model="signupForm.password"
                label="Hasło"
                type="password"
                outlined
                dense
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn @click="toggleForm()" text color="secondary" small>
              Wróć
            </v-btn>
            <v-btn @click="signup()" class="button" color="primary" small :disabled="!readyToCreate">
              Załóż konto
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import PasswordReset from '@/components/password-reset';
import { DEPARTMENTS } from '../variables';

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
      departments: DEPARTMENTS,
      signupForm: {
        name: '',
        surname: '',
        department: '',
        email: '',
        password: '',
      },
      showLoginForm: true,
      loginError: false,
      showPasswordReset: false,
    };
  },
  computed: {
    readyToCreate() {
      return !!this.signupForm.email && !!this.signupForm.name && !!this.signupForm.surname
          && !!this.signupForm.department && !!this.signupForm.password;
    },
  },
  methods: {
    autocompleteName() {
      if (!this.signupForm.name && !this.signupForm.surname && this.signupForm.email.split('@')) {
        const fullName = this.signupForm.email.split('@')[0].split('.');
        this.signupForm.name = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1);
        if (!fullName[1]) {
          return;
        }

        const surnameParts = [];
        fullName[1].split('-').forEach((surnamePart) => {
          surnameParts.push(surnamePart.charAt(0).toUpperCase() + surnamePart.slice(1));
        });
        this.signupForm.surname = surnameParts.join('-');
      }
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.loginError = false;
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      }).catch(() => {
        this.loginError = true;
      });
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: `${this.signupForm.name} ${this.signupForm.surname}`,
        department: this.signupForm.department,
      });
    },
  },
};
</script>
