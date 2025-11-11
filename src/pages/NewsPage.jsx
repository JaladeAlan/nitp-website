import NewsList from "../components/news/NewsList";

export default function NewsPage() {
  return (
   <div className="max-w-6xl mx-auto px-6">
      {/* News List */}
      <section>
        <NewsList />
      </section>
    </div>
  );
}
