import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

const FeaturedBlogs = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [topBlogs, setTopBlogs] = useState([]);
    
    const [sorting, setSorting] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/blog")
      .then((res) => {
        const blogs = res.data;
        const top10Blog = blogs
          .map((blog) => ({
            ...blog,
            descriptionWordCount:
              blog.description?.trim().split(" ").length || 0,
          }))
          .sort((a, b) => b.descriptionWordCount - a.descriptionWordCount)
          .slice(0, 10);

        setAllBlogs(blogs);
        setTopBlogs(top10Blog);
      })
      .catch(() => {
        toast.error("Error fetching blogs");
        setTopBlogs([]);
      });
  }, []);

  const data = useMemo(() => topBlogs ?? [], [topBlogs]);

 const columns = useMemo(() => [
  {
    header: 'Image',
    accessorKey: 'image_url',
    enableSorting: false,
    cell: ({ getValue }) => (
      <img
        src={getValue()}
        alt="blog"
        className="w-20 h-12 object-cover rounded"
      />
    ),
  },
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Category',
    accessorKey: 'category',
  },
], []);



const table = useReactTable({
  data,
  columns,
  state: { sorting },
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(),
  getCoreRowModel: getCoreRowModel(),
});


  return (
    <div className="my-8">
      <table className="min-w-full divide-y text-left">
        <thead className="bg-gray-100">
  {table.getHeaderGroups().map(headerGroup => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map(header => (
        <th
          key={header.id}
          className="px-4 py-2 font-medium text-gray-600 cursor-pointer select-none"
          onClick={header.column.getToggleSortingHandler()}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: <MdArrowDropUp size={22} className="inline "/>,
            desc: <MdArrowDropDown size={22} className="inline"/>,
          }[header.column.getIsSorted()] ?? ''}
        </th>
      ))}
    </tr>
  ))}
</thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-400">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 bg-gray-100">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default FeaturedBlogs;
