import { create } from "zustand";
import { Song } from "@/types";

interface PlayerState {
	currentSong: Song | null;
	queue: Song[];
	isPlaying: boolean;
	isShuffled: boolean;
	repeatMode: "off" | "one" | "all";
	volume: number;
	progress: number;
	duration: number;
	setCurrentSong: (song: Song | null) => void;
	setQueue: (songs: Song[]) => void;
	setIsPlaying: (isPlaying: boolean) => void;
	toggleShuffle: () => void;
	toggleRepeat: () => void;
	setVolume: (volume: number) => void;
	setProgress: (progress: number) => void;
	setDuration: (duration: number) => void;
	initializeQueue: (songs: Song[]) => void;
	playNext: () => void;
	playPrevious: () => void;
	resetProgress: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
	currentSong: null,
	queue: [],
	isPlaying: false,
	isShuffled: false,
	repeatMode: "off",
	volume: 1,
	progress: 0,
	duration: 0,
	setCurrentSong: (song) => set({ currentSong: song }),
	setQueue: (songs) => set({ queue: songs }),
	setIsPlaying: (isPlaying) => set({ isPlaying }),
	toggleShuffle: () => {
		const { isShuffled, queue } = get();
		if (isShuffled) {
			// If turning off shuffle, restore original order
			set({ queue: [...queue].sort((a, b) => a._id.localeCompare(b._id)) });
		} else {
			// If turning on shuffle, randomize the queue
			const shuffledQueue = [...queue];
			for (let i = shuffledQueue.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]];
			}
			set({ queue: shuffledQueue });
		}
		set({ isShuffled: !isShuffled });
	},
	toggleRepeat: () => {
		const { repeatMode, isPlaying } = get();
		const nextMode = repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off";
		
		// If switching to repeat one mode, pause the current song
		if (nextMode === "one" && isPlaying) {
			set({ isPlaying: false });
		}
		
		set({ repeatMode: nextMode });
	},
	setVolume: (volume) => set({ volume }),
	setProgress: (progress) => set({ progress }),
	setDuration: (duration) => set({ duration }),
	resetProgress: () => set({ progress: 0 }),
	initializeQueue: (songs) => {
		const { isShuffled } = get();
		if (isShuffled) {
			// If shuffle is on, randomize the new queue
			const shuffledQueue = [...songs];
			for (let i = shuffledQueue.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]];
			}
			set({ queue: shuffledQueue });
		} else {
			set({ queue: songs });
		}
	},
	playNext: () => {
		const { queue, currentSong, repeatMode } = get();
		if (!currentSong) return;

		const currentIndex = queue.findIndex((song) => song._id === currentSong._id);
		
		if (repeatMode === "one") {
			// Restart current song
			set({ progress: 0 });
			return;
		}

		if (currentIndex === -1) return;

		if (currentIndex === queue.length - 1) {
			// End of queue
			if (repeatMode === "all") {
				// Start from beginning
				set({ currentSong: queue[0], progress: 0 });
			} else {
				// Stop playback
				set({ isPlaying: false });
			}
		} else {
			// Play next song
			set({ currentSong: queue[currentIndex + 1], progress: 0 });
		}
	},
	playPrevious: () => {
		const { queue, currentSong } = get();
		if (!currentSong) return;

		const currentIndex = queue.findIndex((song) => song._id === currentSong._id);
		if (currentIndex <= 0) return;

		set({ currentSong: queue[currentIndex - 1], progress: 0 });
	},
}));

