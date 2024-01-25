"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const navigate = useRouter();

  return (
    <div className="flex flex-row items-center justify-between">
      <Label>
        <h5>Movies</h5>
      </Label>
      <Input
        className="w-[500px]"
        onChange={(event) => {
          if (event?.target?.value) {
            navigate.push("/movies?search=" + event?.target?.value);
          } else {
            navigate.push("/movies");
          }
        }}
        type="text"
      />
    </div>
  );
};

export default SearchBar;
