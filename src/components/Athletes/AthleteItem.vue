<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <th scope="row">
      <img :src="athlete.avatar" class="img-fluid" height="40" width="40" />
    </th>
    <td :class="{ 'text-danger': !athlete.current }">
      {{ athlete.firstName }} {{ athlete.lastName }}
    </td>
    <td :class="{ 'text-danger': !athlete.current }">
      {{ currentAge(athlete.dob) }}yo
    </td>
    <td :class="{ 'text-danger': !athlete.current }">{{ athlete.squad }}</td>
    <td :class="{ 'text-danger': !athlete.current }">{{ athlete.weight }}</td>
    <td :class="{ 'text-danger': !athlete.current }">{{ athlete.doe }}</td>
    <td :class="{ 'text-danger': !athlete.current }">
      {{ athlete.dob | birthDateFilter }}
    </td>
    <td class="d-flex">
      <button
        class="btn btn-success mr-2 btn-sm"
        @click="$router.push(`/dashboard/athlete/${athlete.id}`)"
      >
        View
      </button>
      <button
        :disabled="!athlete.current"
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-athlete?edit=${athlete.id}`)"
      >
        Edit
      </button>
      <div
        class="custom-control custom-switch d-flex align-items-start flex-column"
      >
        <input
          @change="updateAthlete"
          type="checkbox"
          class="custom-control-input"
          :id="athlete.id"
          v-model="athlete.current"
        />
        <label
          v-if="athlete.current"
          class="custom-control-label text-danger font-weight-bold"
          :for="athlete.id"
          >Active</label
        >
        <label
          v-else
          class="custom-control-label text-secondary font-weight-bold"
          :for="athlete.id"
          >Inactive</label
        >
      </div>
    </td>
  </tr>
</template>

<script>
import { TOGGLE_CURRENT } from "../../gql";
import moment from "moment";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: {
    athlete: {
      type: Object,
      required: true,
    },
    sno: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    age: "",
  }),
  methods: {
    async updateAthlete() {
      await this.$apollo.mutate({
        mutation: TOGGLE_CURRENT,
        variables: { id: this.athlete.id, current: this.athlete.current },
      });
      this.$emit("refresh");
    },

    currentAge(val) {
      return moment(new Date()).diff(val, "years");
    },
  },
};
</script>