import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function GetImageId({ file }: { file: string }) {
  const getImageId = useQuery(api.data.getImageId, {
    query: `${file}`,
  });
  return (
    <Link
      href={`${getImageId}`}
      target="_blank"
      className=" text-blue-300 underline"
    >
      Download
    </Link>
  );
}
