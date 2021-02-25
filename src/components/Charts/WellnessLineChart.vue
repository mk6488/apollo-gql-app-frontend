<template>
  <div>
    <div class="wellness-chart">
      <div class="form-group d-flex flex-wrap">
        <div class="mr-2" v-for="item in btnArray" :key="item.id">
          <input
            @click="selectedBtn(item.id, item.name)"
            type="radio"
            class="btn-check"
            name="wellness"
            :id="item.id"
            autocomplete="off"
          />
          <label
            v-if="chosenBtn === item.id"
            :for="item.id"
            class="btn btn-primary btn-athlete"
            >{{ item.name }}</label
          >
          <label
            v-else
            :for="item.id"
            class="btn btn-outline-primary btn-athlete"
            >{{ item.name }}</label
          >
        </div>
      </div>
      <chart style="width: 100%" :options="getOptions(name, date, val)"></chart>
    </div>
  </div>
</template>

<script>
import { ALL_WELLNESS_FOR_ATHLETE } from "../../gql";

export default {
  props: ["athleteId"],
  data: () => ({
    btnArray: [
      { id: "average", name: "Average" },
      { id: "sleep", name: "Sleep" },
      { id: "stress", name: "Stress" },
      { id: "fatigue", name: "Fatigue" },
      { id: "soreness", name: "Soreness" },
      { id: "nutrition", name: "Nutrition" },
    ],
    chosenBtn: "",
    date: [],
    sleep: [],
    stress: [],
    fatigue: [],
    soreness: [],
    nutrition: [],
    average: [],
    name: "",
    val: [],
  }),
  methods: {
    async getWellness() {
      let { data } = await this.$apollo.query({
        query: ALL_WELLNESS_FOR_ATHLETE,
        variables: { id: this.athleteId },
      });
      let wellness = data.allWellnessForAthlete;
      wellness = this.$_.sortBy(wellness, "date");
      wellness.forEach((d) => {
        this.date.push(d.date);
        this.sleep.push(d.sleep);
        this.stress.push(d.stress);
        this.fatigue.push(d.fatigue);
        this.soreness.push(d.soreness);
        this.nutrition.push(d.nutrition);
        this.average.push(d.average);
      });
    },

    selectedBtn(id, name) {
      switch (id) {
        case "average":
          this.val = this.average;
          this.name = `Daily ${name} Wellness`;
          this.chosenBtn = id;
          break;

        case "sleep":
          this.val = this.sleep;
          this.name = `Daily ${name}`;
          this.chosenBtn = id;
          break;

        case "stress":
          this.val = this.stress;
          this.name = `Daily ${name}`;
          this.chosenBtn = id;
          break;

        case "fatigue":
          this.val = this.fatigue;
          this.name = `Daily ${name}`;
          this.chosenBtn = id;
          break;

        case "soreness":
          this.val = this.soreness;
          this.name = `Daily ${name}`;
          this.chosenBtn = id;
          break;

        case "nutrition":
          this.val = this.nutrition;
          this.name = `Daily ${name}`;
          this.chosenBtn = id;
          break;
      }
    },

    getOptions(name, date, val) {
      const options = {
        tooltip: { trigger: "axis" },
        grid: { left: "5%", right: "15%", bottom: "10%" },
        xAxis: { data: date },
        yAxis: { min: 1 },
        dataZoom: [
          { startValue: new Date(), endValue: new Date() - 28 },
          { type: "inside" },
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            { gt: 1, lte: 2, color: "#93CE07" },
            { gt: 2, lte: 3, color: "#58D9F9" },
            { gt: 3, lte: 4, color: "#FDDD60" },
            { gt: 4, lte: 5, color: "#FF6E76" },
          ],
          outOfRange: { color: "#999" },
        },
        series: {
          name: name,
          type: "line",
          smooth: true,
          data: val,
          markLine: {
            silent: true,
            lineStyle: { color: "#333" },
            data: [
              { yAxis: 1 },
              { yAxis: 2 },
              { yAxis: 3 },
              { yAxis: 4 },
              { yAxis: 5 },
            ],
          },
        },
      };
      return options;
    },
  },
  created() {
    this.getWellness();
    this.val = this.average;
    this.name = "Daily Average Wellness";
    this.chosenBtn = "average";
  },
};
</script>