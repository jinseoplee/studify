import SignupForm from "../../Components/Signup/SignupForm";
import TokenRemove from "../../Components/TokenCheck/TokenRemove";

const Signup = () => {
  return (
    <>
      <TokenRemove />
      <SignupForm />
    </>
  );
};

export default Signup;
