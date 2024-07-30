import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import {s3} from "./s3.util";

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET!,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName = `houses/${
        file.originalname.split(".")[0]
      }-${Date.now()}`;
      cb(null, `${fileName}${path.extname(file.originalname)}`);
    },
  }),
});

// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     const ext = path.extname(file.originalname).slice(1);
//     const format = ext || 'jpg'; // default to jpg if extension is not found
//     const public_id = `${file.originalname.split(".")[0]}-${Date.now()}`;

//     return {
//       folder: "houses",
//       format: format,
//       public_id: public_id,
//     };
//   },
// });


// export const upload = multer({ storage: storage });
