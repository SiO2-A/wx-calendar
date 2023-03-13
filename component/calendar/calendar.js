// component/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spotMap: {
      //标点的日期
      type: Object,
      value: {},
    },
    defaultTime: {
      //标记的日期，默认为今日 注意：传入格式推荐为'2022/1/2'或'2022/01/02', 其他格式在ios系统上可能出现问题
      type: String,
      value: '',
    },
    title: {
      //标题
      type: String,
      value: '',
    },
    goNow: {
      // 是否有快速回到今天的功能
      type: Boolean,
      value: true,
    },
    defaultOpen: {
      // 是否是打开状态
      type: Boolean,
      value: false,
    },
    showShrink: {
      // 是否显示收缩展开功能
      type: Boolean,
      value: true,
    },
    // 指定不可用日期
    disabledDate:null,
    changeTime: {
      // 要改变的日期
      type: String,
      value: '',
    },
    firstDayOfWeek: {
      // 周起始日
      type: Number,
      value: 7,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectDay: {}, //选中的日期
    nowDay: {}, //现在的日期
    open: false,
    swiperCurrent: 1, //选中的日期
    oldCurrent: 1, //之前选中的日期
    dateList0: [], //0位置的日历数组
    dateList1: [], //1位置的日历数组
    dateList2: [], //2位置的日历数组
    swiperDuration: 500,
    swiperHeight: 0,
    backChange: false, //跳过change切换
    disabledDateList: {}, //禁用的日期集合
    calendarHeadDate: ['一', '二', '三', '四', '五', '六', '日'] //日历头部的渲染数组
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 日历滑动时触发的方法
    swiperChange(e) {
      if (this.data.backChange) {
        this.setData({
          backChange: false,
        });
        return;
      }
      //计算第三个索引
      let rest = 3 - e.detail.current - this.data.oldCurrent;
      let dif = e.detail.current - this.data.oldCurrent;
      let date;
      if (dif === -2 || (dif > 0 && dif !== 2)) {
        //向右划的情况，日期增加
        if (this.data.open) {
          date = new Date(this.data.selectDay.year, this.data.selectDay.month);
          this.setMonth(date.getFullYear(), date.getMonth() + 1, undefined);
          this.getIndexList({
            setYear: this.data.selectDay.year,
            setMonth: this.data.selectDay.month,
            dateIndex: rest,
          });
        } else {
          date = new Date(
            this.data.selectDay.year,
            this.data.selectDay.month - 1,
            this.data.selectDay.day + 7
          );
          this.setMonth(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          );
          this.getIndexList({
            setYear: this.data.selectDay.year,
            setMonth: this.data.selectDay.month - 1,
            setDay: this.data.selectDay.day + 7,
            dateIndex: rest,
          });
        }
      } else {
        //向左划的情况，日期减少
        if (this.data.open) {
          date = new Date(
            this.data.selectDay.year,
            this.data.selectDay.month - 2
          );
          this.setMonth(date.getFullYear(), date.getMonth() + 1, undefined);
          this.getIndexList({
            setYear: this.data.selectDay.year,
            setMonth: this.data.selectDay.month - 2,
            dateIndex: rest,
          });
        } else {
          date = new Date(
            this.data.selectDay.year,
            this.data.selectDay.month - 1,
            this.data.selectDay.day - 7
          );
          this.setMonth(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          );
          this.getIndexList({
            setYear: this.data.selectDay.year,
            setMonth: this.data.selectDay.month - 1,
            setDay: this.data.selectDay.day - 7,
            dateIndex: rest,
          });
        }
      }
      this.setData({
        oldCurrent: e.detail.current,
      });
      this.setSwiperHeight(e.detail.current);
    },
    // 根据指定位置数组的大小计算日历的高度
    setSwiperHeight(index) {
      this.setData({
        swiperHeight: (this.data[`dateList${index}`].length / 7) * 82 + 18,
      });
    },
    // 更新指定的索引和月份的列表
    getIndexList({ setYear, setMonth, setDay = void 0, dateIndex }) {
      let appointMonth;
      if (setDay) appointMonth = new Date(setYear, setMonth, setDay);
      else appointMonth = new Date(setYear, setMonth);
      const listName = `dateList${dateIndex}`;
      const dataList = this.dateInit({
        setYear: appointMonth.getFullYear(),
        setMonth: appointMonth.getMonth() + 1,
        setDay: appointMonth.getDate(),
        hasBack: true,
      });
      const disabledDateList = {};
      if (this.data.disabledDate)
        dataList.forEach((item) => {
          if (
            !this.data.disabledDateList[
            `disabled${item.year}M${item.month}D${item.day}`
            ] &&
            this.data.disabledDate(item)
          ) {
            disabledDateList[
              `disabled${item.year}M${item.month}D${item.day}`
            ] = true;
          }
        });
      this.setData({
        [listName]: dataList,
        disabledDateList: Object.assign(
          this.data.disabledDateList,
          disabledDateList
        ),
      });
    },
    // 根据data更新禁用日期对象
    setDisabledDateList(data) {
      const disabledDateList = {};
      data.forEach((item) => {
        if (this.data.disabledDate(item)) {
          disabledDateList[
            `disabled${item.year}M${item.month}D${item.day}`
          ] = true;
        }
      });
      this.setData({
        disabledDateList,
      });
    },
    // 设置月份
    setMonth(setYear, setMonth, setDay) {
      const day = Math.min(
        new Date(setYear, setMonth, 0).getDate(),
        this.data.selectDay.day
      );
      if (
        this.data.selectDay.year !== setYear ||
        this.data.selectDay.month !== setMonth
      ) {
        const data = {
          selectDay: {
            year: setYear,
            month: setMonth,
            day: setDay ? setDay : day,
          },
        };
        if (!setDay) {
          data.open = true;
        }
        this.setData(data, () => {
          this.triggerEventSelectDay();
        });
      } else {
        const data = {
          selectDay: {
            year: setYear,
            month: setMonth,
            day: setDay ? setDay : day,
          },
        };
        this.setData(data, () => {
          this.triggerEventSelectDay();
        });
      }
    },
    // 展开收起
    openChange() {
      // 展开收起事件
      this.triggerEvent('openChange', {
        open: !this.data.open,
      });
      this.setData({
        open: !this.data.open,
      });
      // 更新数据
      const selectDate = new Date(
        this.data.selectDay.year,
        this.data.selectDay.month - 1,
        this.data.selectDay.day
      );
      if (this.data.oldCurrent === 0) {
        this.updateList(selectDate, -1, 2);
        this.updateList(selectDate, 0, 0);
        this.updateList(selectDate, 1, 1);
      } else if (this.data.oldCurrent === 1) {
        this.updateList(selectDate, -1, 0);
        this.updateList(selectDate, 0, 1);
        this.updateList(selectDate, 1, 2);
      } else if (this.data.oldCurrent === 2) {
        this.updateList(selectDate, -1, 1);
        this.updateList(selectDate, 0, 2);
        this.updateList(selectDate, 1, 0);
      }
      this.setSwiperHeight(this.data.oldCurrent);
    },
    // 选中并切换今日日期
    witchDate(setDate) {
      const selectDate = new Date(
        this.data.selectDay.year,
        this.data.selectDay.month - 1,
        this.data.selectDay.day
      );
      let dateDiff =
        (selectDate.getFullYear() - setDate.getFullYear()) * 12 +
        (selectDate.getMonth() - setDate.getMonth());
      let diff = dateDiff === 0 ? 0 : dateDiff > 0 ? -1 : 1;
      const diffSum = (x) => (3 + (x % 3)) % 3;
      if (this.data.oldCurrent === 0) {
        this.updateList(setDate, -1, diffSum(2 + diff));
        this.updateList(setDate, 0, diffSum(0 + diff));
        this.updateList(setDate, 1, diffSum(1 + diff));
      } else if (this.data.oldCurrent === 1) {
        this.updateList(setDate, -1, diffSum(0 + diff));
        this.updateList(setDate, 0, diffSum(1 + diff));
        this.updateList(setDate, 1, diffSum(2 + diff));
      } else if (this.data.oldCurrent === 2) {
        this.updateList(setDate, -1, diffSum(1 + diff));
        this.updateList(setDate, 0, diffSum(2 + diff));
        this.updateList(setDate, 1, diffSum(0 + diff));
      }
      this.setData({
        swiperCurrent: diffSum(this.data.oldCurrent + diff),
        oldCurrent: diffSum(this.data.oldCurrent + diff),
        backChange: dateDiff !== 0,
      });
      this.setData(
        {
          selectDay: {
            year: setDate.getFullYear(),
            month: setDate.getMonth() + 1,
            day: setDate.getDate(),
          },
        },
        () => {
          this.triggerEventSelectDay();
        }
      );
      this.setSwiperHeight(this.data.oldCurrent);
    },
    // 切换到今天
    switchNowDate() {
      this.witchDate(new Date());
    },
    // 日历主体的渲染方法
    dateInit(
      {
        setYear,
        setMonth,
        setDay = this.data.selectDay.day,
        hasBack = false,
      } = {
          setYear: this.data.selectDay.year,
          setMonth: this.data.selectDay.month,
          setDay: this.data.selectDay.day,
          hasBack: false,
        }
    ) {
      let dateList = []; //需要遍历的日历数组数据
      let now = new Date(setYear, setMonth - 1); //当前月份的1号
      let startWeek = now.getDay(); //目标月1号对应的星期
      let resetStartWeek = (startWeek + this.data.firstDayOfWeek - 1) % 7; //计算星期几的位置
      let dayNum = new Date(setYear, setMonth, 0).getDate(); //当前月有多少天
      let forNum = Math.ceil((resetStartWeek + dayNum) / 7) * 7; //当前月跨越的周数
      let selectDay = setDay ? setDay : this.data.selectDay.day;
      this.triggerEvent('getDateList', {
        setYear: now.getFullYear(),
        setMonth: now.getMonth() + 1,
      });
      if (this.data.open) {
        //展开状态，需要渲染完整的月份
        for (let i = 0; i < forNum; i++) {
          const now2 = new Date(now);
          now2.setDate(i - resetStartWeek + 1);
          let obj = {};
          obj = {
            day: now2.getDate(),
            month: now2.getMonth() + 1,
            year: now2.getFullYear(),
          };
          dateList[i] = obj;
        }
      } else {
        //非展开状态，只需要渲染当前周
        for (let i = 0; i < 7; i++) {
          const now2 = new Date(now);
          //当前周的7天
          now2.setDate(
            Math.ceil((selectDay + (resetStartWeek)) / 7) * 7 -
            6 -
            (resetStartWeek) +
            i
          );
          let obj = {};
          obj = {
            day: now2.getDate(),
            month: now2.getMonth() + 1,
            year: now2.getFullYear(),
          };
          dateList[i] = obj;
        }
      }
      if (hasBack) {
        return dateList;
      }
      this.setData({
        dateList1: dateList,
      });
    },
    // 一天被点击时
    selectChange(e) {
      const year = e.currentTarget.dataset.year;
      const month = e.currentTarget.dataset.month;
      const day = e.currentTarget.dataset.day;
      const selectDay = {
        year: year,
        month: month,
        day: day,
      };
      if (
        this.data.open &&
        (this.data.selectDay.year !== year ||
          this.data.selectDay.month !== month)
      ) {
        if (
          year * 12 + month >
          this.data.selectDay.year * 12 + this.data.selectDay.month
        ) {
          // 下个月
          if (this.data.oldCurrent == 2)
            this.setData({
              swiperCurrent: 0,
            });
          else
            this.setData({
              swiperCurrent: this.data.oldCurrent + 1,
            });
        } else {
          // 点击上个月
          if (this.data.oldCurrent == 0)
            this.setData({
              swiperCurrent: 2,
            });
          else
            this.setData({
              swiperCurrent: this.data.oldCurrent - 1,
            });
        }
        this.setData(
          {
            ['selectDay.day']: day,
          },
          () => {
            this.triggerEventSelectDay();
          }
        );
      } else if (this.data.selectDay.day !== day) {
        this.setData(
          {
            selectDay: selectDay,
          },
          () => {
            this.triggerEventSelectDay();
          }
        );
      }
    },
    // 选择某天时触发的事件
    triggerEventSelectDay() {
      if (
        !this.data.disabledDateList[
        'disabled' +
        this.data.selectDay.year +
        'M' +
        this.data.selectDay.month +
        'D' +
        this.data.selectDay.day
        ]
      )
        this.triggerEvent('selectDay', this.data.selectDay);
    },
    // 更新日历列表
    updateList(date, offset, index) {
      if (this.data.open) {
        //打开状态
        const setDate = new Date(
          date.getFullYear(),
          date.getMonth() + offset * 1
        ); //取得当前日期的上个月日期
        this.getIndexList({
          setYear: setDate.getFullYear(),
          setMonth: setDate.getMonth(),
          dateIndex: index,
        });
      } else {
        const setDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + offset * 7
        ); //取得当前日期的七天后的日期
        this.getIndexList({
          setYear: setDate.getFullYear(),
          setMonth: setDate.getMonth(),
          setDay: setDate.getDate(),
          dateIndex: index,
        });
      }
    },
  },
  lifetimes: {
    // 加载事件
    ready() {
      let now = this.data.defaultTime
        ? new Date(this.data.defaultTime)
        : new Date();
      let selectDay = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      };
      this.setData({
        nowDay: {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate(),
        },
      });
      this.setMonth(selectDay.year, selectDay.month, selectDay.day);
      this.updateList(now, -1, 0);
      this.updateList(now, 0, 1);
      this.updateList(now, 1, 2);
      this.setSwiperHeight(1);
    },
  },
  observers: {
    // 重新设置打开状态
    defaultOpen(value) {
      this.setData({
        open: value,
      });
    },
    // 切换日期
    changeTime(value) {
      // 检测切换日期
      if (!value) return;
      this.witchDate(new Date(value));
    },
  },
});
