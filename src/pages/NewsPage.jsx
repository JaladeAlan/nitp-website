import NewsList from "../components/news/NewsList";
import SEOWrapper from "../components/common/SEOWrapper";

export default function NewsPage() {
  return (
    <SEOWrapper
      title="Latest News | NITP Oyo State Chapter"
      description="Stay updated with the latest news, events, and initiatives from the Nigerian Institute of Town Planners (NITP), Oyo State Chapter."
      image="/assets/news-hero.jpg"
      baseUrl="https://nitp-oyo.org"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* News List */}
        <section>
          <NewsList />
        </section>
      </div>
    </SEOWrapper>
  );
}
