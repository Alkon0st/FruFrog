import {StyleSheet, Text, View, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';


import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function CreatePond () {
    const navigation = useNavigation();

    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Create Pond Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the history page</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const Stack = createNativeStackNavigator();

function HomePage() {
    const navigation = useNavigation();

    //for sample options
    const options = [
        {value: '1', label: 'option 1'},
        {value: '2', label: 'option 2'},
        {value: '3', label: 'option 3'},
        {value: '4', label: 'option 4'},
    ]

    //for form
    const {
        control, 
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            groupName: "",
        },
    })

    //takes input data and puts it in console
    const onSubmit = (data) => console.log(data)

    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Home Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the home page</Text>            
            <Button title = 'Create Pond(WIP)' onPress={() => navigation.navigate(CreatePond)} />
            
            
            <Text style={styles.headingStyle}>Start of Create Pond Form</Text>
            <Text style ={styles.textStyle}>Enter Pond Name:</Text>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Pond Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="groupName"
            />
            {errors.groupName && <Text>This is required.</Text>}
            
            <Text style ={styles.textStyle}>Choose Pond Thumbnail:</Text>
            <Controller
                control={control}
                name="thumbnail"
                render= {({ field: {onChange, onBlur, value} }) => (
                    <Select
                        options={options}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                    />
            )} />
            {errors.thumbnail && <Text>This is required.</Text>}

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        display: 'flex',
        justifyConten: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textStyle: {
        fontSize: 20,
        color: '#309c61',
    },
    headingStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomePage


{/* <Stack.Navigator>
<Stack.Screen
name="Create Pond"
component={CreatePond}
options={{ headerShown: false}}
/>
</Stack.Navigator> */}