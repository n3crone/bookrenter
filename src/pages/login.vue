<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-col cols="8" sm="6" md="4" lg="3">
      <v-card>
          <v-card-title class="justify-center">
            <img src="/static/logo.png" alt="logo" width="100%" />
          </v-card-title>
          <v-card-actions class="justify-center">
              <v-btn @click="googleLogin()" color="secondary" width="100%">
                <v-icon left>mdi-google</v-icon>
                Zaloguj
              </v-btn>
          </v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showLoginForm: true,
      loginError: false,
    };
  },
  methods: {
    googleLogin() {
      this.loginError = false;
      this.$analytics.logEvent('loginClick');
      this.$store.dispatch('googleLogin').catch(() => {
        this.loginError = true;
      });
    },
  },
};
</script>
