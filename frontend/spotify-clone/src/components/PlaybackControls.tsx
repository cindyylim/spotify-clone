import { usePlayerStore } from "@/store/usePlayerStore";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, SkipBack, SkipForward, Play, Pause, Repeat, Shuffle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PlaybackControls = () => {
	const {
		currentSong,
		isPlaying,
		isShuffled,
		repeatMode,
		volume,
		progress,
		duration,
		setIsPlaying,
		toggleShuffle,
		toggleRepeat,
		setVolume,
		setProgress,
		setDuration,
		playNext,
		playPrevious,
		resetProgress,
	} = usePlayerStore();

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [wasPlaying, setWasPlaying] = useState(false);

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio();
		}

		const audio = audioRef.current;

		const handleTimeUpdate = () => {
			if (!isDragging) {
				setProgress(audio.currentTime);
			}
		};

		const handleLoadedMetadata = () => {
			setDuration(audio.duration);
		};

		const handleEnded = () => {
			if (repeatMode === "one") {
				// Reset progress and restart the song
				resetProgress();
				audio.currentTime = 0;
				audio.play();
			} else {
				playNext();
			}
		};

		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("loadedmetadata", handleLoadedMetadata);
		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [setProgress, setDuration, playNext, repeatMode, resetProgress, isDragging]);

	useEffect(() => {
		if (!audioRef.current) return;

		if (currentSong) {
			audioRef.current.src = currentSong.audioUrl;
			if (isPlaying) {
				audioRef.current.play();
			}
		}
	}, [currentSong, isPlaying]);

	useEffect(() => {
		if (!audioRef.current) return;
		audioRef.current.volume = volume;
	}, [volume]);

	const handlePlayPause = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (value: number[]) => {
		setVolume(value[0]);
	};

	const handleProgressChange = (value: number[]) => {
		if (!audioRef.current) return;
		const newTime = value[0];
		setProgress(newTime);
		// Only update audio time when not dragging
		if (!isDragging) {
			audioRef.current.currentTime = newTime;
		}
	};

	const handleProgressMouseDown = () => {
		if (!audioRef.current) return;
		setWasPlaying(!audioRef.current.paused);
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		}
		setIsDragging(true);
	};

	const handleProgressMouseUp = () => {
		setIsDragging(false);
		if (audioRef.current) {
			audioRef.current.currentTime = progress;
			if (wasPlaying) {
				audioRef.current.play();
				setIsPlaying(true);
			}
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<div className="flex flex-col gap-4 p-4 bg-zinc-900 rounded-lg">
			<div className="flex items-center gap-2">
				<div
					className="flex-1"
					onMouseDown={handleProgressMouseDown}
					onMouseUp={handleProgressMouseUp}
				>
					<Slider
						value={[progress]}
						max={duration}
						step={1}
						onValueChange={handleProgressChange}
						className="w-full"
					/>
				</div>
				<div className="text-sm text-zinc-400 w-16 text-right">
					{formatTime(progress)} / {formatTime(duration)}
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleShuffle}
						className={isShuffled ? "text-emerald-500" : "text-zinc-400"}
					>
						<Shuffle className="size-5" />
					</Button>
					<Button variant="ghost" size="icon" onClick={playPrevious}>
						<SkipBack className="size-5" />
					</Button>
					<Button variant="ghost" size="icon" onClick={handlePlayPause}>
						{isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
					</Button>
					<Button variant="ghost" size="icon" onClick={playNext}>
						<SkipForward className="size-5" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleRepeat}
						className={`relative ${
							repeatMode === "off"
								? "text-zinc-400"
								: "text-emerald-500"
						}`}
					>
						<Repeat className="size-5" />
						{repeatMode === "one" && (
							<span className="absolute -bottom-1 -right-1 text-xs font-bold">1</span>
						)}
					</Button>
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setVolume(volume === 0 ? 1 : 0)}
					>
						{volume === 0 ? (
							<VolumeX className="size-5" />
						) : (
							<Volume2 className="size-5" />
						)}
					</Button>
					<Slider
						value={[volume]}
						max={1}
						step={0.01}
						onValueChange={handleVolumeChange}
						className="w-24"
					/>
				</div>
			</div>
		</div>
	);
};

export default PlaybackControls;
