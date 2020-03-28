import React, { useState } from "react";

import SingUpForm from "./singUpForm";
import SingInForm from "./singInForm";
// const Authentication = params => {
//   const [isSingIn, setSingIn] = useState(true);
//   return (
//     <div>
//       <h2>Log</h2>
//       <h1>Sing in</h1>
//       <singInForm />
//       <p>create new account</p>
//     </div>
//   );
// };

const Authentication = params => {
  const [isSingIn, setSingIn] = useState(true);
  return (
    <div>
      {isSingIn ? (
        <>
          <singInForm />
        </>
      ) : (
        <>
          <singUpForm />
        </>
      )}
    </div>
  );
};

export default Authentication;
