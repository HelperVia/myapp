export const Logout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });
  const response = await res.json();
  if (response?.success) {
    return true;
  }
  return false;
};
