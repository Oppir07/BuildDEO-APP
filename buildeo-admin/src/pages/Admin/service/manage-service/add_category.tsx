import PageHead from "@/components/shared/page-head";
import { TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting category...");

        navigate('/admin-manage-service', { state: { categoryAdded: true } });
    };

    return (
        <>
          <PageHead title="Detail Order Done" />
          <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h1 className="text-xl text-gray-500 font-semibold">Form Add Category</h1>
            </div>
    
            <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Category Title"
                        variant="outlined"
                        margin="dense"
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        margin="dense"
                        multiline
                        rows={4}
                        style={{ marginBottom: '30px' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            style={{
                                backgroundColor: '#E31E24',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            + Add category
                        </Button>
                    </div>
                </form>
          </div>
        </>
      );
}
