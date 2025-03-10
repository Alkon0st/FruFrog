import { View, Text } from "react-native";
import styles from "./budget.style";

const BudgetPage = () => {
    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Budget Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the home page</Text>
        </View>
    )
}

export default BudgetPage;