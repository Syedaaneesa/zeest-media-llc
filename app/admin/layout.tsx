import { AdminPressProvider } from "@/context/AdminPressReleases"

const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <AdminPressProvider>
      {children}
    </AdminPressProvider>
  )
}

export default layout