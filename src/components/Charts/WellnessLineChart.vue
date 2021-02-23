<template>
  <div>
    <div class="d-flex wellness-chart">
      <chart
        style="width: 100%"
        :options="getOptions('Average Wellness', date, average)"
      ></chart>
    </div>
  </div>
</template>

<script>
import { ALL_WELLNESS_FOR_ATHLETE } from "../../gql";
import { weekNumber } from "../../helpers";

export default {
  props: ["athleteId"],
  data() {
    return {
      thisWeek: weekNumber(new Date()),
      wellness: [],
      date: [],
      sleep: [],
      stress: [],
      fatigue: [],
      soreness: [],
      nutrition: [],
      average: [],
    };
  },
  methods: {
    async getWellness() {
      let { data } = await this.$apollo.query({
        query: ALL_WELLNESS_FOR_ATHLETE,
        variables: { id: this.athleteId },
      });
      this.wellness = data.allWellnessForAthlete;
      this.wellness = this.$_.sortBy(this.wellness, "date");
      // this.wellness = this.$_.where(this.wellness, {
      //   weekNumber: this.thisWeek,
      // });
      this.wellness.forEach((d) => {
        this.date.push(d.date);
        this.sleep.push(d.sleep);
        this.stress.push(d.stress);
        this.fatigue.push(d.fatigue);
        this.soreness.push(d.soreness);
        this.nutrition.push(d.nutrition);
        this.average.push(d.average);
      });
    },

    getOptions(name, date, val) {
      const options = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "5%",
          right: "15%",
          bottom: "10%",
        },
        xAxis: {
          data: date,
        },
        yAxis: { min: 1 },
        dataZoom: [
          {
            startValue: new Date(),
            endValue: new Date() - 28,
          },
          {
            type: "inside",
          },
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 1,
              lte: 2,
              color: "#93CE07",
            },
            {
              gt: 2,
              lte: 3,
              color: "#58D9F9",
            },
            {
              gt: 3,
              lte: 4,
              color: "#FDDD60",
            },
            {
              gt: 4,
              lte: 5,
              color: "#FF6E76",
            },
          ],
          outOfRange: {
            color: "#999",
          },
        },
        series: {
          name: "Sleep",
          type: "line",
          smooth: true,
          data: val,
          markLine: {
            silent: true,
            lineStyle: {
              color: "#333",
            },
            data: [
              {
                yAxis: 1,
              },
              {
                yAxis: 2,
              },
              {
                yAxis: 3,
              },
              {
                yAxis: 4,
              },
              {
                yAxis: 5,
              },
            ],
          },
        },
      };
      return options;
    },
  },
  created() {
    this.getWellness();
  },
};
</script>