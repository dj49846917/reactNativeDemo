export const VerifyUtil = {
  //验证是否数字
  isNumber: (v: string) => {
    const reg = /^[-]?[0-9]+\.{0,1}[0-9]{0,10}$/;
    if (reg.test(v)) {
      return true
    } else {
      return false
    }
  },

  // 验证是否正数
  isPosiveNumber: (v: string) => {
    const reg = /^[0-9]+\.{0,1}[0-9]{0,10}$/;
    if (reg.test(v)) {
      return true
    } else {
      return false
    }
  },

  //是否整数
  isInterger: (v: string) => {
    const reg = /^([-]?[1-9][0-9]*)$/;
    if (reg.test(v)) {
      return true
    } else {
      return false
    }
  },
  //验证最大数字
  veriMaxNumber: (v: string, max: number) => {
    if (parseFloat(v) > max) {
      return false;
    }
    else {
      return true;
    }
  },
  //验证最小数字
  veriMinNumber: (v: string, min: number) => {
    if (parseFloat(v) < min) {
      return false;
    }
    else {
      return true;
    }
  },

  //验证身份证号码
  isIDCard: (num: string) => {
    num = num.toUpperCase();           //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      return false;
    }
    //验证前2位，城市符合
    const aCity: any = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    if (aCity[parseInt(num.substr(0, 2))] === null) {
      return false;
    }

    //下面分别分析出生日期和校验位
    let len, re;
    len = num.length;
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      let arrSplit = num.match(re);  //检查生日日期是否正确
      let dtmBirth = arrSplit ? new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]) : new Date();
      let bGoodDay;
      // @ts-ignore
      bGoodDay = arrSplit ? (dtmBirth.getYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4])) : null;
      if (!bGoodDay) {
        return false;
      } else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let nTemp = 0, i;
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
        for (i = 0; i < 17; i++) {
          // @ts-ignore
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        num += arrCh[nTemp % 11];
        return true;
      }
    }
    if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      let arrSplit = num.match(re);  //检查生日日期是否正确
      let dtmBirth = arrSplit ? new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]) : new Date();
      let bGoodDay;
      bGoodDay = arrSplit ? (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])) : null;
      if (!bGoodDay) {
        return false;
      }
      else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        let valnum;
        let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let nTemp = 0, i;
        for (i = 0; i < 17; i++) {
          // @ts-ignore
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != num.substr(17, 1)) {
          return false;
        }
        return true;
      }
    }
    return false;
  },

  //验证手机号码
  isPhone: (telphone: string) => {
    const reg = /(^13\d{9}$)|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^18[0,1,2,3,4,5,6,7,8,9]\d{8}$)|(^17[0,1,2,3,5,6,7,8,9]\d{8}$)|(^147\d{8}$)|(^19[0,1,2,3,5,6,7,8,9]\d{8}$)/g;
    if (reg.test(telphone)) {
      return true
    } else {
      return false
    }
  },

  // 验证邮箱
  isEmail: (strEmail: string) => {
    const reg = new RegExp("^([a-zA-Z0-9]+[_|\_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$");
    if (reg.test(strEmail)) {
      return true
    } else {
      return false
    }
  },

  // 验证固定电话
  isFixedPhone: (phone: string) => {
    const reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (reg.test(phone)) {
      return true
    } else {
      return false
    }
  }
}