import { Image, StyleSheet } from "react-native";

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
}


//takes in a number and exports the <Image> based on selection input
const PondThumbnail = ({selection, optionalStyle}) => {

    if (selection >=1 && selection <=8 ) {
        return <Image 
            source={images[selection]}
            resizeMode='contain'
            style={[styles.img, optionalStyle]} />
    }

    return <Image 
        source={images[1]}
        resizeMode='contain'
        style={[styles.img, optionalStyle]} />
    
}


const styles = StyleSheet.create({
    img: {
        height: 44,
        width: 44,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#000000',
    }
});

export default PondThumbnail;