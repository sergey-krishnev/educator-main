import { SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { SiteHeader } from "./components/navigation/site-header";
import { AppSidebar } from "./components/navigation/app-sidebar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>

  )
}

export default App
