# 日历组件，带标点带展开功能
<p align="center">
    <img src="https://img-blog.csdnimg.cn/img_convert/fff81de5b3a83c4f3a652038a5fad74c.gif" width="256">
</p>

> /component/calendar 组件主体

> /index组件演示

## 属性列表和说明
|  属性名  | 说明  | 类型  | 默认值  |
|  ----  | ----  | ----  | ----  |
| spotMap | 标点的日期对象，属性名为具体日期如：y2000m10d10，属性值为'spot'或'deep-spot'，颜色分别为青色和橙色 | Object | {} |
| defaultTime | 标记的日期，默认为今日，传入格式推荐为'2022/1/2'或'2022/01/02'，否则在ios上可能会出现识别错误的情况 | String | '' |
| title | 日历的标题，默认无 | String | '' |
| goNow | 是否有快速回到今天的功能 | Boolean | true |
| defaultOpen | 是否是打开状态 | Boolean | false |
| showShrink | 是否显示收缩展开 | Boolean | true |

## 传递的方法
|  方法名  | 说明  | detail值  |
|  ----  | ----  | ----  |
| getDateList | 渲染某个月份，注意：不能代指现在的月份，在加载时会获取当前月以及上下两月的 | {setMonth，setYear} setMonth：渲染的月，setYear：渲染的年 |
| selectDay | 选中的日期 | { day, month, year} 选中日期的年月日 |

#### 联系作者

1.  邮箱 1609762425@qq.com
2.  微信 gg6630gg