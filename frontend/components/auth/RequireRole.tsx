"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import type { UserRole } from "@/lib/types";

interface RequireRoleProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

// Client-side gate — appropriate here since auth state lives in
// localStorage/AuthContext, not a cookie a server component could read.
// Real protection still happens on the backend (require_role dependency);
// this just avoids flashing protected content at the wrong person.
export default function RequireRole({ allowedRoles, children }: RequireRoleProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace("/");
    }
  }, [isLoading, user, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-daltar-text-muted">Checking access...</p>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // redirect is in-flight
  }

  return <>{children}</>;
}
