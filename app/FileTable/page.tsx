import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage({ getData }: any) {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={getData} />
    </div>
  );
}
