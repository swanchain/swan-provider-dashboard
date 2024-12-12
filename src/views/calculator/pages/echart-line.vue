<template>
  <div class='chart-trends' id='chart-price' v-loading="cpLoad" element-loading-background="rgba(122, 122, 122, 0.8)"></div>
</template>

<script setup lang="ts">
import { NumFormat, dataPrice, replaceFormat, timeout } from "@/utils/common";
import * as echarts from "echarts"
import { title } from "process";

const props = withDefaults(
  defineProps<{
    profitData?: any
  }>(),
  {
    profitData: []
  }
)
const cpLoad = ref(false)

const changetype = async () => {
  cpLoad.value = true
  await timeout(500)
  const machart_price = echarts.init(document.getElementById("chart-price")!)
  try { 
    const priceData = await dataPrice(props.profitData, 'price')

    const roiData = await dataPrice(props.profitData, 'roi')
    const roiNumberMax = Math.max(...roiData)
    const roiMax = Math.ceil(Math.max(...roiData)*roiNumberMax)
    const roiNumberMin = Math.min(...roiData)
    const roiMin = Math.floor(Math.min(...roiData)*roiNumberMin)
    // const roiInterval = Math.ceil((roiMax-roiMin)/(roiMin===0?4:5))
    const roiInterval = Math.ceil((roiNumberMax-roiNumberMin)/(roiNumberMin===0?4:5))

    const profitData = await dataPrice(props.profitData, 'profit')
    const profitNumberMax = Math.max(...profitData)
    const profitMax = Math.ceil(Math.max(...profitData)*profitNumberMax)
    const profitNumberMin = Math.min(...profitData)
    const profitMin = Math.floor(Math.min(...profitData)*profitNumberMin)
    const profitInterval = Math.ceil((profitNumberMax-profitNumberMin)/(profitNumberMin===0?4:5))

    const option1 = {
      title: {
        text: 'Return Forecast'
      },
      tooltip: {
        trigger: 'axis',
        // triggerOn: 'none',
        // position: function (pt: any) {
        //   return [pt[0], 130];
        // },
        textStyle: {
          fontFamily: 'HELVETICA-ROMAN'
        },
        formatter: function (params: any) {
          let result = '<div style="padding: 0.04rem 0.14rem">'
          result += '<div class="w-100 font-14">Price</div>' +
                       '<div class="w-100 font-18 mtb-10" style="color:rgba(68, 125, 255,1)">' + NumFormat(params[0].name, 4) + '</div>';
          params.forEach(function (item: any) {
            result += '<div class="w-100 font-16">' + item.seriesName + '</div>' +
                      '<div class="w-100 font-18 mtb-10" style="color:' + item.color + '">' + NumFormat(item.value, 4) + '' + '</div>';
          });
          result += '</div>'
          return result;
        },
      },
      // legend: {
      //   data: ['ROI', 'Return']
      // },
      color: ['rgba(68, 125, 255, 1)', 'rgba(118, 185, 0, 1)'],
      grid: {
        left: document.documentElement.clientWidth >= 2200 ? 100 : document.documentElement.clientWidth >= 768 ? 60 : 20,
        right: '5%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          name: 'Price($)',
          nameLocation: 'start',
          nameTextStyle: { 
            fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 17 : 12,
            padding: document.documentElement.clientWidth >= 768 ? [0, -10, 0, 0] : [0, -40, -30, 0]
          },
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.8)' 
            }
          },
          axisLabel: {
            fontFamily: 'HELVETICA-ROMAN',
            fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 17 : 12,
            color: 'rgba(0, 0, 0, 0.8)', 
            interval: function (index:any, value:any) {
              var count = 3;
              var step = Math.ceil(priceData.length / count); 
              return index % step === 0 ? value : false;
            },
            formatter: function (value: any) {
              return value.split(' ').join('\n');
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'solid', 
              color: 'rgba(0, 0, 0, 0.8)' 
            }
          },
          data: priceData,
          axisPointer: {
            // value: '0.005',
            // snap: true,
            // lineStyle: {
            //   color: 'rgba(68, 125, 255,1)',
            //   width: 2
            // },
            // label: {
            //   show: true,
            //   backgroundColor: 'rgba(68, 125, 255,1)'
            // },
            // handle: {
            //   show: true,
            //   color: '#000',
            //   size: 0, 
            //   borderColor: 'transparent',
            //   borderWidth: 0,
            //   borderType: 'none', 
            //   draggable: false
            // }
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'ROI',
          nameTextStyle: { 
            fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 17 : 12,
          },
          axisLabel: {
            fontFamily: 'HELVETICA-ROMAN',
            fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 17 : 12,
            color: 'rgba(68, 125, 255, 1)',
            formatter: function (value: any) {
              return NumFormat(value, 4);
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.6)' 
            }
          },
          splitLine: {
            show: false 
          },
          position: 'right',
          offset: 0,
          interval: roiInterval,
          // splitNumber: 5,
          max: roiNumberMax,
          min: roiNumberMin
        },
        {
          type: 'value',
          name: 'Return',
          nameTextStyle: { 
            fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 17 : 12,
          },
          axisLabel: {
            fontFamily: 'HELVETICA-ROMAN',
            fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 17 : 12,
            color: 'rgba(118, 185, 0, 1)',
            formatter: function (value: any) {
              return NumFormat(value, 4);
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.6)' 
            }
          },
          splitLine: {
            show: false 
          },
          position: 'right',
          offset: document.documentElement.clientWidth >= 1260 ? 100 : document.documentElement.clientWidth >= 768 ? 80 : 40,
          interval: profitInterval,
          // splitNumber: 5,
          max: profitNumberMax,
          min: profitNumberMin
        }
      ],
      series: [
        {
          name: 'ROI',
          type: 'line',
          yAxisIndex: 0,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(68, 125, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgba(68, 125, 255, 0.3)'
              }
            ])
          },
          smooth: true,
          showSymbol: false,
          data: roiData
        },
        {
          name: 'Return',
          type: 'line',
          yAxisIndex: 1,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(118, 185, 0, 1)'
              },
              {
                offset: 1,
                color: 'rgba(118, 185, 0, 0.3)'
              }
            ])
          },
          // emphasis: {
          //   focus: 'series'
          // },
          smooth: true,
          showSymbol: false,
          data: profitData
        }
      ]
    }
    machart_price.setOption(option1)

    if (typeof ResizeObserver !== 'undefined') {
      let observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          machart_price.resize();
        }
      });

      let element = document.getElementById('main-container')!;
      observer.observe(element);
    } else {
      console.log('ResizeObserver is not supported in this browser.');
    }
    window.addEventListener("resize", function () {
      machart_price.resize();
    })
    cpLoad.value = false
  } catch {
    cpLoad.value = false
  }
}

onMounted(async () => changetype())
watch(() => props.profitData, () => changetype())
</script>

<style lang="less" scoped>
.chart-trends {
  width: 100%;
  margin: 0 auto;
  height: 5rem;
  // @media screen and (min-width: 3600px) {
  //   height: 350px;
  // }
  // @media screen and (max-width: 768px) {
  //   height: 250px;
  // }
  // @media screen and (max-width: 600px) {
  //   height: 200px;
  // }
}
</style>
