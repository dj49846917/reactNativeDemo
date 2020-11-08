/*
 * @Author: your name
 * @Date: 2020-11-08 14:07:54
 * @LastEditTime: 2020-11-08 14:12:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeDemo\src\service\requestData.ts
 */
import ClientHttp from "@/utils/Request";

export function getMyList(data:any) {
    return ClientHttp.Get({
      url: '/RTAuction/BpmsService.GetMyList',
      data,
    })
  }