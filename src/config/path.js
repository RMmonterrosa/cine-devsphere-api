import config from './firebase.config.js'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL, uploadBytesResumable, listAll } from 'firebase/storage'
import multer from 'multer'
import path from 'path'

initializeApp(config.firebaseConfig)

const storage = getStorage()

export const subir = multer({ storage: multer.memoryStorage()})

export const subirI = async (req, res, next) =>{

    
    if (!req.file) {
        req.imageUrl = req.body.ruta;
        next();
        return;
    }
    
    const extension = path.extname(req.file.originalname)
    const nombre = req.file.originalname.split(extension)[0]
    const storageRef = ref(storage, `imagen/${nombre+extension}`)
    const metadata = {
        contentType: req.file.mimetype,
    }

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
    const urlFire = await getDownloadURL(snapshot.ref)

    req.imageUrl = urlFire; 
    
    console.log('se subio')
    next()
}

