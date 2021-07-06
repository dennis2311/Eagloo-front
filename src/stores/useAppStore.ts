import Peer from "peerjs";
import create from "zustand";

interface IVideoStreams {
    stream: string;
}

interface IStore {
    myStream?: MediaStream;
    videoStreams?: IVideoStreams[];
    onSaveRooms: (e: IVideoStreams[]) => void;
    onSaveMyStream: (e?: MediaStream) => void;
}

export const useAppStore = create<IStore>((set) => ({
    myStream: undefined,
    videoStreams: undefined,
    onSaveMyStream: (stream) => set({ myStream: stream }),
    onSaveRooms: (stream: IVideoStreams[]) => set({ videoStreams: stream }),
}));
