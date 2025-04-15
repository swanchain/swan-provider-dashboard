<template>
  <div class="echart-calculator w-100">
    <div class='chart-trends' id='chart-price' v-loading="cpLoad" element-loading-background="rgba(122, 122, 122, 0.8)"></div>
    <div class="font-12 color-info">* Estimation is based on current provider and network conditions</div>
  </div>
</template>

<script setup lang="ts">
import { NumFormat, dataPrice, replaceFormat, replaceNumberFormat, timeout } from "@/utils/common";
import * as echarts from "echarts"
import { title } from "process";

const props = withDefaults(
  defineProps<{
    priceDefault?: number,
    profitData?: any
  }>(),
  {
    priceDefault: 0,
    profitData: []
  }
)
const cpLoad = ref(false)

const changetype = async () => {
  cpLoad.value = true
  await timeout(500)
  const machart_price = echarts.init(document.getElementById("chart-price")!, undefined, {
    renderer: 'svg'
  })
  try { 
    const priceData = await dataPrice(props.profitData, 'price')
    const p = replaceNumberFormat(props.priceDefault, 2)
    const defaultPrice = priceData.map((item: any, index: number) => ({ label: item, name: 'SWAN Price: $' + item, xAxis: index })).filter((obj: any) => obj.label.toString() === p);
    
    const roiData = await dataPrice(props.profitData, 'roi')
    const roiNumberMax = Math.max(...roiData) >= 0 ? 1 : 0.95
    const roiMax = Math.max(...roiData)*roiNumberMax
    const roiNumberMin = Math.min(...roiData)
    const roiMin = Math.floor(Math.min(...roiData)*roiNumberMin)
    // const roiInterval = Math.ceil((roiMax-roiMin)/(roiMin===0?4:5))
    const roiInterval = (roiMax - roiNumberMin) / (roiNumberMin === 0 ? 5 : 6)

    const profitData = await dataPrice(props.profitData, 'profit')
    const profitNumberMax = Math.max(...profitData) >= 0 ? 1 : 0.95
    const profitMax = Math.max(...profitData)*profitNumberMax
    const profitNumberMin = Math.min(...profitData)
    const profitMin = Math.floor(Math.min(...profitData)*profitNumberMin)
    const profitInterval = (profitMax - profitNumberMin) / (profitNumberMin === 0 ? 5 : 6)

    const option1 = {
      title: {
        text: 'Return Forecast',
        textStyle: {
          fontFamily: 'HELVETICA-ROMAN'
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: 'rgba(68, 125, 255,1)',
            width: 2
          }
        },
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
      color: ['rgba(68, 125, 255, 1)', 'rgba(118, 185, 0, 1)'],
      grid: {
        left: document.documentElement.clientWidth >= 2200 ? 100 : document.documentElement.clientWidth >= 768 ? 60 : 20,
        right: '7%',
        bottom: '35px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          name: 'Price($)',
          nameLocation: 'middle',
          nameGap: 30,
          nameTextStyle: { 
            align: 'center',
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
              var count = 11;
              var step = Math.ceil(priceData.length / count); 
              return index === 0 || (index + 1) % step === 0 || (priceData.length - 1) === index ? value : false;
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
          data: priceData
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'ROI{icon|ⓘ}(%)',
          nameLocation: 'end',
          nameTextStyle: { 
            padding: [0, 0, 5, 20],
            fontFamily: 'HELVETICA-ROMAN',
            fontWeight: 600,
            fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 17 : 12,
            color: 'rgba(68, 125, 255, 1)',
            rich: {
              icon: {
                fontSize: 12,
                color: 'rgba(68, 125, 255, 1)',
                padding: [0, 3, 0, 3]
              }
            }
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
          max: roiMax,
          min: roiNumberMin,
          tooltip: {
            show: true,
            formatter: '(Daily FCP Profit × 365) / CU / (Market Price of Baseline GPU / Swan Token Price + Base Collateral)',
          },
        },
        {
          type: 'value',
          name: 'Return{icon|ⓘ}($/Year)',
          nameLocation: 'end',
          nameTextStyle: { 
            padding: [0, 0, 5, 80],
            fontFamily: 'HELVETICA-ROMAN',
            fontWeight: 600,
            fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 17 : 12,
            color: 'rgba(118, 185, 0, 1)',
            rich: {
              icon: {
                fontSize: 12,
                color: 'rgba(118, 185, 0, 1)',
                padding: [0, 3, 0, 3]
              }
            }
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
          offset: document.documentElement.clientWidth >= 2200 ? 180 : document.documentElement.clientWidth >= 1260 ? 100 : 80,
          interval: profitInterval,
          // splitNumber: 5,
          max: profitMax,
          min: profitNumberMin,
          tooltip: {
            show: true,
            formatter: 'Daily FCP Profit × Swan Token Price × 365',
          },
        }
      ],
      series: [
        {
          name: 'ROI (%)',
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
          data: roiData,
          markLine: {
            symbol: ['none', 'none'], 
            label: {
              show: true,
              position: 'end',
              formatter: '{b}',
              textStyle: {
                color: 'rgba(68, 125, 255, 1)',
                fontFamily: 'HELVETICA-ROMAN',
                fontSize: document.documentElement.clientWidth >= 2200 ? 20 : document.documentElement.clientWidth >= 1920 ? 18 : 16,
              },
            },
            data: defaultPrice,
            lineStyle: {
              color: 'rgba(68, 125, 255, 1)',
              width: 2
            }
          },
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
      ],
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
.echart-calculator {
  position: relative;
  overflow-x: auto;
  .echart-tips {
    position: absolute;
    left: 150px;
    top: 6px;
  }
  .chart-trends {
    width: 100%;
    min-width: 600px;
    margin: 0 auto;
    height: 5.5rem;
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
}
</style>
