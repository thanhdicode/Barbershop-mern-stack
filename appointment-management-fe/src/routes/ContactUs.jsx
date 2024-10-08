import BreadcrumbsComponent from "../components/BreadcrumbsComponent/BreadcrumbsComponent";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ContactSection from "../sections/ContactSection/ContactSection";
import BookNowCTASection from "../sections/BookNowCTASection/BookNowCTASection";
import theme from "../styles/theme";

export default function ContactUs() {
  return (
    <>
      <Header />
      <BreadcrumbsComponent />
      <ContactSection />
      <BookNowCTASection backgroundColor={theme.palette.background.custom} />
      <Footer />
    </>
  );
}
