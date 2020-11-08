/*
 * @Author: your name
 * @Date: 2020-11-08 11:39:58
 * @LastEditTime: 2020-11-08 14:07:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeDemo\src\utils\Request.ts
 */
import { Constant } from "./constant/Constant"

interface httpConfig {
  url: string,
  data?: {
    [propName: string]: any;
  },
  headers?: HeadersInit_;
  referrer?: string;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode_;
  window?: any;
  signal?: AbortSignal;
}

class ClientHttp {
  static Post(options: httpConfig) {
    return new Promise((resolve, reject) => {
      Promise.race([
        fetch(`${Constant.API_URL}${options.url}`, {
          body: JSON.stringify(options.data),
          method: "POST",
          headers: {
            'content-type': 'application/json',
            ...options.headers
          },
          mode: 'cors',
          ...options
        }),
        new Promise(function(resolve,reject){
            setTimeout(()=> reject(new Error('request timeout')),30000)
        })
      ]).then((res:any)=>{
            //请求成功
            resolve(res.json())
        }).catch(err => {
          const obj = {
            code: 500,
            msg: err
          }
          reject(obj)
        });
    })
  }

  static Get(options: httpConfig) {
    return new Promise((resolve, reject) => {
      Promise.race([
        fetch(`${Constant.API_URL}${options.url}`, {
          method: "GET",
          headers: {
            'content-type': 'application/json',
            ...options.headers
          },
          mode: 'cors',
          ...options
        }),
        new Promise(function(resolve,reject){
            setTimeout(()=> reject(new Error('request timeout')),30000)
        })
      ]).then((res:any)=>{
            //请求成功
            resolve(res.json())
        }).catch(err => {
          const obj = {
            code: 500,
            msg: err
          }
          reject(obj)
        });
    })
  }
}

export default ClientHttp