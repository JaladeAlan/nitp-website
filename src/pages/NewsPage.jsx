import NewsList from "../components/news/NewsList";

export default function NewsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">News & Media</h1>
      <p>Latest stories, press releases, and thought leadership articles.</p>
      <NewsList />
    </div>
  );
}
