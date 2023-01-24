import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "./Search"
import Poster from "./Poster";
import Track from "./Track";

function Body({ chooseTrack, spotifyApi }){
    const {data: session} = useSession();
    const { accessToken } = session;
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    // Set Access Token
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
      }, [accessToken]);


    // Search  
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
    
        let cancel = false;
    
        spotifyApi.searchTracks(search).then((res) => {
          if (cancel) return;
          setSearchResults(
            res.body.tracks.items.map((track) => {
              return {
                id: track.id,
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: track.album.images[0].url,
               popularity: track.popularity,
            };
        })
        );
    });
    
      return () => (cancel = true);
    }, [search, accessToken]);  


     // New Releases
    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.getNewReleases().then((res) => {
        setNewReleases(
            res.body.albums.items.map((track) => {
            return {
                id: track.id,
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: track.images[0].url,
            };
            })
        );
        });
    }, [accessToken]);

    return (
        <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
          <Search search={search} setSearch={setSearch} />
          <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
            {searchResults.length === 0
              ? newReleases
                  .slice(0, 4)
                  .map((track) => (
                    <Poster
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(0, 4)
                  .map((track) => (
                    <Poster
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
    
          <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
            {/* Tracks */}
            <div className="w-full pr-11">
              <h2 className="text-white font-bold mb-3">
                {searchResults.length === 0 ? "New Releases" : "Tracks"}
              </h2>
              <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[1100px]">
                {searchResults.length === 0
                  ? newReleases
                      .slice(4, newReleases.length)
                      .map((track) => (
                        <Track
                          key={track.id}
                          track={track}
                          chooseTrack={chooseTrack}
                        />
                      ))
                  : searchResults
                      .slice(4, searchResults.length)
                      .map((track) => (
                        <Track
                          key={track.id}
                          track={track}
                          chooseTrack={chooseTrack}
                        />
                      ))}
              </div>
            </div>
          </div>
        </section>
      );
}

export default Body