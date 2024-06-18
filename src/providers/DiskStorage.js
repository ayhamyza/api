const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(ulpoadConfig.TMP_FOLDER, file),
            path.resolve(ulpoadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file) {
        const filetPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        }   catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;