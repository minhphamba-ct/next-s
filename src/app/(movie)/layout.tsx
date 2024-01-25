import Header from "@/components/header";
import React, { PropsWithChildren } from "react";

const MoviesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <a href="https://nextjs-13-5-with-shadcn.vercel.app/movies?search=under">
        Test
      </a>
      {children}
    </div>
  );
};

export default MoviesLayout;
