import { revalidateTag } from "next/cache";
import Image from "next/image";
import SearchBar from "./search";

type Movie = {
  title: string;
  year: number;
  thumbnail: string;
  thumbnail_width: number;
  thumbnail_height: number;
};

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

  if (search) {
    return data.filter((item) =>
      item?.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return data;
};

const Movies = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search =
    typeof searchParams.search === "string" ? searchParams?.search : undefined;

  const data = await getMovies(search);

  return (
    <div className="min-h-screen w-[800px] m-auto mt-10">
      <SearchBar />
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
