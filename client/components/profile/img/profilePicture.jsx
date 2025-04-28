import { Image, StyleSheet, View } from "react-native";

// list of thumbnail images, each mapped to a number
const images = {
    1: require('./1.png'),
    2: require('./2.png'),
    3: require('./3.png'),
    4: require('./4.png'),
    5: require('./5.png'),
    6: require('./6.png'),
    7: require('./7.png'),
    8: require('./8.png'),
    9: require('./9.png'),
    10: require('./10.png'),
    11: require('./11.png'),
    12: require('./12.png'),
    13: require('./13.png'),
    14: require('./14.png'),
    15: require('./15.png'),
    16: require('./16.png'),
}


//takes in a number and exports the <Image> based on selection input
// params:
//      selection - int that corresponds to an image id
//      optionalStyle - optional styling done to the image ex. optionalStyle={width:100, height:100}
//      optionalOutlineStyle - same with optionalStyle except with the outline
const ProfilePicture = ({selection, optionalStyle, optionalOutlineStyle}) => {

    if (selection >=1 && selection <=16 ) {
        return <View>
            <Image 
                source={images[selection]}
                resizeMode='contain'
                style={[styles.img, optionalStyle]} />
            <View style={[styles.outline, optionalOutlineStyle]} />
        </View>
    }

    return <View>
        <Image 
            source={images[1]}
            resizeMode='contain'
            style={[styles.img, optionalStyle]} />
        <View style={[styles.outline, optionalOutlineStyle]} />
    </View>
}


const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 60,
        position: 'absolute',
    },
    outline: {
        position: 'relative',
        borderWidth: 3, 
        borderRadius: 60,
        borderColor: '#4F723A',
        width: 61,
        height: 61,
    }
});

export default ProfilePicture;