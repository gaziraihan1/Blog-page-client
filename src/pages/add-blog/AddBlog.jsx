import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

const AddBlog = () => {
    const {user} = useContext(AuthContext);
    const [category, setCategory] = useState('');
    console.log(category)
    const handleAddBlog = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        data.email = user.email;
        data.writer_name = user.displayName;
        data.writer_photo = user.photoURL;
        
        axios.post('http://localhost:3000/blog', data).then(res => {
          if(res.data.insertedId) {
            toast.success('Blog added successfully')
          }
        })
        
    }
    return (
        <div className='min-h-[80vh] flex justify-center items-center w-full card my-8'>
            <form className="w-full px-2 bg-base-300 border-gray-500 border py-4 lg:px-4 lg:py-6 rounded" onSubmit={handleAddBlog}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="fieldset border-base-200 rounded-box border p-4">
            <label className="label">Blog Title</label>
            <input
              type="text"
              name="title"
              className="input w-full"
              placeholder="Blog Title"
              required
            />
          </fieldset>
          <fieldset className="fieldset border-base-200 rounded-box border p-4">
            <label className="label">Image URL</label>
            <input
              type="text"
              name="image_url"
              className="input w-full"
              placeholder="Image Url"
              required
            />
          </fieldset>
          <fieldset className="fieldset border-base-200 rounded-box border p-4">
            <label className="label">Category</label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              required
              className="select select-bordered w-full"
            >
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </fieldset>
          <fieldset className="fieldset border-base-200 rounded-box border p-4">
            <label className="label">Short description</label>
            <input
              type="text"
              name="short_description"
              className="input w-full"
              placeholder="Enter short description"
              required
            />
          </fieldset>

          <fieldset className="fieldset border-base-100 rounded-box border p-4 col-span-full">
            <label className="label">Description</label>
            <textarea
              type="text"
              name="description"
              className=" w-full resize-none p-4 border border-gray-500 rounded"
              placeholder="Description"
              resize="none"
              rows="6"
              required
            />
          </fieldset>
        </div>
        <input type="submit" className="btn w-full my-2 btn-primary" value="Add Blog" />
      </form>
      <ToastContainer />
        </div>
    );
};

export default AddBlog;