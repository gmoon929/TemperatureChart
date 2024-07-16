<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, computed } from 'vue'
import * as d3 from 'd3';
import dayjs from 'dayjs';
import {
//   legendItems,
  TemperatureSumItems,
  PatientInfoItems,
  TemperatureTimes,
//   SectionToChinese,
  VerticalScales,
  TemperatureTopItems
} from './utils'



// 模拟数据
// const beginDate = dayjs(new Date()).format('YYYY-MM-DD')
const info = ref()
info.value = {
    beginDate: new Date(), //起始日期
    hospDays: 0, //住院天数
    operaDays: 0, //手术天数
}

// 日期
const inHospitalTime = computed(() => {
  const initday = dayjs(info.value.beginDate)
  return [null, 1, 2, 3, 4, 5, 6, 7].map((el: number | null) => {
    if (el && el > 1) {
      return initday.add(el - 1, 'day').format('MM-DD')
    }
    if (el) {
      return el ? initday.add(el - 1, 'day').format('YYYY-MM-DD') : null
    }
  })
})
console.log('日期',inHospitalTime.value)
// 住院天数
const inHospitalDays = computed(() => {
  const initday = info.value.hospDays || 0
  return [null, 1, 2, 3, 4, 5, 6, 7].map((el: number | null) => (el ? initday + el : null))
})
console.log('住院天数',inHospitalDays.value)
// 手术天数
const surgeryDays = computed(() => {
  const initday = info.value.operaDays
  if (!initday) {
    return new Array(8).fill(null)
  }
  return [null, 1, 2, 3, 4, 5, 6, 7].map((el: number | null) => (el ? initday + (el - 1) : null))
})
console.log('手术天数',surgeryDays.value)


// 定义单元格大小
const svgCellWidth = ref(18)
const svgCellHeight = ref(8)
const styleSvgCellWidth = ref(`${svgCellWidth.value}px`)
const styleSvgCellHeight = ref(`${svgCellHeight.value}px`)
// 每组单元格个数
const horizontalGroupCells = ref(6)
const verticalGroupCells = ref(10)
// 横纵组合个数
const horizontalGroups = ref(7)
const verticalGroups = ref(9)
const tdList = new Array(horizontalGroups.value * horizontalGroupCells.value).fill(0)
// 每组最后一行的单元格样式
const groupLastRow = {
  borderRight: '1px solid #666690',
  borderBottom: '1px solid #666690'
}
// 每组每行单元格的样式
const groupCellStyle = {
  borderBottom: '1px solid #666690'
}

