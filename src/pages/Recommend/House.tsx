import * as React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, Platform, TouchableOpacity } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import MyDropdownList from '@/components/MyDropdownList';
import { findDicName, getSubTypeList, validFieldsDefault, validFieldsPhone, validFieldsPosiveNumber } from '@/utils/utils';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import MyTextInput from '@/components/MyTextInput';
import { Constant } from '@/utils/constant/Constant';
import RecommandBtn from '@/pages/Recommend/RecommandBtn';
import MyErrorNotice from '@/components/MyErrorNotice';
import ImagePicker from 'react-native-image-crop-picker';

const mapStateToProps = (state: RootState) => {
  return {
    dicArr: state.recommend.dicArr,
    SourceByOwner: state.recommend.SourceByOwner,
    OwnerName: state.recommend.OwnerName,
    OwnerPhone: state.recommend.OwnerPhone,
    AssetName: state.recommend.AssetName,
    PropertyAddress: state.recommend.PropertyAddress,
    ProposalPrice: state.recommend.ProposalPrice,
    PropertyArea: state.recommend.PropertyArea,
    PropertyInsideArea: state.recommend.PropertyInsideArea,
    PropertyUsufructGetType: state.recommend.PropertyUsufructGetType,
    HuXingTypeF: state.recommend.HuXingTypeF,
    HouseTypeHouse: state.recommend.HouseTypeHouse,
    RegionIdHouse: state.recommend.RegionIdHouse,
    Renovation: state.recommend.Renovation,
    Floor: state.recommend.Floor,
    isElevator: state.recommend.isElevator,
    isMortgage: state.recommend.isMortgage,
    DebtMoney: state.recommend.DebtMoney,
    mortgageBank: state.recommend.mortgageBank,
    RemarkHouse: state.recommend.RemarkHouse,
    // num: state.home.num,
    // loading: state.loading.effects['home/asyncAdd']
  }
}

const connector = connect(mapStateToProps)
type ModalState = ConnectedProps<typeof connector> // 定义connect的类型

interface HouseProps extends ModalState {

}

