import { View, Text } from "react-native";
import styles from "./budgetPage.style";
import { SafeAreaView } from "react-native-safe-area-context";

const BudgetPage = () => {
    return (
        <SafeAreaView>
            <View style ={styles.container}>
                <Text style ={styles.headingStyle}>Budget Page</Text>
                <Text style ={styles.textStyle}>This is the placeholder for the Budget page</Text>
                <Text> this section should be the Spending Power</Text>
            </View>

            <View style={styles.container}>
                <Text> This part should be where the graph is</Text>
            </View>

            <View style={styles.container}>
                <Text> This part is where the categories are</Text>
            </View>
        </SafeAreaView>

        
    )
}

export default BudgetPage;