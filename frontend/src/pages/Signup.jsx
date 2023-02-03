import SignupForm from "../Components/Signup/SignupForm";

const Signup = () => {
  return (
    <>
      <SignupForm />
    </>
  );
};

export default Signup;

//axios를 요청으로 보내주는것.
export const action = async ({ request }) => {
  const data = await request.formData();
  //데이터를 이용하여 회원가입 시켜주어야함.
  console.log(data);
};
