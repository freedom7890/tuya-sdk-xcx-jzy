// miniprogram/pages/home_center/common_panel/index.js.js
import { getDevFunctions, getDeviceDetails, deviceControl } from '../../../utils/api/device-api'
import wxMqtt from '../../../utils/mqtt/wxMqtt'




Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_name: '',
    titleItem: {
      name: '',
      value: '',
    },
    roDpList: {}, //只上报功能点
    rwDpList: {}, //可上报可下发功能点
    isRoDpListShow: false,
    isRwDpListShow: false,
    forest: '/image/forest@2x.png',
    timeout:{
      hh:'',
      mm:'',
      ss:'',
    
    },
    time: '00:00',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { device_id } = options
    this.setData({ device_id })
    console.log({ device_id })
    // mqtt消息监听
    wxMqtt.on('message', (topic, newVal) => {
      const { status } = newVal
      console.log(newVal)
      this.updateStatus(status)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    const { device_id } = this.data
    const [{ name, status, icon }, { functions = [] }] = await Promise.all([
      getDeviceDetails(device_id),
      getDevFunctions(device_id),
    ]);
     console.log( status)
    const { roDpList, rwDpList } = this.reducerDpList(status, functions)

    // 获取头部展示功能点信息
    let titleItem = {
      name: '',
      value: '',
    };
    if (Object.keys(roDpList).length > 0) {
      let keys = Object.keys(roDpList)[0];
      titleItem = roDpList[keys];
    } else {
      let keys = Object.keys(rwDpList)[0];
      titleItem = rwDpList[keys];
    }

    const roDpListLength = Object.keys(roDpList).length
    const isRoDpListShow = Object.keys(roDpList).length > 0
    const isRwDpListShow = Object.keys(rwDpList).length > 0

    this.setData({ titleItem, roDpList, rwDpList, device_name: name, isRoDpListShow, isRwDpListShow, roDpListLength, icon })
    this.updateStatus(status)
  },

  // 分离只上报功能点，可上报可下发功能点
  reducerDpList: function (status, functions) {
    // 处理功能点和状态的数据
    let roDpList = {};
    let rwDpList = {};
   
    if (status && status.length) {
      status.map((item) => {
        const { code, value } = item;
        let isExit = functions.find(element => element.code == code);
        if (isExit) {
          let rightvalue = value
          // 兼容初始拿到的布尔类型的值为字符串类型
          if (isExit.type === 'Boolean') {
            rightvalue = value == 'true'
          }

          rwDpList[code] = {
            code,
            value: rightvalue,
            type: isExit.type,
            values: isExit.values,
            name: isExit.name,
          };
        } else {
          roDpList[code] = {
            code,
            value,             
            name:code
          };

          
          
        }
      });
    }
    
    console.log(roDpList, rwDpList)
    return { roDpList, rwDpList }
  },

  sendDp: async function (e) {
    const { dpCode, value } = e.detail
    const { device_id } = this.data

    const { success } = await deviceControl(device_id, dpCode, value)
  },

  updateStatus: function (newStatus) {
    let { timeout, roDpList, rwDpList, titleItem,time} = this.data
     
    newStatus.forEach(item => {
      const { code, value } = item

      if (typeof roDpList[code] !== 'undefined') {
        roDpList[code]['value'] = value;
      } else if (rwDpList[code]) {
        rwDpList[code]['value'] = value;
      }

/*       switch (roDpList[code]['code']) {
        case 'cur_current':
          roDpList[code]['name'] ='电流';
          break;
        case 'cur_power':
          roDpList[code]['name'] ='功率';
          break;
        case 'cur_voltage':
          roDpList[code]['name'] ='电压';
          break;  
        default:
          break;
      } */



    })
    timeout['hh']=parseInt(rwDpList['countdown_1']['value']/3600);
    if(timeout['hh']<10)
    timeout['hh']='0'+timeout['hh'];
    timeout['mm']=parseInt((rwDpList['countdown_1']['value']%3600)/60);
    
    if(timeout['mm']<10)
    timeout['mm']='0'+timeout['mm'];
    timeout['ss']=(rwDpList['countdown_1']['value']%3600)%60;
    if(timeout['ss']<10)
    timeout['ss']='0'+timeout['ss'];
    time=timeout['hh']+':'+timeout['mm'];
    if(rwDpList['countdown_1']['value']<60 && rwDpList['countdown_1']['value']>0  )
    time='00:01';

    // 更新titleItem
    if (Object.keys(roDpList).length > 0) {
      let keys = Object.keys(roDpList)[0];
      titleItem = roDpList[keys];
    } else {
      let keys = Object.keys(rwDpList)[0];
      titleItem = rwDpList[keys];
    }
 
    this.setData({ time,timeout,titleItem, roDpList: { ...roDpList }, rwDpList: { ...rwDpList } })
  },

  jumpTodeviceEditPage: function(){
    console.log('jumpTodeviceEditPage')
    const { icon, device_id, device_name } = this.data
    wx.navigateTo({
      url: `/pages/home_center/device_manage/index?device_id=${device_id}&device_name=${device_name}&device_icon=${icon}`,
    })
  }
,


  //获得当前设备状态
  turnDeviceOn: function (e) {
    const { value } = this.data.rwDpList.switch;
    
    console.log(value);
   
      const { device_id } = this.data;
      deviceControl(device_id, 'switch', !value)
    
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let hh,mm,timeup;
    hh=parseInt(e.detail.value);
    mm=parseInt(e.detail.value.substr(e.detail.value.lastIndexOf(":") + 1,2));
    console.log(hh,mm);
    timeup=hh*3600+mm*60;
    this.setData({
      time:e.detail.value
    })
    const { device_id } = this.data;
    deviceControl(device_id, 'countdown_1', timeup)
  }
})
