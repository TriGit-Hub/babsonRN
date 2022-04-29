
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';

import { useState, useRef, useEffect } from 'react';
const AddressPickup = ({
    placheholderText,
    fetchAddress
}) => {

    

    const onTouch = () => {
        console.log('hola')
    }
    const ref = useRef();

    useEffect(() => {
        // if(ref.current?.isFocused()){
        //     console.log('focus')
        // }else{
        //     console.log('blur')
        // }
    }, []);

    const onPressAddress = (data, details) => {
        // console.log("details==>>>>", details)
        if(ref.current?.isFocused()){
            console.log('focus')
        }else{
            console.log('blur')
        }
       
        let resLength = details.address_components
        let zipCode = ''

        let filtersResCity = details.address_components.filter(val => {
            if (val.types.includes('locality') || val.types.includes('sublocality')) {
                return val
            }
            if (val.types.includes('postal_code')) {
                let postalCode = val.long_name
                zipCode = postalCode
            }
            return false
        })

        let dataTextCityObj = filtersResCity.length > 0
            ? filtersResCity[0] :
            details.address_components[
            resLength > 1 ? resLength - 2 : resLength - 1
            ];

        let cityText =
            dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
                ? dataTextCityObj.short_name
                : dataTextCityObj.long_name;

        // console.log("zip cod found", zipCode)
        // console.log("city namte", cityText)

        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat, lng, zipCode, cityText)
    }

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={placheholderText}
                onPress={onPressAddress}
                fetchDetails={true}
                 
                  ref={ref}
                query={{
                    key: GOOGLE_MAP_KEY,
                    language: 'en'
                }}
                styles={{
                    textInputContainer: styles.containerStyle,
                    textInput: styles.textInputStyle
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerStyle: {
        backgroundColor: 'white'
    },
    textInputStyle: {
        height: '100%',
        color: 'black',
        fontSize: 16,
        backgroundColor: '#f3f3f3'
    }
});

export default AddressPickup;
