import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import Container from "@mui/material/Container";
import Section from "components/Section";
import LegalTerms from "components/LegalTerms";
import LegalPrivacy from "components/LegalPrivacy";

function LegalSection(props) {
  const validSections = {
    "terms-of-service": true,
    "privacy-policy": true,
  };

  const section = validSections[props.section]
    ? props.section
    : "terms-of-service";

  const data = {
    domain: "company.com",
    companyName: "Company",
  };

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Tabs value={section} centered={true}>
        <Link
          href="/legal/terms-of-service"
          passHref={true}
          value="terms-of-service"
        >
          <Tab component="a" label="Terms of Service" />
        </Link>
        <Link
          href="/legal/privacy-policy"
          passHref={true}
          value="privacy-policy"
        >
          <Tab component="a" label="Privacy Policy" />
        </Link>
      </Tabs>
      <Container sx={{ mt: 5 }}>
        {section === "terms-of-service" && <LegalTerms {...data} />}

        {section === "privacy-policy" && <LegalPrivacy {...data} />}
      </Container>
    </Section>
  );
}

export default LegalSection;
