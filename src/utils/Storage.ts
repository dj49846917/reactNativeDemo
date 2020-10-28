import AsyncStorage from "@react-native-community/async-storage";

export default class Storage {
  // 获取key的值
  static async get(key: string) {
    return await AsyncStorage.getItem(key)
  }

  // 设置Key的值
  static async set(key: string, value: any) {
    return await AsyncStorage.setItem(key, JSON.stringify(value))
  }

  // 删除Key的值
  static async delete(key: string) {
    return await AsyncStorage.removeItem(key)
  }

  // 删除所有的值
  static async deleteAll() {
    return await AsyncStorage.clear()
  }
}

// // 封装 同步调用缓存
// import AsyncStorage from '@react-native-community/async-storage';
// export default class Storage {

//   static cache: { [key: string]: string } = {}

//   static get(key: string) {
//       return this.cache[key]
//   }

//   static set(key: string, value: string) {
//       if (this.cache[key] === value) return
//       this.cache[key] = value
//       AsyncStorage.setItem(key, value)
//   }

//   static remove(key: string) {
//       delete this.cache[key]
//       AsyncStorage.removeItem(key)
//   }
// }