const House = (props: HouseProps) => {
  // 保存房源
  const saveHouse = (code: boolean) => {
    if (!code) {
      MyErrorNotice({ content: '请阅读推荐房源相关温馨提示' })
      return
    }
    if (!props.SourceByOwner) {
      MyErrorNotice({ content: '请选择房屋来源' })
      return
    }
    const a = validFieldsDefault(props.OwnerName, '被推荐人姓名不能为空')
    const b = validFieldsPhone(props.OwnerPhone, true, '请输入正确的电话号码', '被推荐人电话不能为空')
    const c = validFieldsDefault(props.AssetName, '小区名称不能为空')
    const d = validFieldsPosiveNumber(props.ProposalPrice, false, '请输入正确的意向卖价', '')
    const e = validFieldsPosiveNumber(props.PropertyArea, false, '请输入正确的建筑面积', '')
    const f = validFieldsPosiveNumber(props.PropertyInsideArea, false, '请输入正确的套内面积', '')
    let g;
    if (props.isMortgage === 1000001) {
      g = validFieldsPosiveNumber(props.DebtMoney, true, '请输入正确的抵押金额', '请输入抵押金额')
    } else {
      g = true
    }
    if (a && b && c && d && e && f && g) {
      const content = {
        SourceByOwner: props.SourceByOwner || null,
        OwnerName: props.OwnerName || null,
        OwnerPhone: props.OwnerPhone || null,
        AssetName: props.AssetName || null,
        PropertyAddress: props.PropertyAddress || null,
        ProposalPrice: Number(props.ProposalPrice) * 10000 || null,
        PropertyArea: props.PropertyArea || null,
        PropertyInsideArea: props.PropertyInsideArea || null,
        PropertyUsufructGetType: props.PropertyUsufructGetType || null,
        HuXingTypeF: props.HuXingTypeF || null,
        HouseType: props.HouseTypeHouse || null,
        RegionId: props.RegionIdHouse || null,
        Renovation: props.Renovation || null,
        Floor: props.Floor || null,
        isElevator: props.isElevator || null,
        isMortgage: props.isMortgage || null,
        DebtMoney: Number(props.DebtMoney) * 10000 || null,
        mortgageBank: props.mortgageBank || null,
        Remark: props.RemarkHouse || null,
        Attachment: '' || null
      }
      const params = {
        data: JSON.stringify(content),
        operatorrid: 1011
      }
      console.log('params', params)
    }
  }

  const showBtn = () => {
    return (
      <TouchableOpacity
        style={{
          width: UnitConvert.dpi(200),
          height: UnitConvert.dpi(100),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red'
        }}
        onPress={()=>{
          
        }}
      >
        <Text style={{color: '#000'}}>点击</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={CommonStyle.content}>
      <View style={CommonStyle.sizedBox}></View>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={200}>
          <MyDropdownList
            required
            flelds='房屋来源'
            placeHolder='请选择房屋来源'
            defaultValue={findDicName(getSubTypeList(props.dicArr, 2034), props.SourceByOwner)}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            callBack={() => {
              // 过滤数据字典
              const dic = getSubTypeList(props.dicArr, 2034)
              props.dispatch({
                type: 'recommend/openModal',
                payload: {
                  val: true,
                  title: '房屋来源',
                  list: dic,
                  defaultValue: props.SourceByOwner,
                  key: 'SourceByOwner'
                }
              })
            }}
          />
          <MyTextInput
            flelds='业主姓名'
            required
            // showClearIcon
            onBlur={() => { validFieldsDefault(props.OwnerName, '被推荐人姓名不能为空') }}
            placeholder='请输入被推荐人姓名'
            defaultValue={props.OwnerName}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'OwnerName',
                  val: code
                }
              })
            }}
          />
          <MyTextInput
            flelds='业主电话'
            required
            // showClearIcon
            onBlur={() => { validFieldsPhone(props.OwnerPhone, true, '请输入正确的电话号码', '被推荐人电话不能为空') }}
            placeholder='业主电话'
            keyboardType='phone-pad'
            defaultValue={props.OwnerPhone}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'OwnerPhone',
                  val: code
                }
              })
            }}
          />
          <MyTextInput
            flelds='小区名称'
            required
            // showClearIcon
            onBlur={() => { validFieldsDefault(props.AssetName, '小区名称不能为空') }}
            placeholder='请输入小区名称'
            defaultValue={props.AssetName}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'AssetName',
                  val: code
                }
              })
            }}
          />
          <MyTextInput
            flelds='房屋坐落'
            placeholder='请输入房屋坐落'
            defaultValue={props.PropertyAddress}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'PropertyAddress',
                  val: code
                }
              })
            }}
          />
          <MyTextInput
            flelds='意向卖价(万)'
            placeholder='请输入意向卖价'
            keyboardType={'numeric'}
            defaultValue={props.ProposalPrice}
            onBlur={() => { validFieldsPosiveNumber(props.ProposalPrice, false, '请输入正确的意向卖价', '') }}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'ProposalPrice',
                  val: code
                }
              })
            }}
          />
          <View style={CommonStyle.sizedBox}></View>
          <View style={styles.half}>
            <MyTextInput
              flelds='建筑面积(㎡)'
              placeholder='请输入'
              keyboardType={'numeric'}
              defaultValue={props.PropertyArea}
              onBlur={() => { validFieldsPosiveNumber(props.PropertyArea, false, '请输入正确的建筑面积', '') }}
              getFieldsValue={(code: string) => {
                props.dispatch({
                  type: 'recommend/setFields',
                  payload: {
                    key: 'PropertyArea',
                    val: code
                  }
                })
              }}
              width={UnitConvert.w / 2}
              lableStyle={{
                paddingLeft: UnitConvert.dpi(30)
              }}
            />
            <MyTextInput
              flelds='套内面积(㎡)'
              placeholder='请输入'
              keyboardType={'numeric'}
              defaultValue={props.PropertyInsideArea}
              onBlur={() => { validFieldsPosiveNumber(props.PropertyInsideArea, false, '请输入正确的套内面积', '') }}
              getFieldsValue={(code: string) => {
                props.dispatch({
                  type: 'recommend/setFields',
                  payload: {
                    key: 'PropertyInsideArea',
                    val: code
                  }
                })
              }}
              width={UnitConvert.w / 2}
              labelWidth={UnitConvert.dpi(198)}
            />
          </View>
          <View style={styles.half}>
            <MyDropdownList
              flelds='土地性质'
              placeHolder='请选择'
              defaultValue={findDicName(getSubTypeList(props.dicArr, 2013), props.PropertyUsufructGetType)}
              lableStyle={{
                paddingLeft: UnitConvert.dpi(30)
              }}
              callBack={() => {
                // 过滤数据字典
                const dic = getSubTypeList(props.dicArr, 2013)
                props.dispatch({
                  type: 'recommend/openModal',
                  payload: {
                    val: true,
                    title: '土地性质',
                    list: dic,
                    defaultValue: props.PropertyUsufructGetType,
                    key: 'PropertyUsufructGetType'
                  }
                })
              }}
              width={UnitConvert.w / 2}
              longSelectWord
            />
            <MyDropdownList
              flelds='房屋户型'
              placeHolder='请选择'
              defaultValue={findDicName(Constant.houseTypeArr, props.HuXingTypeF)}
              callBack={() => {
                props.dispatch({
                  type: 'recommend/openModal',
                  payload: {
                    val: true,
                    title: '房屋户型',
                    list: Constant.houseTypeArr,
                    defaultValue: props.HuXingTypeF,
                    key: 'HuXingTypeF'
                  }
                })
              }}
              width={UnitConvert.w / 2 - UnitConvert.dpi(20)}
              labelWidth={UnitConvert.dpi(198)}
              longSelectWord
            />
          </View>
          <View style={styles.half}>
            <MyDropdownList
              flelds='房屋类型'
              placeHolder='请选择'
              defaultValue={findDicName(getSubTypeList(props.dicArr, 2002), props.HouseTypeHouse)}
              lableStyle={{
                paddingLeft: UnitConvert.dpi(30)
              }}
              callBack={() => {
                // 过滤数据字典
                const dic = getSubTypeList(props.dicArr, 2002)
                props.dispatch({
                  type: 'recommend/openModal',
                  payload: {
                    val: true,
                    title: '房屋类型',
                    list: dic,
                    defaultValue: props.HouseTypeHouse,
                    key: 'HouseTypeHouse'
                  }
                })
              }}
              width={UnitConvert.w / 2}
              longSelectWord
            />
            <MyDropdownList
              flelds='房屋区域'
              placeHolder='请选择'
              defaultValue={findDicName(getSubTypeList(props.dicArr, 1110), props.RegionIdHouse)}
              callBack={() => {
                // 过滤数据字典
                const dic = getSubTypeList(props.dicArr, 1110)
                props.dispatch({
                  type: 'recommend/openModal',
                  payload: {
                    val: true,
                    title: '房屋类型',
                    list: dic,
                    defaultValue: props.RegionIdHouse,
                    key: 'RegionIdHouse'
                  }
                })
              }}
              width={UnitConvert.w / 2 - UnitConvert.dpi(20)}
              labelWidth={UnitConvert.dpi(198)}
              longSelectWord
            />
          </View>
          <View style={styles.half}>
            <MyDropdownList
              flelds='装修情况'
              placeHolder='请选择'
              defaultValue={findDicName(getSubTypeList(props.dicArr, 2004), props.Renovation)}
              lableStyle={{
                paddingLeft: UnitConvert.dpi(30)
              }}
              callBack={() => {
                // 过滤数据字典
                const dic = getSubTypeList(props.dicArr, 2004)
                props.dispatch({
                  type: 'recommend/openModal',
                  payload: {
                    val: true,
                    title: '装修情况',
                    list: dic,
                    defaultValue: props.Renovation,
                    key: 'Renovation'
                  }
                })
              }}
              width={UnitConvert.w / 2}
              longSelectWord
            />
            <MyDropdownList
              flelds='房屋楼层'
              placeHolder='请选择'
              defaultValue={findDicName(Constant.FloorDic, props.Floor)}
              callBack={() => {
                props.dispatch({
                  type: 'recommend/openModal',
                  payload: {
                    val: true,
                    title: '房屋楼层',
                    list: Constant.FloorDic,
                    defaultValue: props.Floor,
                    key: 'Floor'
                  }
                })
              }}
              width={UnitConvert.w / 2 - UnitConvert.dpi(20)}
              labelWidth={UnitConvert.dpi(198)}
              longSelectWord
            />
          </View>
          <View style={styles.half}>
            <MyDropdownList
              flelds='有无电梯'
              placeHolder='请选择'
              defaultValue={findDicName(getSubTypeList(props.dicArr, 1000), props.isElevator)}
              lableStyle={{
                paddingLeft: UnitConvert.dpi(30)
              }}
              callBack={() => {
                // 过滤数据字典
                const dic = getSubTypeList(props.dicArr, 1000)
                props.dispatch({
                  type: 'recommend/openModal',
                  payload: {
                    val: true,
                    title: '有无电梯',
                    list: dic,
                    defaultValue: props.isElevator,
                    key: 'isElevator'
                  }
                })
              }}
              width={UnitConvert.w / 2}
              longSelectWord
            />
            <MyDropdownList
              flelds='有无抵押'
              placeHolder='请选择'
              defaultValue={findDicName(getSubTypeList(props.dicArr, 1000), props.isMortgage)}
              callBack={() => {
                // 过滤数据字典
                const dic = getSubTypeList(props.dicArr, 1000)
                props.dispatch({
                  type: 'recommend/openModal',
                  payload: {
                    val: true,
                    title: '有无抵押',
                    list: dic,
                    defaultValue: props.isMortgage,
                    key: 'isMortgage'
                  }
                })
              }}
              width={UnitConvert.w / 2 - UnitConvert.dpi(20)}
              labelWidth={UnitConvert.dpi(198)}
              longSelectWord
            />
          </View>
          {
            props.isMortgage === 1000001 ? (
              <>
                <View style={CommonStyle.sizedBox}></View>
                <MyTextInput
                  flelds='抵押金额'
                  placeholder='抵押金额(万元)'
                  keyboardType={'numeric'}
                  defaultValue={props.DebtMoney}
                  onBlur={() => { validFieldsPosiveNumber(props.DebtMoney, true, '请输入正确的抵押金额', '') }}
                  lableStyle={{
                    paddingLeft: UnitConvert.dpi(30)
                  }}
                  getFieldsValue={(code: string) => {
                    props.dispatch({
                      type: 'recommend/setFields',
                      payload: {
                        key: 'DebtMoney',
                        val: code
                      }
                    })
                  }}
                />
                <MyTextInput
                  flelds='抵押银行/公司'
                  placeholder='抵押银行/公司'
                  keyboardType={'numeric'}
                  defaultValue={props.mortgageBank}
                  lableStyle={{
                    paddingLeft: UnitConvert.dpi(30)
                  }}
                  getFieldsValue={(code: string) => {
                    props.dispatch({
                      type: 'recommend/setFields',
                      payload: {
                        key: 'mortgageBank',
                        val: code
                      }
                    })
                  }}
                />
              </>
            ) : null
          }
          <View style={CommonStyle.sizedBox}></View>
          <MyTextInput
            flelds='备注'
            placeholder='请输入备注'
            multiline
            defaultValue={props.RemarkHouse}
            height={UnitConvert.dpi(160)}
            lableStyle={{
              paddingLeft: UnitConvert.dpi(30)
            }}
            getFieldsValue={(code: string) => {
              props.dispatch({
                type: 'recommend/setFields',
                payload: {
                  key: 'RemarkHouse',
                  val: code
                }
              })
            }}
          />
          {showBtn()}
          <RecommandBtn
            tipTitle='《房源温馨提示》'
            tipCallback={() => { }}
            save={(code: boolean) => {
              console.log(code)
              saveHouse(code)
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default connector(House);

const styles = StyleSheet.create({
  half: {
    flexDirection: 'row'
  }
});
