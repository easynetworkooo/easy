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
import { customErrorNotify } from "../../../helpers/customErrorNotify";
import deleteInterest from '../../../assets/Select/DeleteInterest.svg'
import { useDebounce } from "use-debounce";
import { userAPI } from "../../../services/UserService";


export interface AuthContinueSecondStepProps {
    isCredentialsFinishRegister: IFinishRegisterCredentials,
}

export const AuthContinueSecondStep: FC<AuthContinueSecondStepProps> = ({isCredentialsFinishRegister}) => {
    const {loginReducer} = authSlice.actions
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [inputFind, setInputFind] = useState('')
    const [debounceFindText] = useDebounce(inputFind, 500)
    const [findItems, setFindItems] = useState<string[]>([])
    const inputRef = useRef<any>(null)
    const blockRef = useRef<any>(null)

    const [isInterestItems, setInterestItems] = useState<string[]>([])

    const {data: interestItems} = appAPI.useFetchAllInterestQuery('')
    const {data: interestsFound} = userAPI.useSearchInterestsQuery(debounceFindText)
    const [finishRegister] = authAPI.useFinishRegisterMutation()

    const addInterestItemHandler = (interest: string) => {
        if (isInterestItems.length < 10) {
            const res = /^[a-zA-Z0-9_ ]+$/.exec(interest);
            const checkRepeatInterest = isInterestItems.find(item => item.toLowerCase() === interest.toLowerCase())
            if (interest.length >= 3 && !!res && !checkRepeatInterest) {
                setInterestItems(prevState => [...prevState, interest])
            }
            setInputFind('')
        } else {
            customErrorNotify('A maximum of 10 interests can be selected', 'Warning')
        }
    }

    const deleteInterestItemHandler = (e: React.MouseEvent<HTMLImageElement>, interest: string) => {
        e.stopPropagation()
        setInterestItems(isInterestItems.filter(item => item !== interest))
    }

    const highlightFindTextOption = (option: string) => {
        const optionHighlight = option.slice(0, debounceFindText.toLowerCase().length)
        const arr: { highlight: boolean; text: string }[] = [
            {
                text: optionHighlight,
                highlight: true
            }
            ,
            {
                text: option.slice(debounceFindText.toLowerCase().length),
                highlight: false
            }
        ]

        return arr
    }

    const endAuthHandler = async () => {
        if (isInterestItems.length >= 3 && isInterestItems.length <= 10) {
            const finishDataRegister: any = await finishRegister({
                ...isCredentialsFinishRegister,
                interests: JSON.stringify(isInterestItems)
            })
            if (finishDataRegister.data.status === 200) {
                dispatch(loginReducer({isAuth: true, continueAuth: false}))
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
        if (interestsFound) {
            if (debounceFindText === '') {
                setFindItems([...interestsFound.value.map(item => item.name)])
            } else {
                const items = [...interestsFound.value.map(item => item.name)]
                setFindItems(items.filter(item => item.toLowerCase().indexOf(debounceFindText.toLowerCase()) === 0))

            }
        }

        // eslint-disable-next-line
    }, [debounceFindText])


    return (
        <div className={styles.secondStepBlock}>
            <div className={styles.stepsBlock}>
                <Steps steps={['readyStep', 'secondActiveStep']}/>
            </div>
            <div className={styles.helperTextBlock}>
                <span>Enter your maximum 10 crypto interests</span>
            </div>
            <div className={styles.interestsBlock} ref={blockRef}>
                <div
                    className={`${styles.selectBlock} ${styles.selectBlockActActive}`}
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
                <div className={styles.dropdownBlock}>
                        <span className={styles.findHeader}>
                            {inputFind.length === 0 ? 'Suggested interest options:' : 'searching results:'}
                        </span>
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
                                <span className={styles.findInterest} key={key}
                                      onClick={() => addInterestItemHandler(item)}>{highlightFindTextOption(item).map((item, key) =>
                                    <span
                                        className={item.highlight ? styles.findInterestHighlight : styles.findInterestText}
                                        key={key}>
                                        {item.text}
                                    </span>
                                )}
                                </span>
                            )}
                        </div>
                    }
                </div>
            </div>
            <div className={styles.buttonDoneBlock}>
                <Button buttonColor={'clearButton'} onClick={() => endAuthHandler()}>
                    <span>Done</span>
                </Button>
            </div>
        </div>
    );
};
