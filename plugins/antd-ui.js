import Vue from 'vue'

import Tree from 'ant-design-vue/lib/tree'
import InputNumber from 'ant-design-vue/lib/input-number'
import Checkbox from 'ant-design-vue/lib/checkbox'
import Alert from 'ant-design-vue/lib/alert'
import DatePicker from 'ant-design-vue/lib/date-picker'
import Select from 'ant-design-vue/lib/select'
import Upload from 'ant-design-vue/lib/upload'
import Tabs from 'ant-design-vue/lib/tabs'
import Radio from 'ant-design-vue/lib/radio'
import FormModel from 'ant-design-vue/lib/form-model'
import Card from 'ant-design-vue/lib/card'
import Input from 'ant-design-vue/lib/input'
import Timeline from 'ant-design-vue/lib/timeline'
import Tag from 'ant-design-vue/lib/tag'
import Dropdown from 'ant-design-vue/lib/dropdown'
import Menu from 'ant-design-vue/lib/menu'
import ConfigProvider from 'ant-design-vue/lib/config-provider'
import Layout from 'ant-design-vue/lib/layout'
import Button from 'ant-design-vue/lib/button'
import Row from 'ant-design-vue/lib/row'
import Col from 'ant-design-vue/lib/col'
import Icon from 'ant-design-vue/lib/icon'
import Avatar from 'ant-design-vue/lib/avatar'
import Badge from 'ant-design-vue/lib/badge'
import Table from 'ant-design-vue/lib/table'
import Pagination from 'ant-design-vue/lib/pagination'
import Divider from 'ant-design-vue/lib/divider'
import Space from 'ant-design-vue/lib/space'
import Steps from 'ant-design-vue/lib/steps'
import TreeSelect from 'ant-design-vue/lib/tree-select'
import Empty from 'ant-design-vue/lib/empty'
import Statistic from 'ant-design-vue/lib/statistic'
import Affix from 'ant-design-vue/lib/affix'
import Tooltip from 'ant-design-vue/lib/tooltip'
import BackTop from 'ant-design-vue/lib/back-top'
import Switch from 'ant-design-vue/lib/switch'
import Progress from 'ant-design-vue/lib/progress'
import Slider from 'ant-design-vue/lib/slider'
import Popover from 'ant-design-vue/lib/popover'
import Result  from 'ant-design-vue/lib/result'
import Skeleton  from 'ant-design-vue/lib/skeleton'
import Anchor  from 'ant-design-vue/lib/anchor'
import Descriptions  from 'ant-design-vue/lib/descriptions'


import Modal from 'ant-design-vue/lib/modal'
import message from 'ant-design-vue/lib/message'
import notification from 'ant-design-vue/lib/notification'

Vue.use(Descriptions)
Vue.use(Tree)
Vue.use(Anchor)
Vue.use(Popover)
Vue.use(Skeleton)
Vue.use(Result)
Vue.use(Slider)
Vue.use(Progress)
Vue.use(Switch)
Vue.use(BackTop)
Vue.use(Tooltip)
Vue.use(Affix)
Vue.use(Statistic)
Vue.use(Empty)
Vue.use(TreeSelect)
Vue.use(InputNumber)
Vue.use(Steps)
Vue.use(Space)
Vue.use(Divider)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(Checkbox)
Vue.use(Alert)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(Radio)
Vue.use(FormModel)
Vue.use(Card)
Vue.use(Input)
Vue.use(Timeline)
Vue.use(Tag)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Avatar)
// Vue.use(VueCropper)

Vue.use(Modal)
Vue.use(message)
Vue.use(notification)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning


