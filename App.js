/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    CameraRoll,
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';

const imgURL = 'https://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png';

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            img: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Image style={{width: 100, height: 50, backgroundColor: 'red', marginTop: 20}}
                       source={{uri: imgURL}}
                />
                <TouchableOpacity style={{width: 50, height: 20, backgroundColor: 'cyan', marginTop: 20}}
                                  onPress={() => {

                                      const {
                                          fs
                                      } = RNFetchBlob;
                                      var urlArr = imgURL.split(".");
                                      let filePath = '/DownLoad/' + urlArr[urlArr.length - 2] + '.' + urlArr[urlArr.length - 1];

                                      let self = this;

                                      return RNFetchBlob
                                          .config({
                                              // fileCache: true,
                                              path:fs.dirs.SDCardDir + filePath,
                                          })
                                          .fetch('GET', imgURL, {
                                              //some headers ..
                                          })
                                          .then((res) => {
                                              // the temp file path
                                              console.log('The file saved to ', res.path())
                                              // alert('--' + res.path() + '--' + JSON.stringify(res.path()))

                                              // this.setState({
                                              //     img : res.path()
                                              // })

                                              var promise = CameraRoll.saveToCameraRoll(imgURL);
                                              promise.then(function (result) {

                                                  alert('保存成功！地址如下：\n' + result);

                                                  self.setState({
                                                      img: result
                                                  })
                                              }).catch(function (error) {
                                                  alert('保存失败！\n' + error);
                                              });
                                          })

                                  }}
                >
                    <Text>点击</Text>
                </TouchableOpacity>
                <Image style={{width: 100, height: 50, backgroundColor: 'yellow', marginTop: 20}}
                       source={{uri: this.state.img}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
