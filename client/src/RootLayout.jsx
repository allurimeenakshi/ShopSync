import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
("use client");
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { CopilotPopup } from "@copilotkit/react-ui";

function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "100vh" }}>
        <Outlet />
        <CopilotKit publicApiKey="ck_pub_4154e36d4373212110414fa1b5b757b8">
          <CopilotPopup
            labels={{
              title: "Flux",
              initial: "Hi! 👋 How can I assist you today?",
            }}
          />
        </CopilotKit>
      </div>
    </div>
  );
}

export default RootLayout;
