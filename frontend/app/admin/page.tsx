import RequireRole from "@/components/auth/RequireRole";

export default function AdminPage() {
  return (
    <RequireRole allowedRoles={["admin"]}>
      <main className="mx-auto max-w-daltar px-6 py-24 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-daltar-accent-blue">
          Admin
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-daltar-text-bright">
          Admin dashboard
        </h1>
        <p className="mt-3 text-daltar-text-muted">
          Placeholder — user management and the audit log land in Phase 17.
        </p>
      </main>
    </RequireRole>
  );
}
