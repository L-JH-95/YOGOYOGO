import React from "react";
import axios from 'axios';
import { View, Image, Text, StyleSheet,ScrollView, AsyncStorage } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import FollowCard from '../components/FollowCard';
import { Block } from "../components";
const api = axios.create({
    baseURL: "http://k02a2031.p.ssafy.io:5000/",
});


export default class FollowList extends React.Component {
    state = {
        loading: true,
        data:[]
    };

    async componentDidMount(){
        AsyncStorage.getItem("user_id").then((value) => {
            console.log(value);
            axios.get("http://k02a2031.p.ssafy.io:5000/mylist/" + value + "/follow")
              .then((res) => {
                  //console.log(res),
                  this.setState({
                      // loading: false,
                      // ingredients: res.data
                      data : res.data
                  })
      
      
      
              })
              .catch((err) => {
                  console.log(err);
              })
         
        })
    }



    render() {
        const { loading,data } = this.state;
        console.log(data)
        return ( 
        <ScrollView>
            {
              this.state.data.map(data => <FollowCard key={data.fid} data={data}/>)
            }
          </ScrollView>)
       
 
    };
}