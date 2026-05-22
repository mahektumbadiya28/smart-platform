import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }

// export default ProtectedRoute;

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PublicRoute;