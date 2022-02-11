import { useReducer } from 'react';
import './App.css';
import DigitsButton from './Components/DigitsButton';
import OperationsButton from './Components/OperationsButton.js';


export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATIONS: "choose-operation",
  EVALUATE: "evaluate",
  DELETE_DIGIT: "delete-digit",
  CLEAR: "clear",
}

const initialState = {
  currentOperand: '',
  previousOperand: '',
  operation: '',
  overwrite: false
}

const reducer = (state, {type, payload}) => {
    switch(type) {
      
      case ACTIONS.ADD_DIGIT:
          if (state.overwrite) {
            return {
              ...state,
              currentOperand: payload.digit,
              overwrite: false
            }
          }
          if (payload.digit === "0" && state.currentOperand === "0"){
            return state
          } 
          if (payload.digit === "." && state.currentOperand.includes(".")) {
            return state
          }
          return {
            ...state,
            currentOperand: `${state.currentOperand || ""}${payload.digit}`
          }

      case ACTIONS.CHOOSE_OPERATIONS:
          if(state.currentOperand === null && state.previousOperand === null){
              return state
          }
          if(state.previousOperand === ""){
              return {
                ...state,
                previousOperand: state.currentOperand,
                currentOperand: "",
                operation: payload.operation
              }
          }
          if(state.currentOperand === "") {
              return {
                ...state,
                operation: payload.operation
              }
          }
          return {
            ...state,
            previousOperand: evaluate(state),
            currentOperand: "",
            operation: payload.operation
          }

      case ACTIONS.EVALUATE:
          if(state.operation === "" || state.currentOperand === "" || state.previousOperand === ""){
            return state
          }
          
          return {
            ...state,
            previousOperand: "",
            operation: "",
            currentOperand: evaluate(state),
            overwrite: true
          }
          
      case ACTIONS.DELETE_DIGIT:
          if(state.overwrite){
            return {
              ...state,
              overwrite:false,
              currentOperand: initialState.currentOperand
            }
          } 
          if(state.currentOperand === null) return state
          if(state.currentOperand.length === 1){
            return{
              ...state, 
              currentOperand: initialState.currentOperand
            }
          }
          return {
            ...state,
            currentOperand: state.currentOperand.slice(0, -1)
          }

      case ACTIONS.CLEAR:
          return {initialState}
      default:
          return Error
    }
}

// evaluate function 
const evaluate = (state) => {
  const prev = parseFloat(state.previousOperand)
  const current = parseFloat(state.currentOperand)
  if (isNaN(prev) || isNaN(current)) {
      return ""
  }
  let computation = ""
  switch(state.operation) {
      case "+" :
        computation = prev + current
        break;
      case "-" :
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break
      case "/":
        computation = prev / current
        break
      default: computation = ""
  }
  return computation.toString();
}


function App() {
  const[state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="calculator-grid-container">
      <div className="output">
        <div className="previous-operand">{state.previousOperand} {state.operation}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button onClick={() => dispatch({type:ACTIONS.CLEAR})} className='span-two'>AC</button>
      <button onClick={() => dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>

      <OperationsButton dispatch={dispatch} operation={"/"}/>
      <DigitsButton dispatch={dispatch} digit={"1"} />
      <DigitsButton dispatch={dispatch} digit={"2"} />
      <DigitsButton dispatch={dispatch} digit={"3"} />
      <OperationsButton dispatch={dispatch} operation={"*"}/>
      <DigitsButton dispatch={dispatch} digit={"4"} />
      <DigitsButton dispatch={dispatch} digit={"5"} />
      <DigitsButton dispatch={dispatch} digit={"6"} />
      <OperationsButton dispatch={dispatch} operation={"+"}/>
      <DigitsButton dispatch={dispatch} digit={"7"} />
      <DigitsButton dispatch={dispatch} digit={"8"} />
      <DigitsButton dispatch={dispatch} digit={"9"} />
      <OperationsButton dispatch={dispatch} operation={"-"}/>
      <DigitsButton dispatch={dispatch} digit={"."} />
      <DigitsButton dispatch={dispatch} digit={"0"} />
      <button 
        className='span-two' 
        onClick={() => dispatch({type:ACTIONS.EVALUATE})} 
      >=</button>
    </div>
  );
}

export default App;
