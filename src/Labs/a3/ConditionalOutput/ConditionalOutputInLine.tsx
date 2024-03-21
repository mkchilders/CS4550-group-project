const ConditionalOutputInline = () => {
    const loggedIn = false;
    return (
      <>
        { loggedIn && <h3>Welcome Inline</h3>      }
        {!loggedIn && <h3>Please login Inline</h3> }
      </>
    );
   };
   export default ConditionalOutputInline;