import * as actionTypes from "../action-types"



const initalState={
    numerologyData: null,
    vivahMuhuratData: null,
    mundanMuhuratData:null,
    annaprashanData:null,
}

const appAstrokunj=( state = initalState, actions ) =>{
    const {type, payload} = actions

    switch(type){
        case actionTypes.SET_NUMEROLOGY:{
            return{
                ...state,
                numerologyData:payload
            }
        }

        case actionTypes.SET_VIVAHMUHURAT:{
            return{
                ...state,
                vivahMuhuratData:payload
            }
        }

        case actionTypes.SET_MUNDANMUHURAT:{
            return{
                ...state,
                mundanMuhuratData:payload
            }
        }
        case actionTypes.SET_ANNAPRASHAN:{
            return{
                ...state,
                annaprashanData:payload
            }
        }
        
        
        default: {
            return state;
          }
    }
}


export default appAstrokunj;