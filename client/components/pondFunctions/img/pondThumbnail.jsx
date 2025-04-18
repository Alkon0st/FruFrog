import { Image, StyleSheet } from "react-native";

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

const Thumbnail = ({selection}) => {

    if (selection >=1 && selection <=8 ) {
        return <Image 
            source={images[selection]}
            resizeMode='contain'
            style={styles.img} />
    }

    return <Image 
        source={images[1]}
        resizeMode='contain'
        style={styles.img} />
    
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

export default Thumbnail;