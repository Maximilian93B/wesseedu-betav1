import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the current pathname
  const pathname = cookies().get('next-url')?.value || ''

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="flex min-h-screen bg-black">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 