
export interface Album {
	playCount: number
	playDate: string
	rating: number
	starred: boolean
	starredAt: string
	id: string
	name: string
	embedArtPath: string
	artistId: string
	artist: string
	albumArtistId: string
	albumArtist: string
	allArtistIds: string
	maxYear: number
	minYear: number
	compilation: boolean
	songCount: number
	duration: number
	size: number
	genre: string
	genres: Genre[]
	fullText: string
	orderAlbumName: string
	orderAlbumArtistName: string
	imageFiles: string
	paths: string
	smallImageUrl: string
	mediumImageUrl: string
	largeImageUrl: string
	externalUrl: string
	externalInfoUpdatedAt: string
	createdAt: string
	updatedAt: string
}

export interface Genre {
	id: string
	name: string
}

export interface Song {
	playCount: number
	playDate: string
	rating: number
	starred: boolean
	starredAt?: string
	bookmarkPosition: number
	id: string
	libraryId: number
	path: string
	title: string
	album: string
	artistId: string
	artist: string
	albumArtistId: string
	albumArtist: string
	albumId: string
	hasCoverArt: boolean
	trackNumber: number
	discNumber: number
	year: number
	originalYear: number
	releaseYear: number
	size: number
	suffix: string
	duration: number
	bitRate: number
	sampleRate: number
	channels: number
	genre: string
	genres: Genre2[]
	orderTitle: string
	orderAlbumName: string
	orderArtistName: string
	orderAlbumArtistName: string
	compilation: boolean
	lyrics: string
	rgAlbumGain: number
	rgAlbumPeak: number
	rgTrackGain: number
	rgTrackPeak: number
	createdAt: string
	updatedAt: string
}

export interface Genre2 {
	id: string
	name: string
}

