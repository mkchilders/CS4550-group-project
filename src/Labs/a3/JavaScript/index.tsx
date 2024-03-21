import BooleanVariables from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";
import VariablesAndConstants from "./variables/VariablesAndConstants";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import ArrowFunctions from "./conditionals/ArrowFunctions";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import JsonStringify from "./json/JsonStringify";
import TemplateLiterals from "./string/TemplateLiterals";
import House from "./json/House";
import Spreading from "./json/Spreading";
import Destructing from "./json/Destructing";
import FunctionDestructing from "./json/FunctionDestructing";

function JavaScript() {
    console.log('Hello World!');
    return(
       <div>
          <h1>JavaScript</h1>
          <VariablesAndConstants/>
          <VariableTypes/>
          <BooleanVariables/>
          <IfElse/>
          <TernaryOperator/>
          <ArrowFunctions/>
          <WorkingWithFunctions/>
          <WorkingWithArrays/>
          <JsonStringify/>
          <TemplateLiterals/>
          <House/>
          <Spreading/>
          <Destructing/>
          <FunctionDestructing/>
       </div>
    );
 }
 export default JavaScript;