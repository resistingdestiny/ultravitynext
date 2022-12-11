import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";

function SettingsNav(props) {
  return (
    <Tabs value={props.activeKey} centered={true}>
      <Link href="/settings/general" passHref={true} value="general">
        <Tab component="a" label="General" />
      </Link>
      <Link href="/settings/password" passHref={true} value="password">
        <Tab component="a" label="Password" />
      </Link>
      <Link href="/settings/billing" passHref={true} value="billing">
        <Tab component="a" label="Billing" />
      </Link>
    </Tabs>
  );
}

export default SettingsNav;
