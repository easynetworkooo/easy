import React, { FC, useEffect, useState } from 'react';
import styles from "../Messages.module.scss";
import { UserDialog } from "../UserDialog/UserDialog";
import { paginationCount } from "../../../constants/pagintaionCount";


export interface UserDialogsProps {
    isDialogData: any
    setCurrentCountDialogs: any
    openDialogHandle: (index: number, id: number) => void
    isOpenMessages: number | null
}

export const UserDialogs: FC<UserDialogsProps> = ({
                                                      isDialogData,
                                                      openDialogHandle,
                                                      isOpenMessages,
                                                      setCurrentCountDialogs
                                                  }) => {

    const [isFetching, setFetching] = useState(false)

    useEffect(() => {
        if (isFetching) {
            setCurrentCountDialogs((prevState: any) => prevState + paginationCount)
        }
        // eslint-disable-next-line
    }, [isFetching])

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollHeight - (e.currentTarget.clientHeight + e.currentTarget.scrollTop) === 0) {
            setFetching(true)
        } else {
            setFetching(false)
        }
    }


    return (
        <div className={styles.userMessages} onScroll={onScrollHandler}>
            {isDialogData && isDialogData.map((item: any, index: number) =>
                <UserDialog key={index} dialogData={item} index={index}
                            isOpenMessages={isOpenMessages} openDialogHandler={openDialogHandle}/>
            )}
        </div>
    );
};

export default UserDialogs;
