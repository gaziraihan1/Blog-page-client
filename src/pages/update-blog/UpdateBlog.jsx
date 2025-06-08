import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useUpdateApi from './useUpdateApi';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import useUpdateBlogApi from './useUpdateBlogApi';

const UpdateBlog = () => {
  const { id } = useParams();
  const { detailsUpdateApi } = useUpdateApi();
  const [data, setData] = useState({});
  const [category, setCategory] = useState("");
  const {user} = useContext(AuthContext);

  const { updateApi } = useUpdateBlogApi()
  useEffect(() => {
    if (id) {
      detailsUpdateApi(id)
        .then((res) => {
          setData(res);
          setCategory(res.category);
        })
        .catch((err) => console.error("Error fetching details:", err));
    }
  }, [id, detailsUpdateApi]);

  const handleUpdateBlog = async(e) => {
    e.preventDefault();
    const form = e.target;

    const updatedBlog = {
      title: form.title.value,
      image_url: form.image_url.value,
      category: category,
      short_description: form.short_description.value,
      description: form.description.value,
    };
    
    const result = await updateApi(id, updatedBlog);
    
    if(result.modifiedCount){
        toast.success('Blog Updated Successful.')
    }
    else{
        toast.error('You didnt update the blog!')
    }
    
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center w-full card my-8">
      <form
        className="w-full px-2 bg-base-300 border-gray-500 border py-4 lg:px-4 lg:py-6 rounded"
        onSubmit={handleUpdateBlog}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="fieldset border-gray-400 rounded-box border p-4">
            <label className="label">Blog Title</label>
            <input
              type="text"
              name="title"
              className="input w-full"
              placeholder="Blog Title"
              required
              defaultValue={data.title}
            />
          </fieldset>
          <fieldset className="fieldset border-gray-400 rounded-box border p-4">
            <label className="label">Image URL</label>
            <input
              type="text"
              name="image_url"
              className="input w-full"
              placeholder="Image Url"
              required
              defaultValue={data.image_url}
            />
          </fieldset>
          <fieldset className="fieldset border-gray-400 rounded-box border p-4">
            <label className="label">Category</label>
            <select
              name="category"
              className="select select-bordered w-full"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </fieldset>
          <fieldset className="fieldset border-gray-400 rounded-box border p-4">
            <label className="label">Short description</label>
            <input
              type="text"
              name="short_description"
              className="input w-full"
              placeholder="Enter short description"
              required
              defaultValue={data.short_description}
            />
          </fieldset>
          <fieldset className="fieldset border-gray-400 rounded-box border p-4 col-span-full">
            <label className="label">Description</label>
            <textarea
              name="description"
              className="w-full resize-none p-4 border border-gray-300 bg-white rounded"
              placeholder="Description"
              rows="6"
              required
              defaultValue={data.description}
            />
          </fieldset>
            <fieldset className="fieldset border-gray-400 rounded-box border p-4">
            <label className="label">Email</label>
            <input
              type="text"
              className="input w-full"
              disabled
              value={user.email}
            />
          </fieldset>
          <fieldset className="fieldset border-gray-400 rounded-box border p-4">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              value={user.displayName}
              disabled
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn w-full my-2 btn-primary"
          value="Update Blog"
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateBlog;
