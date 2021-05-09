// pages/home_center/common_panel/dingshi/tj/tj.js
import { addTimer,replaceStr1 } from '../../../../../utils/api/device-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "instruct":[
      {
          "functions":[
              {
                  "code":"switch",
                  "value":true
              }
          ],
          "date":"",
          "time":""
      }
  ],
  "loops":"0000000",
  "alias_name":""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const  device_id  = options
    this.setData(device_id)
    await this.gettime()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:  function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  addtime:async function () {
    const { device_id,loops,alias_name,instruct } = this.data
    const result=await addTimer(device_id,loops,alias_name,instruct)
    console.log(result)
    this.setData({result})
  /*   var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      loops,alias_name,instruct,result
    }) */
    wx.navigateBack({ changed: true })
  },

  gettime: function () {
    let nowdate={}
    nowdate.date =new Date();
    nowdate.year =nowdate.date.getFullYear();
    nowdate.month =(nowdate.date.getMonth() + 1 < 10 ? '0' + (nowdate.date.getMonth() + 1) : nowdate.date.getMonth() + 1);
    nowdate.day = nowdate.date.getDate() < 10 ? '0' + nowdate.date.getDate() : nowdate.date.getDate();
    nowdate.hours=nowdate.date.getHours()< 10 ? '0' + nowdate.date.getHours() : nowdate.date.getHours();
    nowdate.minutes=nowdate.date.getMinutes()< 10 ? '0' + nowdate.date.getMinutes() : nowdate.date.getMinutes();
    nowdate.date1=nowdate.year+'-'+nowdate.month+'-'+nowdate.day
    nowdate.time1=nowdate.hours+':'+nowdate.minutes
    this.setData({nowdate})
    let instruct=this.data.instruct
    console.log(instruct)
   
    instruct[0].date=nowdate.year+nowdate.month+nowdate.day
    instruct[0].time=nowdate.hours+':'+nowdate.minutes
    console.log(instruct[0].date,instruct[0].time)
    this.setData({instruct})
    
    console.log(nowdate)

  },

  checkboxChange:function(e){
    console.log(e.detail.value)
    const values = e.detail.value
    let loops='0000000'
    for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
      switch(values[j]){
        case '0':
          loops=replaceStr1(loops,0,'1');
          break;
        case '1':
          loops=replaceStr1(loops,1,'1');
          break;
        case '2':
          loops=replaceStr1(loops,2,'1');
          break;
        case '3':
          loops=replaceStr1(loops,3,'1');
         break;
        case '4':
         loops=replaceStr1(loops,4,'1');
          break;
        case '5':
          loops=replaceStr1(loops,5,'1');
          break;
        case '6':
          loops=replaceStr1(loops,6,'1');
           break;
        default:
          break;
      }
    }
      console.log(loops)
      let instruct=this.data.instruct
      const nowdate=this.data.nowdate
      if(loops!='0000000'){
        instruct[0].date=''
      }      
      else{
        instruct[0].date=nowdate.year+nowdate.month+nowdate.day
      }
      this.setData({instruct})
      this.setData({loops})
      
    
  },

  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let instruct=this.data.instruct
    instruct[0].time=e.detail.value
    
    this.setData({instruct})
    
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let instruct=this.data.instruct
    const nowdate=this.data.nowdate
    instruct[0].date=e.detail.value.replace(/-/g, '');
    if(instruct[0].date==nowdate.year+nowdate.month+nowdate.day)
    nowdate.time1=nowdate.hours+':'+nowdate.minutes
    else
    nowdate.time1=''
    this.setData({instruct,nowdate})
    
  },
  turnDeviceOn: function () {
    let instruct=this.data.instruct
    instruct[0].functions[0].value=!instruct[0].functions[0].value;
    this.setData({instruct})
   },
   bindKeyInput: function (e) {
    this.setData({
      alias_name: e.detail.value
    })
  },
})