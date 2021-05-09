//import request from '../../../../utils/request'
import { getAll,getDays,getMonth } from '../../../../utils/api/device-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id:'',
    flag:'',
    
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const  device_id  = options
    this.setData(device_id)
    
    
   // console.log(device_id)
    this.gettime()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    const { device_id } = this.data
    const {nowdate}=this.data
    const All = await getAll(device_id)  
    
    
    
    const Month= await getMonth(device_id,nowdate)
    
    this.setData({All,Month})
   // let year =this.data
   // Object.keys(All.years)

    
    
   // console.log(All)
    //console.log(Days)

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
  gettime: function () {
    let nowdate={}
    nowdate.date =new Date();
    nowdate.year =nowdate.date.getFullYear();
    nowdate.month =(nowdate.date.getMonth() + 1 < 10 ? '0' + (nowdate.date.getMonth() + 1) : nowdate.date.getMonth() + 1);
    nowdate.day = nowdate.date.getDate() < 10 ? '0' + nowdate.date.getDate() : nowdate.date.getDate();
    this.setData({nowdate})
    console.log(nowdate)

  },
  back: function(){
    let flag=this.data
    flag=false
    this.setData({flag})
  },

yearn: function () {
    let {nowdate}=this.data
    console.log(nowdate.year)
    nowdate.year=nowdate.year+1
    console.log(nowdate.year)
    
    this.setData({nowdate})
    this.back()
    this.onReady()
    
  },

  yearf: function () {
    let {nowdate}=this.data
    console.log(nowdate.year)
    nowdate.year=nowdate.year-1
    console.log(nowdate.year)
    
    this.setData({nowdate})
   this.onReady()
    this.back()
  },

  day: async function (idx) {
    let flag=this.data
    const { device_id } = this.data
    const Days = await getDays(device_id,idx.currentTarget.dataset.item)
    flag=true
    this.setData({flag})
    this.setData(Days)
  },

  

 
})



