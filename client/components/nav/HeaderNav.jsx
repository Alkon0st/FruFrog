import * as React from 'react';

// all the pages 
import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'

import styles from './Nav.style';

import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';


export default function HeaderNav() {
      const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

    return (
        // Modal call button for header nav
        <View style={styles.mainView}>
            <TouchableOpacity onPress={() => setIsProfileModalVisible(true)} style={[styles.button, styles.buttonOpen]}>
                <Text>Profile</Text>
            </TouchableOpacity>

            <ProfilePage
            visible={isProfileModalVisible}
            onClose={() => setIsProfileModalVisible(false)} 
            />
        </View>

    );
}
