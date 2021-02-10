<template>
  <div class="auth-register">
    <div class="row">
      <div class="col-md-6 col-sm-12 mx-auto">
        <div class="card">
          <div class="card-header">
            <h3 class="text-primary font-weight-bold">Register</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="signUpUser">
              <div class="form-group">
                <label
                  for="firstName"
                  class="text-primary font-weight-bold font-size-sm"
                  >First Name</label
                >
                <input
                  type="text"
                  placeholder="First Name"
                  class="form-control"
                  id="firstName"
                  v-model="user.firstName"
                />
              </div>
              <div class="form-group">
                <label
                  for="lastName"
                  class="text-primary font-weight-bold font-size-sm"
                  >Last Name</label
                >
                <input
                  type="text"
                  placeholder="Last Name"
                  class="form-control"
                  id="lastName"
                  v-model="user.lastName"
                />
              </div>
              <div class="form-group">
                <label
                  for="username"
                  class="text-primary font-weight-bold font-size-sm"
                  >Username</label
                >
                <input
                  type="text"
                  placeholder="Username"
                  class="form-control"
                  id="username"
                  v-model="user.username"
                />
              </div>
              <div class="form-group">
                <label
                  for="email"
                  class="text-primary font-weight-bold font-size-sm"
                  >Email</label
                >
                <input
                  type="email"
                  placeholder="Email"
                  class="form-control"
                  id="email"
                  v-model="user.email"
                />
              </div>
              <div class="form-group">
                <label
                  for="password"
                  class="text-primary font-weight-bold font-size-sm"
                  >Password</label
                >
                <input
                  type="password"
                  placeholder="Password"
                  class="form-control"
                  id="password"
                  v-model="user.password"
                />
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block">Register</button>
              </div>
              <div class="form-group">
                <routerLink to="/auth/login"
                  >Already have an account? Login Now!</routerLink
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    user: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions({
      registerUser: "Auth/registerUser",
    }),
    signUpUser() {
      this.registerUser(this.user);
    },
  },
};
</script>