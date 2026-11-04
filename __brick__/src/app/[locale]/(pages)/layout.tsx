import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { PageLayout } from "@/components/UI/Layout/PageLayout";

/** Shell shared by every content page: header, main, footer. */
const PagesLayout = ({ children }: LayoutProps<"/[locale]">) => {
  return (
    <PageLayout header={<AppHeader />} footer={<AppFooter />}>
      {children}
    </PageLayout>
  );
};

export default PagesLayout;
