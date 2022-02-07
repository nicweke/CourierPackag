import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    bottomContainer:{
        height: 120,
        backgroundColor: '#fefcfd',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:15,

    },
    bottomText:{
        fontSize: 23,
        fontWeight:'bold',
        color:'black',

    },
    roundButton:{
        position: 'absolute',
        backgroundColor: '#ffd900',
        padding:10,
        borderRadius: 25,

    },
    goButton:{
        position: 'absolute',
        backgroundColor: '#003566',
        width:79,
        height:79,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 50,
        left: Dimensions.get('window').width /2 - 37,
        bottom: 130,
    },
    goText:{
        fontSize:25,
        color:'white',
        fontWeight:'bold'
    },
    balanceButton:{
        position: 'absolute',
        backgroundColor: '#003566',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 50,
        left: Dimensions.get('window').width /2 - 50,
        top: 20,

    },
    balanceText:{
        fontSize:25,
        color:'white',
        fontWeight:'bold'

    },
  
  
});

export default styles;