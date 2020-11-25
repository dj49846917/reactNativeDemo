'use strict';
export default class VerifyUtil {
  //验证是否数字
  static isNumber(v: string) {
    var str = /^[-]?[0-9]+\.{0,1}[0-9]{0,10}$/;
    return str.test(v);
  }

  //验证是否正数
  static isPosiveNumber(v: string) {
    var str = /^[0-9]+\.{0,1}[0-9]{0,10}$/;
    return str.test(v);
  }

  //验证身份证号码
  static isIDCard(num: string) {
    if (!num) {
      return false;
    }
    num = num.toUpperCase();           //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      return false;
    }
    //验证前2位，城市符合
    var aCity = {
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
    // @ts-ignore
    if (aCity[parseInt(num.substr(0, 2))] == null) {

      return false;
    }

    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      var arrSplit = num.match(re);  //检查生日日期是否正确
      // @ts-ignore
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
      var bGoodDay;
      // @ts-ignore
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        return false;
      } else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0, i;
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
      var arrSplit = num.match(re);  //检查生日日期是否正确
      // @ts-ignore
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      var bGoodDay;
      // @ts-ignore
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        return false;
      }
      else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum;
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0, i;
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
  }

  static CanEmptyIDCard(num: string) {
    if (num) {
      return this.isIDCard(num);
    }
    else {
      return true;
    }
  }

  //验证手机号码
  static isPhone(telphone: string) {
    if (!telphone) {
      return false;
    }
    var pattern = /(^13\d{9}$)|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^18[0,1,2,3,4,5,6,7,8,9]\d{8}$)|(^17[0,1,2,3,5,6,7,8,9]\d{8}$)|(^147\d{8}$)|(^19[0,1,2,3,5,6,7,8,9]\d{8}$)/g;
    return pattern.test(telphone);
  }

  //可空，如输入必须是电话
  static CanEmptyPhone(telphone: string) {
    if (telphone) {
      return this.isPhone(telphone);
    }
    else {
      return true;
    }
  }

  //验证邮箱
  static isEmail(strEmail: string) {
    if (!strEmail) {
      return false;
    }
    var pattern = new RegExp("^([a-zA-Z0-9]+[_|\_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$");
    return pattern.test(strEmail);
  }

  //固定电话验证
  static isFixedPhone(phone: string) {
    var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    return pattern.test(phone)
  }

  //是否空字符串
  static isEmpty(v: string | any[] | undefined) {
    if (v == undefined || v.length == 0) {
      return false;
    }
    else {
      return true;
    }
  }

  //是否整数
  static isInterger(v: string) {
    var str = /^([-]?[1-9][0-9]*)$/;
    return str.test(v);
  }

  static CanEmptyNumber(num: string) {
    if (num) {
      return this.isNumber(num);
    }
    else {
      return true;
    }

  }


  //验证最大数字
  static veriMaxNumber(v: string, max: number) {
    if (parseFloat(v) > max) {
      return false;
    }
    else {
      return true;
    }
  }

  //验证最小数字
  static veriMinNumber(v: string, min: number) {
    if (parseFloat(v) < min) {
      return false;
    }
    else {
      return true;
    }
  }
}