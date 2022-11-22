import React, { FC, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor'
import styles from './CropImage.module.scss'
import { Button } from "../../Button/Button";
import { userAPI } from "../../../services/UserService";
import { useAppDispatch } from "../../../hooks/redux";
import { userSlice } from "../../../store/reducers/UserSlice";

export interface CropImageProps {
    isImgSrc: string,
    setImgSrc: (img: string) => void
}

export const CropImage: FC<CropImageProps> = ({isImgSrc, setImgSrc}) => {
    const dispatch = useAppDispatch()
    const {setAvatarReducer} = userSlice.actions
    const [setMainAvatar] = userAPI.useSetMainAvatarMutation()
    const [getProfile] = userAPI.useFetchUserProfileMutation()


    const imageRef = useRef<any>(null)


    const canvasCheck = async () => {
        let imageBlob:any = await new Promise(resolve => imageRef.current.getImageScaledToCanvas().toBlob(resolve, 'image/png'));
        let formData = new FormData();
        formData.append("img", imageBlob, "image.png");
        await setMainAvatar(formData).then(() => {
            setImgSrc('')
        })
        await getProfile('').then((user: any) => {
            dispatch(setAvatarReducer({img: user.data.value.img}))
        })
    }

    return (
        <>
            <div className={styles.header}>
                <span>Your photo</span>
            </div>
            <div className={styles.cropImage}>
                <span>The selected area will be shown on your page</span>
                <AvatarEditor image={isImgSrc}
                              ref={imageRef}
                              width={300}
                              height={300}
                              border={50}
                              color={[0, 0, 0, 0.6]} // RGBA
                              scale={1.2}
                              rotate={0}
                              disableHiDPIScaling
                              borderRadius={1000}
                />
            </div>
            <div className={styles.buttonsBlock}>
                <Button buttonColor="clearButton" onClick={() => setImgSrc('')}>
                    <span>Back</span>
                </Button>
                <Button onClick={canvasCheck}>
                    <span>Save</span>
                </Button>
            </div>
        </>
    );
};
