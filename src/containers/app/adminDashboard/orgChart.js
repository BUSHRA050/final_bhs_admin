import React, { useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Paper } from "@mui/material";

const  OrgCharts=(props)=> {
  const [chartData, setChartData] = useState(props.data || []);
  const series1Ref = useRef(null);
  const xAxisRef = useRef(null);

  // This code will only run one time
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv2");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      })
    );

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "month",
        sort: false,
        extraStart: false,
        extraEnd: false,
      })
    );

    // // Create series
    // let series1 = chart.series.push(
    //   am5xy.ColumnSeries.new(root, {
    //     name: "Series",
    //     xAxis: xAxis,
    //     yAxis: yAxis,
    //     valueYField: "totalOrders",
    //     categoryXField: "month",
    //   })
    // );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, stacked) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          stacked: stacked,
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "month",
        })
      );

      series.columns.template.setAll({
        tooltipText: "{month}",
        // tooltipText: "{name}, {categoryX}:{valueY}",
        width: am5.percent(90),
        tooltipY: am5.percent(10),
      });
      series.data.setAll(chartData);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.percent(50),
            centerX: am5.percent(50),
            populateText: true,
          }),
        });
      });

      // legend.data.push(series);
    }

    makeSeries("Total Orders", "totalnumbers", false);

    chart.appear(1000, 100);

    // Add legend
    // let legend = chart.children.push(am5.Legend.new(root, {}));
    // legend.data.setAll(chart.series.values);

    // Add cursor
    // chart.set("cursor", am5xy.XYCursor.new(root, {}));

    xAxisRef.current = xAxis;
    // series1Ref.current = series1;

    return () => root.dispose();
  }, []);

  // This code will run whenever chartData changes
  useLayoutEffect(() => {
    if (chartData.length) {
      xAxisRef.current.data.setAll(chartData);
      // series1Ref.current.data.setAll(chartData);
    }
  }, [chartData]);

  // This code will run whenever props.data changes
  useLayoutEffect(() => {
    if (props.data.length) {
      setChartData(props.data);
    }
  }, [props.data]);

  return (
    <Paper>
      <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
    </Paper>
  );
}

export default OrgCharts
