import { useMusicStore } from "@/store/useMusicStore";
import Topbar from "../../components/Topbar";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FeaturedSection from "./FeaturedSection";
import SectionGrid from "./SectionGrid";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
  } = useMusicStore();
  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good afternoon
          </h1>
          <FeaturedSection />
          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            ></SectionGrid>
            <SectionGrid title="Trending" songs={trendingSongs}isLoading={isLoading}></SectionGrid>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
