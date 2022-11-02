import React, { useState } from 'react';
import styles from './Messages.module.scss'
import { UserMessage } from "./UserMessage/UserMessage";
import { InputSend } from "../../components-ui";


const usersMessages = [
    {
        name: 'Darlene Robertson',
        text: 'Ha, cool idea! Theoretically you can...',
        messages: [
            {
                who: 'to me',
                text: 'Listen, buddy, hello! Tell me an interesting project that you can fly  into? And I really want to invest'
            },
            {who: 'me', text: 'I\'ll post a couple later'},
            {who: 'to me', text: 'Can belts be sold through NFT platforms?'},
            {who: 'me', text: 'Ha, cool idea! Theoretically you can...'},
        ]
    },
    {
        name: 'Darlene Robertson', text: 'Okeeee',
        messages: [
            {
                who: 'to me',
                text: 'Test plz cardano wallet'
            },
            {who: 'me', text: 'I am testing'},
            {who: 'to me', text: 'Bro no problem'},
            {who: 'me', text: 'Okeeee'},
            {who: 'me', text: 'Okeeee'},
            {who: 'me', text: 'Okeeee'},
            {who: 'me', text: 'Okeeee'},
            {who: 'me', text: 'Okeeee'},
            {who: 'me', text: 'Okeeee'},
            {who: 'me', text: 'Okeeee'},
            {who: 'me', text: 'Okeeee'},
            {who: 'me', text: 'Okeeee'},
        ]
    },
    {
        name: 'Darlene Robertson', text: 'I think...',
        messages: [
            {
                who: 'to me',
                text: 'Hello man'
            },
            {who: 'me', text: 'hello there'},
            {who: 'to me', text: 'IDK what a problem with cardano'},
            {who: 'me', text: 'I think...'},
        ]
    },
]

export const Messages = () => {

    const [isMessageBlockHeight, setMessageBlockHeight] = useState(0)
    const [isOpenMessages, setOpenMessages] = useState(null)
    const [isSendValueMessage, setSendValueMessage] = useState('')


    return (
        <div className={styles.messagesContainer}>
            <div className={styles.userMessagesBlock}>
                <div className={styles.userMessages}>
                    {usersMessages.map((item, index) =>
                        <UserMessage key={index} name={item.name} text={item.text} index={index}
                                     isOpenMessages={isOpenMessages} setOpenMessages={setOpenMessages}/>
                    )}
                </div>
            </div>
            <div className={isOpenMessages !== null ? styles.messagesBlock : styles.messagesBlockNone}>
                <div className={styles.messages} style={{height: `${720 - isMessageBlockHeight}px`}}>
                    {isOpenMessages !== null && usersMessages[isOpenMessages].messages.map((item, index) =>
                        <div
                            className={item.who === 'to me' ? styles.message : `${styles.message} ${styles.yourMessage}`}
                            key={index}>
                            <p className={styles.text}>{item.text}</p>
                            <span className={styles.timeSend}>56 minutes ago</span>
                        </div>
                    )}
                </div>
                <InputSend setSubtractTextarea={setMessageBlockHeight} value={isSendValueMessage} onChange={e => setSendValueMessage(e.target.value)}/>
            </div>
        </div>
    );
};