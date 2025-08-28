import { authClient } from '@/lib/auth-client';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session, isPending } = authClient.useSession();

  const navigate = Route.useNavigate();


  useEffect(() => {
    if (session && !isPending) {
      navigate({
        to: "/",
      });
    }
  }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return <Outlet/>
}

