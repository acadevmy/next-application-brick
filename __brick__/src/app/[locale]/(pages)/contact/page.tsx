import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { FormContact } from "@/components/FormContact";
import { ContentSection, PageHeaderSection } from "@/components/UI/Sections";
import { localizePath } from "@/i18n/paths";
import { getSeoMetadata } from "@/lib/seo";
import { CONTACT_PATH } from "@/lib/site/routes";

export const generateMetadata = async (): Promise<Metadata | null> => {
  const t = await getTranslations();

  return getSeoMetadata({
    defaultSeoObj: {
      title: t("contactMetaTitle"),
      description: t("contactIntro"),
      canonicalUrl: localizePath(CONTACT_PATH, await getLocale()),
    },
  });
};

const ContactPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <PageHeaderSection title={t("contactTitle")} titleAs="h1">
        {t("contactIntro")}
      </PageHeaderSection>
      <ContentSection width="narrow">
        <FormContact />
      </ContentSection>
    </>
  );
};

export default ContactPage;
