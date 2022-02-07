import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Auth, API, graphqlOperation } from 'aws-amplify';
import { getPackage, listOrders } from '../../graphql/queries';
import { updatePackage,updateOrder } from '../../graphql/mutations';
import NewOrderPopup from '../../components/NewOrderPopup';




const HomeScreen = (props) => {




const origin = {latitude: 28.450927, longitude: -16.260845};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyCnjJ4prvMRcfO4aDsgQIP490rDJdHnva0';

const [pkg, setPackage]=useState(null);

const [myPosition, setMyPosition] = useState(null);
const [order, setOrder] = useState(null);

const [newOrders, setNewOrders] = useState( []);

const fetchPackage = async () => {
    try{
        const userData = await Auth.currentAuthenticatedUser();
        const packageData = await API.graphql(
            graphqlOperation(
                getPackage,
                { id:userData.attributes.sub }
            ),
        );
                setPackage(packageData.data.getPackage)
    } catch(e){
        console.error(e);
    }
}


const fetchOrders = async () => {
    try{
        const ordersData = await API.graphql(
            graphqlOperation(listOrders, 
                { filter: { status: { eq: 'NEW'}}}
            )
        );
        setNewOrders(ordersData.data.listOrders.items);
    }
    catch(e){
        console.error(e);
    }
}

useEffect(() => {
 fetchPackage();
 fetchOrders();
}, []);




const onDecline = ()=>{
    setNewOrders(newOrders.slice(1));
}

const onAccept = async (newOrder) =>{
    try{
        const input = {
            id: newOrder.id,
            status: "PICKING_UP_PACKAGE",
            packageId: pkg.id,

        }
        const orderData = await API.graphql(
            graphqlOperation(updateOrder, { input })
        )
        setOrder(orderData.data.updateOrder);
    }
    catch(e){
        console.error(e);
    }
    
    setNewOrders(newOrders.slice(1));
}


const onStartPress = async () => {
    
    //update package and set it to active
    try{
        const userData = await Auth.currentAuthenticatedUser();
        const input = {
            id:userData.attributes.sub,
            isActive: !pkg.isActive,

        }
        const updatedPackageData = await API.graphql(
            graphqlOperation(
                updatePackage,
                {input}
            )
        )
        setPackage(updatedPackageData.data.updatePackage)
    }
    catch(e){
        console.error(e);
    }
};

const onUserLocationChange = async (event) => {
    
    const { latitude,longitude, heading } = event.nativeEvent.coordinate
    //update package and set it to active
    try{
        const userData = await Auth.currentAuthenticatedUser();
        const input = {
            id:userData.attributes.sub,
            latitude,
            longitude,
            heading,
        }
        const updatedPackageData = await API.graphql(
            graphqlOperation(
                updatePackage,
                {input}
            )
        )
        setPackage(updatedPackageData.data.updatePackage)
    }
    catch(e){
        console.error(e);
    }
};

const onDirectionFound = (event)=>{
    if(order){
        setOrder({
            ...order,
            distance: event.distance,
            duration:event.duration,
            pickedUp: order.pickedUp || event.distance < 0.2,
            isFinished: order.pickedUp && event.distance < 0.2,
        })
    }
}

const getDestination = () => {
   if(order && order.pickedUp){
       return{
        latitude: order.destLatitude,                             
        longitude: order.destLongitude,
       }
   }
   
    return {
        latitude: order.originLatitude,                             
        longitude: order.originLongitude,
    }
}




const renderBottomTitle = ()=>{

    if(order && order.isFinished){
        return(
            <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center', backgroundColor:'#458c58', width:300, padding:10, justifyContent:'center'}}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Complete Delivery: {order.type}</Text>  
                </View>
                <Text style={styles.bottomText}>{order.user.username}</Text>
            </View>
        
        )
    }
    if(order && order.pickedUp){
        return(
            <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>{order.duration ? order.duration.toFixed(1) : '?'} minutes</Text>

                    <View style={{backgroundColor:'#458c58',marginHorizontal:10, width:30, height:30, alignItems:'center', justifyContent:'center',borderRadius:20}}>
                        <FontAwesome name={'user'} color={'white'} size={20}/>
                    </View>
                    <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
                </View>
                <Text style={styles.bottomText}>Deliver package of: {order?.user?.username}</Text>
            </View>
        
        )
    }
    if(order){
        return(
            <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>{order.duration ? order.duration.toFixed(1) : '?'} minutes</Text>

                    <View style={{backgroundColor:'black',marginHorizontal:10, width:30, height:30, alignItems:'center', justifyContent:'center',borderRadius:20}}>
                        <FontAwesome name={'user'} color={'white'} size={20}/>
                    </View>
                    <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
                </View>
                <Text style={styles.bottomText}>Pick package: {order?.user?.username}</Text>
            </View>
        
        )
    }
    if (pkg?.isActive){
        return(<Text style={styles.bottomText}>Active</Text>)
    }
         return(<Text style={styles.bottomText}> Not Active</Text>)
    

}


    return (
        <View >
            <MapView
                style={{width:'100%', height:Dimensions.get('window').height - 120}}
                showsUserLocation={true}
                
                onUserLocationChange={onUserLocationChange}
                initialRegion={{
                  latitude: 28.450627,
                  longitude: -16.263045,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0121,
                
                
                 
                }}
            >
                {order && (
                     <MapViewDirections
                     origin={{ 
                         latitude: pkg?.latitude,
                         longitude: pkg?.longitude,
                        }}
                     onReady={onDirectionFound}
                     destination={getDestination()}
                     apikey={GOOGLE_MAPS_APIKEY}
                     strokeWidth={5}
                     strokeColor='black'
                 />

                )}
               



            </MapView>

            <Pressable onPress={ () =>console.warn("Balance")} style={styles.balanceButton}>
                <Text style={styles.balanceText}>
                    <Text >KES</Text>
                    {' '}
                    0.00
                </Text>

            </Pressable>

            

            <Pressable onPress={ () =>console.warn("Heiii")} style={[styles.roundButton, {top:12, left:13}]}>
                <Ionicons name={"menu-sharp"} size={22} color={'black'}/>

            </Pressable>
            <Pressable onPress={ () =>console.warn("Heiii")} style={[styles.roundButton, {top:12, right:13}]}>
                <Ionicons name={"menu-sharp"} size={22} color={'black'}/>

            </Pressable>


            {/* <Pressable onPress={ () =>console.warn("Heiii")} style={[styles.roundButton, {bottom:130, left:13}]}>
                <Ionicons name={"menu-sharp"} size={22} color={'black'}/>

            </Pressable>
            <Pressable onPress={ () =>console.warn("Heiii")} style={[styles.roundButton, {bottom:130, right:13}]}>
                <Ionicons name={"menu-sharp"} size={22} color={'black'}/>

            </Pressable> */}

            
            <Pressable onPress={ onStartPress} style={styles.goButton}>
                <Text style={styles.goText}>
                    {
                        pkg?.isActive ? 'End' : 'Start'
                    }
                </Text>

            </Pressable>

            <View style={styles.bottomContainer}>
                    <FontAwesome name={"sliders"} size={25} color={'black'} />
                    {renderBottomTitle()}
                    

                    <Ionicons name={"menu"} size={25} color={"black"}/>

            </View>

            {newOrders.length > 0 && !order && <NewOrderPopup 
            newOrder={newOrders[0]} 
            onDecline={onDecline}
            duration={2}
            distance={0.5}
            onAccept={()=> onAccept(newOrders[0])}
            
            />}
     
        </View>
    );
};

export default HomeScreen;