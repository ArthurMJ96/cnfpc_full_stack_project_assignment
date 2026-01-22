import { Navigate } from "react-router-dom";
import { Role } from "@shared/enums";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({
  children,
  role,
  guestOnly = false,
}: {
  children: React.ReactNode;
  role?: Role;
  guestOnly?: boolean;
}) => {
  const { isAuthenticated, isAuthor, isAdmin, isSupport } = useAuth();

  if (!guestOnly && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (guestOnly && isAuthenticated) {
    return createError("You are already logged in.");
  }

  if (isAuthenticated && role) {
    switch (role) {
      case Role.AUTHOR:
        if (!isAuthor)
          return createError("You must be an Author to access this page.");
        break;
      case Role.ADMIN:
        if (!isAdmin)
          return createError("You must be an Admin to access this page.");
        break;
      case Role.SUPPORT:
        if (!isSupport)
          return createError("You must be Support staff to access this page.");
        break;

      default:
        break;
    }
  }

  // All checks passed - show the page
  return children;
};

function createError(message: string) {
  return <Navigate to="/error" replace state={{ error: { message } }} />;
}

export default ProtectedRoute;
