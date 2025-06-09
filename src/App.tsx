import "@radix-ui/themes/styles.css";
import "./App.css";
import { Theme } from "@radix-ui/themes";
import { Synapse } from "./Synapse";
import { AuthProvider } from "./components/Context";
import { ThemeProvider } from "./components/Context/themeContext";
import { Layout } from "./components/Layouts/Layout";

function App() {
  return (
    <Theme appearance="dark">
      <ThemeProvider>
        {/* <AuthProvider> */}
        <Layout>
          <Synapse />
        </Layout>
        {/* </AuthProvider> */}
      </ThemeProvider>
    </Theme>
  );
}

export default App;
