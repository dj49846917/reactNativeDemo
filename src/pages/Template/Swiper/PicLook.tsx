import CommonBanner from '@/components/CommonBanner';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import CommonStyle from '@/utils/constant/Style';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ENV_ICON } from '@/assets/styles/picUrl';

interface PicLookProps { }

interface IState {
  url: string
}

const arr = [{
  "ID": 459,
  "BigImgUrl": "http://192.168.10.41/group1/M00/01/22/wKgKKV-OlFmAVOAEAAjz2DlbHlo624.JPG",
}, {
  "ID": 454,
  "BigImgUrl": "http://183.230.176.174:8989/group1/M00/01/22/wKgKKV-Oku-ASvS0AAS61nIadjY866.JPG",
}, {
  "ID": 455,
  "BigImgUrl": "http://183.230.176.174:8989/group1/M00/01/22/wKgKKV-Oku-AWtewAAaOlhDF0vM188.JPG",
}, {
  "ID": 456,
  "BigImgUrl": "http://183.230.176.174:8989/group1/M00/01/22/wKgKKV-Oku-AJpOFAAYeMTXU8EE434.JPG",
}, {
  "ID": 458,
  "BigImgUrl": "http://192.168.10.41/group1/M00/01/22/wKgKKV-OlE2AJNt1AAjz2DlbHlo912.JPG",
}]

const PicLook = (props: PicLookProps) => {
  const navigation = useNavigation()
  const [isOpen, setIsOpen] = useState(false)   // 是否打开预览弹窗
  const [index, setIndex] = useState(0)       // 点击图片的下标
  const [lookArr, setLookArr] = useState<IState[]>([])    // 预览的数据源

  useEffect(() => {
    const newArr: React.SetStateAction<IState[]> = []
    arr.forEach(item => {
      const obj = { url: '' }
      obj.url = item.BigImgUrl
      newArr.push(obj)
    })
    setLookArr(newArr)
  }, [])

  const showModal = () => {
    return (
      <Modal visible={isOpen} transparent={true}>
        <ImageViewer imageUrls={lookArr}
          index={index}
          renderHeader={() => {
            return (
              <TouchableOpacity
                style={styles.base}
                onPress={() => {
                  setIsOpen(false)
                }}
              >
                <Image source={ENV_ICON.icon_top_off_white} style={styles.icon} />
              </TouchableOpacity>
            )
          }}
        />
      </Modal>
    )
  }

  return (
    <>
      <SafeAreaView style={CommonStyle.container}>
        <DefaultNavigationHeader
          title='图片预览'
          showLeftIcon
          navigation={navigation}
        />
        <View style={styles.banner}>
          <CommonBanner
            list={arr}
            showsButtons={false}
            dot={<View style={styles.swiper_dot} />}
            activeDot={<View style={styles.swiper_dot_active} />}
            paginationStyle={{ bottom: 10 }}
            openLookModal={(index: number) => {
              setIndex(index)
              setIsOpen(true)
            }}
          />
        </View>
      </SafeAreaView>
      {showModal()}
    </>
  );
};

export default PicLook;

const styles = StyleSheet.create({
  banner: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(400)
  },
  swiper_dot: {
    width: UnitConvert.dpi(12),
    height: UnitConvert.dpi(12),
    borderRadius: UnitConvert.dpi(12),
    backgroundColor: '#fff',
    marginLeft: UnitConvert.dpi(10),
  },
  swiper_dot_active: {
    width: UnitConvert.dpi(12),
    height: UnitConvert.dpi(12),
    borderRadius: UnitConvert.dpi(12),
    backgroundColor: '#c81621',
    marginLeft: UnitConvert.dpi(10),
  },
  base: {
    position: 'absolute',
    zIndex: 9999,
    left: UnitConvert.dpi(20),
    top: UnitConvert.dpi(60)
  },
  icon: {
    width: UnitConvert.dpi(60),
    height: UnitConvert.dpi(60),
  }
});
