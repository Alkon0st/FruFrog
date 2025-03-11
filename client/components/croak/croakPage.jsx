import { View, Text } from "react-native";
import styles from "./croakPage.style";

const CroakPage = () => {
    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Croak Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the Croak page</Text>
        </View>
    )
}

export default CroakPage;