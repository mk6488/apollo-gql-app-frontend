<template>
  <div>
    <div class="load-bar">
      <chart style="width: 100%" :options="getOptions(date, val)"></chart>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { ALL_LOADS_FOR_ATHLETE } from "../../gql";

export default {
  props: ["athleteId"],
  data: () => ({
    date: [],
    loads: [],
    val: [],
  }),
  methods: {
    async getLoads() {
      let { data } = await this.$apollo.query({
        query: ALL_LOADS_FOR_ATHLETE,
        variables: { id: this.athleteId },
      });
      let loadsAr = data.allLoadsForAthlete;
      loadsAr = this.$_.sortBy(loadsAr, "date");
      loadsAr.forEach((d) => {
        this.date.push(moment(d.date).format("MMM Do"));
        this.loads.push(d.load);
      });
    },

    getOptions(date, val) {
      const options = {
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        xAxis: [{ data: date, axisTick: { alignWithLabel: true } }],
        yAxis: [{ type: "value" }],
        dataZoom: [
          { startValue: new Date(), endValue: new Date() - 28 },
          { type: "inside", zoomOnMouseWheel: false },
        ],
        series: [{ name: "loads", type: "bar", barWidth: "60%", data: val }],
      };
      return options;
    },
  },
  created() {
    this.getLoads();
    this.val = this.loads;
  },
};
</script>