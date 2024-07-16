// 患者信息元素组
export const PatientInfoItems = [
    {
      label: '姓名',
      fiedlName: 'name',
      width: 48,
    },
    {
      label: '年龄',
      fiedlName: 'age',
      width: 48,
    },
    {
      label: '科室',
      fiedlName: 'officeName',
      width: 60,
    },
    {
      label: '性别',
      fiedlName: 'sex',
      width: 24,
    },
    {
      label: '诊断',
      fiedlName: 'inDiagName',
      width: 80,
    },
    {
      label: '床号',
      fiedlName: 'cwh',
      width: 60,
    },
    {
      label: '住院号',
      fiedlName: 'hospCode',
      width: 60,
    },
    {
      label: '入院日期',
      fiedlName: 'hospDate',
      width: 80,
    },
  ]
  // 顶部数据元素集
export const TemperatureTopItems = [
    {
      title: '日期',
      rowspan: 1,
      colspan: 6,
      filedName: 'indays',
      valueFiledName: 'inHospitalTime'
    },
    {
      title: '住院天数',
      rowspan: 1,
      colspan: 6,
      filedName: 'inHospitalDays',
      valueFiledName: 'inHospitalDays'
    },
    {
      title: '手术或产后日数',
      rowspan: 1,
      colspan: 6,
      filedName: 'surgeryDays',
      valueFiledName: 'surgeryDays'
    },
  ]
  // 时间刻度数组
export const TemperatureTimes = [
  {
    label: '3',
    className: 'focusText',
  },
  {
    label: '7',
    className: '',
  },
  {
    label: '11',
    className: '',
  },
  {
    label: '15',
    className: '',
  },
  {
    label: '19',
    className: 'focusText',
  },
  {
    label: '23',
    className: 'focusText redLineTd',
  },
]
// 呼吸、脉搏、体温纵坐标刻度值
export const BreatheScale = [' ', ' ', ' ', ' ', 50, 40, 30, 20]
export const PulseScale = [160, 140, 120, 100, 80, 60, 40, 20]
export const TemperatureScale = [41, 40, 39, 38, 37, 36, 35, 34]
export const VerticalScales = [
  {
    lable: '呼吸',
    // icon: '●',
    color: '#000',
    scales: BreatheScale
  },
  {
    lable: '脉搏/心率',
    // icon: '●/○',
    color: '#f00',
    scales: PulseScale
  },
  {
    lable: '体温',
    icon: '℃',
    color: '#00F',
    scales: TemperatureScale
  },
]
export const TemperatureSumItems: ITemperatureSumItems[] = [
  {
    title: '其他',
    code: 1,
    colspan: 42,
    period: 2
  },
  {
    title: '血压(mmHg)',
    code: 2,
    colspan: 6,
    period: 8
  },
  {
    title: '入水量(ml)',
    code: 3,
    colspan: 6,
    period: 8
  },
  {
    title: '出水量(ml)',
    code: 4,
    colspan: 6,
    period: 8
  },
  {
    title: '大便(次)',
    code: 5,
    colspan: 6,
    period: 8
  },
  {
    title: '小便(次)',
    code: 1,
    colspan: 6,
    period: 8
  },
  {
    title: '身高(cm)',
    code: 2,
    colspan: 6,
    period: 8
  },
  {
    title: '体重(kg)',
    code: 4,
    colspan: 6,
    period: 8
  },
  {
    title: '过敏药物',
    code: 1,
    colspan: 6,
    period: 8
  },
]