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
        {value: 'AAAA', label: 'AAAA'},
        {value: 'Blip@', label: 'Blip@'},
        {value: 'John_Doe1332', label: 'John_Doe1332'},
        {value: 'musclemanRS', label: 'musclemanRS'},
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

            <Controller
                control={control}
                name="usernames"
                render= {({ field: {onChange, onBlur, value} }) => (
                    <Select
                        noOptionsMessage = 'None'
                        options={options}
                        onBlur={onBlur}
                        onChange={onChange}
                        isMulti={true}
                        value={value}
                    />
            )} />


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
        fontSize: 28,
        color: 'DarkGreen',
    },
    headingStyle: {
        fontSize: 30,
        color: 'black',
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