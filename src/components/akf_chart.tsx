import React from "react";
import { useRef, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

type Props = {
  paddingRight: number;
  data: { value: number; index: number }[];
};
export const AKFChart = ({ paddingRight, data }: Props) => {
  const chartRef = useRef<am5xy.XYChart | null>(null);

  useLayoutEffect(() => {
    let root = am5.Root.new("AKFChart");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        // wheelX: "panX",
        wheelY: "zoomXY",
        pinchZoomX: true,
      })
    );

    chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "АКФ для лучшей КП в популяции",
        fontSize: 20,
        fontWeight: "400",
        x: am5.p50,
        centerX: am5.p50,
      })
    );

    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        strictMinMax: true,
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Create series
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "index",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.data.setAll(data);
    series.appear(1000);
    chart.appear(1000, 100);

    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, [data]);

  useLayoutEffect(() => {
    if (chartRef.current) chartRef.current.set("paddingRight", paddingRight);
  }, [paddingRight]);

  return <div id="AKFChart" style={{ width: "100%", height: "500px" }}></div>;
};
