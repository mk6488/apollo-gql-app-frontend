<template>
  <div id="app" class="d-flex flex-column">
    <Navbar />
    <div class="container-fluid py-5 flex-grow-1">
      <routerView />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

export default {
  components: { Navbar, Footer },
  async created() {
    this.$store.dispatch("Auth/getAuthUser");
  },
};
</script>
