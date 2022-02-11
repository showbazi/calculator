import React from 'react'
import { ACTIONS } from '../App'

const DigitsButton = ({dispatch, digit}) => {
    return (
        <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload:{digit} })}>{digit}</button>
    )
}

export default DigitsButton
