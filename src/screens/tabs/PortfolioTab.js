import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import globalStyle from '../../assets/theme';
import { ContainerView, Text } from '../../components';
import { SET_ACCESS_TOKEN } from '../../redux/actions';
import { getAccessTokenSelector, getCurrentUserSelector } from '../../redux/selectors/loginSelector';
import { removeAccessToken } from '../../Utils/storage';
import { Ionicons, MaterialIcons } from "../../assets/index";
// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
import { uploadAvatarApi } from '../../apis/userLoginApi';
import ImgToBase64 from 'react-native-image-base64';
const PortfolioTab = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUserSelector = useSelector(getCurrentUserSelector);
    const userToken = useSelector(getAccessTokenSelector);
    const [currentUser, setcurrentUser] = useState({})
    const [userAvarta, setuserAvarta] = useState()
    useEffect(() => {
        // console.log(currentUserSelector.ordersHistory);
        if (currentUserSelector === null) {
            logOut();
        }
        else {

            setcurrentUser(currentUserSelector);
            setuserAvarta(currentUserSelector.avatar)
        }
    }, [])
    const logOut = () => {
        removeAccessToken();
        dispatch({ type: SET_ACCESS_TOKEN, payload: '' })
    }

    const selectFile = async () => {

        const res = await DocumentPicker.pick({

            // Provide which type of file you want user to pick
            type: [DocumentPicker.types.images],
            // There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
            pickSingle: true
        });
        // Printing the log realted to the file
        // console.log('res : ' + JSON.stringify(res[0]));
        // Setting the state to show single file attributes
        // setuserAvarta(res[0].uri);
        if (res[0].uri !== null)
            ImgToBase64.getBase64String(res[0].uri)
                .then(base64String => {
                    console.log(base64String);
                    uploadImage(base64String);
                    setuserAvarta(res[0].uri)
                })
                .catch(err => console.log(err));


        // Opening Document Picker to select one file
        // try {

        // } catch (err) {
        //     setuserAvarta(null);
        //     // Handling any exception (If any)
        //     if (DocumentPicker.isCancel(err)) {
        //         // If user canceled the document selection
        //         alert('Canceled');
        //     } else {
        //         // For Unknown Error
        //         alert('Unknown Error: ' + JSON.stringify(err));
        //         throw err;
        //     }
        // }
    };
    const uploadImage = async (uri) => {
        // Check if any file is selected or not
        if (uri != null) {
            // If file selected then create FormData
            // const fileToUpload = uri;
            // const data = new FormData();
            // data.append('name', 'Image Upload');
            // data.append('file_attachment', fileToUpload);
            // Please change file upload URL
            //   let res = await fetch(
            //     'http://localhost/upload.php',
            //     {
            //       method: 'post',
            //       body: data,
            //       headers: {
            //         'Content-Type': 'multipart/form-data; ',
            //       },
            //     }
            //   );
            //   let responseJson = await res.json();
            // console.log(data);
            uploadAvatarApi(uri, userToken)
                .then(res => { console.log(res); })
                .catch(error => { console.log(error); })


            // if (responseJson.status == 1) {
            //     alert('Upload Successful');
            // }
        } else {
            // If no file selected the show alert
            alert('Please Select File first');
        }
    };

    return (
        <ContainerView style={styles.container}>
            <LinearGradient
                colors={['#177899', '#14829b', '#2193b0', '#6dd5ed']}
                start={{ x: 0.0, y: 0 }} end={{ x: 0.25, y: 1.0 }}
                style={{ flex: 1 }}>
                <View style={[styles.generalContainer, styles.avartaContainer]}>
                    {
                        currentUser !== undefined ?
                            <Image
                                source={{ uri: userAvarta }}
                                style={styles.imgAvatar}></Image>
                            : <></>
                    }
                    <TouchableOpacity
                        onPress={() => { selectFile() }}
                        style={{ position: 'absolute', bottom: 0 }}>
                        <MaterialIcons name='add-a-photo' size={30}></MaterialIcons>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('UserProfile') }}
                        style={{ position: 'absolute', right: 0, bottom:   0,}}>
                        <MaterialIcons name='edit' size={30}  color='white' ></MaterialIcons>
                    </TouchableOpacity>
                   
                </View>
            </LinearGradient>
            <View style={[styles.generalContainer, styles.detailContainer]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text label='Name' value={currentUser.name}></Text>
                    <Text label='Gender' value={currentUser.gender ? 'Male' : 'Female'}></Text>
                </View>
                <Text label='Email' value={currentUser.email}></Text>
                <TouchableOpacity onPress={() => { navigation.navigate('OrderScreen') }}>
                    <Text label='' value={'Orders history'}></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    logOut()
                }}>
                    <Text value='Logout'></Text>
                </TouchableOpacity>
            </View>

        </ContainerView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        paddingHorizontal: 0
    },
    generalContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 5
    },
    avartaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    detailContainer: {
        flex: 3,
        padding: 5,
    },
    imgAvatar: {
        width: 120,
        height: 120,
        borderWidth: 5,
        borderColor: globalStyle.primaryColor.color,
        borderRadius: 100,

    },
    textInfor: {
        color: globalStyle.textColor.color,
        fontSize: 25,
        fontWeight: 'bold',

    },
    inforContainer: {

    }
})


export default PortfolioTab;