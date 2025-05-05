import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMusicStore } from "@/store/useMusicStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music } from "lucide-react";

const ArtistDetailsPage = () => {
	const { id } = useParams();
	const { artists, songs, fetchArtists, fetchSongs, isLoading, error } = useMusicStore();

	useEffect(() => {
		fetchArtists();
		fetchSongs();
	}, [fetchArtists, fetchSongs]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-zinc-400">Loading artist details...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-red-400">{error}</div>
			</div>
		);
	}

	const artist = artists.find((a) => a._id === id);
	if (!artist) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-red-400">Artist not found</div>
			</div>
		);
	}

	const artistSongs = songs.filter((song) => song.artist === artist._id);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex items-center gap-4">
						<img
							src={artist.imageUrl}
							alt={artist.name}
							className="w-32 h-32 rounded-full object-cover"
						/>
						<div>
							<CardTitle className="text-3xl">{artist.name}</CardTitle>
							<p className="text-zinc-400 mt-2">
								{artistSongs.length} {artistSongs.length === 1 ? "song" : "songs"}
							</p>
						</div>
					</div>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Music className="size-5 text-emerald-500" />
						Songs
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-zinc-800/50">
								<TableHead className="w-[100px]"></TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Duration</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{artistSongs.map((song) => (
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
										{Math.floor(song.duration / 60)}:
										{(song.duration % 60).toString().padStart(2, "0")}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default ArtistDetailsPage; 