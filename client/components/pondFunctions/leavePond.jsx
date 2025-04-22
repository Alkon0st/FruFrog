import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// change current pond name
const LeavePond = ({ 
    visible,
    onClose
    }) => {

    return (
        <Modal 
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
        transparent = {true}
        >
            <View style={styles.modalBackground}>
            <LinearGradient
                colors = {['#B2E196','#FAFFD9']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.header}> Are you sure? </Text>
                    <Text style={styles.text}>You can not rejoin this Pond unless you are given another invite.</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                        style={[styles.button, styles.buttonCancel]}
                        onPress={onClose} >
                            <Text style={styles.buttonText}> No, take me back! </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.button, styles.buttonLeave]}
                        >
                            <Text style={styles.buttonText}> Yes, I am sure. </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: 'rgba(179, 228, 183, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        height: 228,
        width: 369,
        paddingHorizontal: 20,
        borderRadius: 6,
        borderColor: '#AEAEAE',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingTop: '10px',
    },
    button: {
        margin: 5,
        padding: 10,
        width: 152,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttonCancel: {
        backgroundColor: '#FF6060',
        borderColor: '#590000',
    },
    buttonLeave: {
        backgroundColor: '#85BB65',
        borderColor: '#4F723A',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlign: 'center', 
    }
});

export default LeavePond;