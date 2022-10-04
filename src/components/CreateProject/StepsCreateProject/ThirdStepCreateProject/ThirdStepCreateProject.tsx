import React, { FC } from 'react';
import styles from './ThirdStepCreateProject.module.scss'
import { Button, Input } from "../../../../components-ui";
import networkLink from '../../../../assets/UI/NetworkLink.svg'
import logoLink from '../../../../assets/UI/LogoLink.svg'
import facebookLink from '../../../../assets/UI/FacebookLink.svg'
import twitterLink from '../../../../assets/UI/TwitterLink.svg'
import githubLink from '../../../../assets/UI/GithubLink.svg'
import telegramLink from '../../../../assets/UI/TelegramLink.svg'
import instagramLink from '../../../../assets/UI/InstagramLink.svg'
import discordLink from '../../../../assets/UI/DiscordLink.svg'
import redditLink from '../../../../assets/UI/RedditLink.svg'
import TextareaAutosize from "react-textarea-autosize";

export interface ThirdStepCreateProjectProps {
    setActiveStepNumber: (page: number) => void
}

export const ThirdStepCreateProject: FC<ThirdStepCreateProjectProps> = ({setActiveStepNumber}) => {
    return (
        <div className={styles.thirdStepCreateProjectBlock}>
            <div className={styles.thirdStepCreateProject}>
                <span>Links to the logo and website are required</span>
                <div className={styles.logoInputsBlock}>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={logoLink} alt="logo"/>
                            <label>Logo URL</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={networkLink} alt="website"/>
                            <label>Website</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                    <span>URL must end with a supported image extension png, jpg,jpeg or gif</span>
                </div>
                <span>Social media links are not required</span>
                <div className={styles.socialMediaLinks}>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={facebookLink} alt="Facebook"/>
                            <label>Facebook</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={twitterLink} alt="Twitter"/>
                            <label>Twitter</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={githubLink} alt="Github"/>
                            <label>Github</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={telegramLink} alt="Telegram"/>
                            <label>Telegram</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={instagramLink} alt="Instagram"/>
                            <label>Instagram</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={discordLink} alt="Discord"/>
                            <label>Discord</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                    <div className={styles.linkInput}>
                        <div className={styles.inputLabel}>
                            <img src={redditLink} alt="Reddit"/>
                            <label>Reddit</label>
                        </div>
                        <Input placeholder={'https://'} type={'text'}/>
                    </div>
                </div>
                <div className={styles.descriptionBlock}>
                    <label>Description</label>
                    <TextareaAutosize className={styles.textareaDescription} placeholder={'Description'} maxRows={8} minRows={4}/>
                </div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.backButton}>
                    <Button buttonColor={'grayButton'} onClick={() => setActiveStepNumber(1)}>
                        <span>Back</span>
                    </Button>
                </div>
                <div className={styles.nextButton}>
                    <Button buttonColor={'clearButton'} onClick={() => setActiveStepNumber(3)}>
                        <span>Next Step</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};