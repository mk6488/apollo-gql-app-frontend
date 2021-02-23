<template>
  <div class="app-navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="/"
        >Athlete<span class="text-primary"> Book</span></b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <li class="nav-item">
            <routerLink class="nav-link" to="/">Home</routerLink>
          </li>
          <li class="nav-item">
            <routerLink class="nav-link" to="/about">About</routerLink>
          </li>
          <li class="nav-item" v-if="!isAuth">
            <routerLink class="nav-link" to="/auth/login">Login</routerLink>
          </li>
          <li class="nav-item" v-if="!isAuth">
            <routerLink class="nav-link" to="/auth/register"
              >Register</routerLink
            >
          </li>

          <li class="nav-item" v-if="isAuth">
            <routerLink
              class="nav-link text-primary"
              to="/dashboard/my-sessions"
              >My Sessions</routerLink
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <routerLink
              class="nav-link text-primary"
              to="/dashboard/my-athletes"
              >Athletes</routerLink
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <routerLink
              class="nav-link text-primary"
              to="/dashboard/my-wellness"
              >Wellness</routerLink
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <routerLink class="nav-link text-primary" to="/dashboard/my-loads"
              >Loads</routerLink
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <routerLink
              class="nav-link text-primary"
              to="/dashboard/my-comments"
              >Comments</routerLink
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <routerLink class="nav-link text-primary" to="/dashboard/my-tests"
              >Tests</routerLink
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <routerLink class="nav-link text-primary" to="/dashboard/my-charts"
              >Charts</routerLink
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <routerLink class="nav-link text-primary" to="/dashboard/my-profile"
              >My Profile</routerLink
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <routerLink class="nav-link" to="/dashboard/logout"
              >Logout</routerLink
            >
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isAuth: "Auth/isAuth",
    }),
  },
};
</script>