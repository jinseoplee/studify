import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const UserCheck = () => {

    const userToken = useSelector((state) => state.token.accesstoken);

    //토큰을 이용하여 해당토큰의 이메일을 먼저 가져온 후에
    //그 이메일이 가지고 있는 스터디 목록의 아이디를 가져와서
    //내가 들어가려는 비디오룸의 스터디 아이디가 있는지 체크하고 없으면 mainpage로 이동.
    useEffect(() => {
    try {
      const response = axios
        .get(`/api/v1/studies/email`, {
            headers: { "X-AUTH-TOKEN": userToken },
            params : { token : userToken},
        })
        console.log(response);
    } catch (err) {
      console.log(err);
    }
    }, [])

    return (
        <>
        </>

    )
}
export default UserCheck;