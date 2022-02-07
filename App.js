/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  Platform
} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import Geolocation from '@react-native-community/geolocation';
import Amplify, { Auth, API, graphqlOperation }from 'aws-amplify';
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { getPackageId } from './src/graphql/queries';
import { createPackage } from './src/graphql/mutations';

Amplify.configure(config);





navigator.geolocation = require('@react-native-community/geolocation');







const App: () => Node = () => {
  const androidPermission = async () =>  {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "CourierPackag Location Permission",
          message:
            "CourierPackag needs access to your location " +
            "so you can deliver packages easily.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

  }

  useEffect(() => {
    if (Platform.OS === 'android'){
      androidPermission();
    }
    else
    //IOS
    {
      Geolocation.requestAuthorization();
    }
    
  }, []);

  useEffect(() => {
    const updateUserPackage = async () => {

      //Get authenticated user
      const authenticatedUser = await Auth.currentAuthenticatedUser({bypassCache:true});
      if(!authenticatedUser){
        return;
      }
      //check if user has a car
      const packageData = await API.graphql(
        graphqlOperation(
          getPackageId,
          {id:authenticatedUser.attributes.sub}
        )
      )

      if(!!packageData.data.getPackageId){
        console.log("User alreaady has a package assigned");
        return;
      }

      //if not create a new car for the user
      const newPackage = {
        id: authenticatedUser.attributes.sub,
        type: 'General Package', 
        userId: authenticatedUser.attributes.sub,
      }
        await API.graphql(graphqlOperation(
          createPackage,
          { input: newPackage }
        ))

    };
    updateUserPackage();
    
  }, [])


  return (
    <SafeAreaView >
      <StatusBar barStyle={'light-content'} />
        <HomeScreen />
    </SafeAreaView>
  );
};



export default withAuthenticator(App);
