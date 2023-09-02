import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const HeadNav = () => {
  const location = useLocation();

  // Determine if the current pathname is "/login"
  const isLogin = location.pathname === "/login";

  return (
    <>
      <Tabs align="end" variant="enclosed" defaultIndex={isLogin ? 0 : 1}>
        <TabList>
          <Link to={"/login"}>
            <Tab>Login</Tab>
          </Link>

          <Link to={"/sign-up"}>
            <Tab>Sign-up</Tab>
          </Link>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default HeadNav;
