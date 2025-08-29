"use client";

import { useState } from "react";
import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";

export default function AITabsWrapper() {
  const [activeTab, setActiveTab] = useState("webchat");

  return (
    <>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <TabContent activeTab={activeTab} />
    </>
  );
}
