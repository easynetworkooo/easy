import { Photo } from "react-photo-album";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48]


function loadImage(imageUrl: string) {
    const img = new Image()
    img.src = imageUrl

    return new Promise((resolve, reject) => {
            img.onload = () => {
                resolve({src: img.src, width: img.width, height: img.height})
            }
            img.onerror = (err) => {
                reject(err)
            }
        }
    )

}

async function createImagesInformation(imagesUrl: string[]) {
    return Promise.all(imagesUrl.map(item => loadImage(item)))
}

export const createPhotos = async (imagesUrl: string[]) => {
    const photos: any = await createImagesInformation(imagesUrl).then(data => data)

    return await photos.map((photo: Photo) => (
            {
                src: photo.src,
                width: photo.width,
                height: photo.height,
                images: breakpoints.map((breakpoint) => {
                    const height = Math.round((photo.height / photo.width) * breakpoint);
                    return {
                        src: photo.src,
                        width: breakpoint,
                        height,
                    };
                }),
            }
        )
    )
}


