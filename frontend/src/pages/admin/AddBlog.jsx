import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { useAppContext } from '../../context';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const { axios } = useAppContext();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState('false');
    
    const generateContent = async () => {
        if (!title.trim()) {
            toast.error('Please enter a blog title first');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post('/api/blog/generate', { prompt: title.trim() });
            
            if (data && data.success) {
                const generatedContent = data.content;
                
                if (quillRef.current) {
                    // Direct HTML insertion
                    quillRef.current.root.innerHTML = generatedContent;
                }
                
                toast.success('Content generated successfully!');
            } else {
                toast.error(data?.message || 'Failed to generate content');
            }
        } catch (error) {
            toast.error('Error generating content. Please try again.');
            console.error('Generate Content error:', error);
        } finally {
            setLoading(false);
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!title.trim() || !subTitle.trim()) {
            toast.error('Please fill in title and subtitle');
            return;
        }

        if (!image) {
            toast.error('Please upload a thumbnail image');
            return;
        }

        const description = quillRef.current?.root.innerHTML;
        if (!description || description === '<p><br></p>' || description.trim() === '') {
            toast.error('Please add blog content');
            return;
        }

        setIsAdding(true);
        
        try {
            const blog = {
                title: title.trim(),
                subTitle: subTitle.trim(),
                description,
                category,
                isPublished: isPublished === 'true'
            };

            const formData = new FormData();
            formData.append('image', image);
            formData.append('blog', JSON.stringify(blog));

            console.log('Submitting blog data:', blog);

            const { data } = await axios.post('/api/blog/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Server response:', data);

            if (data && data.success) {
                toast.success('Blog added successfully!', {
                    duration: 4000,
                    position: 'top-center',
                });
                
                // Reset all form fields
                setImage(null);
                setTitle('');
                setSubTitle('');
                if (quillRef.current) {
                    quillRef.current.root.innerHTML = '';
                }
                setCategory('Startup');
                setIsPublished('false');
                
                // Clear file input
                const fileInput = document.getElementById('image');
                if (fileInput) fileInput.value = '';

                // Redirect to the newly created blog's preview page after 2 seconds so the toast is visible
                setTimeout(() => {
                    const newId = data?.blog?._id || data?.blog?.id;
                    if (newId) {
                        navigate(`/blog/${newId}`);
                    } else {
                        // fallback to home if id not available
                        navigate('/');
                    }
                }, 2000);

            } else {
                toast.error(data?.message || 'Failed to add blog');
            }
        } catch (error) {
            console.error('Add Blog error:', error);
            console.error('Error response:', error.response);
            
            if (error.response?.status === 404) {
                toast.error('API endpoint not found. Please check the server.');
            } else if (error.response?.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error adding blog. Please try again.');
            }
        } finally {
            setIsAdding(false);
        }
    }

    useEffect(() => {
        // Initialize Quill editor
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['link', 'image'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['blockquote', 'code-block'],
                        ['clean']
                    ]
                },
                placeholder: 'Start writing your blog content...',
            });

            // Set initial content to avoid empty content validation issues
            quillRef.current.root.innerHTML = '<p><br></p>';
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">Add New Blog</h1>
                        <p className="text-gray-600 mt-1">Create a new blog post for your audience</p>
                    </div>

                    <form onSubmit={onSubmitHandler} className="p-6">
                        {/* Image Upload Section */}
                        <div className='mb-8'>
                            <label className='block text-lg font-semibold text-gray-900 mb-4'>
                                Blog Thumbnail *
                            </label>
                            <div className="flex flex-col items-center">
                                <label htmlFor='image' className='cursor-pointer block w-full max-w-md'>
                                    <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors'>
                                        {image ? (
                                            <div className="relative">
                                                <img 
                                                    src={URL.createObjectURL(image)} 
                                                    alt="Blog thumbnail" 
                                                    className='w-full h-48 object-cover rounded-lg mx-auto'
                                                />
                                                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                                    ✓
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-12">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-2xl">📷</span>
                                                </div>
                                                <p className="text-gray-600 font-medium">Click to upload thumbnail</p>
                                                <p className="text-gray-500 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
                                            </div>
                                        )}
                                    </div>
                                    <input 
                                        onChange={(e) => setImage(e.target.files[0])} 
                                        type="file" 
                                        id='image' 
                                        hidden 
                                        accept="image/*"
                                        required 
                                    />
                                </label>
                                {image && (
                                    <p className='text-sm text-green-600 mt-3 font-medium'>
                                        ✓ Thumbnail selected: {image.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Title and Subtitle Section */}
                        <div className='mb-8'>
                            <label className='block text-lg font-semibold text-gray-900 mb-4'>
                                Blog Information *
                            </label>
                            <div className="space-y-4">
                                <div>
                                    <input 
                                        type="text" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder='Enter blog title' 
                                        className='w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
                                        required 
                                        disabled={isAdding}
                                    />  
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        value={subTitle}
                                        onChange={(e) => setSubTitle(e.target.value)}
                                        placeholder='Enter blog subtitle' 
                                        className='w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
                                        required 
                                        disabled={isAdding}
                                    />  
                                </div>
                            </div>
                        </div>

                        {/* Category Section */}
                        <div className='mb-8'>
                            <label className='block text-lg font-semibold text-gray-900 mb-4'>
                                Category *
                            </label>
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
                                disabled={isAdding}
                            >
                                <option value="Startup">Startup</option>
                                <option value="Technology">Technology</option>
                                <option value="Business">Business</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Health">Health</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>

                        {/* Blog Content Section */}
                        <div className='mb-8'>
                            <div className='flex justify-between items-center mb-4'>
                                <label className='block text-lg font-semibold text-gray-900'>
                                    Blog Content *
                                </label>
                                <button 
                                    type="button"
                                    onClick={generateContent}
                                    disabled={loading}
                                    className={`px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 text-sm ${
                                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'
                                    }`}
                                >
                                    {loading && (
                                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
                                    )}
                                    <span>🤖</span>
                                    Generate with AI
                                </button>
                            </div>
                            
                            {/* Quill Editor */}
                            <div className='bg-white border border-gray-300 rounded-lg overflow-hidden'>
                                <div 
                                    ref={editorRef} 
                                    className='h-80'
                                    style={isAdding ? { opacity: 0.6, pointerEvents: 'none' } : {}}
                                ></div>
                            </div>
                        </div>

                        {/* Publish Status Section */}
                        <div className='mb-8'>
                            <label className='block text-lg font-semibold text-gray-900 mb-4'>
                                Publish Status *
                            </label>
                            <select 
                                value={isPublished}
                                onChange={(e) => setIsPublished(e.target.value)}
                                className='w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
                                disabled={isAdding}
                            >
                                <option value="true">Publish Immediately</option>
                                <option value="false">Save as Draft</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button 
                                type="button"
                                onClick={() => navigate('/admin/blogs')}
                                className="flex-1 py-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors text-base"
                                disabled={isAdding}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isAdding}
                                className={`flex-1 py-4 text-white font-semibold rounded-lg transition-colors text-base ${
                                    isAdding 
                                        ? 'bg-blue-400 cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isAdding ? (
                                    <div className='flex items-center justify-center gap-3'>
                                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                                        Adding Blog...
                                    </div>
                                ) : (
                                    'Publish Blog'
                                )}
                            </button>   
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBlog