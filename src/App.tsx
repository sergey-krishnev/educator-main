import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { SiteHeader } from "./components/navigation/site-header";
import { AppSidebar } from "./components/navigation/app-sidebar";
import CreateUserProgress from "./features/user/create-user-progress";
import NovelCore from "./features/quests/novel-core";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="[--header-height:calc(theme(spacing.14))]">
        <CreateUserProgress />
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              {/* <div className="flex-1 overflow-y-auto">
                <div className="center flex h-full flex-col items-center justify-center p-4">
                  <h1 className="text-2xl font-bold">Content is not selected</h1>
                  <p className="mt-2 text-gray-600">Select theory or quest.</p>
                </div>
              </div> */}
              <div className="flex-1 overflow-y-auto">
                <NovelCore />
                {/* <VoiceRecorder /> */}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>

  )
}

export default App
