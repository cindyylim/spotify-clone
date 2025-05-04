import { useAuthStore } from "@/store/useAuthStore";
import { Music } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "./Header";
import DashboardStats from "./DashboardStats";
import { TabsContent } from "@radix-ui/react-tabs";
import SongsTabContent from "./SongsTabsContent";
import AlbumsTabContent from "./AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/store/useMusicStore";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;
  const { fetchStats, fetchAlbums, fetchSongs } = useMusicStore();
  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 via-zinc-900 to-black text-zinc-100 p-8">
      <Header />
      <DashboardStats />
      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-100">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-200"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-200"
          >
            <Music className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
