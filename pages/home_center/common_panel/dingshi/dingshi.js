// pages/home_center/common_panel/dingshi/dingshi.js
import { gettimerlist,delTimer,editStatus } from '../../../../utils/api/device-api'

var pageData ={

  /**
   * 页面的初始数据
   */
  data: {
    device_id:''
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
  onReady: async function () {
     /* const { device_id } = this.data
    const list = await gettimerlist(device_id)  
   // list[0].groups[0].timers[0].loops=parseInt( list[0].groups[0].timers[0].loops)
    console.log(list)
    this.setData(list[0])  */
    await this.gettime()
   this.getlist()
  },
   
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    /* const { device_id } = this.data
    const list = await gettimerlist(device_id)  
    // list[0].groups[0].timers[0].loops=parseInt( list[0].groups[0].timers[0].loops)
     console.log(list)
     this.setData(list[0])  */
     await this.gettime()
     this.getlist()
    /* let date=this.data.instruct[0].date
    let id=this.data.result.group_id
    let loops=this.data.loops
    let time=this.data.instruct[0].time
    let functions=this.data.functions
    let alias_name=this.data.alias_name
    let timers=[{"date":date,functions,"loops":loops,"time":time,alias_name,"status":1}]
    let add ={timers,"d":id}
    let groups=this.data.groups
    groups.push(add)
    this.setData({groups}) */
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
    if (!this.loading) {
      this.gettime()
      this.getlist()
    }
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
  delete:  function (e) { 
    let that=this
    let index = e.currentTarget.dataset.index;//获取当前长按图片下标
    let groups=this.data.groups
    const { device_id } = this.data
    wx.showModal({
     title: '提示',
     content: '确定要删除吗？',
     success: function (res) {
       
      if (res.confirm) {
       console.log('点击确定了');
       console.log(index)
        delTimer(device_id,groups[index].id)
        groups.splice(index, 1);
       
      } else if (res.cancel) {
        console.log('点击取消了');
        return false;    
       }
       that.setData({groups})
      
     }    
    })
    
  },
 
  getlist: async function () {
    const { device_id } = this.data
    const list = await gettimerlist(device_id)  
    console.log(list)
    this.setData(list[0])
    let groups=this.data.groups
    const {nowdate}=this.data
    if(list.length !=0){
    for (let i = 0; i <groups.length ; ++i){
      console.log(i)
      if(groups[i].timers[0].loops=='0000000'){
        console.log('loops')
        if(groups[i].timers[0].date <= nowdate.year+nowdate.month+nowdate.day){
          console.log('date')
          if(groups[i].timers[0].time<nowdate.time1){
            console.log('time')
            let res=await delTimer(device_id,groups[i].id)
            console.log(res)
            const list = await gettimerlist(device_id)  
            console.log(list)
           this.setData(list[0])
          }
      }
    }
  }
}
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
  }
  
  
}


for (var i = 0; i <=1000 ; ++i) {
  (function (index) {
    pageData[`switch${index}Change`] = function (e) {
      console.log(`switch${index}发生change事件，携带值为`, e.detail.value)
     // var obj = {}
     // obj[`switch${index}Checked`] = 
      let groups=this.data.groups
     // console.log(status)
      if(e.detail.value){
        groups[index].timers[0].status=1
      }
      else{
        groups[index].timers[0].status=0
      }
      this.setData({groups})
      const { device_id } = this.data
      const id=this.data.groups[index].id
      const status=this.data.groups[index].timers[0].status
      editStatus(device_id,id,status)
    }
  })(i)
}
Page(pageData)