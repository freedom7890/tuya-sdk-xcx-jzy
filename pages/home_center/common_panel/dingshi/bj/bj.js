// pages/home_center/common_panel/dingshi/bj/bj.js
import { editTimer,replaceStr1 } from '../../../../../utils/api/device-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const  item  = options
    item.value=='true' ? item.value=true : item.value=false
    if(item.date=='00000000')
    item.date=''
    this.setData(item)
    this.gettime()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  edit:async function () {
    const { device_id,id,loops,time,date,value,alias_name} = this.data
    console.log(device_id,id,loops,time,date,value,alias_name)
    const result=await editTimer(device_id,id,loops,time,date,value,alias_name)
    console.log(result)
    this.setData({result})
    
    
    /* var pages = getCurrentPages();
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
    
 
   
   /*  instruct[0].date=nowdate.year+nowdate.month+nowdate.day
    instruct[0].time=nowdate.hours+':'+nowdate.minutes
    console.log(instruct[0].date,instruct[0].time)
    this.setData({instruct}) */
    
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
      let date=this.data.date
      const nowdate=this.data.nowdate
      if(loops!='0000000'){
        date=''
      }      
      else{
        date=nowdate.year+nowdate.month+nowdate.day
      }
      this.setData({date})
      this.setData({loops})
      
    
  },

  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let time=this.data.time
    time=e.detail.value
    
    this.setData({time})
    
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let date=this.data.date
    const nowdate=this.data.nowdate
    date=e.detail.value.replace(/-/g, '');
    if(date==nowdate.year+nowdate.month+nowdate.day)
    nowdate.time1=nowdate.hours+':'+nowdate.minutes
    else
    nowdate.time1=''
    this.setData({nowdate})
    this.setData({date})
    
  },
  turnDeviceOn: function () {
    let value=this.data.value
    value=!value;
    this.setData({value})
   },
   bindKeyInput: function (e) {
    this.setData({
      alias_name: e.detail.value
    })
  },

})