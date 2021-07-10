import React from 'react';
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { getSession, signOut, useSession } from 'next-auth/client' 
import { db } from '../../firebase'
import Login from '../../components/Login';
import Router, { route } from 'next/dist/next-server/server/router';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/dist/client/router';
import TextEditor from '../../components/TextEditor';
function Doc(){
    const [session] = useSession();
    if(!session) return <Login />
    const router = useRouter();
    const {id} = router.query;
    const [snapshot,loadingSnapshot] = useDocumentOnce(
                                    db.collection("userDocs")
                                    .doc(session.user.email)
                                    .collection("docs")
                                    .doc(id)
                                    ) 
        if(!loadingSnapshot && !snapshot?.data()?.fileName){
            router.replace("/");
        }
    return <div>
            <header className="flex justify-between items-center p-3 pb-1">
                <span onClick={() => router.push("/")}
                    className="cursor-pointer">
                    <Icon name="description" size="5xl" color="blue" />
                </span>

                <div className="flex-grow px-2">
                    <h2>{snapshot?.data()?.fileName}</h2>
                    <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
                        <p className="option">File</p>
                        <p>Edit</p>
                        <p>View</p>
                        <p>Insert</p>
                        <p>Format</p>
                        <p>Tools</p>
                    </div>
                </div>

                <Button
                    color="lightBlue"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    iconOnly={false}
                    block={false}
                    ripple="light"
                    className="h-10"
                    >
                    <Icon name="people" size="md" /> SHARE
                </Button>
                <img className="cursor-pointer rounded-full h-10 w-10 ml-2" src={session.user.image} />
            </header>
            <TextEditor />
         </div>;
}
 
export default Doc;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
      props: {
        session
      }
    }
  }