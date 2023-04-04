import React, { FC, useEffect, useState } from 'react';
import styles from "./UserMessage.module.scss";
import { Avatar, Text } from "../../../components-ui";
import { serverURL } from "../../../constants/serverURL";
import { IDialogValue } from "../../../models/IDialog";
import { useAppSelector } from "../../../hooks/redux";
import { createPhotos } from "../../../helpers/photos";
import PhotoAlbum, { Photo } from "react-photo-album";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";

export interface UserMessageProps {
    item: any
    isOpenDialogData: IDialogValue
}

export const UserMessage: FC<UserMessageProps> = ({item, isOpenDialogData}) => {

    const {id: activeUserId, name, img, color} = useAppSelector(state => state.userReducer)
    const [photos, setPhotos] = useState<Photo[]>([])
    const [slides, setSlides] = useState<Slide[]>([])
    const [slideIndex, setSlideIndex] = useState(-1)

    useEffect(() => {
        setPhotos([])
        if (item.imgs.length > 10) {
            const imagesUrls = JSON.parse(item.imgs).map((url: string) => `${serverURL}/${url}`)
            createPhotos(imagesUrls).then((photos: Photo[]) => {
                setPhotos(photos)
                setSlides(photos.map(item => ({
                    ...item
                })))
            })
        }
    }, [item])


    return (
        <>
                <div className={styles.messageBlock}>
                    <div className={styles.borderYourMessage}/>
                    <div className={item.fromid !== activeUserId ? styles.message : `${styles.message} ${styles.yourMessage}`}>
                        <div className={styles.avatar}>
                            {item.fromid !== activeUserId ?
                                <Avatar
                                    img={isOpenDialogData.img ? `${serverURL}${isOpenDialogData.img}` : null}
                                    name={isOpenDialogData.name} color={isOpenDialogData.color}
                                    fontSize={18}/>
                                :
                                <Avatar
                                    img={img ? `${serverURL}${img}` : null}
                                    name={name} color={color}
                                    fontSize={18}/>
                            }

                        </div>
                        <div className={styles.messageWithPhoto}>
                            <Text text={item.text}/>
                            {item.imgs.length > 10 &&
                                <div className={styles.gallery}>
                                    <PhotoAlbum layout='rows' photos={photos} targetRowHeight={200}
                                                onClick={({index}) => setSlideIndex(index)}
                                                componentsProps={{imageProps: {style: {borderRadius: '10px'}}}}/>
                                    <Lightbox
                                        styles={{captionsDescription: {fontSize: '24px'}}}
                                        slides={slides}
                                        open={slideIndex >= 0}
                                        index={slideIndex}
                                        plugins={[Counter, Thumbnails, Captions]}
                                        captions={{
                                            showToggle: true,
                                            descriptionTextAlign: 'center',
                                            descriptionMaxLines: 3
                                        }}
                                        close={() => setSlideIndex(-1)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
        </>
    );
};
