import "@radix-ui/themes/styles.css";
import "./App.css";
import { Theme } from "@radix-ui/themes";
import { Synapse } from "./Synapse";
import { ThemeProvider } from "./components/Context/themeContext";
import { Layout } from "./components/Layouts/Layout";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider>
      <Theme appearance="dark">
        <Layout>
          <Toaster richColors />
          <Synapse />
        </Layout>
      </Theme>
    </ThemeProvider>
  );
}

export default App;
