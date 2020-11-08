/*
 * @Author: your name
 * @Date: 2020-10-31 08:56:24
 * @LastEditTime: 2020-11-08 14:27:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeDemo\src\models\index.ts
 */
import Template, { TemplateState } from './template';
import ReduxUse, { ReduxUseState } from './ReduxUse';
import RequestData, { RequestDataState } from './RequestData';

const models = [Template, ReduxUse, RequestData];
export type RootState = {
  loading: any
  template: TemplateState
  reduxUse: ReduxUseState
  requestData: RequestDataState
}
export default models;