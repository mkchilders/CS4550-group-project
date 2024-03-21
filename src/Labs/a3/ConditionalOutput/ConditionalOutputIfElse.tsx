const ConditionalOutputIfElse = () => {
    const loggedIn = true;
    if(loggedIn) {
      return (<h3>Welcome If Else</h3>);
    } else {
      return (<h3>Please login If Else</h3>);
    }
   };
   export default ConditionalOutputIfElse;