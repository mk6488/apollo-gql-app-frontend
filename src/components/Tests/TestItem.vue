<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>{{ test.date | dateFilter }}</td>
    <td>{{ test.weekNumber }}</td>
    <td>{{ test.athlete.firstName }}</td>
    <td>{{ test.test }}</td>
    <td>{{ test.result }}</td>
    <td>
      <button
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-test?edit=${test.id}`)"
      >
        Edit
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteTest">Delete</button>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
import { DELETE_TEST } from "../../gql";
import { toast } from "../../helpers";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: {
    test: {
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
    async deleteTest() {
      let { data } = await this.$apollo.mutate({
        mutation: DELETE_TEST,
        variables: { id: this.test.id },
      });
      toast("success", data.deleteTest.message);
      this.$emit("test-deleted");
    },

    currentAge(val) {
      return moment(new Date()).diff(val, "years");
    },
  },
};
</script>