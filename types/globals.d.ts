/*
 * @Author: 阮志雄
 * @Date: 2021-10-31 02:16:09
 * @LastEditTime: 2022-08-29 12:47:48
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-template-with-webpack\types\globals.d.ts
 */
interface ServerConfigs {
  Version?: string
  Title?: string
  FixedHeader?: boolean
  HiddenSideBar?: boolean
  KeepAlive?: boolean
  Locale?: string
  Layout?: string
}
interface IrouteItem {
  title: string
  componentName?: string
  componentPath?: string
  icon?: String
  parentId: number
  id: number
  type: number
  path?: string
  children?: Array<IrouteItem>
  [key: string]: any
}
// 礼品创建、编辑、列表中的每一项，都会是这个数据类型。
declare interface IGiftItem {
  id: string | number
  name: string
  desc: string
  [key: string]: any
}

// 全局相应的类型定义
// 而且一般来说，我们不确认，接口返回的类型到底是什么（可能是null、可能是对象、也可能是数组），所以使用范型来定义interface
declare interface IRes<T> {
  code: number
  msg: string
  data: T
}
// 接口返回数据类型定义

declare interface IGiftInfo {
  list: Array<IGiftItem>
  pageNum: number
  pageSize: number
  total: number
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

import { IDatePickerType } from "element-plus/es/components/date-picker/src/date-picker.type"

interface ItreeProps {
  dataUrl?: string
  param?: { [x: string]: any }
  search?: boolean
  treeProps?: any
  defaultExpandAll?: boolean
  expandOnclickNode?: boolean
  resDataName?: string
}

interface Icolumns {
  index?: number
  type?: string
  label?: string
  prop?: string
  slot?: string
  headerSlot?: string
  show?: boolean
  align?: string
  enum?: Array<any>
  childrens?: Array<Icolumns>
  width?: number
  minWidth?: string
  disabled?: boolean
  fixed?: string | boolean
  showOverflowTooltip?: boolean
  resizable?: boolean
  headerAlign?: string
  sortable?: boolean
  sortMethod?: () => void
  filters?: Array<{ text: string; value: any }>
  renderHeader?: () => void
  filterMethod?: (value: any, row: { [x: string]: any }, column: { property: any }) => void
  sortBy?: string | Array<any> | (() => void)
  filteredValue?: Array<any>
}
interface ItableProps {
  columns: Icolumns[]
  initData?: Array<any>
  tableSize?: string
  mode?: string
  defaultPanel?: Array<string>
  pageAlign?: string
  pageSize?: number
  pageIndex?: number
  showSettingToolbar?: boolean
  showPage?: boolean
  highlightCurrentRow?: boolean
  lazy?: boolean
  exportUrl?: string
  dataUrl?: string
  params?: { [x: string]: any }
  height?: string
  maxHeight?: string
  border?: boolean
  stripe?: boolean
  showSettingTool?: boolean
  showPanelTool?: boolean
  showSummary?: boolean
  responseName?: string | Array<string>
  isPrivate?: boolean
  summaryMethod?: (value: any, row: { [x: string]: any }, column: { property: any }) => void
  spanMethod?: ({ row, column, rowIndex, columnIndex }) => Array<number> | object
  rowKey?: string
  treeProps?: { children: string; hasChildren: string }
}

interface IformItem {
  name: string // key值
  label: string // label 名称
  type?: string // 条件类型
  default?: any // 默认值
  disabled?: boolean // 是否禁用
  disabledAll?: boolean // 是否禁用'全部'按钮
  options?: Array<{ [x: string]: any; [x: string]: any }>
  prop?: { label: string; value: string }
  format?: string
  remoteMethod?: Promise<any>
  dateSwitch?: Array<{ type: IDatePickerType; typeName: string }>
  dateTypeParamName?: string
  [key: string]: any
}
