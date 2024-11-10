import Navbar from "../components/Navbar";
import ExplorePost from "../components/ExplorePost";

export default function Home() {
  return (
    <div>
      <section className="h-screen bg-gray-950 scrollbar-hide overflow-auto">
        
        <ExplorePost/>
      </section>
    </div>
  );
}
