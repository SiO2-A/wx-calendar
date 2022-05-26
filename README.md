# 日历组件，带标点带展开功能
<p align="center">
    <img src="https://pcsdata.baidu.com/thumbnail/1332e6e45r41a8a1302c095cf7c5c00c?fid=665664031-16051585-369158655744090&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-3XmrS9de6KIOgK32rdkZS5zD9MM%3D&expires=2h&chkv=0&chkbd=0&chkpc=&dp-logid=9097036543144491384&dp-callid=0&time=1653379200&bus_no=26&size=c1600_u1600&quality=100&vuk=-&ft=video" width="256">
</p>

> /component/calendar 组件主体

> /index组件演示

## 属性列表和说明
|  属性名  | 说明  | 类型  | 默认值  |
|  ----  | ----  | ----  | ----  |
| spotMap | 标点的日期对象，属性名为具体日期如：y2000m10d10，属性值为'spot'或'deep-spot'，颜色分别为青色和橙色 | Object | {} |
| defaultTime | 标记的日期，默认为今日 | String | '' |
| title | 日历的标题，默认无 | String | '' |
| goNow | 是否有快速回到今天的功能 | Boolean | true |
| defaultOpen | 是否是打开状态 | Boolean | true |
| showShrink | 是否显示收缩展开 | Boolean | true |

## 传递的方法
|  方法名  | 说明  | detail值  |
|  ----  | ----  | ----  |
| getDateList | 渲染某个月份，注意：不能代指现在的月份，在加载时会获取当前月以及上下两月的 | {setMonth，setYear} setMonth：渲染的月，setYear：渲染的年 |
| selectDay | 选中的日期 | { day, month, year} 选中日期的年月日 |

#### 联系作者

1.  邮箱 1609762425@qq.com
2.  微信 gg6630gg