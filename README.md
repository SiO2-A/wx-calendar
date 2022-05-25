# 日历组件，带标点带展开功能
<p align="center">
    <img src="https://img2022.cnblogs.com/blog/2168797/202205/2168797-20220524171851524-1143113192.gif" width="256">
</p>

> /component/calendar 组件主体

> /index组件演示

## 属性列表和说明
|  属性名  | 说明  | 类型  | 默认值  |
|  ----  | ----  | ----  | ----  |
| spotMap | 标点的日期对象，属性名为具体日期如：y2000m10d10，属性值为'spot'或'deep-spot'，颜色分别为青色和橙色 | Object | {} |
| defaultTime | 标记的日期，默认为今日 | String | '' |
| title | 日历的标题，默认无 | String | '' |

## 传递的方法
|  方法名  | 说明  | detail值  |
|  ----  | ----  | ----  |
| getDateList | 渲染某个月份，注意：不能代指现在的月份，在加载时会获取当前月以及上下两月的 | {setMonth，setYear} setMonth：渲染的月，setYear：渲染的年 |
| selectDay | 选中的日期 | { day, month, year} 选中日期的年月日 |

#### 联系作者

1.  邮箱 1609762425@qq.com
2.  微信 gg6630gg