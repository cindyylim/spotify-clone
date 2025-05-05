import { useMusicStore } from "@/store/useMusicStore";
import Topbar from "../../components/Topbar";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FeaturedSection from "./FeaturedSection";
import SectionGrid from "./SectionGrid";
import { usePlayerStore } from "@/store/usePlayerStore";
import ArtistsGrid from "./ArtistsGrid";
const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchArtists,
    isLoading,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
    artists,
  } = useMusicStore();
  useEffect(()=> {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
    fetchArtists();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
  const {initializeQueue} = usePlayerStore();
  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0){
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [madeForYouSongs, featuredSongs, trendingSongs, initializeQueue]);
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <FeaturedSection />
          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            ></SectionGrid>
            <SectionGrid title="Trending" songs={trendingSongs}isLoading={isLoading}></SectionGrid>
            <ArtistsGrid title="Artists" artists={artists} isLoading={isLoading}></ArtistsGrid>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
