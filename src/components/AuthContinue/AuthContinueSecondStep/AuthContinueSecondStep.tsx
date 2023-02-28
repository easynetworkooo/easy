import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './AuthContinueSecondStep.module.scss'
import { Button, Steps } from "../../../components-ui";
import { authSlice } from "../../../store/reducers/AuthSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { CONTENT } from "../../../constants/nameRoutesConsts";
import { appAPI } from "../../../services/AppService";
import { authAPI } from "../../../services/AuthService";
import { IFinishRegisterCredentials } from "../../../models/IFinishRegister";
import { userSlice } from "../../../store/reducers/UserSlice";
import { customErrorNotify } from "../../../helpers/customErrorNotify";
import deleteInterest from '../../../assets/Select/DeleteInterest.svg'


export interface AuthContinueSecondStepProps {
    isCredentialsFinishRegister: IFinishRegisterCredentials,
}

export const AuthContinueSecondStep: FC<AuthContinueSecondStepProps> = ({isCredentialsFinishRegister}) => {
    const {setUserAfterAuthContinue} = userSlice.actions
    const {loginReducer} = authSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isOpenDropdown, setOpenDropdown] = useState(true)
    const [inputFind, setInputFind] = useState('')
    const [findItems, setFindItems] = useState<string[]>([])
    const inputRef = useRef<any>(null)
    const blockRef = useRef<any>(null)

    const [isInterestItems, setInterestItems] = useState<string[]>([])

    const {data: interestItems} = appAPI.useFetchAllInterestQuery('')
    const [finishRegister] = authAPI.useFinishRegisterMutation()

    const addInterestItemHandler = (interest: string) => {
        const res = /^[a-zA-Z0-9_ ]+$/.exec(interest);
        const checkRepeatInterest = isInterestItems.find(item => item.toLowerCase() === interest.toLowerCase())
        if (interest.length >= 3 && !!res && !checkRepeatInterest) {
            setInterestItems(prevState => [...prevState, interest])
        }
        setInputFind('')
    }

    const deleteInterestItemHandler = (e: React.MouseEvent<HTMLImageElement>, interest: string) => {
        e.stopPropagation()
        setInterestItems(isInterestItems.filter(item => item !== interest))
    }

    const highlightFindTextOption = (option: string) => {
        const regex = new RegExp(inputFind, 'gi');
        return option.replace(regex, '<span>$&</span>');
    }

    const endAuthHandler = async () => {
        if (isInterestItems.length >= 3 && isInterestItems.length <= 10) {
            const {nickname, country, city} = isCredentialsFinishRegister
            const finishDataRegister: any = await finishRegister({
                ...isCredentialsFinishRegister,
                interests: JSON.stringify(isInterestItems)
            })
            if (finishDataRegister.data.status === 200) {
                dispatch(loginReducer({isAuth: true, continueAuth: false}))
                dispatch(setUserAfterAuthContinue({name: nickname, country, city, interests: isInterestItems}))
                navigate(CONTENT)
                customErrorNotify('Good luck!', 'Success')
            } else {
                customErrorNotify(finishDataRegister.error.data.value, 'Error')
            }
        } else {
            customErrorNotify('Choose minimum 3 interests and maximum 10 interests', 'Error')
        }
    }

    useEffect(() => {
        if (interestItems) {
            if (inputFind === '') {
                setFindItems([...interestItems.value.interests.map(item => item.name)])
            } else {
                const items = [...interestItems.value.interests.map(item => item.name)]
                setFindItems(items.filter(item => item.toLowerCase().includes(inputFind.toLowerCase())))

            }
        }
    }, [inputFind, interestItems])

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (blockRef.current && !blockRef.current.contains(event.target)) {
                setOpenDropdown(false)
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [blockRef])

    return (
        <div className={styles.secondStepBlock}>
            <div className={styles.stepsBlock}>
                <Steps steps={['readyStep', 'secondActiveStep']}/>
            </div>
            <div className={styles.helperTextBlock}>
                <span>Enter your crypto interests</span>
            </div>
            <div className={styles.interestsBlock} ref={blockRef} onFocus={() => setOpenDropdown(true)}>
                <div
                    className={isOpenDropdown ? `${styles.selectBlock} ${styles.selectBlockActActive}` : styles.selectBlock}
                    onClick={() => inputRef.current.focus()}>
                    {isInterestItems.map(item =>
                        <div key={item} className={styles.selectInterest}>
                            <span>{item}</span>
                            <img src={deleteInterest} alt="delete" onClick={(e) => deleteInterestItemHandler(e, item)}/>
                        </div>)}
                    <input type="text" ref={inputRef} value={inputFind}
                           onKeyPress={e => e.key === 'Enter' && addInterestItemHandler(inputFind)}
                           onChange={e => setInputFind(e.currentTarget.value)}
                           placeholder={isInterestItems.length > 0 ? '' : 'Add up to 10 of your key interests'}/>
                </div>
                {isOpenDropdown &&
                    <div className={styles.dropdownBlock}>
                        <span
                            className={styles.findHeader}>{inputFind.length === 0 ? 'Suggested interest options:' : 'searching results:'}</span>
                        {inputFind.length === 0 ?
                            <div className={styles.interestSuggestBlock}>
                                {interestItems && interestItems.value.interests.map((item, key) =>
                                    <span key={key} className={styles.interestSuggest}
                                          onClick={() => addInterestItemHandler(item.name)}>{item.name}</span>
                                )}
                            </div>
                            :
                            <div className={styles.findInterestBlock}>
                                {findItems.map((item, key) =>
                                    <span className={styles.findInterest}
                                          key={key}
                                          dangerouslySetInnerHTML={{__html: highlightFindTextOption(item)}}
                                          onClick={() => addInterestItemHandler(item)}/>
                                )}
                            </div>
                        }
                    </div>
                }
            </div>
            <div className={styles.buttonDoneBlock}>
                <Button buttonColor={'clearButton'} onClick={() => endAuthHandler()}>
                    <span>Done</span>
                </Button>
            </div>
        </div>
    );
};
