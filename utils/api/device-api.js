import request from '../request'
// request 做了自动向params中添加uid的操作，因此可以不带入uid

// 获取mqtt配置
export const getMqttconfig = () => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.openHubConfig',
      params: {
        link_id: Math.random()
          .toString(10)
          .substring(2, 11),
        link_type: 'websocket'
      }
    }
  })
}

// 获取设备列表 
export const getDeviceList = () => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.getDeviceList',
      params: {}
    }
  })
}

// 获取设备最新状态
export const getDeviceStatus = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.status',
      params: {
        device_id
      }
    }
  })
}

// 获取设备指令集
export const getDeviceSpecifications = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.specifications',
      params: {
        device_id
      }
    }
  })
}



// 获取设备指令集(带中文dp名称)
export const getDevFunctions = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.functions',
      params: {
        device_id
      }
    }
  })
}

// 获取设备指令集(带中文dp名称)
export const getDeviceDetails = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.details',
      params: {
        device_id
      }
    }
  })
}


// 指令下发
export const deviceControl = (device_id, code, value) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'device.control',
      params: {
        device_id,
        commands: [
          {
            code,
            value
          }
        ]
      }
    }
  })
}



//获取目标功能点的统计结果累加值
export const getAll = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      "action": "statistics.all",
      "params": {
        "device_id":device_id,
        "code":"add_ele"
      }
    }
  })
}

//  按天获取累计数据
export const getDays = (device_id,month) => {
  
  let year=month.slice(0,4)
  month=month.substring(month.length-2)
  let day
  console.log(month)
  console.log(year)
    switch (parseInt(month) ) {
    case 1:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
    case 3:
        //console.log(year, '年，', month, '月有', 31, '天');
            day = '31';
        break;
    case 4:
    case 6:
    case 9:
    case 11:
       // console.log(year, '年，', month, '月有', 30, '天');
            day = '30';
        break;
    case 2:
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            day = '29';
            console.log(year, '年，', month, '有', 29, '天');
      } else {
            day = '28';
              console.log(year, '年，', month, '有', 28, '天');
      }
      break;  

    }
   
  let StartDay = year+month+'01'
  let EndDay = year+month+day
  console.log(StartDay,EndDay)
  return request({
    name: 'ty-service',
    data: {
      
        "action": "statistics.days",
        "params": {
          "device_id":device_id,
          "code":"add_ele",
          "start_day":StartDay,
          "end_day":EndDay
        }
      }
    }) 

}

//按月统计累计值
export const getMonth = (device_id,nowdate) => {
  let start_month=nowdate.year+'01'
  let end_month=nowdate.year+'12'
  console.log(start_month,end_month)
  return request({
    name: 'ty-service',
    data: {
      "action": "statistics.months",
      "params": {
        "device_id":device_id,
        "code":"add_ele",
        "start_month":start_month,
        "end_month":end_month
      }
    }
    }) 
}

//查询设备下的定时任务列表

export const gettimerlist = (device_id) => {
  return request({
    name: 'ty-service',
    data: {
      "action": "timer.list",
      "params": {
        "device_id":device_id
      }
    }
    }) 
}

//设备添加定时任务
export const addTimer = (device_id,loops,alias_name,instruct) => {
  return request({
    name: 'ty-service',
    data: {
      "action": "timer.add",
      "params": {
        "device_id":device_id,
        "loops":loops,
        "category":"test",
        "timezone_id":"Asia/Shanghai",
        "time_zone":"+8:00",
        "alias_name":alias_name,
        "instruct":instruct
      }
    }
    }) 
}
//删除某个分类下面的某个定时组的定时任务。
export const delTimer = (device_id,group_id) => {
  return request({
    name: 'ty-service',
    data: {
      "action": "timer.deleteByGroup",
      "params": {
        "device_id":device_id,
        "category":"test",
        "group_id":group_id
      }
    }
    }) 
}

//更新设备的某⼀个定时任务组的信息
export const editTimer = (device_id,id,loops,time,date,value,alias_name) => {
  return request({
    name: 'ty-service',
    data: {
      "action": "timer.edit",
      "params": {
        "device_id":device_id,
        "group_id":id,
        "loops":loops,
        "time_zone":"+08:00",
        "timezone_id":"Asia/ShangHai",
        "category":"test",
        "alias_name":alias_name,
        "instruct":[
            {
                "time":time,
                "date":date,
                "functions":[
                    {
                        "code":"switch",
                        "value":value
                    }
                ]
            }
        ]
      }
    }
    }) 
}

//更新设备定时任务组的状态
export const editStatus = (device_id,id,status) => {
  return request({
    name: 'ty-service',
    data: {
      "action": "timer.status",
      "params": {
        "device_id":device_id,
        "category":"test",
        "group_id":id,
        "status":status
      }
    }
    }) 
}

export const replaceStr1 = (str, index, char) => {
  let strAry = str.split('');
  strAry[index] = char;
  console.log(strAry)
  console.log(strAry.join(''))
  return strAry.join('')
}

// 获取 ticket
export const reqTicket = () =>{
  request({
    name: 'ty-service',
    data: {
      action: 'system.userTicket',
      params: {}
    }
  } 
)};

