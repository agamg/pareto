import { supabase } from "@/lib/subapaseclient";

// Function to upload a file to Supabase storage
export const uploadFile = async (file: File) => {
    const { data, error } = await supabase.storage
        .from("test_bucket")
        .upload(`uploads/${file.name}`, file, {
            cacheControl: "3600",
            contentType: file.type,
        });

    return { data, error };
};

// Function to get the public URL of the uploaded file
export const getFilePublicUrl = (fileName: string) => {
    return supabase.storage
        .from("test_bucket")
        .getPublicUrl(`uploads/${fileName}`);
};

// Function to insert file information into a Supabase table
export const saveFileInfoToDatabase = async (fileInfo: { name: string; url: string }) => {
    const { error } = await supabase
        .from("test")
        .insert([{ name: fileInfo.name, url: fileInfo.url }]);

    return error;
};

// Combined function to handle file upload and database insertion
export const handleFileUpload = async (file: File) => {
    const { data, error: uploadError } = await uploadFile(file);
    if (uploadError) {
        return { error: uploadError };
    }

    const fileInfo = {
        name: file.name,
        url: getFilePublicUrl(file.name).data.publicUrl,
    };

    const dbError = await saveFileInfoToDatabase(fileInfo);
    if (dbError) {
        return { error: dbError };
    }

    return { data, fileInfo };
};



// Function to read the entire table and create a list of JSON objects
export const readWorkflowTable = async () => {
    const { data, error } = await supabase
        .from("workflowLogs")
        .select('*');

    if (error) {
        return { error };
    }

    return { data };
};

export const workflowData2 = async () => {
    const { data, error } = await readWorkflowTable();
    if (error) {
        console.error("Error fetching workflow data:", error);
        return null; // or handle the error as needed
    }
    return data; // This will return the list of workflows
};



// ... additional utility functions can be added here ...


