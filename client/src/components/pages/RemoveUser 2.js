// import React, { useMutation } from "react";
// import { REMOVE_USER } from "../../utils/mutations";
// import { LINK } from "react-router-dom";

// export default function RemoveUser() {
//   const [removeUser, { error }] = useMutation(REMOVE_USER);

//   const handleRemoveUser = async (userId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await removeUser({
//         variables: { userId },
//       });
//       removeUserId(userId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div>
//         <button className="btn btn-accent">Button</button>
//       </div>
//     </>
//   );
// }
