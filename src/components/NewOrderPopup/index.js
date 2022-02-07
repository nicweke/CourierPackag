import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles.js';
import Entypo from 'react-native-vector-icons/Entypo';
//import styles from './../../screens/HomeScreen/styles';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';


const NewOrderPopup = ({newOrder, onAccept, onDecline,duration, distance}) => {
    
    return (
        <View style={styles.root}>

            <Pressable onPress={onDecline} style={styles.declineButton}>
                <Text style={styles.declineText}>Reject Order</Text>
            </Pressable>

            <Pressable onPress={onAccept} style={styles.popupContainer}>
                <View style={styles.type}>
                    <Text style={{color:'white',fontSize:25,padding:20}}>{newOrder.type}</Text>
                </View>
                <View style={styles.row}>
                    
                    <View style={styles.userBg}>
                        <FontAwesome name={'user'} color={'white'} size={35}/>
                    </View>
                    <Text style={styles.packageType}>
                    <Entypo name={'star'} size={20}/>
                        {newOrder.user?.rating}
                        </Text>
                   
                </View>

                <Text style={styles.minutes}>{duration} minutes</Text>
                <Text style={styles.distance}>{distance} miles</Text>
                
            </Pressable>
        </View>
    );
};

export default NewOrderPopup;