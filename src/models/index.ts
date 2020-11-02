/*
 * @Author: your name
 * @Date: 2020-10-31 08:56:24
 * @LastEditTime: 2020-11-02 22:21:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeDemo\src\models\index.ts
 */
import Template, { TemplateState } from './template';
import ReduxUse, { ReduxUseState } from './ReduxUse';

const models = [Template, ReduxUse];
export type RootState = {
  template: TemplateState
  reduxUse: ReduxUseState
}
export default models;