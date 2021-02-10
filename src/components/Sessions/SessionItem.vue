<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>
      <img
        :src="session.image"
        :style="{ height: '50px' }"
        class="img-fluid img-thumbnail"
        :alt="session.type"
      />
    </td>
    <td>{{ session.type }}</td>
    <td>{{ session.date | dateTimeFilter }}</td>
    <td>
      <button
        class="btn btn-success mr-2 btn-sm"
        @click="$router.push(`/session/${session.id}`)"
      >
        View
      </button>
      <button
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-session?edit=${session.id}`)"
      >
        Edit
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteSession">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
import { DELETE_SESSION } from "../../gql";
import { toast } from "../../helpers";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: {
    session: {
      type: Object,
      required: true,
    },
    sno: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async deleteSession() {
      let { data } = await this.$apollo.mutate({
        mutation: DELETE_SESSION,
        variables: { id: this.session.id },
      });
      toast("success", data.deleteSession.message);
      this.$emit("session-deleted");
    },
  },
};
</script>