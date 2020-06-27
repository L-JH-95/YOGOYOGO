import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity,AsyncStorage } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import axios from 'axios';


export default class CommnutiyCard extends Component{
  gogo(recipe_id, favorites) {
    
    AsyncStorage.getItem("user_id").then((value) => {
      console.log("hello" + recipe_id + "dd" + value)
      axios.post("http://k02a2031.p.ssafy.io:5000/mylist/" + value + "/favorite/" + recipe_id,favorites )
        .then((res) => {
            alert('찜 완료');


        })
        .catch((err) => {
            console.log(err);
        })
   
  })
}
gogo2(uid) {
    console.log(uid)
  AsyncStorage.getItem("user_id").then((value) => {
    console.log(value + " " + uid)
    axios.post("http://k02a2031.p.ssafy.io:5000/mylist/" + value + "/follow/" + uid)
      .then((res) => {
        alert('팔로잉 완료');



      })
      .catch((err) => {
          console.log(err);
      })
 
})
}

  render() {
        const { data } = this.props; // 피드 항목 데이터
      //  const { image } = JSON.parse(data.json_metadata); // json_metadata에서 이미지 url을 파싱
        return (
   <Card>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>{data.uid}</Text>
                      <Text note>{new Date(data.created_at).toDateString()}</Text>
                    </Body>
                  </Left>
                </CardItem>

                  <CardItem cardBody>
                    <Image 
                      source={{ uri: data.image_url}} 
                      style={{ height:200, width:null, flex: 1 }} />
                  </CardItem> 
                  <CardItem style={{ height:45 }}>
                  <Left>
                    <Button transparent onPress={() => this.gogo(data.recipe_id, data.favorites)}>
                    <Icon name='ios-heart' style={{ color:'black', marginRight: 5 }}/>
                     
                      <Text>{data.favorites}</Text>
                    </Button>
                    <Button transparent onPress={() => this.gogo2(data.uid)}>
                      <Icon name='ios-contacts' style={{ color:'black', marginRight: 5 }}/>
                      <Text>follow</Text>
                    </Button>
                  </Left>
                  {/* <Right>
                    <Text>{ data.pending_payout_value }</Text>
                  </Right> */}
                </CardItem>
                {/* <CardItem style={{ height: 5 }}>
                  <Text>{ data.favorites } likes</Text>
                </CardItem> */}
                <CardItem>
                  <Text>
                 {data.summary}
                  </Text>
                </CardItem>
            </Card>
         
        );
      }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});