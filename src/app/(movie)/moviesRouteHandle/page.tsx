"use client";

import { revalidateTag } from "next/cache";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

type Movie = {
  title: string;
  year: number;
  thumbnail: string;
  thumbnail_width: number;
  thumbnail_height: number;
};

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>();

  const fetcher = (url: string) => axios.get(url).then((res) => res.data?.data);

  const { data, error } = useSWR("/api/movies", fetcher);

  console.log(data);

  const getMovies = async (search?: string) => {
    const jsonData = await fetch(
      "https://65193f6b818c4e98ac6030e4.mockapi.io/movies",
      {
        next: {
          tags: ["products"],
        },
      }
    );

    const data: Movie[] = await jsonData.json();
    let result = [];

    if (search) {
      result = data.filter((item) =>
        item?.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    setMovies(data);
  };

  useEffect(() => {
    // getMovies();
  }, []);

  return (
    <div className="min-h-screen w-[800px] m-auto mt-10">
      {/* <SearchBar /> */}
      <div className="grid grid-cols-4 gap-8 mt-10">
        {data?.map((data: any, index: any) => {
          return (
            <div key={index} className="flex flex-col justify-start">
              <div className="h-[280px]">
                <Image
                  src={data?.thumbnail}
                  className="w-full max-h-[280px]"
                  width={data?.thumbnail_width ?? 100}
                  height={data?.thumbnail_height ?? 100}
                  alt="xxx"
                />
              </div>
              <p>{`${data?.title} - ${data?.year}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
