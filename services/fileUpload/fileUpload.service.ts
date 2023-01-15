import { FirebaseStorage, uploadBytes } from "firebase/storage";
import storage from "../../utils/fileStorage/firebase";
import { ref } from "firebase/storage";

class FileUploadService {
    storage: FirebaseStorage;
    constructor() {
        this.storage = storage;
    }

    uploadFile(file: File, fileName: string, folder: string) {
        console.log("🚀 | file: fileUpload.service.ts:12 | FileUploadService | uploadFile | file", file);
        const storageRef = ref(this.storage);
        console.log("🚀 | file: fileUpload.service.ts:13 | FileUploadService | uploadFile | storageRef", storageRef);
        const fileRef = ref(storageRef, `${folder}/${fileName}`);
        console.log("🚀 | file: fileUpload.service.ts:16 | FileUploadService | uploadFile | fileRef", fileRef);
        uploadBytes(fileRef, file).then((snapshot) => {
            console.log("🚀 | file: fileUpload.service.ts:15 | FileUploadService | uploadBytes | snapshot", snapshot);
            console.log('Uploaded a blob or file!');
        }).catch((error) => {
            console.log("🚀 | file: fileUpload.service.ts:19 | FileUploadService | uploadBytes | error", error);
        });

    }
}

export default FileUploadService;