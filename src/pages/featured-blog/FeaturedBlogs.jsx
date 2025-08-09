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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Make sure to import styles

const FeaturedBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [topBlogs, setTopBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://assignment-11-server-beige.vercel.app/blog")
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
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching blogs");
        setTopBlogs([]);
        setLoading(false);
      });
  }, []);

  const data = useMemo(() => topBlogs ?? [], [topBlogs]);

  const columns = useMemo(
    () => [
      {
        header: "Image",
        accessorKey: "image_url",
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
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
    ],
    []
  );

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
        <thead className="bg-gray-100 dark:bg-base-100">
          <tr>
            {loading
              ? columns.map((_, i) => (
                  <th key={i} className="px-4 py-2 ">
                    
                    <Skeleton height={20} width={100} />
                  </th>
                ))
              : table.getHeaderGroups().map((headerGroup) => (
                  <React.Fragment key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-2 font-medium text-base-content cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <MdArrowDropUp size={22} className="inline" />,
                          desc: <MdArrowDropDown size={22} className="inline" />,
                        }[header.column.getIsSorted()] ?? ""}
                      </th>
                    ))}
                  </React.Fragment>
                ))}
          </tr>
        </thead>

        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-4 py-2">
                      <Skeleton height={20} />
                    </td>
                  ))}
                </tr>
              ))
            : table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-400">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 bg-gray-100 dark:bg-base-100 text-base-content"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
