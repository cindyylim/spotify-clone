import { useMusicStore } from "@/store/useMusicStore";
import Topbar from "../../components/Topbar";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FeaturedSection from "./FeaturedSection";
import SectionGrid from "./SectionGrid";
import { usePlayerStore } from "@/store/usePlayerStore";
import ArtistsGrid from "./ArtistsGrid";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		fetchArtists,
		fetchSongs,
		isLoading,
		madeForYouSongs,
		trendingSongs,
		featuredSongs,
		artists,
		songs,
	} = useMusicStore();

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
		fetchArtists();
		fetchSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, fetchArtists, fetchSongs]);

	const { initializeQueue } = usePlayerStore();
	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [madeForYouSongs, featuredSongs, trendingSongs, initializeQueue]);

	const filteredSongs = songs.filter((song) =>
		song.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
	);

	return (
		<div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
			<Topbar />
			<ScrollArea className="h-[calc(100vh-180px)]">
				<div className="p-4 sm:p-6">
					<div className="mb-6">
						<SearchBar
							value={searchQuery}
							onChange={setSearchQuery}
							placeholder="Search songs..."
						/>
					</div>

					{debouncedSearchQuery ? (
						<Card className="mb-8">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Music className="size-5 text-emerald-500" />
									Search Results
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow className="hover:bg-zinc-800/50">
											<TableHead className="w-[100px]"></TableHead>
											<TableHead>Title</TableHead>
											<TableHead>Artist</TableHead>
											<TableHead>Duration</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredSongs.map((song) => (
											<TableRow key={song._id} className="group hover:bg-zinc-800/50">
												<TableCell className="w-[100px]">
													<img
														src={song.imageUrl}
														alt={song.title}
														className="w-20 h-20 rounded object-cover group-hover:scale-105 transition-transform"
													/>
												</TableCell>
												<TableCell className="font-medium group-hover:text-emerald-500 transition-colors">
													{song.title}
												</TableCell>
												<TableCell className="group-hover:text-zinc-400 transition-colors">
													{artists.find((a) => a._id === song.artist)?.name || "Unknown Artist"}
												</TableCell>
												<TableCell className="group-hover:text-zinc-400 transition-colors">
													{Math.floor(song.duration / 60)}:
													{(song.duration % 60).toString().padStart(2, "0")}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					) : (
						<>
							<FeaturedSection />
							<div className="space-y-8">
								<SectionGrid
									title="Made For You"
									songs={madeForYouSongs}
									isLoading={isLoading}
								></SectionGrid>
								<SectionGrid
									title="Trending"
									songs={trendingSongs}
									isLoading={isLoading}
								></SectionGrid>
								<ArtistsGrid
									title="Artists"
									artists={artists}
									isLoading={isLoading}
								></ArtistsGrid>
							</div>
						</>
					)}
				</div>
			</ScrollArea>
		</div>
	);
};

export default HomePage;
