<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-primary">Hello</h3>
          <hr />
          <div class="form-group">
            <label for="date">Date</label>
            <input type="datetime-local" class="form-control" v-model="date" />
            <p>Date: {{ date }}</p>
          </div>
          <button class="btn btn-primary" @click="calculate">Calculate</button>
          <div class="form-group">
            <label for="date">Week Number</label>
            <h1>Week {{ calculate(date) }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    date: "",
  }),
  methods: {
    calculate(val) {
      return moment(val).diff("2020-09-07", "weeks") + 1;
    },
  },
};
</script>

<style>
</style>