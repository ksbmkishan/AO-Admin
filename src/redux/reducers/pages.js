import * as actionTypes from "../action-types"


const initalState={
    askQuestionData: null,
    religionSpiritualityData: null,
    astroMagazineData: null,
    announcementData: null,
    birhatHoroscopeData: null,
    auspiciousTimeData: null,
    dailyPanchangData: null,
    yellowBookData: null,
    remediesNewData: null,
    tetorialsPhotoData: null,
}

const pages=( state = initalState, actions ) =>{
    const {type, payload} = actions

    switch(type){
        case actionTypes.SET_ASK_QUESTION:{
            return{
                ...state,
                askQuestionData:payload
            }
        }
        case actionTypes.SET_ALL_RELIGION_SPRITUALITY:{
            return{
                ...state,
                religionSpiritualityData:payload
            }
        }
        case actionTypes.SET_ALL_ASTRO_MAGAZINE:{
            return{
                ...state,
                astroMagazineData:payload
            }
        }
        case actionTypes.SET_ALL_ANNOUNCEMENT:{
            return{
                ...state,
                announcementData:payload
            }
        }
        case actionTypes.SET_ALL_BIRHAT_HOROSCOPE:{
            return{
                ...state,
                birhatHoroscopeData:payload
            }
        }
        case actionTypes.SET_ALL_AUSPICIOUS_TIME:{
            return{
                ...state,
                auspiciousTimeData:payload
            }
        }
        case actionTypes.SET_ALL_DAILY_PANCHANG:{
            return{
                ...state,
                dailyPanchangData:payload
            }
        }
        case actionTypes.SET_ALL_YELLOW_BOOK:{
            return{
                ...state,
                yellowBookData:payload
            }
        }
        // case actionTypes.SET_ALL_REMEDIES_NEW:{
        //     return{
        //         ...state,
        //         remediesNewData:payload
        //     }
        // }
        case actionTypes.SET_APP_TUTORIALS:{
            return{
                ...state,
                tetorialsPhotoData:payload
            }
        }
        default: {
            return state;
          }
    }
}


export default pages;