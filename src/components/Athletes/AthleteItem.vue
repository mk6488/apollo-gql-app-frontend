<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>{{ athlete.firstName }} {{ athlete.lastName }}</td>
    <td>{{ athlete.squad }}</td>
    <td>{{ athlete.weight }}</td>
    <td>{{ athlete.current }}</td>
    <td>{{ athlete.doe }}</td>
    <td>{{ athlete.dob | birthDateFilter }}</td>
    <td>
      <button
        class="btn btn-success mr-2 btn-sm"
        @click="$router.push(`/athlete/${athlete.id}`)"
      >
        View
      </button>
      <button
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-athlete?edit=${athlete.id}`)"
      >
        Edit
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteAthlete">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
import { DELETE_ATHLETE } from "../../gql";
import { toast } from "../../helpers";
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
  methods: {
    async deleteAthlete() {
      let { data } = await this.$apollo.mutate({
        mutation: DELETE_ATHLETE,
        variables: { id: this.athlete.id },
      });
      toast("success", data.deleteAthlete.message);
      this.$emit("athlete-deleted");
    },
  },
};
</script>