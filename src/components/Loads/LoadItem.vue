<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>{{ load.date | dateFilter }}</td>
    <td>{{ load.weekNumber }}</td>
    <td class="">{{ load.athlete.firstName }}</td>
    <td>{{ load.type }}</td>
    <td>{{ load.duration }}</td>
    <td>{{ load.rpe }}</td>
    <td>{{ load.load }}</td>
    <td>
      <button
        class="btn btn-success mr-2 btn-sm"
        @click="$router.push(`/load/${load.id}`)"
      >
        View
      </button>
      <button
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-load?edit=${load.id}`)"
      >
        Edit
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteLoad">Delete</button>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
import { DELETE_LOAD } from "../../gql";
import { toast } from "../../helpers";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: {
    load: {
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
    async deleteLoad() {
      let { data } = await this.$apollo.mutate({
        mutation: DELETE_LOAD,
        variables: { id: this.load.id },
      });
      toast("success", data.deleteLoad.message);
      this.$emit("load-deleted");
    },

    currentAge(val) {
      return moment(new Date()).diff(val, "years");
    },
  },
};
</script>