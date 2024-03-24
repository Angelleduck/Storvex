"use client";

import DeleteButton from "@/components/DeleteButton";
import FileName from "@/components/FileName";
import GetImageId from "@/components/GetImageId";

import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";

export const columns = [
  {
    accessorKey: "type",
    cell: ({ row }: any) => {
      const dataType: string = row.original.type.split("/")[1];
      return (
        <div className="w-10">
          {/* @ts-ignore */}
          <FileIcon extension={dataType} {...defaultStyles[dataType]} />
        </div>
      );
    },
  },
  {
    header: "Filename",
    cell: ({ row }: any) => <FileName file={row.original} />,
  },
  {
    header: "Date Added",
    cell: ({ row }: any) =>
      new Date(row.original._creationTime).toLocaleDateString(),
  },
  {
    header: "size",
    cell: ({ row }: any) => prettyBytes(row.original.size),
  },

  {
    header: "Download",
    cell: ({ row }: any) => {
      const DataId = row.original.fileId;
      return <GetImageId file={DataId} />;
    },
  },
  {
    header: "Delete",
    cell: ({ row }: any) => <DeleteButton row={row.original} />,
  },
];
