import Header from '@/components/home/Header'
import CareerHero from '@/components/career/CareerHero'
import Search from '@/components/career/Search'
import Cards from '@/components/career/Cards'
import Benefits from '@/components/career/Benefits'
import CareerFirstSection from '@/components/career/CareerFirstSection'
import AboveFooterSection from '@/components/home/AboveFooterSection'
import Footer from '@/components/home/Footer'
import ScrollToTopButton from '@/components/home/ScrollToTopButton'

export default function CareerPage() {
  return (
    <>
      <Header />
      <main>
        <CareerHero />
        <CareerFirstSection />
        <Search />
        <Cards />
        <Benefits />
      </main>
      <AboveFooterSection />
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
