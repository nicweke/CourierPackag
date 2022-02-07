import { StyleSheet } from "react-native";




const styles = StyleSheet.create({

    root:{
        position:'absolute',    
        width:'100%',
        bottom: 0,
        padding:20,
        height:'100%',
        justifyContent:'space-between',
        backgroundColor:'#00000999',
        
       
    },
    popupContainer:{
        backgroundColor:'#000001',
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
        height:250,

    },
    minutes:{
        padding:10,
        color:'white',
        fontSize: 35,

    },
    distance:{
        color:'white',
        fontSize:25,

    },
    packageType:{
        color:'white',
        fontSize:22,
        marginHorizontal:15,

    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    type:{
        flexDirection:'row',
        alignItems:'center',
    },
    userBg:{
        height:53,
        width:53,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#4361ee',
        borderRadius: 40,
    },
    declineButton:{
        backgroundColor: 'red',
        
        padding:12,
        borderRadius:18,
        alignItems:'center',
        justifyContent:'center',
        width:120,
        


    },
    
    declineText:{

        color:'white',
        fontWeight:'bold',
        fontSize:15,
        

    },
    

});
export default styles;