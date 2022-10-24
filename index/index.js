const app = getApp();

Page({
  data: {
    spotMap: {
      y2022m5d9: 'deep-spot',
      y2022m5d10: 'spot',
      y2022m6d10: 'spot',
      y2022m7d10: 'spot',
      y2022m8d10: 'spot',
      y2022m10d1: 'spot',
      y2023m5d10: 'spot',
    },
    disabledDate({ day, month, year }) {
      console.log(day, month, year, '禁用日期');
      // 例子，今天之后的日期不能被选中
      const now = new Date();
      const date = new Date(year, month - 1, day);
      return date > now;
    },
    changeTime: '',
  },
  onLoad() {},
  getDateList({ detail }) {
    console.log(detail, 'getDateList detail');
  },
  selectDay({ detail }) {
    console.log(detail, 'selectDay detail');
  },
  changetime() {
    this.setData({
      changeTime: '2022-1-1',
    });
  },
});
