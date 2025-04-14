import { View, Text } from "react-native";
import styles from "./historyPage.style";
import HeaderNav from '../nav/HeaderNav';

const HistoryPage = () => {
    return (
        <View style ={styles.viewStyle}>
            <HeaderNav />
            <Text style ={styles.headingStyle}>History Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the history page</Text>
        </View>
    )
}

export default HistoryPage;