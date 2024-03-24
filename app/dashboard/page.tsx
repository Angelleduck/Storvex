"use client";

import { Input } from "@/components/ui/input";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "../FileTable/data-table";
import { columns } from "../FileTable/columns";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import UploadButton from "@/components/UploadButton";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";

export default function DashBoard() {
  const [query, setQuery] = useState<string>("");
  const [text, setText] = useState("");
  const { user } = useUser();

  const getData = useQuery(api.data.getData, { query, userId: user?.id });

  return (
    <>
      <div className="my-10 flex justify-center space-x-2">
        <Input
          className="w-[40%] sm:w-[50%]"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          className="flex space-x-2"
          onClick={() => {
            setQuery(text);
          }}
        >
          <Search />
          <span>search</span>
        </Button>
      </div>

      <section className="px-8 sm:mx-11">
        <div className="flex justify-between items-center mb-2">
          <h1>All files</h1>

          <UploadButton />
        </div>

        {getData === undefined && (
          <div className="w-full">
            <div className="border h-[47px] rounded-t-lg"></div>
            <div className="border border-t-0 rounded-b-lg">
              {Array.from({ length: 5 }, (_, i) => i).map((el, i) => (
                <div className="w-full flex gap-2 p-2 " key={i}>
                  <Skeleton className="p-6" />
                  <Skeleton className="w-full" />
                </div>
              ))}
            </div>
          </div>
        )}

        {getData !== undefined && (
          <main className="w-full">
            <DataTable columns={columns} data={getData} />
          </main>
        )}
      </section>
    </>
  );
}
