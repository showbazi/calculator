import React from 'react'
import { ACTIONS } from '../App'

const OperationsButton = ({dispatch, operation}) => {
    return (
        <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATIONS, payload:{operation}})}>{operation}</button>
    )
}

export default OperationsButton
