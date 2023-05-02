import Base from "../components/Base";
import userContext from "../context/userContext";

const About=()=>{
    return(
        <userContext.Consumer>
            {(object) => (
                <Base>
                    <h1>This is about page.</h1>
                    <p>We are building blog web app.</p>
                    {console.log(object)}
                    {/* <h1>Welcome {object.user.login && object.user.data.user.name} </h1> */}
                </Base>
            )}
        </userContext.Consumer>
    );
};

export default About;