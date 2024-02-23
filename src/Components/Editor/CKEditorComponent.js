import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = () => {
    const [editorData, setEditorData] = useState('');

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    const handleFileUpload = (file) => {
        return new Promise((resolve, reject) => {
            // Implement your file upload logic here, e.g., using FormData and axios
            const formData = new FormData();
            formData.append('file', file);

            // Example: upload image to your backend and get the URL
            // axios.post('http://your-backend-url/upload', formData)
            //   .then(response => resolve(response.data.imageUrl))
            //   .catch(error => reject(error));
        });
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
            config={{
                ckfinder: {
                    uploadUrl: 'http://your-backend-url/upload', // URL for image upload
                },
            }}
            onReady={(editor) => {
                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                    return {
                        upload: async () => {
                            const file = await loader.file;
                            return handleFileUpload(file);
                        },
                    };
                };
            }}
        />
    );
};

export default CKEditorComponent;
