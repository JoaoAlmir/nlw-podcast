import { type } from 'os';
import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;

}

type PlayerContextData = {
    episodeList: Episode[]
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean
    isShuffling: boolean
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playPrevious: () => void;
    playNext: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
    clearPlayerState: () => void
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsplaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0);
    }


    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsplaying(true);
        console.log("PLAYLIST NO INDEX ", index);
    }

    function togglePlay() {
        setIsplaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)

    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)

    }

    function setPlayingState(state: boolean) {
        setIsplaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

    function playNext() {

        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)


        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }

    }

    function playPrevious() {
        if (hasPrevious)
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)

    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }


    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            isLooping,
            isShuffling,
            toggleLoop,
            togglePlay,
            toggleShuffle,
            setPlayingState,
            playList,
            playPrevious,
            playNext,
            hasPrevious,
            hasNext,
            clearPlayerState,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}