//   //临时边框
//   main.append('rect')
//     .style('stroke', 'black') // 边框颜色
//     .style('stroke-width', 2) // 边框宽度
//     .style('fill', 'none'); // 无填充颜色
// }
const init = ()=>{
  // 温度测试数据
  const data = [
    { year: '1', value: 37 },
    { year: '2', value: 35 },
    { year: '3', value: 36.5 },
    { year: '4', value: 37.5 },
    { year: '5', value: 37 },
    { year: '6', value: 35 },
    { year: '7', value: 36.5 },
    { year: '8', value: 37.5 },
    { year: '9', value: 37 },
    { year: '10', value: 35 },
    { year: '11', value: 36.5 },
    { year: '12', value: 37.5 },
    { year: '13', value: 37 },
    { year: '14', value: 35 },
    { year: '15', value: 36.5 },
    { year: '16', value: 37.5 },
    { year: '17', value: 37 },
    { year: '18', value: 35 },
    { year: '19', value: 36.5 },
    { year: '20', value: 37.5 },
  ];
  // 脉搏测试数据
  const data1 = [
    { year: '1', value: 37 },
    { year: '2', value: 60 },
    { year: '3', value: 80 },
    { year: '4', value: 85 },
    { year: '5', value: 70 },
    { year: '6', value: 75 },
    { year: '7', value: 100 },
    { year: '8', value: 90 },
    { year: '9', value: 95 },
    { year: '10', value: 87 },
    { year: '11', value: 90 },
    { year: '12', value: 81 },
    { year: '13', value: 85 },
    { year: '14', value: 70 },
    { year: '15', value: 60 },
    { year: '16', value: 45 },
    { year: '17', value: 30 },
    { year: '18', value: 20 },
    { year: '19', value: 40 },
    { year: '20', value: 0 },
  ];
  // 创建画布
  const width = 670;
  const height = 740;
  const margin = { top: 79, right: 0, bottom: 20, left: 31 };

  const svg = d3.select('.svgContainer svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(0,0)`);

  // 创建x轴及比例尺
  const x = d3.scaleLinear()
    .domain([0, 42])
    .range([margin.left, width - margin.right])
  // 绑定x轴
  svg.append('g')
    .attr('class', 'axis')
    .style('opacity', 0)
    .attr('transform', `translate(-8,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(42));

  // 创建(体温)y轴及比例尺
  const y = d3.scaleLinear()
    .domain([33, 41])
    .range([height - margin.bottom, margin.top]);
  // 绑定(体温)y轴
  svg.append('g')
    .attr('class', 'axis')
    .style('opacity', 0)
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(9));

  // 创建(脉搏、心率)y轴及比例尺
  const y1 = d3.scaleLinear()
    .domain([0, 160])
    .range([height - margin.bottom, margin.top]);
  // 绑定(脉搏、心率)y轴
  svg.append('g')
    .attr('class', 'axis')
    .style('opacity', 0)
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y1).ticks(9));

  // 创建(呼吸)y轴及比例尺
  const y2 = d3.scaleLinear()
    .domain([10, 50])
    .range([height - margin.bottom, margin.top + 320]);
  // 绑定(呼吸)y轴
  svg.append('g')
    .attr('class', 'axis')
    .style('opacity', 0)
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y2).ticks(4));


  
  // 体温折线
  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 1)
    .attr('transform', `translate(-8,0)`)
    .attr('d', d3.line()
      .x((d: any) => x(d.year))
      .y((d: any) => y(d.value))
    );
  // 脉搏折线
  svg.append('path')
    .datum(data1)
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 1)
    .attr('transform', `translate(-8,0)`)
    .attr('d', d3.line()
      .x((d: any) => x(d.year))
      .y((d: any) => y1(d.value))
    );

  


  // 蓝色X符号(腋温)
  const drawx = () => {
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('line')
        .attr('transform', `translate(-8,0)`)
        .attr('x1', (d: any) => x(d.year)-4)
        .attr('y1', (d: any) => y(d.value)-4)
        .attr('x2', (d: any) => x(d.year)+4)
        .attr('y2', (d: any) => y(d.value)+4)
        .attr('stroke', 'blue');
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('line')
        .attr('transform', `translate(-8,0)`)
        .attr('x1', (d: any) => x(d.year)+4)
        .attr('y1', (d: any) => y(d.value)-4)
        .attr('x2', (d: any) => x(d.year)-4)
        .attr('y2', (d: any) => y(d.value)+4)
        .attr('stroke', 'blue');
    }
    drawx()

    // 蓝色实心圆符号(口温)
  // svg.selectAll('circle')
  //   .data(data)
  //   .enter()
  //   .append('circle')
  //   .attr('transform', `translate(-8,0)`)
  //   .attr('cx', (d: any) => x(d.year))
  //   .attr('cy', (d: any) => y(d.value))
  //   .attr('r', 4)
  //   .attr('fill', 'blue');

    // 蓝色空心圆符号(肛温)
  // svg.selectAll('circle')
  //   .data(data)
  //   .enter()
  //   .append('circle')
  //   .attr('transform', `translate(-8,0)`)
  //   .attr('cx', (d: any) => x(d.year))
  //   .attr('cy', (d: any) => y(d.value))
  //   .attr('r', 4)
  //   .attr('stroke', 'blue')
  //   .attr('stroke-width', 1)
  //   .attr('fill', 'white');

  // 红色空心圆+虚线符号(物理降温)


    // 红色色实心圆符号(脉搏)
  svg.selectAll('circle')
    .data(data1)
    .enter()
    .append('circle')
    .attr('transform', `translate(-8,0)`)
    .attr('cx', (d: any) => x(d.year))
    .attr('cy', (d: any) => y1(d.value))
    .attr('r', 4)
    .attr('fill', 'red');

  // 红色空心圆符号(心率)
  // svg.selectAll('circle')
  //   .data(data)
  //   .enter()
  //   .append('circle')
  //   .attr('transform', `translate(-8,0)`)
  //   .attr('cx', (d: any) => x(d.year))
  //   .attr('cy', (d: any) => y(d.value))
  //   .attr('r', 4)
  //   .attr('stroke', 'red')
  //   .attr('stroke-width', 1)
  //   .attr('fill', 'white');

  // 黑色色实心圆符号(呼吸)
  // svg.selectAll('circle')
  //   .data(data)
  //   .enter()
  //   .append('circle')
  //   .attr('transform', `translate(-8,0)`)
  //   .attr('cx', (d: any) => x(d.year))
  //   .attr('cy', (d: any) => y(d.value))
  //   .attr('r', 4)
  //   .attr('fill', 'black');

    
}
onMounted(()=>{
    init()
})

</script>

<template>
    <div class="parentBox">
        <table class="tableBox">
            <caption>
                <p class="text-20px font-bold w-full text-center h-26px">测试医院</p>
                <p class="text-20px font-bold w-full text-center h-26px">体温单</p>
                <p class="relative text-12px">
                    <template v-for="(item, i) in PatientInfoItems" :key="i">
                        <span class="font-600">{{ item.label }}：</span>
                        <span
                        :style="{
                            minWidth: item.width + 'px'
                        }"
                        >
                        {{ '-' }}
                        <!-- {{ info[item.fiedlName] || '-' }} -->
                        <!-- {{ (item.fiedlName === 'age' && info.ageunit) || '' }} -->
                        </span>
                    </template>
                </p>
            </caption>
            <tbody>
                <tr v-for="(row, r) in TemperatureTopItems" :key="r">
                    <td 
                      v-for="(item, index) in (row.title == '日期' ? inHospitalTime : row.title == '住院天数' ? inHospitalDays : surgeryDays)"
                      :ref="r === 0 ? 'topTdRef' : ''"
                      :colspan="row.colspan"
                      :rowspan="row.rowspan"
                      :class="[index && 'redLineTd', !index && 'table-just']"
                      :key="index + '|' + row.filedName"
                    >
                        {{ index === 0 ? row.title : item }}
                    </td>
                </tr>
                <tr>
                  <td
                    class="table-just"
                    rowspan="2"
                    :colspan="horizontalGroupCells"
                    :style="groupCellStyle"
                  >
                    时间
                  </td>
                  <template v-for="_ in 7" :key="w">
                    <td colspan="3">上午</td>
                    <td colspan="3" class="redLineTd">下午</td>
                  </template>
                </tr>
                <tr>
                  <template v-for="_ in 7" :key="w">
                    <td
                      v-for="(times, i) in TemperatureTimes"
                      :key="i"
                      :class="times.className"
                      :style="groupCellStyle"
                      >{{ times.label }}</td
                    >
                  </template>
                </tr>
                <tr class="recorde">
                  <td
                    colspan="2"
                    :rowspan="verticalGroups * verticalGroupCells"
                    v-for="(vItem, v) in VerticalScales"
                    :key="v"
                  >
                    <div class="h-720px" :style="{ color: vItem.color }">
                      <p class="h-70px">{{ vItem.lable }}<br />{{ vItem.icon }}</p>
                      <p
                        v-for="(scale, index) in vItem.scales"
                        :key="index"
                        class="h-80px"
                        >{{ scale }}
                      </p>
                    </div>
                  </td>
                  <td
                    v-for="(_, index) in tdList"
                    :key="index + 'td0'"
                    :class="[
                      (index % horizontalGroupCells) + 1 === horizontalGroupCells &&
                        index != tdList.length &&
                        'redLineTd'
                    ]"
                  >
                    <div class="recorde-text">请假</div>
                  </td>
                </tr>
                <template v-for="vIndex in verticalGroups" :key="vIndex">
                  <!-- 绘图区域-中间行-->
                  <tr
                    class="recorde"
                    v-for="index in vIndex === 1 ? verticalGroupCells - 2 : verticalGroupCells - 1"
                    :key="index + 'tr'"
                  >
                    <td
                      v-for="(_, index) in tdList"
                      :key="index + 'td' + vIndex"
                      :class="[
                        (index % horizontalGroupCells) + 1 === horizontalGroupCells &&
                          index != tdList.length &&
                          'redLineTd'
                      ]"
                    ></td>
                  </tr>
                  <!-- 绘图区域-纵向每组最后一行 -->
                  <tr class="recorde">
                    <td
                      v-for="(_, index) of tdList"
                      :key="index + 'td' + vIndex + 1"
                      :style="
                        (index % horizontalGroupCells) + 1 === horizontalGroupCells &&
                        index != tdList.length
                          ? groupLastRow
                          : groupCellStyle
                      "
                    ></td>
                  </tr>
                  <!-- 底部 -->
                </template>
                <tr v-for="(tItem, i) in TemperatureSumItems" :key="i">
                  <td
                    v-for="index in tItem.period"
                    :key="index + '|' + [tItem.code]"
                    :colspan="index === 1 ? horizontalGroupCells : tItem.colspan"
                    :class="[index - 1 && 'redLineTd']"
                  >
                    {{
                      index === 1
                        ? tItem.title
                        : 2
                    }}
                  </td>
                </tr>
            </tbody>
        </table>
        <div class="svgContainer">
            <svg width="100%" height="100%"></svg>
        </div>
    </div>
</template>


<style scoped lang='less'>
.parentBox{
  position: relative;
  margin: 0 auto;
  width: 730px;
}
.tableBox{
    font-weight: 400;
    border-collapse: collapse;
    font-size: 12px;
    text-align: center;
    width: 100%;
    table-layout: fixed;
}

.svgContainer{
  // border:1px solid green;
  width: 670px;
  height: 740px;
  position: absolute;
  top: 160px;
  right: 0
//   left: 40px;
}
</style>

<style lang="less" scoped>
// 文字区域单元格宽高
@textCellWidth: 19px;
@textCellHeight: 19px;
// 绘图区域单元格宽高
@svgTdWidth: v-bind(styleSvgCellWidth); // 18px
@svgTdHeight: v-bind(styleSvgCellHeight); // 8px

td {
  height: @textCellHeight;
  border: 1px solid #ccc;
}
.redLineTd {
  border-right: 1px solid #666690;
}
.focusText {
  color: red;
}
//绘图区域单元格
.recorde td {
  height: @svgTdHeight;
  position: relative;
}
// 绘图区域首行信息
.recorde-text {
  width: 13px;
  color: #ff0000;
  font-size: 12px;
  position: absolute;
}

</style>