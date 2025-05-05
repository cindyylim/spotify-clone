import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/store/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewArtist {
	name: string;
	imageUrl: string;
}

const AddArtistDialog = () => {
	const { fetchArtists } = useMusicStore();
	const [artistDialogOpen, setArtistDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [newArtist, setNewArtist] = useState<NewArtist>({
		name: "",
		imageUrl: "",
	});

	const [imageFile, setImageFile] = useState<File | null>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!imageFile) {
				return toast.error("Please upload an image file");
			}

			const formData = new FormData();
			formData.append("name", newArtist.name);
			formData.append("imageFile", imageFile);

			await axiosInstance.post("/admin/artists", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setNewArtist({
				name: "",
				imageUrl: "",
			});
			setImageFile(null);
			setArtistDialogOpen(false);
			await fetchArtists();
			toast.success("Artist added successfully");
		} catch (error: any) {
			toast.error("Failed to add artist: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={artistDialogOpen} onOpenChange={setArtistDialogOpen}>
			<DialogTrigger asChild>
				<Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
					<Plus className='mr-2 h-4 w-4' />
					Add Artist
				</Button>
			</DialogTrigger>

			<DialogContent className='bg-zinc-100 border-zinc-700 max-h-[80vh] overflow-auto'>
				<DialogHeader>
					<DialogTitle>Add New Artist</DialogTitle>
					<DialogDescription>Add a new artist to your music library</DialogDescription>
				</DialogHeader>

				<div className='space-y-4 py-4'>
					<input
						type='file'
						ref={imageInputRef}
						className='hidden'
						accept='image/*'
						onChange={(e) => setImageFile(e.target.files![0])}
					/>

					{/* image upload area */}
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => imageInputRef.current?.click()}
					>
						<div className='text-center'>
							{imageFile ? (
								<div className='space-y-2'>
									<div className='text-sm text-emerald-500'>Image selected:</div>
									<div className='text-xs text-zinc-400'>{imageFile.name.slice(0, 20)}</div>
								</div>
							) : (
								<>
									<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
										<Upload className='h-6 w-6 text-zinc-400' />
									</div>
									<div className='text-sm text-zinc-400 mb-2'>Upload artist image</div>
									<Button variant='outline' size='sm' className='text-xs'>
										Choose File
									</Button>
								</>
							)}
						</div>
					</div>

					{/* name field */}
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Artist Name</label>
						<Input
							value={newArtist.name}
							onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
							className='bg-zinc-100 border-zinc-700'
							placeholder='Enter artist name'
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => setArtistDialogOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Uploading..." : "Add Artist"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddArtistDialog;
