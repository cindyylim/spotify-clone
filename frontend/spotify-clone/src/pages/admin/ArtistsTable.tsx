import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/store/useMusicStore";
import { Music, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ArtistsTable = () => {
	const { artists, fetchArtists, deleteArtist } = useMusicStore();

	useEffect(() => {
		fetchArtists();
	}, [fetchArtists]);

	return (
		<Table>
			<TableHeader>
				<TableRow className='hover:bg-zinc-800/50'>
					<TableHead className='w-[60px]'></TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Songs</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{artists.map((artist) => (
					<TableRow key={artist._id} className='hover:bg-zinc-800/50'>
						<TableCell>
							<img src={artist.imageUrl} alt={artist.name} className='w-10 h-10 rounded object-cover' />
						</TableCell>
						<TableCell>
							<Link to={`/artist/${artist._id}`} className="hover:text-emerald-500">
								{artist.name}
							</Link>
						</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1'>
								<Music className='h-4 w-4' />
								{artist.songs.length} {artist.songs.length === 1 ? "song" : "songs"}
							</span>
						</TableCell>
						<TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => deleteArtist(artist._id)}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default ArtistsTable;