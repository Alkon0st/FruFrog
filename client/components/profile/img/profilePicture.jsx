import { Image, StyleSheet, View } from "react-native";

// list of thumbnail images, each mapped to a number
const images = {
    1: require('./1.png'),
}


//takes in a number and exports the <Image> based on selection input
const ProfilePicture = ({selection}) => {

    if (selection >=1 && selection <=8 ) {
        return <View>
            <Image 
                source={images[selection]}
                resizeMode='contain'
                style={styles.img} />
            <View style={styles.outline} />
        </View>
    }

    return <View>
        <Image 
            source={images[1]}
            resizeMode='contain'
            style={styles.img} />
        <View style={styles.outline} />
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
        borderRadius: 30,
        borderColor: '#4F723A',
        width: 61,
        height: 61,
    }
});

export default ProfilePicture;