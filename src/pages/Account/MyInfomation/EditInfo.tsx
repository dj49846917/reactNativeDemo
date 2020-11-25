import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useRoute, useNavigation } from '@react-navigation/native';
import { UnitConvert } from '@/utils/unitConvert';
import MyTextInput from '@/components/MyTextInput';
import { validFieldsDefault } from '@/utils/utils';
import MyToastShort from '@/components/MyToastShort';

interface EditInfoProps { }

type Istate = {
  NickName: string | null,
  IDCard: string,
}

const EditInfo = (props: EditInfoProps) => {
  const route = useRoute<any>()
  const navigation = useNavigation()

  const [user, setUser] = useState<Istate>({
    NickName: '',
    IDCard: ''
  })

  const save = () => {
    Keyboard.dismiss()
    // @ts-ignore
    const a = validFieldsDefault(user[route.params.key], '输入内容不能为空!')
    if(a) {
      MyToastShort({content: '保存成功'})
    }
  }

  // 主体内容
  const showContent = () => {
    console.log('route.params', route.params)
    return (
      <View style={styles.content}>
        <View style={styles.content_item}>
          <MyTextInput
            flelds={route.params.placeholder}
            showLabel={false}
            showClearIcon
            placeholder={`请输入${route.params.placeholder}`}
            defaultValue={route.params.data}
            inputStyle={{
              width: UnitConvert.w - UnitConvert.dpi(100),
            }}
            clearIconStyle={{
              position: 'absolute',
              right: UnitConvert.dpi(40)
            }}
            onBlur={() => {
              // @ts-ignore
              validFieldsDefault(user[route.params.key], '输入内容不能为空!') 
            }}
            getFieldsValue={(v: string) => {
              setUser({
                ...user,
                [route.params.key]: v
              })
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title={route.params.title}
        showLeftIcon
        showRightSecondIcon
        rightSecondIconType='text'
        rightSecondIconText='保存'
        rightSecondStyle={{
          marginRight: UnitConvert.dpi(20)
        }}
        leftCallBack={() => {
          navigation.goBack()
        }}
        rightSecondCallBack={()=>save()}
      />
      <View style={CommonStyle.sizedBox}></View>
      {showContent()}
    </SafeAreaView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  content_item: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(110),
    paddingHorizontal: UnitConvert.dpi(30),
    position: 'relative'
  },
});
