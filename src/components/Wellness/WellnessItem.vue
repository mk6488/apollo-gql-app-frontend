<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>{{ wellness.firstName }} {{ wellness.lastName }}</td>
    <td>{{ wellness.squad }}</td>
    <td>{{ wellness.weight }}</td>
    <td>{{ wellness.current }}</td>
    <td>{{ wellness.doe }}</td>
    <td>{{ wellness.dob | birthDateFilter }}</td>
    <td>
      <button
        class="btn btn-success mr-2 btn-sm"
        @click="$router.push(`/wellness/${wellness.id}`)"
      >
        View
      </button>
      <button
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-wellness?edit=${wellness.id}`)"
      >
        Edit
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteWellness">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
import { DELETE_WELLNESS } from "../../gql";
import { toast } from "../../helpers";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: {
    wellness: {
      type: Object,
      required: true,
    },
    sno: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async deleteWellness() {
      let { data } = await this.$apollo.mutate({
        mutation: DELETE_WELLNESS,
        variables: { id: this.wellness.id },
      });
      toast("success", data.deleteWellness.message);
      this.$emit("wellness-deleted");
    },
  },
};
</script>