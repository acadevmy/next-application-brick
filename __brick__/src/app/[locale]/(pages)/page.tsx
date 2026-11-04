import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Button } from "@/components/UI/Atoms/Button";
import { Typography } from "@/components/UI/Atoms/Typography";
import { Stack } from "@/components/UI/Layout/Stack";
import { SectionHeading } from "@/components/UI/Molecules/SectionHeading";
import { ContentSection, PageHeaderSection } from "@/components/UI/Sections";
import { Link } from "@/i18n/navigation";
import { localizePath } from "@/i18n/paths";
import { getSeoMetadata } from "@/lib/seo";
import { CONTACT_PATH, HOMEPAGE_PATH } from "@/lib/site/routes";

const FEATURE_KEYS = [
  "homeFeatureDesignSystem",
  "homeFeatureI18n",
  "homeFeatureSeo",
  "homeFeatureForms",
  "homeFeatureCache",
  "homeFeatureSentry",
  "homeFeatureData",
  "homeFeatureUx",
  "homeFeatureQuality",
  "homeFeatureEnv",
] as const;

export const generateMetadata = async (): Promise<Metadata | null> => {
  const t = await getTranslations();

  return getSeoMetadata({
    defaultSeoObj: {
      title: t("homeMetaTitle"),
      description: t("homeIntro"),
      canonicalUrl: localizePath(HOMEPAGE_PATH, await getLocale()),
    },
  });
};

const HomePage = async () => {
  const t = await getTranslations();

  return (
    <>
      <PageHeaderSection
        title={t("homeTitle")}
        titleAs="h1"
        pretitle={t("homePretitle")}
      >
        {t("homeIntro")}
      </PageHeaderSection>

      <ContentSection
        width="default"
        heading={<SectionHeading title={t("homeFeaturesTitle")} titleAs="h2" />}
      >
        <Stack asChild gap="sm">
          <ul className="list-disc pl-5">
            {FEATURE_KEYS.map((key) => (
              <Typography key={key} variant="body-1" asChild>
                <li>{t(key)}</li>
              </Typography>
            ))}
          </ul>
        </Stack>
        <div>
          <Button asChild size="lg">
            <Link href={CONTACT_PATH}>{t("homeContactCta")}</Link>
          </Button>
        </div>
      </ContentSection>
    </>
  );
};

export default HomePage;
