import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import { ENV_ICON, ENV_IMAGE } from '@/assets/styles/picUrl';
import { UnitConvert } from '@/utils/unitConvert';
import { useNavigation } from '@react-navigation/native';

interface TabPaneProps {
  list: any[]
}

const TabPane = (props: TabPaneProps) => {
  const navigation = useNavigation()

  // 展示主营板块
  const showAreaText = (code: string) => {
    let res = ''
    const arr: any[] = []
    try {
      JSON.parse(code).forEach((item: { text: any; }) => {
        arr.push(item.text)
      })
      res = arr.join(',')
    } catch (error) {
      console.log(error)
    } finally {
      return res
    }
  }

  return (
    <View style={styles.agent_list}>
      <View style={CommonStyle.commonListMarginTop}>
        {
          props.list && props.list.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.content_item}
              onPress={() => {
                navigation.navigate('AgentInfo', item)
              }}
            >
              <View style={styles.content_item_box}>
                <Image source={item.HeadPortrait ? { uri: item.HeadPortrait } : ENV_IMAGE.timg} style={styles.content_img} />
                <View style={styles.content_desc}>
                  <Text style={styles.content_desc_name}>{item.UserName}</Text>
                  <Text>
                    <Text style={styles.content_desc_loc}>主营板块: </Text>
                    <Text style={styles.content_desc_loc2}>{showAreaText(item.RegionJson)}</Text>
                  </Text>
                  <Text style={styles.content_desc_loc}>历史成交{item.TransactionCount}次，免费带看{item.SeeCount}次</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => { }}
              >
                <Image source={ENV_ICON.icon_msg_red} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
};

export default TabPane;

const styles = StyleSheet.create({
  agent_list: {
    flex: 1
  },
  content_item: {
    width: UnitConvert.w,
    height: UnitConvert.dpi(210),
    paddingHorizontal: UnitConvert.dpi(50),
    paddingVertical: UnitConvert.dpi(24),
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: UnitConvert.dpi(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  content_item_box: {
    flexDirection: 'row'
  },
  content_img: {
    width: UnitConvert.dpi(120),
    height: UnitConvert.dpi(160),
    marginRight: UnitConvert.dpi(34)
  },
  content_desc: {
    justifyContent: 'space-evenly'
  },
  content_desc_name: {
    fontSize: UnitConvert.dpi(32),
    color: '#000'
  },
  content_desc_loc: {
    fontSize: UnitConvert.dpi(26),
    color: '#666'
  },
  content_desc_loc2: {
    fontSize: UnitConvert.dpi(26),
    color: '#000',
    marginLeft: UnitConvert.dpi(20)
  }
});
