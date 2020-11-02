import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import CommonStyle from '@/utils/constant/Style';
import DefaultNavigationHeader from '@/components/DefaultNavigationHeader';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

interface UploadProps { }

const Upload = (props: UploadProps) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={CommonStyle.container}>
      <DefaultNavigationHeader
        title='图片上传'
        showLeftIcon
        navigation={navigation}
      />
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true
            }).then(image => {
              console.log(image);
            });
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>读取相册可剪裁</Text>
        </TouchableOpacity>
      </View>
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.openPicker({
              multiple: true
            }).then(images => {
              console.log(images);
            });
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>图片长按多选</Text>
        </TouchableOpacity>
      </View>
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.openPicker({
              mediaType: "video",
            }).then((video) => {
              console.log(video);
            });
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>读取video</Text>
        </TouchableOpacity>
      </View>
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              console.log(image);
            });
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>相机可裁剪</Text>
        </TouchableOpacity>
      </View>
      <View style={CommonStyle.list}>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.openCamera({
              mediaType: 'video',
            }).then(image => {
              console.log(image);
            });
          }}
          style={CommonStyle.list_item}
        >
          <Text style={CommonStyle.list_item_text}>相机录视频</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {}
});
