import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { Artist } from "@/types";
import { Link } from "react-router-dom";

type ArtistsGridProps = {
  title: string;
  artists: Artist[];
  isLoading: boolean;
};

const ArtistsGrid = ({ artists, title, isLoading }: ArtistsGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Show all
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {artists.map((artist) => (
          <div
            key={artist._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <Link
              to={`/artist/${artist._id}`}
              className="hover:text-emerald-500"
            >
              {artist.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsGrid;
