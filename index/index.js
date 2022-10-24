const app = getApp()

Page({
    data: {
        spotMap: {
            y2022m5d9: 'deep-spot',
            y2022m5d10: 'spot',
        }
    },
    onLoad() {

    },
    getDateList({detail}) {
        console.log(detail,'getDateList detail');
    },
    selectDay({detail}){
        console.log(detail,'selectDay detail');
    }
})