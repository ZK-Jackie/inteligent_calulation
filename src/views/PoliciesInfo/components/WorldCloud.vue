<template>
  <div id="container"></div>
</template>

<script>
import anychart from 'anychart';
import {WordFrequency}  from "@/views/PoliciesInfo/components/WordFrequency";

export default{
  data(){
    return{
      tagwords: WordFrequency,
    }
  },
  // methods:{
  //   extractColorsAndPositions(gradient) {//从 CSS 渐变色字符串中提取出所有的颜色值和它们的位置
  //     var regex = /rgb\((\d+), (\d+), (\d+)\) (\d+)%/g;
  //     var match;
  //     var colorsAndPositions = [];
  //     while ((match = regex.exec(gradient)) !== null) {
  //       var color = 'rgb(' + match[1] + ', ' + match[2] + ', ' + match[3] + ')';
  //       var position = match[4];
  //       colorsAndPositions.push({color: color, position: position});
  //     }
  //     return colorsAndPositions;
  //   },
  //   createSvgGradient(colorsAndPositions) {//使用这些颜色值和位置来创建一个 SVG 渐变
  //       var svgns = "http://www.w3.org/2000/svg";
  //       var svg = document.createElementNS(svgns, "svg");
  //       var defs = document.createElementNS(svgns, "defs");
  //       var radialGradient = document.createElementNS(svgns, "radialGradient");
  //       radialGradient.setAttribute("id", "gradient");
  //       radialGradient.setAttribute("cx", "50%");
  //       radialGradient.setAttribute("cy", "50%");
  //       radialGradient.setAttribute("r", "50%");
  //       radialGradient.setAttribute("fx", "50%");
  //       radialGradient.setAttribute("fy", "50%");
  //       for (var i = 0; i < colorsAndPositions.length; i++) {
  //         var stop = document.createElementNS(svgns, "stop");
  //         stop.setAttribute("offset", colorsAndPositions[i].position + "%");
  //         stop.setAttribute("stop-color", colorsAndPositions[i].color);
  //         radialGradient.appendChild(stop);
  //       }
  //       defs.appendChild(radialGradient);
  //       svg.appendChild(defs);
  //       return 'url(data:image/svg+xml;base64,' + btoa(svg.outerHTML) + ')';
  //    }
  // },
  mounted(){
    // var canvas = document.querySelector('.canvas');
    // var canvasBackgroundColor = window.getComputedStyle(canvas).backgroundImage;
    // var colorsAndPositions = extractColorsAndPositions(canvasBackgroundColor);
    // var svgGradient = createSvgGradient(colorsAndPositions);
　　this.$nextTick(() => {
    var chart = anychart.tagCloud(this.tagwords);
    chart.container("container");
    chart.normal().fontWeight(600);
    // var customColorScale = anychart.scales.linearColor();
    // customColorScale.colors('#87CEEB', '#9370DB', '#BDB76B', '#EEE8AA');
    // chart.colorScale(customColorScale);
    //chart.colorRange().enabled(true);
    chart.background().fill("rgb(0,0,0,0)");
    // chart.container().background({
    //   image: svgGradient,
    //   mode: "fit"
    // });
    chart.draw();
    setTimeout(function () {
      $('.anychart-credits').remove();
    }, 100);
  });
  }
}
</script>

<style scoped>
#container{
  padding-top: 0rem;
  width: 100%;
  height: 4.1rem;
}
</style>
