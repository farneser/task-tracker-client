import {FC, useState} from "react";
import {ProjectInviteToken} from "@/services/project/invite/invite.types.ts";
import styles from "./InviteLink.module.scss";
import {useLocalization} from "@/hooks/useLocalization.ts";
import CopyIcon from "@/components/ui/icons/CopyIcon.tsx";
import {ProjectMember} from "@/services/project/project.types.ts";

type InviteLinkProps = {
    token: ProjectInviteToken | null;
    member: ProjectMember | null;
    deleteHandler: () => void;
    createHandler: () => void;
}

const InviteLink: FC<InviteLinkProps> = ({token, member, deleteHandler, createHandler}) => {

    const {translations} = useLocalization();

    const [copied, setCopied] = useState(false);

    if (!member || member.role == "MEMBER") {
        return <></>
    }

    const getInviteLink = () => {
        return `${window.location.origin}/i/accept?token=${token?.token}`;
    }

    const copyToClip = async () => {
        await navigator.clipboard.writeText(getInviteLink())
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            })
            .catch(err => console.error('Failed to copy:', err));
    }

    return <div className={styles.form}>
        {token ? <>
            <div style={{display: "flex"}}>
                <input className={styles.form__input} placeholder={translations.members.inviteLink.placeholder}
                       value={getInviteLink()} readOnly={true}/>
                <button
                    className={styles.form__button}
                    onClick={() => copyToClip()}
                    style={{marginLeft: "10px"}}
                >
                    <div style={{width: "15px", height: "15px"}}><CopyIcon/></div>
                </button>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <button className={styles.form__button}
                            onClick={() => deleteHandler()}
                    >{translations.members.inviteLink.delete}</button>
                </div>
                {copied &&
                    <div style={{display: "flex", alignItems: "center"}}>{translations.members.inviteLink.copied}</div>}
            </div>
        </> : <>
            <div>
                <button className={styles.form__button}
                        onClick={() => createHandler()}
                >{translations.members.inviteLink.create}</button>
            </div>
        </>}
    </div>
}


export default InviteLink;