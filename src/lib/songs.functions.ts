import { createServerFn } from "@tanstack/react-start";

export type Song = { id: string; title: string; artist: string; genre: string };

const SONGS: Song[] = [
  { id: "kJQP7kiw5Fk", title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee", genre: "Latin" },
  { id: "JGwWNGJdvx8", title: "Shape of You", artist: "Ed Sheeran", genre: "Pop" },
  { id: "OPf0YbXqDm0", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", genre: "Funk" },
  { id: "9bZkp7q19f0", title: "Gangnam Style", artist: "PSY", genre: "K-Pop" },
  { id: "RgKAFK5djSk", title: "See You Again", artist: "Wiz Khalifa ft. Charlie Puth", genre: "Hip-Hop" },
  { id: "fJ9rUzIMcZQ", title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock" },
  { id: "djV11Xbc914", title: "Take On Me", artist: "a-ha", genre: "Synth-Pop" },
  { id: "Zi_XLOBDo_Y", title: "Billie Jean", artist: "Michael Jackson", genre: "Pop" },
  { id: "dvgZkm1xWPE", title: "Viva La Vida", artist: "Coldplay", genre: "Rock" },
  { id: "YQHsXMglC9A", title: "Hello", artist: "Adele", genre: "Soul" },
  { id: "7wtfhZwyrcc", title: "Believer", artist: "Imagine Dragons", genre: "Rock" },
  { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up", artist: "Rick Astley", genre: "Pop" },
];

export const getSongs = createServerFn({ method: "GET" }).handler(async () => SONGS);
