"use client";
import { useState, useEffect } from "react";
export default function Index({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("ad");
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
